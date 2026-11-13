# Seção do deck → campos do pacote de `dados_relatorio`

| Seção | Campos usados | Observação |
|---|---|---|
| Meta do mês | `meta_central.provavel.faturamento`, `kpis.faturamento` | Atingimento = dash ÷ meta provável. Omitida sem meta ou sem faturamento. |
| Funil de marketing | `kpis` (cpm, ctr_pct, cpc, cpl, impressoes, cliques, leads, mql, sql, vendas, roas) | Inside sales: funil até venda. E-commerce: cliques → sessões → carrinho → vendas. |
| Projetado vs real | `meta_central.provavel` × `kpis` | Só linhas que existem na meta. |
| Evolução mês a mês | `kpis`, `kpis_anterior`, `variacao_pct` | Anterior sem registro aparece como "sem base". |
| Meta Ads / Google Ads | `plataformas.<meta\|google_ads>`, `campanhas` | Omitida se a plataforma não gastou. |
| Criativos campeões | `anuncios` | Top 3 por custo/resultado, com mínimo de 3 resultados e 2% do gasto em anúncios. Miniatura baixada na geração. |
| Entregas, Plano, Pendências, Redes sociais | `textos.json` | Humano/Claude. |

## Campos do pacote
`cliente`, `periodo` (de, ate, parcial, mes), `periodo_anterior`, `ultima_sincronizacao`, `kpis`, `kpis_anterior`, `variacao_pct`, `meta_central` (provavel/otimista/pessimista/realizado), `metas_dash`, `canais_funil`, `plataformas`, `campanhas`, `anuncios`, `leads_resumo` (sem dados pessoais), `serie_diaria`, `site` (GA4/Clarity resumidos), `ultimo_relatorio_fca`, `estrategia`, `avisos`.

## Definições
- **Investimento de performance:** inside sales = soma de `spendPerformance` das plataformas; e-commerce = campanhas do segmento e-commerce sem "reconhecimento". Já inclui o filtro.
- **ROAS** = faturamento ÷ investimento de performance.
- **Faturamento/vendas:** inside sales = planilha do cliente (funil); e-commerce = loja conectada, senão plataformas.
