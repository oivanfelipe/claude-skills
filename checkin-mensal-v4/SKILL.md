---
name: checkin-mensal-v4
version: 1.0.0
description: Monta o check-in / relatório mensal de resultados de um cliente da V4 (Squad FALCON) em PPTX na identidade visual da V4, com dados reais coletados ao vivo do dash de tráfego e da Central. Ativadores — "check-in mensal", "checkin do cliente", "relatório de resultados", "relatório mensal do cliente", "montar o check-in da Alice", "apresentação de resultados do mês", "relatório para o cliente", "dados do relatório", "dados_relatorio", "relatório FCA mensal".
---

# Check-in mensal V4

Gera o deck de check-in mensal (modelo "[MODELO] Check in mensal") em **PPTX novo, na identidade visual V4** (fundo branco, Oswald + Arial, vermelho `#C00000` só como acento; escuro só em capa e encerramento). Os números vêm do dash e da Central; o texto analítico é escrito por você a partir dos números.

Antes de escrever qualquer texto ou slide, carregue a skill `identidade-visual-v4`.

## Fluxo (siga nesta ordem)

1. **Coletar os dados.** Chame a ferramenta MCP `dados_relatorio` (servidor `v4-dados` para a equipe, via `mcp-remoto/`; ou `n8n-ops` para quem administra a VPS, via `mcp/`).
   - `cliente`: parte do nome basta ("alice", "official time").
   - `mes`: `AAAA-MM`. Sem `mes`, usa o mês atual até hoje (relatório **parcial**). Para um check-in de mês fechado, passe o mês anterior.
   - `from`/`to` (e `prev_from`/`prev_to`) só para período customizado.
   - Salve o JSON devolvido em um arquivo (ex.: `pacote.json`).
2. **Ler os avisos.** O campo `avisos` diz o que está faltando ou divergente (GA4 sem vínculo, funil zerado, anterior sem registro, divergência dash × Central, sincronização velha). Trate cada aviso: omita o bloco, rotule ou **avise o usuário** antes de apresentar ao cliente. Nunca preencha lacuna com número inventado.
3. **Escrever os textos** em `textos.json` (modelo em `assets/exemplo-textos.json`). Siga `references/redacao.md`.
4. **Gerar o PPTX:**
   ```bash
   cd /Users/macos/.agents/skills/checkin-mensal-v4/scripts && npm install   # só na primeira vez
   node gerar-checkin.mjs --dados pacote.json --textos textos.json --saida "Check-in <Cliente> <mes>.pptx"
   ```
5. **Revisar** com o checklist de `identidade-visual-v4` e conferir acentuação, "(preencher)" restante e números contra o pacote.
6. Entregar o arquivo e listar: seções incluídas/omitidas, avisos de dados e o que o usuário precisa preencher (entregas, pendências, redes sociais).

## Seções do deck

Capa · Sumário · Entregas do período* · Meta do mês† · Funil de marketing · Projetado vs real† · Evolução mês a mês · Meta Ads · Google Ads · Criativos campeões · Redes sociais* · Plano de ação* · Pendências* · Encerramento.

\* só aparece se você enviar o bloco correspondente em `textos.json`. † só aparece se houver meta na Central. Plataformas sem investimento e criativos sem resultado são omitidos automaticamente.

Mapa completo seção → campos do pacote: `references/mapeamento.md`.

## Regras que não podem quebrar

- **Fato ≠ hipótese.** Rotule. Número só entra se estiver no pacote; cálculo derivado deve ser reproduzível.
- **Dash vence a Central** para faturamento/funil realizado. A meta (projetado) vem da Central. Se divergirem, avise.
- **Parcial é parcial.** Período até hoje é "resultado parcial"; não compare parcial com mês cheio sem dizer.
- **Zero no dash = sem dado**, não "zero resultado". Use o aviso, não a taxa.
- **Dados pessoais:** o pacote não traz nome, telefone ou e-mail de leads. Não os reintroduza.
- **Redes sociais e orgânico:** o dash não fornece. Só inclua com dado informado pelo usuário e a fonte.
- Cada slide de conteúdo termina com **conclusão estratégica**; o gerador cria uma factual quando você não envia, mas prefira a sua.

## Arquivos

- `scripts/gerar-checkin.mjs` — gerador do PPTX (pptxgenjs).
- `assets/exemplo-textos.json` — formato dos textos.
- `references/mapeamento.md` · `references/redacao.md`.
- `mcp/` — servidor MCP do n8n (`dados_relatorio` e ferramentas de leitura/escrita do n8n) e os workflows em `mcp/n8n/`. Conexão: `mcp/README.md`.
- Fonte Oswald: se o deck for editado em máquina sem a fonte, o PowerPoint substitui por serifada. Instale Oswald ou troque por Arial Black.
