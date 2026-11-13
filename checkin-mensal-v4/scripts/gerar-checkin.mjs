#!/usr/bin/env node
// Gera o PPTX do check-in mensal na identidade visual da V4 (Oswald + Arial, fundo branco, vermelho só de acento).
// Uso: node gerar-checkin.mjs --dados pacote.json --textos textos.json --saida checkin.pptx
import PptxGenJS from 'pptxgenjs';
import fs from 'node:fs';

const arg = n => { const i = process.argv.indexOf('--' + n); return i > 0 ? process.argv[i + 1] : null; };
const dados = JSON.parse(fs.readFileSync(arg('dados'), 'utf8'));
const T = arg('textos') ? JSON.parse(fs.readFileSync(arg('textos'), 'utf8')) : {};
const saida = arg('saida') || 'checkin.pptx';
if (!dados.ok) { console.error('Pacote inválido:', dados.erro); process.exit(1); }

// ---------- tokens V4 (identidade-visual-v4/assets/v4-tokens.json) ----------
const C = { branco: 'FFFFFF', preto: '111111', verm: 'C00000', vinho: '6B0000', cEsc: '595959', cMed: '737373', borda: 'D9D9D9', card: 'F5F5F5',
  pos: '177230', posT: 'E6F4EA', neg: 'C00000', negT: 'FFF5F5', aten: 'A35F00', atenT: 'FFF8E1', neutT: 'F0F0F0', bgEsc: '0A0A0A', racing: 'E10600' };
const OSW = 'Oswald', ARI = 'Arial';
const W = 13.333, MX = 0.5, CW = W - 2 * MX;

// ---------- formatação pt-BR ----------
const num = (n, d = 0) => (n == null || !Number.isFinite(n) ? 'n/d' : n.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d }));
const brl = (n, d = 2) => (n == null || !Number.isFinite(n) ? 'n/d' : 'R$ ' + num(n, d));
const pct = (n, d = 1) => (n == null || !Number.isFinite(n) ? 'n/d' : num(n, d) + '%');
const mesesNome = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const [PY, PM] = dados.periodo.mes.split('-').map(Number);
const MES = mesesNome[PM - 1] + '/' + PY;
const dBR = s => s.split('-').reverse().join('/');
const K = dados.kpis, KP = dados.kpis_anterior, V = dados.variacao_pct || {};
const ecom = K.modelo === 'ecommerce';
const cliente = dados.cliente.nome;
const rotuloPeriodo = dados.periodo.parcial ? `Resultado parcial · ${dBR(dados.periodo.de)} a ${dBR(dados.periodo.ate)}` : `${dBR(dados.periodo.de)} a ${dBR(dados.periodo.ate)}`;

// ---------- helpers de desenho ----------
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';
pptx.title = `Check-in ${cliente} · ${MES}`;
pptx.author = 'V4 Carvalho & Co';
let secao = 0;
const sumario = [];

