# claude-skills

Fonte oficial das skills globais instaladas via [`skills` CLI](https://skills.sh) (`npx skills add <pacote> -g`).

Esta pasta é a localização real usada pelo CLI (`~/.agents/skills/`). O Claude Code enxerga cada skill através de um symlink automático em `~/.claude/skills/<nome>` — não edite os symlinks, edite/reinstale a partir daqui.

## Skills instaladas

- **agent-browser** ([vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser)) — automação de navegador para agentes.
- **deploy-to-vercel** — deploy de apps/sites para a Vercel.
- **find-skills** — descoberta de novas skills.
- **seo-audit** — auditoria técnica de SEO.

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
