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
- **vibecode-blueprint** — skill própria (autoria do usuário), ativa automaticamente antes de qualquer criação de app/MVP (Vibecode, Lovable, Bolt, v0, Cursor, Claude Code ou qualquer app builder de IA). Gera os 6 documentos de planejamento (PRD, TRD, AppFlow, Design Brief, Esquema de Backend, Plano de Implementação — `templates/`) que dão ao agente de código o contexto completo para construir o app certo desde a primeira tentativa, em vez de deixá-lo chutar stack, telas e schema.
- **frontend-design** ([anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design)) — direção estética e escolhas visuais intencionais ao construir ou redesenhar UI.
- **idv-nova** — design system de interface em preto, branco e vermelho (cartaz editorial contemporâneo: tipografia pesada, blocos geométricos, sombras sólidas), com tokens CSS, receitas de componentes e página de preview.
- **Skills do Chrome DevTools** ([ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)) — `chrome-devtools`, `chrome-devtools-cli`, `a11y-debugging`, `cookie-debugging`, `debug-optimize-lcp`, `memory-leak-debugging`, `troubleshooting`: depuração, acessibilidade, cookies, LCP e vazamento de memória via Chrome DevTools. Dependem do MCP/CLI do Chrome DevTools instalado na máquina.
- **humanizer-zh** ([op7418/humanizer-zh](https://github.com/op7418/humanizer-zh)) — remove padrões de texto gerado por IA em chinês (24 padrões + rubrica de qualidade de 50 pontos).
- **html-presentation** ([mathews-tom/armory](https://github.com/mathews-tom/armory)) — converte documentos, outlines ou notas em apresentações HTML autocontidas (Reveal.js ou scroll vertical), com vários temas.
- **performance-optimizer** ([davila7/claude-code-templates](https://github.com/davila7/claude-code-templates/tree/main/cli-tool/components/skills/productivity/performance-optimizer)) — identifica e corrige gargalos de performance em código, bancos de dados e APIs, medindo antes/depois.
- **ads-performance-diagnostics** — skill própria, adaptada da `account-performance-diagnostics` do [googleads/google-ads-mcp](https://github.com/googleads/google-ads-mcp), reescrita para rodar sobre Windsor.ai. Diagnostica queda de conversão, oportunidades perdidas e queda no fluxo de leads em Google Ads e Meta Ads.
- **composio** ([ComposioHQ/composio](https://github.com/ComposioHQ/composio)) — integração com 500+ apps via Composio For You (MCP/CLI) e Composio Platform (SDK). Exige configurar o MCP server do Composio na sua máquina com a sua própria chave; nunca commite a chave.
- **planejamento-estrategico-v4** — skill própria, versão modular do planejamento estratégico com 13 módulos executáveis isoladamente ou em sequência.
- **identidade-visual-v4** — skill própria, fonte da verdade visual da V4 Company | Carvalho & Co (paleta, tipografia, grid, componentes e regras de marca).
- **kickoff-cliente-v4** — skill própria para o kickoff de clientes da V4.
- **superpowers** — instalado como plugin (não skill) via `claude plugin install superpowers@claude-plugins-official`, do marketplace oficial da Anthropic. Não faz parte desta pasta/repo; gerenciado pelo próprio `claude plugin`.

## Estrutura (para Hermes e outros agentes)

Todas as skills ficam na raiz da branch `main`, uma pasta por skill, cada uma com um `SKILL.md` (frontmatter `name` + `description`) e, opcionalmente, `references/`, `scripts/`, `templates/`, `assets/`:

```
<skill>/
├── SKILL.md        # obrigatório
├── references/     # opcional
├── scripts/        # opcional
└── templates/      # opcional
```

Para o Hermes (ou qualquer agente), aponte a leitura para a raiz de `main` deste repositório e descubra as skills listando as pastas de primeiro nível que contenham `SKILL.md`. Não há subpastas agrupadoras — manter a raiz plana é o que o `skills` CLI espera.

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