function conclusaoPadrao(chave) {
  if (chave === 'meta' && metaFat) return `O faturamento do período equivale a ${num(K.faturamento / metaFat * 100, 0)}% da meta de ${brl(metaFat, 0)} (cenário provável). Antes de apresentar, confirme se a meta cadastrada na Central está atualizada.`;
  if (chave === 'funil') return ecom ? `Foram ${num(K.vendas)} vendas e ${brl(K.faturamento, 0)} de faturamento com ROAS de ${num(K.roas, 2)}x.` : `Foram ${num(K.leads)} leads e ${num(K.vendas)} vendas; CPL de ${brl(K.cpl)} e custo por venda de ${brl(K.custo_venda, 0)}.`;
  if (chave === 'mom') return 'Compare sempre contra a mesma base: onde o período anterior não tem registro, a variação aparece como "sem base".';
  if (chave === 'criativos') return 'Use estes anúncios como referência de gancho e formato nos próximos testes, validando antes de escalar.';
  return null;
}
function claro(nomeSecao, defaultTitulo, defaultSub, chave) {
  const s = pptx.addSlide(); s.background = { color: C.branco };
  const t = (T.slides && T.slides[chave]) || {};
  secao += 1; const nn = String(secao).padStart(2, '0');
  sumario.push(nomeSecao);
  s.addText('V4 Carvalho & Co', { x: W - MX - 3, y: 0.2, w: 3, h: 0.3, fontFace: OSW, fontSize: 10, bold: true, color: C.preto, align: 'right', margin: 0 });
  s.addText(`${nn} // ${nomeSecao.toUpperCase()}`, { x: MX, y: 0.3, w: 9, h: 0.4, fontFace: OSW, fontSize: 14, bold: true, color: C.verm, margin: 0 });
  s.addShape(pptx.ShapeType.line, { x: MX, y: 0.78, w: CW, h: 0, line: { color: C.verm, width: 2 } });
  s.addText((t.titulo || defaultTitulo).toUpperCase(), { x: MX, y: 0.9, w: CW, h: 0.85, fontFace: OSW, fontSize: 22, bold: true, color: C.preto, valign: 'top', margin: 0, fit: 'shrink' });
  const sub = t.subtitulo || defaultSub;
  if (sub) s.addText(sub, { x: MX, y: 1.72, w: CW, h: 0.35, fontFace: ARI, fontSize: 14, color: C.cEsc, margin: 0 });
  const concl = t.conclusao || (T.conclusoes && T.conclusoes[chave]) || conclusaoPadrao(chave);
  if (concl) {
    s.addShape(pptx.ShapeType.line, { x: MX, y: 6.2, w: CW, h: 0, line: { color: C.verm, width: 2 } });
    s.addText('CONCLUSÃO ESTRATÉGICA', { x: MX, y: 6.27, w: CW, h: 0.3, fontFace: OSW, fontSize: 14, bold: true, color: C.verm, margin: 0 });
    s.addText(concl, { x: MX, y: 6.58, w: CW, h: 0.62, fontFace: ARI, fontSize: fonte(concl, CW, 0.62), color: C.preto, valign: 'top', margin: 0, fit: 'shrink' });
  }
  return s;
}
function escuro(linhas, rodape) {
  const s = pptx.addSlide(); s.background = { color: C.bgEsc };
  s.addText(linhas, { x: 0.8, y: 2.1, w: W - 1.6, h: 3, fontFace: OSW, fontSize: 44, bold: true, color: C.branco, valign: 'middle', margin: 0, fit: 'shrink' });
  s.addText('V4 Carvalho & Co', { x: W - MX - 3, y: 6.9, w: 3, h: 0.3, fontFace: OSW, fontSize: 10, bold: true, color: C.branco, align: 'right', margin: 0 });
  s.addText(cliente, { x: MX, y: 6.9, w: 5, h: 0.3, fontFace: OSW, fontSize: 10, bold: true, color: C.branco, margin: 0 });
  if (rodape) s.addText(rodape, { x: 0.8, y: 5.3, w: W - 1.6, h: 0.4, fontFace: ARI, fontSize: 14, color: 'B8B8B8', margin: 0 });
  return s;
}
function card(s, x, y, w, h, { destaque = false, neg = false } = {}) {
  s.addShape(pptx.ShapeType.rect, { x, y, w, h, fill: { color: neg ? C.negT : C.card }, line: { color: neg ? C.verm : C.card, width: neg ? 1 : 0 } });
  s.addShape(pptx.ShapeType.rect, { x, y, w: 0.06, h, fill: { color: destaque || neg ? C.verm : C.borda }, line: { color: destaque || neg ? C.verm : C.borda, width: 0 } });
}
function kpiCard(s, x, y, w, h, rotulo, valor, sub, { destaque = false, badge = null } = {}) {
  card(s, x, y, w, h, { destaque });
  s.addText(rotulo.toUpperCase(), { x: x + 0.2, y: y + 0.1, w: w - 0.3, h: 0.28, fontFace: ARI, fontSize: 11, bold: true, color: C.cEsc, charSpacing: 1, margin: 0 });
  s.addText(valor, { x: x + 0.2, y: y + 0.4, w: w - 0.3, h: 0.6, fontFace: OSW, fontSize: 30, bold: true, color: destaque ? C.verm : C.preto, margin: 0, fit: 'shrink' });
  if (sub) s.addText(sub, { x: x + 0.2, y: Math.max(y + 0.92, y + h - 0.42), w: w - 0.3, h: 0.26, fontFace: ARI, fontSize: 11, color: C.cEsc, margin: 0, fit: 'shrink' });
  if (badge) badgeShape(s, x + w - 1.35, y + 0.1, badge);
}
function varTxt(v, inverso = false) { // devolve {txt, estado}
  if (v == null) return { txt: 'sem base', estado: 'neutro' };
  const bom = inverso ? v < 0 : v > 0;
  return { txt: (v > 0 ? '▲ ' : v < 0 ? '▼ ' : '■ ') + pct(Math.abs(v)), estado: v === 0 ? 'neutro' : bom ? 'pos' : 'neg' };
}
function badgeShape(s, x, y, { txt, estado }) {
  const m = { pos: [C.posT, C.pos], neg: [C.negT, C.neg], neutro: [C.neutT, C.cEsc], aten: [C.atenT, C.aten] }[estado] || [C.neutT, C.cEsc];
  s.addShape(pptx.ShapeType.roundRect, { x, y, w: 1.25, h: 0.28, fill: { color: m[0] }, line: { color: m[0], width: 0 }, rectRadius: 0.04 });
  s.addText(txt, { x, y, w: 1.25, h: 0.28, fontFace: ARI, fontSize: 11, bold: true, color: m[1], align: 'center', valign: 'middle', margin: 0 });
}
function bloco(s, x, y, w, h, titulo, tag, texto) { // bloco executivo: borda vermelha à esquerda
  s.addShape(pptx.ShapeType.rect, { x, y, w: 0.05, h, fill: { color: C.verm }, line: { color: C.verm, width: 0 } });
  s.addText(titulo.toUpperCase(), { x: x + 0.2, y, w: w - 0.2, h: 0.3, fontFace: ARI, fontSize: 14, bold: true, color: C.preto, margin: 0 });
  if (tag) s.addText('// ' + tag, { x: x + 0.2, y: y + 0.3, w: w - 0.2, h: 0.25, fontFace: ARI, fontSize: 11, bold: true, color: C.verm, margin: 0 });
  s.addText(texto || '', { x: x + 0.2, y: y + (tag ? 0.58 : 0.34), w: w - 0.25, h: h - (tag ? 0.6 : 0.36), fontFace: ARI, fontSize: fonte(texto, w - 0.25, h - (tag ? 0.6 : 0.36)), color: C.preto, valign: 'top', margin: 0, fit: 'shrink' });
}
function tabela(s, x, y, w, cab, linhas, larg, { destacarUltima = false } = {}) {
  const rows = [cab.map(c => ({ text: c.toUpperCase(), options: { bold: true, color: C.branco, fill: { color: C.preto }, fontFace: ARI, fontSize: 12, align: 'left' } }))];
  linhas.forEach((l, i) => rows.push(l.map((c, j) => {
    const cel = typeof c === 'object' && c !== null ? c : { text: String(c) };
    return { text: cel.text, options: { fontFace: ARI, fontSize: 13, color: cel.cor || C.preto, bold: !!cel.bold, align: j === 0 ? 'left' : 'right',
      fill: { color: (destacarUltima && i === linhas.length - 1) ? C.negT : (i % 2 ? C.card : C.branco) } } };
  })));
  s.addTable(rows, { x, y, w, colW: larg, rowH: 0.38, border: { type: 'solid', color: C.borda, pt: 0.5 }, margin: [0.03, 0.08, 0.03, 0.08] });
}
async function imagem(url) {
  if (!url) return null;
  try { const r = await fetch(url, { signal: AbortSignal.timeout(15000) }); if (!r.ok) return null;
    const ct = r.headers.get('content-type') || 'image/jpeg'; if (!ct.startsWith('image/')) return null;
    return `data:${ct};base64,` + Buffer.from(await r.arrayBuffer()).toString('base64'); } catch { return null; }
}
// Estima o maior tamanho de fonte (entre max e min) em que o texto cabe na caixa. Arial ≈ 0,5 em de largura por caractere.
function fonte(texto, w, h, max = 14, min = 9) {
  const paras = String(texto || '').split('\n');
  for (let t = max; t >= min; t -= 1) {
    const cpl = Math.max(1, Math.floor(w / (t * 0.5 / 72)));
    const linhas = paras.reduce((a, p) => a + Math.max(1, Math.ceil(p.length / cpl)), 0);
    if (linhas * t * 1.25 / 72 <= h) return t;
  }
  return min;
}
const plataformaNome = { meta: 'Meta Ads', google_ads: 'Google Ads', tiktok: 'TikTok Ads', linkedin: 'LinkedIn Ads' };

