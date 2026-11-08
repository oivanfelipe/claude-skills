---
name: ads-performance-diagnostics
description: Use when the user wants to diagnose a drop or anomaly in Google Ads or Meta Ads (Facebook/Instagram) account performance — lost conversions, falling lead flow, lost impression share, or "why did my results drop". Triggers include "por que minhas conversões caíram", "queda no fluxo de leads", "perdi impression share", "diagnóstico de conta do Google Ads", "diagnóstico de conta do Meta Ads", "análise de performance de Google Ads", "análise de performance de Meta Ads", "auditoria de campanha", "o que mudou na conta". Adapted from Google's official account-performance-diagnostics skill (googleads/google-ads-mcp), rebuilt to run against data already connected via the Windsor.ai MCP connector instead of the raw Google Ads API — no developer token or OAuth setup needed. For campaign strategy/targeting/bidding recommendations (not diagnosis), see the ads skill. For funnel-wide bottleneck analysis across channels with financial projection, see argus.
metadata:
  version: 1.0.0
  source: personal
  adapted_from: googleads/google-ads-mcp@account-performance-diagnostics
---

# Ads Performance Diagnostics

Diagnostica quedas e anomalias de performance em contas de **Google Ads** e **Meta Ads (Facebook/Instagram)** usando os dados já conectados via **Windsor.ai** (`mcp__Windsor_ai__get_fields` / `get_data`). Não precisa de developer token nem de OAuth do Google Ads API — os dados já estão disponíveis pelos conectores `google_ads` e `facebook`.

## Antes de começar

1. **Confirme a conta**: chame `mcp__Windsor_ai__get_connectors` (accounts do conector `google_ads` e/ou `facebook`) e confirme com o usuário qual conta (nome ou ID) e qual período comparar (ex: últimos 7 dias vs. 7 dias anteriores).
2. **Nunca invente nomes de campo.** Antes de qualquer `get_data`, rode `mcp__Windsor_ai__get_fields` (com filtro por palavra-chave, para não estourar contexto) para confirmar o `id` exato do campo. Os IDs abaixo já foram validados, mas contas específicas podem ter campos extras (ex: ações de conversão customizadas no Meta).
3. **Sempre compare dois períodos** (o período do problema vs. um período de baseline saudável), não olhe o número isolado.

---

## Google Ads

### Workflow 1 — Perda de conversão / valor de conversão

Quando conversões ou valor de conversão caem de repente:

1. **Query de performance** — `get_data(connector="google_ads", fields=["campaign", "date", "conversions", "conversions_value", "cost", "clicks", "impressions"], date_from=..., date_to=...)`
2. **Isole a causa** rodando a mesma query segmentada por `device` — compare mobile vs. desktop vs. tablet.
3. **Segmente por ação de conversão** — adicione `conversion_action_name` aos fields para ver se a queda é geral ou concentrada numa ação específica (ex: só formulário de lead, não ligação).
4. **Compare períodos**: rode a mesma query para o período de baseline (ex: 30 dias antes) e para o período do problema, e calcule a variação percentual campanha a campanha.

### Workflow 2 — Oportunidades perdidas (impression share)

Para saber se a conta está perdendo alcance por budget ou por rank/qualidade:

1. `get_data(connector="google_ads", fields=["campaign", "date", "search_impression_share", "search_budget_lost_impression_share", "search_rank_lost_impression_share"], ...)`
2. **Leitura**:
   - `search_budget_lost_impression_share` alto → orçamento baixo demais, a campanha para de veicular antes do fim do dia.
   - `search_rank_lost_impression_share` alto → problema de lance ou de Quality Score / relevância do anúncio, não de verba.
3. Para Display, use os campos equivalentes `content_budget_lost_impression_share` e `content_rank_lost_impression_share`.

### Workflow 3 — Queda no fluxo de leads

Quando o cliente pergunta "por que meus leads caíram essa semana":

1. **Confirme a queda**: `conversions` segmentado por `date`, período recente vs. anterior.
2. **Isole a causa**:
   - Tráfego caiu (`clicks`, `impressions` menores)? → vá para o Workflow 2 (impression share) pra saber se é budget ou rank.
   - Taxa de conversão caiu (`conversion_rate` menor, tráfego estável)? → segmente por `device` e `conversion_action_name` pra achar onde está o vazamento.
3. **Cheque mudanças recentes na conta** — campos `change_event_change_date_time`, `change_event_changed_fields`, `change_event_change_resource_type`, `change_event_old_resource`, `change_event_new_resource`. Cruze a data das mudanças com a data em que a queda começou — é o jeito mais rápido de achar "alguém mexeu no lance/orçamento/segmentação e esqueceu de avisar".

### Campos de referência (Google Ads / conector `google_ads`)

