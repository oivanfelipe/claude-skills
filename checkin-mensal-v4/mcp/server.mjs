#!/usr/bin/env node
// MCP do n8n da Central de Operações.
// Fala com o n8n da VPS por SSH (sem token, sem porta aberta): lê o banco do n8n e usa o CLI do n8n.
// Somente leitura por padrão. Para liberar escrita: N8N_MCP_WRITE=1.
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { spawn } from 'node:child_process';

const SSH_HOST = process.env.N8N_MCP_SSH_HOST || 'if-server';
const N8N_CONTAINER = process.env.N8N_MCP_CONTAINER || 'central-ops-n8n';
const PG_CONTAINER = process.env.N8N_MCP_PG_CONTAINER || 'central-ops-postgres';
const BACKUP_DIR = process.env.N8N_MCP_BACKUP_DIR || '/opt/central-ops/mcp-backups';
const WRITE = process.env.N8N_MCP_WRITE === '1';

function ssh(remoteCmd, stdin) {
  return new Promise((resolve, reject) => {
    const p = spawn('ssh', ['-o', 'BatchMode=yes', '-o', 'ConnectTimeout=10', SSH_HOST, remoteCmd], { stdio: ['pipe', 'pipe', 'pipe'] });
    let out = '', err = '';
    p.stdout.on('data', d => (out += d));
    p.stderr.on('data', d => (err += d));
    p.on('error', reject);
    p.on('close', code => (code === 0 ? resolve(out) : reject(new Error(`ssh saiu com ${code}: ${err.trim() || out.trim()}`))));
    if (stdin != null) p.stdin.write(stdin);
    p.stdin.end();
  });
}
const sql = q => ssh(`docker exec -i ${PG_CONTAINER} psql -U n8n -d n8n -At -v ON_ERROR_STOP=1`, q);
const n8n = args => ssh(`docker exec ${N8N_CONTAINER} n8n ${args} 2>&1 | grep -v "license SDK\\|migration lock"`);
const idOk = z.string().regex(/^[A-Za-z0-9_-]{1,40}$/, 'id inválido');
const text = s => ({ content: [{ type: 'text', text: typeof s === 'string' ? s : JSON.stringify(s, null, 2) }] });
const fail = e => ({ isError: true, content: [{ type: 'text', text: String(e && e.message ? e.message : e) }] });
const guard = fn => async a => { try { return await fn(a); } catch (e) { return fail(e); } };
const needWrite = () => { if (!WRITE) throw new Error('Escrita desligada. Inicie o MCP com N8N_MCP_WRITE=1 para liberar esta ferramenta.'); };

// Resolve o formato "flatted" que o n8n usa em execution_data.
function unflatten(raw) {
  const cache = new Map();
  const get = i => {
    i = Number(i);
    if (cache.has(i)) return cache.get(i);
    const v = raw[i];
    const ref = x => (typeof x === 'string' && /^\d+$/.test(x) ? get(x) : x);
    if (Array.isArray(v)) { const o = []; cache.set(i, o); v.forEach(x => o.push(ref(x))); return o; }
    if (v && typeof v === 'object') { const o = {}; cache.set(i, o); for (const [k, x] of Object.entries(v)) o[k] = ref(x); return o; }
    cache.set(i, v); return v;
  };
  return get(0);
}
const cut = (v, n) => { const s = JSON.stringify(v); return s && s.length > n ? s.slice(0, n) + '…(cortado)' : v; };

const server = new McpServer({ name: 'n8n-central-ops', version: '1.0.0' });

server.tool('list_workflows', 'Lista os workflows do n8n (id, nome, ativo, última alteração).', {},
  guard(async () => text(await sql(`select coalesce(json_agg(json_build_object('id',id,'name',name,'active',active,'updatedAt',"updatedAt") order by name),'[]') from workflow_entity;`))));

server.tool('get_workflow', 'Devolve um workflow completo (nós e conexões) em JSON.', { id: idOk },
  guard(async ({ id }) => text(await sql(`select json_build_object('id',id,'name',name,'active',active,'nodes',nodes,'connections',connections,'settings',settings)::text from workflow_entity where id='${id}';`) || 'workflow não encontrado')));

server.tool('list_executions', 'Lista execuções recentes (mais novas primeiro). Filtre por workflow e/ou status (success, error, waiting).',
  { workflow_id: idOk.optional(), status: z.enum(['success', 'error', 'waiting', 'crashed', 'canceled']).optional(), limit: z.number().int().min(1).max(100).default(15) },
  guard(async ({ workflow_id, status, limit }) => {
    const w = [workflow_id && `"workflowId"='${workflow_id}'`, status && `status='${status}'`].filter(Boolean).join(' and ');
    return text(await sql(`select coalesce(json_agg(x),'[]') from (select id,"workflowId" as workflow_id,status,mode,"startedAt" as started_at,"stoppedAt" as stopped_at from execution_entity ${w ? 'where ' + w : ''} order by id desc limit ${limit}) x;`));
  }));