// ======================= 1. CAPA (escuro) =======================
{
  const s = escuro([{ text: 'RELATÓRIO DE RESULTADOS', options: { breakLine: true } }, { text: `${cliente} · ${MES}`, options: { color: C.racing, fontSize: 30 } }], rotuloPeriodo);
}

// ======================= 2. SUMÁRIO (preenchido no fim) =======================
const slideSumario = pptx.addSlide(); slideSumario.background = { color: C.branco };

// ======================= ENTREGAS =======================
if (T.entregas && T.entregas.length) {
  const s = claro('Entregas do período', 'O que foi feito neste mês', 'Ações executadas na conta no período', 'entregas');
  const cats = ['Otimizações', 'Testes A/B', 'Campanhas', 'Estratégias', 'Entregas', 'Resultados'];
  const w = (CW - 0.4) / 3, h = 1.85;
  T.entregas.slice(0, 6).forEach((e, i) => {
    const x = MX + (i % 3) * (w + 0.2), y = 2.3 + Math.floor(i / 3) * (h + 0.15);
    card(s, x, y, w, h, { destaque: i === 0 });
    s.addText(String(i + 1).padStart(2, '0'), { x: x + 0.2, y: y + 0.08, w: 1, h: 0.4, fontFace: OSW, fontSize: 22, bold: true, color: C.verm, margin: 0 });
    s.addText((e.categoria || cats[i]).toUpperCase(), { x: x + 0.2, y: y + 0.5, w: w - 0.3, h: 0.28, fontFace: ARI, fontSize: 12, bold: true, color: C.preto, margin: 0 });
    s.addText(e.texto || '', { x: x + 0.2, y: y + 0.82, w: w - 0.3, h: h - 0.9, fontFace: ARI, fontSize: fonte(e.texto, w - 0.3, h - 0.9, 12), color: C.preto, valign: 'top', margin: 0, fit: 'shrink' });
  });
}