| Métrica | Campo Windsor |
|---|---|
| Conversões | `conversions` |
| Valor de conversão | `conversions_value` |
| Custo | `cost` |
| CPA | `cost_per_conversion` |
| ROAS | `roas` |
| Taxa de conversão | `conversion_rate` |
| CTR | `ctr` |
| Impression share (Search) | `search_impression_share` |
| IS perdido por budget (Search) | `search_budget_lost_impression_share` |
| IS perdido por rank (Search) | `search_rank_lost_impression_share` |
| IS perdido por budget (Display) | `content_budget_lost_impression_share` |
| IS perdido por rank (Display) | `content_rank_lost_impression_share` |
| Segmento de dispositivo | `device` |
| Ação de conversão | `conversion_action_name` |
| Log de mudanças na conta | `change_event_*` |

---

## Meta Ads (Facebook/Instagram)

A mesma lógica de diagnóstico se aplica, com duas diferenças importantes do conector `facebook` no Windsor.ai:

- **Não existe um campo único `conversions`.** As conversões vêm como campos por tipo de ação: `action_<evento>` (contagem) e `action_values_<evento>` (valor), ex: `action_purchase`, `action_values_purchase`, `action_lead`, `action_values_offline_conversion_lead`. **Sempre rode `get_fields(connector="facebook", fields=[...])` com o nome do evento que a conta usa como conversão principal antes de montar a query** — não assuma o nome do evento.
- **Não existe impression share.** O equivalente pra "perda de alcance" no Meta é olhar `frequency` (saturação de audiência) e `reach` junto com `cpm`/`cpc` subindo — não é a mesma mecânica de leilão do Google, então não force o paralelo 1:1.

### Workflow 1 — Perda de conversão / valor de conversão

1. Descubra o campo de conversão certo: `get_fields(connector="facebook", fields=["action_purchase","action_lead","action_values_purchase"])` ou busque por palavra-chave do evento que o cliente usa.
2. `get_data(connector="facebook", fields=["campaign","adset_name","date","<action_field>","spend","clicks","impressions"], ...)`
3. Segmente por `device_platform` e `publisher_platform` (Facebook vs. Instagram vs. Audience Network) pra isolar onde a queda está concentrada.
4. Compare período do problema vs. baseline, campanha a campanha.

### Workflow 2 — Saturação / perda de eficiência

1. `get_data(connector="facebook", fields=["campaign","date","frequency","reach","cpm","ctr"], ...)`
2. **Leitura**: `frequency` subindo com `ctr` caindo e `cpm` subindo = audiência saturada (fadiga de criativo/público pequeno demais) — não é problema de orçamento, é problema de audiência/criativo.

### Workflow 3 — Queda no fluxo de leads

1. Confirme a queda no campo de conversão certo (Workflow 1), segmentado por `date`.
2. Tráfego caiu (`clicks`/`impressions` menores)? → cheque `frequency`/saturação (Workflow 2) e se o orçamento (`spend`) caiu junto — indica que a campanha parou de gastar (budget esgotado cedo, ou desativada/pausada).
3. Taxa de conversão caiu com tráfego estável? → segmente por `adset_name` e `publisher_platform` pra achar o público/posicionamento específico que piorou.

### Campos de referência (Meta Ads / conector `facebook`)

| Métrica | Campo Windsor |
|---|---|
| Gasto | `spend` |
| CTR | `ctr` |
| CPC | `cpc` |
| CPM | `cpm` |
| Frequência | `frequency` |
| Alcance | `reach` |
| Conversão (por evento) | `action_<evento>` — descobrir via `get_fields` |
| Valor de conversão (por evento) | `action_values_<evento>` — descobrir via `get_fields` |
| Segmento de dispositivo | `device_platform` |
| Plataforma (FB/IG/AN) | `publisher_platform` |
| Nome do ad set | `adset_name` |
| Nome do anúncio | `ad_name` |

---

## Formato do output

Ao final do diagnóstico, entregue:

1. **O que caiu, quanto e desde quando** (número, não achismo).
2. **Causa raiz isolada** (budget, rank/qualidade, saturação de audiência, mudança manual na conta, ou tráfego geral em queda).
3. **Evidência** — a query e os valores que sustentam a conclusão.
4. **Recomendação de ação** — se a recomendação for de estratégia/otimização (novo lance, novo orçamento, novo criativo), sinalize que a skill `ads` complementa esse diagnóstico com o plano de ação.

## Related Skills

- **ads**: estratégia, targeting e otimização de campanha (o que fazer depois do diagnóstico).
- **argus**: auditoria de funil completo com Teoria das Restrições, benchmark e projeção financeira — use quando o problema não está isolado numa conta de mídia, mas no funil inteiro.
- **ad-creative**: geração de variações de criativo, útil quando o diagnóstico aponta fadiga de criativo/audiência.