server.tool('get_execution', 'Lê uma execução: status, erro e, por nó, quantos itens saíram e uma amostra do primeiro item.',
  { id: z.number().int().positive(), max_chars_por_no: z.number().int().min(200).max(20000).default(1500) },
  guard(async ({ id, max_chars_por_no }) => {
    const head = await sql(`select row_to_json(x) from (select id,"workflowId" as workflow_id,status,mode,"startedAt" as started_at,"stoppedAt" as stopped_at from execution_entity where id=${id}) x;`);
    if (!head.trim()) throw new Error('execução não encontrada');
    const data = await sql(`select data from execution_data where "executionId"=${id};`);
    const d = unflatten(JSON.parse(data.trim()));
    const rd = (d.resultData && d.resultData.runData) || {};
    const nos = Object.fromEntries(Object.entries(rd).map(([nome, runs]) => {
      const r = runs[0] || {};
      const itens = (r.data && r.data.main || []).map(b => (b || []).length);
      const first = r.data && r.data.main && r.data.main.find(b => b && b.length) && r.data.main.find(b => b && b.length)[0].json;
      return [nome, { status: r.executionStatus, itens_por_saida: itens, erro: r.error && (r.error.message || r.error), amostra: cut(first, max_chars_por_no) }];
    }));
    return text({ execucao: JSON.parse(head), erro: d.resultData && d.resultData.error && (d.resultData.error.message || d.resultData.error), nos });
  }));

server.tool('get_credentials_overview', 'Lista credenciais (id, nome, tipo). Nunca devolve os segredos.', {},
  guard(async () => text(await sql(`select coalesce(json_agg(json_build_object('id',id,'name',name,'type',type) order by name),'[]') from credentials_entity;`))));

server.tool('export_workflow_to_vps', 'Faz backup de um workflow no servidor (arquivo em /opt/central-ops/mcp-backups). Não altera nada no n8n.', { id: idOk },
  guard(async ({ id }) => {
    const f = `${BACKUP_DIR}/${id}-${Date.now()}.json`;
    await ssh(`mkdir -p ${BACKUP_DIR} && docker exec ${N8N_CONTAINER} n8n export:workflow --id=${id} --output=/tmp/mcp-export.json >/dev/null 2>&1 && docker cp ${N8N_CONTAINER}:/tmp/mcp-export.json ${f}`);
    return text({ backup: f });
  }));

server.tool('set_workflow_active', '[ESCRITA] Ativa (publica) ou desativa um workflow. Não reinicia o n8n; o n8n aplica em alguns segundos.',
  { id: idOk, active: z.boolean() },
  guard(async ({ id, active }) => {
    needWrite();
    return text(await n8n(`${active ? 'publish:workflow' : 'unpublish:workflow'} --id=${id}`));
  }));

server.tool('import_workflow', '[ESCRITA] Importa/atualiza um workflow a partir do JSON (mesmo id = substitui). Faz backup antes se o id já existir. Atenção: o n8n desativa o workflow ao importar; use publish=true para reativar.',
  { workflow_json: z.string().describe('JSON do workflow (objeto) ou array com um workflow'), publish: z.boolean().default(false) },
  guard(async ({ workflow_json, publish }) => {
    needWrite();
    const parsed = JSON.parse(workflow_json);
    const wf = Array.isArray(parsed) ? parsed[0] : parsed;
    if (!wf || !wf.id || !Array.isArray(wf.nodes)) throw new Error('JSON precisa ter id e nodes');
    idOk.parse(wf.id);
    const existe = (await sql(`select 1 from workflow_entity where id='${wf.id}';`)).trim() === '1';
    let backup = null;
    if (existe) {
      backup = `${BACKUP_DIR}/${wf.id}-${Date.now()}.json`;
      await ssh(`mkdir -p ${BACKUP_DIR} && docker exec ${N8N_CONTAINER} n8n export:workflow --id=${wf.id} --output=/tmp/mcp-export.json >/dev/null 2>&1 && docker cp ${N8N_CONTAINER}:/tmp/mcp-export.json ${backup}`);
    }
    await ssh(`cat > /tmp/mcp-import.json && docker cp /tmp/mcp-import.json ${N8N_CONTAINER}:/tmp/mcp-import.json`, JSON.stringify([wf]));
    const imp = await n8n('import:workflow --input=/tmp/mcp-import.json');
    const pub = publish ? await n8n(`publish:workflow --id=${wf.id}`) : null;
    return text({ backup, importacao: imp.trim(), publicacao: pub && pub.trim() });
  }));


server.tool('dados_relatorio',
  'Coleta ao vivo, no dash e na Central, o pacote completo de dados para montar um relatório/check-in de um cliente: KPIs do período e do anterior, variação, meta e realizado, funil, plataformas, campanhas, anúncios/criativos, leads (sem dados pessoais), site/GA4/Clarity, último relatório FCA e uma lista de "avisos" de qualidade dos dados. Só leitura.',
  { cliente: z.string().min(2).describe('Nome do cliente (parte do nome basta, ex.: "alice")'),
    mes: z.string().regex(/^\d{4}-\d{2}$/).optional().describe('Mês AAAA-MM. Padrão: mês atual até hoje. O período anterior é o mês anterior inteiro.'),
    from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    prev_from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), prev_to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional() },
  guard(async (a) => {
    const body = JSON.stringify(a);
    const py = `import json,sys,urllib.request\nc=json.load(open("/home/hermes/.hermes/central-ops/forwarder.json"))\nb=json.loads(${JSON.stringify(body)})\nr=urllib.request.Request("http://127.0.0.1:5678/webhook/dados-relatorio",json.dumps(b).encode(),{"Content-Type":"application/json","X-Central-Ops-Token":c["forward_token"]})\nprint(urllib.request.urlopen(r,timeout=120).read().decode())`;
    const out = await ssh('python3 -', py);
    let j; try { j = JSON.parse(out); } catch { throw new Error('Resposta inválida do n8n: ' + out.slice(0, 300)); }
    if (Array.isArray(j)) j = j[0];
    return text(j);
  }));

await server.connect(new StdioServerTransport());