// ======================= META DO MÊS =======================
const mp = dados.meta_central && dados.meta_central.provavel;
const metaFat = mp && mp.faturamento;
if (metaFat && K.faturamento) {
  const ating = K.faturamento / metaFat * 100, dif = K.faturamento - metaFat;
  const s = claro('Meta do mês', `${num(ating, 0)}% da meta de faturamento ${dados.periodo.parcial ? 'até aqui' : 'no mês'}`, `Meta planejada (cenário provável) vs resultado do dash · ${rotuloPeriodo}`, 'meta');
  const w = (CW - 0.4) / 3;
  kpiCard(s, MX, 2.3, w, 1.5, 'Atingimento', pct(ating, 0), 'da meta de faturamento', { destaque: true });
  kpiCard(s, MX + w + 0.2, 2.3, w, 1.5, 'Meta planejada', brl(metaFat, 0), 'cenário provável na Central');
  kpiCard(s, MX + 2 * (w + 0.2), 2.3, w, 1.5, 'Resultado entregue', brl(K.faturamento, 0), (dif >= 0 ? '+ ' : '− ') + brl(Math.abs(dif), 0) + (dif >= 0 ? ' acima' : ' abaixo'));
  s.addShape(pptx.ShapeType.rect, { x: MX, y: 4.05, w: CW, h: 0.3, fill: { color: C.card }, line: { color: C.card, width: 0 } });
  s.addShape(pptx.ShapeType.rect, { x: MX, y: 4.05, w: CW * Math.min(ating, 100) / 100, h: 0.3, fill: { color: C.verm }, line: { color: C.verm, width: 0 } });
  s.addText(`${num(ating, 0)}% concluído`, { x: MX, y: 4.4, w: CW, h: 0.3, fontFace: ARI, fontSize: 12, color: C.cEsc, margin: 0 });
  bloco(s, MX, 4.85, CW, 1.2, 'Principal motivo do resultado', T.rotulo_motivo || 'FATO + INTERPRETAÇÃO', T.motivo_meta || '(preencher)');
}

