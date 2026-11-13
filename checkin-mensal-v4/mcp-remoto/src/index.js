// MCP remoto (somente leitura) do check-in mensal V4.
// Fala MCP "Streamable HTTP" sem estado. Autentica por token (um por pessoa, guardado como hash no KV)
// e expõe UMA ferramenta: dados_relatorio. O n8n não tem endereço público: o Worker chega nele
// pelo túnel, via Workers VPC (binding N8N).

const VERSAO = '1.0.0';
const PROTOCOLOS = ['2025-06-18', '2025-03-26', '2024-11-05'];

const FERRAMENTA = {
  name: 'dados_relatorio',
  description:
    'Coleta ao vivo, no dash e na Central, o pacote de dados para montar o check-in/relatório mensal de um cliente: ' +
    'KPIs do período e do anterior, variação, meta e realizado, funil, plataformas, campanhas, anúncios, leads (sem dados pessoais), ' +
    'site e uma lista de "avisos" de qualidade dos dados. Somente leitura.',
  inputSchema: {
    type: 'object',
    properties: {
      cliente: { type: 'string', minLength: 2, description: 'Nome do cliente (parte do nome basta, ex.: "alice")' },
      mes: { type: 'string', pattern: '^\\d{4}-\\d{2}$', description: 'Mês AAAA-MM. Padrão: mês atual até hoje.' },
      from: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
      to: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
      prev_from: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
      prev_to: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
    },
    required: ['cliente'],
    additionalProperties: false,
  },
  annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
};

const RE = { mes: /^\d{4}-\d{2}$/, dia: /^\d{4}-\d{2}-\d{2}$/ };
const json = (obj, status = 200, extra = {}) =>
  new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...extra } });
const rpcOk = (id, result) => json({ jsonrpc: '2.0', id, result });
const rpcErr = (id, code, message) => json({ jsonrpc: '2.0', id: id ?? null, error: { code, message } });

async function sha256(s) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
}

// Token -> { nome, clientes? } ; null se inválido ou revogado.
async function autenticar(request, env) {
  const h = request.headers.get('authorization') || '';
  const m = /^Bearer\s+(\S{20,200})$/i.exec(h);
  if (!m) return null;
  const raw = await env.TOKENS.get('tok:' + (await sha256(m[1])));
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function validar(args) {
  const a = args || {};
  if (typeof a.cliente !== 'string' || a.cliente.trim().length < 2 || a.cliente.length > 80) throw new Error('cliente inválido');
  const out = { cliente: a.cliente.trim() };
  if (a.mes != null) { if (!RE.mes.test(a.mes)) throw new Error('mes deve ser AAAA-MM'); out.mes = a.mes; }
  for (const k of ['from', 'to', 'prev_from', 'prev_to']) {
    if (a[k] != null) { if (!RE.dia.test(a[k])) throw new Error(`${k} deve ser AAAA-MM-DD`); out[k] = a[k]; }
  }
  return out;
}

const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

async function dadosRelatorio(args, pessoa, env) {
  const body = validar(args);
  // Restrição por pessoa: se houver lista, o cliente pedido precisa casar com ela antes de qualquer consulta.
  const permitidos = Array.isArray(pessoa.clientes) && pessoa.clientes.length ? pessoa.clientes.map(norm) : null;
  if (permitidos && !permitidos.some(p => norm(body.cliente).includes(p) || p.includes(norm(body.cliente)))) {
    throw new Error('Seu acesso não inclui este cliente.');
  }
  const r = await env.N8N.fetch('http://127.0.0.1:5678/webhook/dados-relatorio', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-central-ops-token': env.N8N_TOKEN },
    body: JSON.stringify(body),
  });
  const txt = await r.text();
  if (!r.ok) throw new Error(`n8n respondeu ${r.status}`);
  let j; try { j = JSON.parse(txt); } catch { throw new Error('resposta inválida do n8n'); }
  if (Array.isArray(j)) j = j[0];
  // Confere de novo no resultado (o n8n resolve o nome para o cliente real).
  if (permitidos && j && j.cliente) {
    const real = norm(typeof j.cliente === 'string' ? j.cliente : j.cliente.nome || j.cliente.name);
    if (!permitidos.some(p => real.includes(p) || p.includes(real))) throw new Error('Seu acesso não inclui este cliente.');
  }
  return j;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/health') return new Response('ok');
    if (url.pathname !== '/' && url.pathname !== '/mcp') return new Response('not found', { status: 404 });

    const pessoa = await autenticar(request, env);
    if (!pessoa) return json({ error: 'não autorizado' }, 401, { 'www-authenticate': 'Bearer' });

    if (request.method === 'GET' || request.method === 'DELETE') return new Response('method not allowed', { status: 405, headers: { allow: 'POST' } });
    if (request.method !== 'POST') return new Response('method not allowed', { status: 405 });

    let msg;
    try { msg = await request.json(); } catch { return rpcErr(null, -32700, 'JSON inválido'); }
    if (Array.isArray(msg)) return rpcErr(null, -32600, 'batch não suportado');
    const { id, method, params } = msg || {};

    // Notificações (sem id) não têm resposta.
    if (id === undefined) return new Response(null, { status: 202 });

    switch (method) {
      case 'initialize': {
        const pedido = params && params.protocolVersion;
        return rpcOk(id, {
          protocolVersion: PROTOCOLOS.includes(pedido) ? pedido : PROTOCOLOS[0],
          capabilities: { tools: {} },
          serverInfo: { name: 'v4-checkin-dados', version: VERSAO },
          instructions: 'Use dados_relatorio para coletar os dados reais de um cliente e depois siga a skill checkin-mensal-v4.',
        });
      }
      case 'ping': return rpcOk(id, {});
      case 'tools/list': return rpcOk(id, { tools: [FERRAMENTA] });
      case 'tools/call': {
        if (!params || params.name !== FERRAMENTA.name) return rpcErr(id, -32602, 'ferramenta desconhecida');
        const t0 = Date.now();
        try {
          const dados = await dadosRelatorio(params.arguments, pessoa, env);
          console.info(JSON.stringify({ evento: 'dados_relatorio', quem: pessoa.nome, cliente: params.arguments && params.arguments.cliente, ms: Date.now() - t0 }));
          return rpcOk(id, { content: [{ type: 'text', text: JSON.stringify(dados) }] });
        } catch (e) {
          console.warn(JSON.stringify({ evento: 'dados_relatorio_erro', quem: pessoa.nome, erro: String(e && e.message || e) }));
          return rpcOk(id, { isError: true, content: [{ type: 'text', text: String(e && e.message || e) }] });
        }
      }
      default: return rpcErr(id, -32601, 'método não suportado');
    }
  },
};
