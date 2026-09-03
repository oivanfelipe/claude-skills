# claude-skills

Fonte oficial das skills globais instaladas via [`skills` CLI](https://skills.sh) (`npx skills add <pacote> -g`).

Esta pasta é a localização real usada pelo CLI (`~/.agents/skills/`). O Claude Code enxerga cada skill através de um symlink automático em `~/.claude/skills/<nome>` — não edite os symlinks, edite/reinstale a partir daqui.

## Skills instaladas

- **agent-browser** ([vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser)) — automação de navegador para agentes.
- **deploy-to-vercel** — deploy de apps/sites para a Vercel.
- **find-skills** — descoberta de novas skills.
- **seo-audit** — auditoria técnica de SEO.
- **cli-chat, cli-cost-usage, cli-health, cli-models, cli-providers** ([diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)) — subconjunto de uso básico do CLI da OmniRoute (chat, custos, saúde do servidor, catálogo de modelos, conexões de provedor). Não inclui túneis, webhooks, backup/sync na nuvem ou gerenciamento de chaves — essas partes do pacote ficaram de fora de propósito por exporem serviços/credenciais.
- **19 skills do claude-mem** ([thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)) — memória persistente entre sessões e produtividade (`mem-search`, `make-plan`, `do`, `standup`, `learn-codebase`, `pathfinder`, `timeline-report`, `weekly-digests`, `knowledge-agent`, `mode-creator`, `babysit`, `design-is`, `how-it-works`, `oh-my-issues`, `smart-explore`, `version-bump`, `what-the`, `wowerpoint`, `cloud-sync`). Atenção: `cloud-sync` sincroniza sua base de memórias com a conta cmem.ai — revise antes de ativar.
- **claude-code-setup** — instalado como plugin (não skill) via `claude plugin install claude-code-setup@claude-plugins-official`, do marketplace oficial da Anthropic. Não faz parte desta pasta/repo; gerenciado pelo próprio `claude plugin`.
- **planejamento-estrategico** — skill própria (autoria do usuário), metodologia completa de planejamento estratégico de marketing: diagnóstico de maturidade digital, objetivo, personas, canais, quatro pilares (aquisição/engajamento/monetização/retenção), execução, mensuração, projeção e apresentação HTML no padrão visual V4.
- **frontend-design** ([anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design)) — direção estética e escolhas visuais intencionais ao construir ou redesenhar UI.
- **superpowers** — instalado como plugin (não skill) via `claude plugin install superpowers@claude-plugins-official`, do marketplace oficial da Anthropic. Não faz parte desta pasta/repo; gerenciado pelo próprio `claude plugin`.
- **128 skills do Google** ([google/skills](https://github.com/google/skills)) — conjunto completo de skills oficiais do Google, cobrindo:
  - **Google Cloud (110 skills)**: GKE, BigQuery, Cloud Run, Cloud SQL, Firebase, Gemini API, Genkit, AlloyDB, Spanner, Cloud Monitoring, Cloud Logging, IAM, gcloud CLI, Agent Platform (deploy, inference, RAG, tuning, eval), soluções de arquitetura, segurança, analytics, entre outros.
  - **Google Ads (14 skills)**: Google Ads API (quickstart, diagnostics, MCP setup), Google Mobile Ads (banner, interstitial, rewarded, get-started), Data Manager API (setup, audience, events), IMA SDK.
  - **Google Analytics (2 skills)**: Admin API e Data API basics.
  - **Google Developers (2 skills)**: `finding-google-skills`, `retrieving-developer-knowledge`.

## Instalando uma skill nova

```bash
npx skills add <owner>/<repo> -g
cd ~/.agents/skills && git add <skill> && git commit -m "feat: adiciona skill <nome>" && git push
```

## Restaurando em outra máquina

```bash
git clone https://github.com/oivanfelipe/claude-skills.git ~/.agents/skills
cd ~/.agents/skills && npx skills experimental_sync -y
```

## Escopo: local vs. nuvem

Este repositório garante que as skills globais sobrevivam e sejam versionadas — e permite reinstalá-las em qualquer máquina local via `git clone` + `experimental_sync`.

Ele **não** alimenta automaticamente sessões cloud/remotas do Claude Code (`isolation: "remote"`), porque esses ambientes partem de um checkout do repositório do *projeto*, não da sua pasta pessoal `~/.agents`. Para uma skill específica funcionar também em sessões remotas de um projeto, instale-a também no escopo do projeto (`npx skills add <owner>/<repo>` sem `-g`, dentro do repositório daquele projeto) e faça commit da pasta `.agents/skills/` ali.