// ======================= FUNIL DE MARKETING =======================
{
  const s = claro('Funil de marketing', ecom ? 'Do clique à venda no período' : 'Do impacto ao fechamento: onde o funil perde força', `${cliente} · ${rotuloPeriodo} · investimento de performance ${brl(K.investimento_performance)}`, 'funil');
  const w = (CW - 0.6) / 4;
  [['CPM', brl(K.cpm), 'custo por mil'], ['CTR', pct(K.ctr_pct, 2), 'taxa de clique'], ['CPC', brl(K.cpc), 'custo por clique'], [ecom ? 'ROAS' : 'CPL', ecom ? num(K.roas, 2) + 'x' : brl(K.cpl), ecom ? 'retorno sobre investimento' : 'custo por lead']]
    .forEach((c, i) => kpiCard(s, MX + i * (w + 0.2), 2.25, w, 1.2, c[0], c[1], c[2], { destaque: i === 3 }));
  const etapas = ecom
    ? [['Impressões', K.impressoes], ['Cliques', K.cliques], ['Sessões', K.sessoes_ga4], ['Add to cart', K.add_to_cart], ['Vendas', K.vendas]]
    : [['Impressões', K.impressoes], ['Cliques', K.cliques], ['Leads', K.leads], ['MQL', K.mql], ['SQL', K.sql], ['Vendas', K.vendas]];
  const cores = ['111111', '3A0A0A', '8A0000', 'C00000', 'A00000', '6B0000'];
  const bh = 0.4, gap = 0.08, y0 = 3.65, wmax = 7.4;
  etapas.forEach(([nome, v], i) => {
    const bw = wmax * (1 - i * (0.55 / (etapas.length - 1)));
    s.addShape(pptx.ShapeType.rect, { x: MX, y: y0 + i * (bh + gap), w: bw, h: bh, fill: { color: cores[i * (cores.length - 1) / (etapas.length - 1) | 0] }, line: { color: C.branco, width: 0 } });
    s.addText(`${nome.toUpperCase()}  ·  ${num(v)}`, { x: MX, y: y0 + i * (bh + gap), w: bw, h: bh, fontFace: ARI, fontSize: 13, bold: true, color: C.branco, align: 'center', valign: 'middle', margin: 0 });
    if (i > 0 && etapas[i - 1][1]) s.addText(pct(v / etapas[i - 1][1] * 100, 1), { x: MX + wmax + 0.15, y: y0 + i * (bh + gap), w: 1, h: bh, fontFace: ARI, fontSize: 12, color: C.cEsc, valign: 'middle', margin: 0 });
  });
  bloco(s, 9.2, 3.65, W - MX - 9.2, 2.4, 'Principais aprendizados', 'FATO + INTERPRETAÇÃO', T.aprendizados_funil || '(preencher)');
}

// ======================= FUNIL PROJETADO VS REAL =======================
if (mp) {
  const mapa = ecom
    ? [['Investimento', 'investimento', K.investimento_performance, 'brl'], ['Cliques', 'cliques', K.cliques, 'n'], ['Sessões', 'sessoes', K.sessoes_ga4, 'n'], ['Vendas', 'vendas', K.vendas, 'n'], ['Faturamento', 'faturamento', K.faturamento, 'brl'], ['ROAS', 'roas', K.roas, 'x']]
    : [['Investimento', 'investimento', K.investimento_performance, 'brl'], ['Leads', 'total_leads', K.leads, 'n'], ['MQL', 'n_mqls', K.mql, 'n'], ['SQL', 'n_sqls', K.sql, 'n'], ['Vendas vendas', 'vendas', K.vendas, 'n'], ['Faturamento', 'faturamento', K.faturamento, 'brl'], ['ROAS', 'roas', K.roas, 'x']];
  const fmt = (v, t) => (t === 'brl' ? brl(v, 0) : t === 'x' ? num(v, 2) + 'x' : num(v));
  const linhas = mapa.filter(m => mp[m[1]] != null).map(m => {
    const proj = mp[m[1]], real = m[2], d = proj ? (real - proj) / proj * 100 : null;
    const bom = m[1] === 'investimento' ? null : d > 0;
    return [m[0].replace('Vendas vendas', 'Vendas'), fmt(proj, m[3]), fmt(real, m[3]), { text: d == null ? 'n/d' : (d > 0 ? '▲ ' : '▼ ') + pct(Math.abs(d)), cor: d == null || bom == null ? C.preto : bom ? C.pos : C.neg, bold: true }];
  });
  if (linhas.length) {
    const s = claro('Projetado vs real', 'Funil projetado (cenário provável) contra o realizado', 'Projeção da Central; realizado do dash no mesmo período', 'projetado');
    tabela(s, MX, 2.3, 8.2, ['Etapa', 'Projetado', 'Real', 'Variação'], linhas, [2.6, 1.9, 1.9, 1.8]);
    bloco(s, 9.1, 2.3, W - MX - 9.1, 3.7, 'Insights estratégicos', 'INTERPRETAÇÃO', T.insights_funil || '(preencher)');
  }
}

