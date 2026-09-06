# Contexto de Mídia Paga — V4 Company Carvalho & Co.

## Instruções para o agente

Quando o usuário pedir análise de campanha, auditoria de ads ou qualquer análise de mídia paga:
1. **Sempre puxe dados reais** via Windsor AI (`get_data`) ou Meta Ads MCP antes de qualquer recomendação
2. **Nunca generalize** — use os dados das contas listadas abaixo
3. Se o usuário não especificar a conta, pergunte qual cliente quer analisar e use o ID correspondente

---

## Contas Meta Ads conectadas (Windsor AI — connector: facebook)

| Cliente | Account ID |
|---------|-----------|
| Softrack | 307441140966582 |
| CA - AESA - PRINCIPAL | 888863666390399 |
| Taskr Robotics 01 | 1186083589547366 |
| MF AA Brazil MHBR | 377840329897179 |
| V4 - BRASFORNOS | 992863612918386 |
| Drogalis | 453488838703034 |
| GSC | 550478542209689 |
| [V4][TB RIO][PRÉ-PAGO] | 1320917989044629 |
| Miyamura Ads - Cartao | 1874021376418735 |
| Elevance Automotive | 1085486980117278 |
| TRUFER - V4 | 1176424721137025 |
| Touch Of Synergy | 1295356131333282 |
| Official Time | 1115317519717501 |
| Clube da casa V4c | 2401312234024546 |
| Ca - Alice Salazar - B2B | 2029048025153061 |
| Pointthermic | 835382558026652 |
| Miyamura Ads - Pix | 628093882236749 |
| Argiplam V4c | 1358215687366480 |
| CTA MEGA 100 | 1051821444101775 |

## Contas Google Ads conectadas (Windsor AI — connector: google_ads)

| Cliente | Account ID |
|---------|-----------|
| Perfumaria Sumirê | 196-207-6476 |
| MasterMed Contas Médicas | 243-840-1386 |
| GSC - 2024 (Immersion) | 413-460-1861 |
| AESA Empilhadeiras | 402-236-0796 |
| Agibem | 140-969-4062 |
| V4 - BRASFORNOS | 655-341-1207 |
| Centauro Gráfica | 458-140-8507 |
| Clivasf - Google Ads | 993-044-1154 |
| Ozaki Engenharia | 641-731-0772 |
| Point Thermic | 761-300-6526 |
| RGC | 985-208-2425 |
| Hawks Repair | 520-920-4548 |
| In Marcas | 803-347-7323 |
| Softrack | 445-915-6021 |
| Armazém Tio João | 392-208-7193 |
| V4 - LIS MAGAZINE | 621-539-2121 |
| Miyamura | 445-939-5090 |
| V4 - CRISTAL SELECT (SUL BR) | 300-205-0337 |
| SPX Bank | 404-281-2772 |
| Super Carros | 584-190-7511 |
| Taskr Robotics | 941-165-7474 |
| TB Rio Elevadores | 136-542-4333 |
| WIS | 687-544-2878 |
| Official Time | 295-315-8507 |
| Clube da Casa Tintas e Ferramentas | 292-511-5546 |
| Alice Salazar B2B | 226-180-6844 |
| Elevance Automotive | 415-068-8572 |
| Touch of Synergy | 941-565-9347 |
| Trufer | 772-974-7999 |
| VS MED CIRURGICOS | 268-224-5856 |

---

## Protocolo de análise de campanhas

### Para Meta Ads
- Connector Windsor AI: `facebook`
- Métricas padrão a puxar: `spend, impressions, reach, clicks, ctr, cpc, cpm, roas, purchases, cost_per_purchase, frequency`
- Dimensões padrão: `campaign_name, adset_name, ad_name`
- Janela de atribuição padrão: últimos 30 dias (ou conforme solicitado)
- Também disponível: Meta Ads MCP direto (ferramentas `mcp__Meta_Ads__*`)

### Para Google Ads
- Connector Windsor AI: `google_ads`
- Métricas padrão: `cost, impressions, clicks, ctr, cpc, conversions, cost_per_conversion, roas, search_impression_share`
- Dimensões padrão: `campaign_name, ad_group_name`
- Janela padrão: últimos 30 dias

### Hierarquia de assertividade
1. **Dados reais** (Windsor AI ou Meta MCP) → diagnóstico baseado em fato
2. **Benchmarks de mercado** → contexto do setor
3. **Recomendação** → ação específica com projeção de impacto

Nunca emita recomendação sem primeiro puxar os dados reais da conta.