// ======================= EVOLUÇÃO MÊS A MÊS =======================
{
  const s = claro('Evolução mês a mês', 'Comparação com o período anterior', `${dBR(dados.periodo.de)} a ${dBR(dados.periodo.ate)} vs ${dBR(dados.periodo_anterior.de)} a ${dBR(dados.periodo_anterior.ate)}`, 'mom');
  const w = (CW - 0.6) / 4;
  const itens = ecom
    ? [['Investimento', brl(K.investimento_performance, 0), 'investimento_performance', true, brl(KP && KP.investimento_performance, 0)], ['Vendas', num(K.vendas), 'vendas', false, num(KP && KP.vendas)], ['Faturamento', brl(K.faturamento, 0), 'faturamento', false, brl(KP && KP.faturamento, 0)], ['ROAS', num(K.roas, 2) + 'x', 'roas', false, num(KP && KP.roas, 2) + 'x']]
    : [['Investimento', brl(K.investimento_performance, 0), 'investimento_performance', true, brl(KP && KP.investimento_performance, 0)], ['Leads', num(K.leads), 'leads', false, num(KP && KP.leads)], ['SQL', num(K.sql), 'sql', false, num(KP && KP.sql)], ['Vendas', num(K.vendas), 'vendas', false, num(KP && KP.vendas)]];
  itens.forEach((it, i) => {
    const x = MX + i * (w + 0.2);
    const v = varTxt(V[it[2]], false);
    if (it[2] === 'investimento_performance') v.estado = 'neutro';
    kpiCard(s, x, 2.3, w, 1.55, it[0], it[1], (V[it[2]] == null && /^(R\$ )?0([,.]0+)?x?$/.test(it[4]) ? 'anterior: sem registro' : 'anterior: ' + it[4]), { destaque: i === 3 });
    badgeShape(s, x + w - 1.4, 3.37, v);
  });
  bloco(s, MX, 4.2, CW, 1.85, 'Principais movimentos do período', 'FATO + INTERPRETAÇÃO', T.movimentos_mom || '(preencher)');
}

// ======================= META ADS / GOOGLE ADS =======================
for (const [chave, nome, secNum] of [['meta', 'Meta Ads'], ['google_ads', 'Google Ads']]) {
  const p = dados.plataformas && dados.plataformas[chave];
  if (!p || !(p.spend > 0)) continue;
  const camps = dados.campanhas.filter(c => c.plataforma === chave && c.gasto > 0).slice(0, 5);
  const s = claro(nome, `${nome}: ${brl(p.spend, 0)} investidos no período`, `${num(p.impressions)} impressões · ${num(p.clicks)} cliques · ${p.trackedLeads ? num(p.trackedLeads) + ' conversões rastreadas' : 'sem conversões rastreadas'}`, chave);
  const w = (CW - 0.6) / 4;
  [['Investimento', brl(p.spend, 0), 'no período'], ['CPM', brl(p.impressions ? p.spend / p.impressions * 1000 : null), 'custo por mil'], ['CTR', pct(p.impressions ? p.clicks / p.impressions * 100 : null, 2), 'taxa de clique'], ['CPC', brl(p.clicks ? p.spend / p.clicks : null), 'custo por clique']]
    .forEach((c, i) => kpiCard(s, MX + i * (w + 0.2), 2.25, w, 1.15, c[0], c[1], c[2], { destaque: i === 0 }));
  if (camps.length) tabela(s, MX, 3.6, 8.3, ['Campanha', 'Gasto', 'Cliques', 'Conv.', 'Custo/conv.'],
    camps.map(c => [(c.nome || '').slice(0, 42), brl(c.gasto, 0), num(c.cliques), num(c.leads_rastreados), c.custo_por_lead ? brl(c.custo_por_lead) : 'n/d']), [3.7, 1.15, 1.1, 1.05, 1.3]);
  bloco(s, 9.1, 3.6, W - MX - 9.1, 2.45, 'Aprendizados', 'FATO + HIPÓTESE', (T.aprendizados_plataforma && T.aprendizados_plataforma[chave]) || '(preencher)');
}

// ======================= CRIATIVOS CAMPEÕES =======================
{
  const totalAds = (dados.anuncios || []).reduce((t, a) => t + (a.gasto || 0), 0);
  const minGasto = Math.max(50, totalAds * 0.02);
  let pool = (dados.anuncios || []).filter(a => a.resultados >= 3 && a.gasto >= minGasto);
  if (pool.length < 3) pool = (dados.anuncios || []).filter(a => a.resultados > 0 && a.gasto >= minGasto);
  const cand = pool.sort((a, b) => (a.custo_por_resultado || 1e9) - (b.custo_por_resultado || 1e9)).slice(0, 3);
  if (cand.length) {
    const s = claro('Criativos campeões', 'Os três anúncios com melhor custo por resultado', 'Anúncios com impressão no período · critério: menor custo por resultado, investimento mínimo de ' + brl(minGasto, 0), 'criativos');
    const w = (CW - 0.4) / 3;
    for (let i = 0; i < cand.length; i++) {
      const a = cand[i], x = MX + i * (w + 0.2), y = 2.25, h = 3.0;
      card(s, x, y, w, h, { destaque: i === 0 });
      s.addText(String(i + 1).padStart(2, '0'), { x: x + 0.2, y: y + 0.06, w: 0.8, h: 0.4, fontFace: OSW, fontSize: 22, bold: true, color: C.verm, margin: 0 });
      s.addText(a.nome || 'Anúncio', { x: x + 0.9, y: y + 0.08, w: w - 1.0, h: 0.3, fontFace: ARI, fontSize: 12, bold: true, color: C.preto, margin: 0, fit: 'shrink' });
      s.addText(`${(a.formato || '').toUpperCase()} · ${plataformaNome[a.plataforma] || a.plataforma}`, { x: x + 0.9, y: y + 0.38, w: w - 1.0, h: 0.25, fontFace: ARI, fontSize: 10, color: C.cEsc, margin: 0 });
      const img = await imagem(a.miniatura);
      if (img) s.addImage({ data: img, x: x + 0.2, y: y + 0.75, w: 1.45, h: 1.45, sizing: { type: 'contain', w: 1.45, h: 1.45 } });
      else s.addText('SEM MINIATURA', { x: x + 0.2, y: y + 0.75, w: 1.45, h: 1.45, fontFace: ARI, fontSize: 10, color: C.cMed, align: 'center', valign: 'middle', fill: { color: C.borda } });
      const m = [['Investimento', brl(a.gasto, 0)], ['CTR', pct(a.ctr_pct, 2)], ['CPC', brl(a.cpc)], ['Resultados', num(a.resultados)], ['Custo/result.', brl(a.custo_por_resultado)]];
      m.forEach((r, j) => { s.addText(r[0].toUpperCase(), { x: x + 1.8, y: y + 0.72 + j * 0.3, w: 1.0, h: 0.28, fontFace: ARI, fontSize: 9, color: C.cEsc, margin: 0 });
        s.addText(r[1], { x: x + 2.7, y: y + 0.72 + j * 0.3, w: w - 2.8, h: 0.28, fontFace: ARI, fontSize: 12, bold: true, color: C.preto, align: 'right', margin: 0 }); });
      s.addText(a.campanha || '', { x: x + 0.2, y: y + 2.4, w: w - 0.3, h: 0.5, fontFace: ARI, fontSize: 10, color: C.cEsc, valign: 'top', margin: 0, fit: 'shrink' });
    }
    bloco(s, MX, 5.35, CW, 0.8, 'Por que esses criativos venceram', 'HIPÓTESE', T.por_que_criativos || '(preencher)');
  }
}

// ======================= REDES SOCIAIS (só com dado informado) =======================
if (T.organico && T.organico.kpis && T.organico.kpis.length) {
  const s = claro('Redes sociais', 'Performance orgânica do período', T.organico.fonte ? 'Fonte: ' + T.organico.fonte : '', 'organico');
  const w = (CW - 0.6) / 4;
  T.organico.kpis.slice(0, 4).forEach((k, i) => kpiCard(s, MX + i * (w + 0.2), 2.3, w, 1.4, k.rotulo, k.valor, k.sub || '', { destaque: i === 0 }));
  bloco(s, MX, 4.0, CW, 2.0, 'Padrões identificados', 'INTERPRETAÇÃO', T.organico.padroes || '(preencher)');
}

// ======================= PLANO DE AÇÃO =======================
if (T.plano) {
  const s = claro('Plano de ação', 'Como vamos crescer no próximo ciclo', 'Escalar o que funciona, corrigir o que custa caro, testar o que ainda não sabemos', 'plano');
  const w = (CW - 0.6) / 3, lst = a => (a || []).map(t => '• ' + t).join('\n');
  [['Escalar', 'O que funcionou e deve ser ampliado', T.plano.escalar], ['Corrigir', 'O que precisa de ajuste imediato', T.plano.corrigir], ['Testar', 'Novas hipóteses a validar', T.plano.testar]].forEach((c, i) => {
    const x = MX + i * (w + 0.3);
    card(s, x, 2.3, w, 2.55, { destaque: i === 1 });
    s.addText(c[0].toUpperCase(), { x: x + 0.2, y: 2.38, w: w - 0.3, h: 0.35, fontFace: OSW, fontSize: 18, bold: true, color: C.verm, margin: 0 });
    s.addText(c[1], { x: x + 0.2, y: 2.75, w: w - 0.3, h: 0.28, fontFace: ARI, fontSize: 11, color: C.cEsc, margin: 0 });
    s.addText(lst(c[2]) || '(preencher)', { x: x + 0.2, y: 3.08, w: w - 0.35, h: 1.7, fontFace: ARI, fontSize: fonte(lst(c[2]), w - 0.35, 1.7, 13), color: C.preto, valign: 'top', margin: 0, fit: 'shrink' });
  });
  bloco(s, MX, 5.0, CW, 1.05, 'Prioridade máxima', 'RECOMENDAÇÃO', T.plano.prioridade || '(preencher)');
}

// ======================= PENDÊNCIAS =======================
if (T.pendencias && T.pendencias.length) {
  const s = claro('Pendências', 'O que precisamos de você para acelerar', 'Itens que destravam o próximo ciclo', 'pendencias');
  tabela(s, MX, 2.3, 8.2, ['Item', 'Prazo solicitado', 'Status'], T.pendencias.slice(0, 7).map(p => [p.item, p.prazo, { text: (p.status || 'PENDENTE').toUpperCase(), bold: true, cor: /aprov|conclu|ok/i.test(p.status || '') ? C.pos : C.aten }]), [4.4, 2.0, 1.8]);
  bloco(s, 9.1, 2.3, W - MX - 9.1, 3.2, 'Impacto', 'RECOMENDAÇÃO', T.impacto_pendencias || '(preencher)');
}

// ======================= ENCERRAMENTO (escuro) =======================
escuro([{ text: '"Resultados consistentes são consequência de estratégia, execução e otimização contínua."', options: { fontSize: 30, breakLine: true } }, { text: 'OBRIGADO', options: { color: C.racing, fontSize: 44 } }]);

// ======================= sumário =======================
{
  const s = slideSumario;
  s.addText('V4 Carvalho & Co', { x: W - MX - 3, y: 0.2, w: 3, h: 0.3, fontFace: OSW, fontSize: 10, bold: true, color: C.preto, align: 'right', margin: 0 });
  s.addText('SUMÁRIO', { x: MX, y: 0.3, w: 9, h: 0.4, fontFace: OSW, fontSize: 14, bold: true, color: C.verm, margin: 0 });
  s.addShape(pptx.ShapeType.line, { x: MX, y: 0.78, w: CW, h: 0, line: { color: C.verm, width: 2 } });
  s.addText('O QUE VAMOS APRESENTAR HOJE', { x: MX, y: 0.9, w: CW, h: 0.6, fontFace: OSW, fontSize: 22, bold: true, color: C.preto, margin: 0 });
  sumario.forEach((n, i) => {
    const col = i < 6 ? 0 : 1, lin = i % 6;
    const x = MX + col * 6.2, y = 1.9 + lin * 0.72;
    s.addText(String(i + 1).padStart(2, '0'), { x, y, w: 0.8, h: 0.5, fontFace: OSW, fontSize: 24, bold: true, color: C.verm, margin: 0, valign: 'middle' });
    s.addText(n, { x: x + 0.9, y, w: 5, h: 0.5, fontFace: ARI, fontSize: 16, color: C.preto, margin: 0, valign: 'middle' });
  });
}

await pptx.writeFile({ fileName: saida });
const pend = []; // campos de texto não fornecidos
['motivo_meta', 'aprendizados_funil', 'insights_funil', 'movimentos_mom', 'por_que_criativos'].forEach(k => { if (!T[k]) pend.push(k); });
console.log(JSON.stringify({ arquivo: saida, slides: secao + 3, secoes: sumario, textos_nao_fornecidos: pend, avisos_dos_dados: dados.avisos }, null, 1));
