# Instruções do repositório

Este repositório é a pasta real de skills globais (`~/.agents/skills`). Cada
diretório de primeiro nível é uma skill, com seu `SKILL.md` na raiz.

## Antes de executar, consulte as skills

Há dezenas de skills instaladas, e várias resolvem tarefas que dá para
improvisar mal. **Antes de começar uma tarefa de verdade, percorra a lista de
skills disponíveis e verifique se alguma cobre o que foi pedido.** Se cobrir,
carregue-a em vez de improvisar — ela já traz o método, o formato de saída e os
erros conhecidos daquele tipo de entrega.

Faça essa checagem quando a tarefa for **produzir um artefato** (documento,
deck, planilha, PDF, página, gráfico, relatório, análise, plano), **operar um
fluxo** (deploy, release, revisão, auditoria, pesquisa) ou quando o pedido usar
vocabulário de domínio — marketing, SEO, tráfego pago, funil, branding.

Não faça quando for pergunta direta, leitura de arquivo, comando único, dúvida
de sintaxe ou conversa. Aí a varredura só atrasa a resposta.

### Como decidir se a skill cobre

A skill cobre quando o **tipo de entrega** bate, mesmo que o assunto seja outro.
`criar-apresentacao` serve para qualquer deck executivo, não só para diagnóstico.
`docx` serve para qualquer documento Word, não só para relatório.

Na dúvida entre duas, prefira a mais específica: `doutor-carvalho` ganha de
`docx` para um diagnóstico de cliente, porque a específica já usa a genérica por
dentro.

### Roteamento por tipo de tarefa

| A tarefa é | Use |
|---|---|
| Qualquer peça com a marca V4 / Carvalho & Co | `identidade-visual-v4` **sempre**, combinada com a de baixo |
| Deck executivo, slides, PPTX | `criar-apresentacao` |
| Deck mensal de tráfego, pitch de campanha, GO/NO-GO | `monthly-traffic-deck` |
| Diagnóstico de cliente ou prospect, auditoria de aquisição | `doutor-carvalho` |
| Auditoria de funil, gargalo, throughput, projeção de ganho | `argus` |
| Auditoria de SEO/AIO/SEO local com metodologia própria | `scope-auditor` |
| Planejamento estratégico de marketing | `planejamento-estrategico-v4` |
| Briefing de cliente para alimentar o planejamento | `briefing-cliente-v4` |
| Documento Word, relatório, proposta escrita | `docx` |
| Planilha, dados tabulares, CSV | `xlsx` |
| PDF: ler, gerar, combinar, extrair | `pdf` |
| Gráfico, dashboard, visualização de dados | `dataviz` |
| Página publicada, artefato visual para compartilhar | `artifact-design` |
| Auditoria técnica de SEO | `seo-audit` |
| Otimização de conversão de página ou formulário | `cro` |
| Copy de página, headline, proposta de valor | `copywriting` |
| Criativo de anúncio em volume, variações | `ad-creative` |
| Estratégia de campanha paga, segmentação, verba | `ads` |
| Tracking, GA4, eventos, atribuição | `analytics` |
| Dados estruturados, JSON-LD, rich results | `schema` |
| Otimização para busca por IA, citação em LLM | `ai-seo` |
| Revisão de código em busca de bug | `code-review` |
| Limpeza de código já escrito, simplificação | `simplify` |
| Plano de implementação faseado | `make-plan`, depois `do` |
| Entender codebase novo | `learn-codebase`, `smart-explore`, `pathfinder` |
| Deploy na Vercel | `deploy-to-vercel` |
| Automação de navegador | `agent-browser` |
| Acompanhar PR até o merge | `babysit` |
| Escrever ou melhorar um prompt | `prompt-optimizer` |
| Tirar cara de texto gerado por IA | `humanizer` |
| Configurar hooks, permissões, settings.json | `update-config` |
| Dúvida sobre a API da Anthropic, modelos, preço | `claude-api` |

Os nomes da tabela vêm de três origens — este repositório, a conta claude.ai e
as embutidas do Claude Code — e nem toda sessão carrega as três. Vale a lista de
skills disponíveis **daquela sessão**: se um nome da tabela não estiver lá, siga
sem ele, não o procure.

### Skills se combinam

O caso normal é duas: uma define **o que** entregar, outra define **como deve
parecer**. `criar-apresentacao` + `identidade-visual-v4`. `dataviz` +
`identidade-visual-v4`. `doutor-carvalho` + `docx`.

Carregue as duas antes de começar, não uma depois da outra no meio da peça.

### Quando nenhuma cobre

Diga isso em uma linha e siga com o método direto — não force uma skill que não
serve só para ter usado alguma. Se a tarefa parecer recorrente, vale sugerir
`find-skills` para procurar uma skill instalável que resolva.

## Identidade visual da V4 é o padrão

**Toda entrega em nome da V4 Company / Carvalho & Co usa a skill
`identidade-visual-v4`.** Isso vale para apresentação, deck, documento,
proposta, relatório, diagnóstico, dashboard, gráfico e página web — em qualquer
formato: PPTX, DOCX, PDF, HTML, React ou imagem.

Carregue a skill antes de escrever a primeira linha da peça, não depois de
montada. Ela define paleta, tipografia, grid, componentes e as regras de marca.

Não é preciso o usuário pedir "identidade visual da V4". Se a entrega leva a
marca da V4, o padrão é este.

### A regra que resolve a maioria das dúvidas

Peça de conteúdo — a que carrega dado, argumento ou instrução — vai em **fundo
branco `#FFFFFF`**, com **texto preto `#111111`** e **vermelho `#C00000` apenas
como acento**. O fundo escuro cinematográfico existe só em capa, separador de
seção, encerramento e peça de impacto isolada.

### Precedência

Quando houver conflito, resolva nesta ordem:

1. **Instrução explícita do usuário na conversa.** Ele pediu outra coisa, é
   outra coisa. Vale só para aquela peça.
2. **Marca do cliente**, quando a entrega é assinada pelo cliente e não pela V4.
   A paleta do cliente substitui o vermelho V4 como acento — mas a estrutura de
   `identidade-visual-v4` permanece: fundo branco, alinhamento rigoroso, um
   destaque por tela, conclusão por bloco.
3. **`identidade-visual-v4`.** O padrão.
4. Qualquer paleta ou token definido dentro de outra skill.

O item 4 existe porque `criar-apresentacao`, `monthly-traffic-deck`,
`doutor-carvalho`, `argus` e `scope-auditor` ainda trazem paletas próprias,
herdadas de antes desta skill existir. Onde divergirem, `identidade-visual-v4`
ganha — ela é a única versão validada contra WCAG.

### Antes de entregar

Rode o checklist final de `identidade-visual-v4/SKILL.md`. Para qualquer par de
cor novo:

```bash
python3 identidade-visual-v4/scripts/validar-contraste.py "#C00000" "#FFFFFF"
```

## Escopo destas instruções

Este arquivo governa as sessões abertas **dentro deste repositório**.

As duas regras acima — varredura de skills e identidade visual da V4 — também
valem para qualquer projeto do PC, porque estão replicadas no `CLAUDE.md` global,
que fica em [`oivanfelipe/claude-config`](https://github.com/oivanfelipe/claude-config)
e é linkado em `~/.claude/CLAUDE.md`. Lá elas entram como subseções das seções 2
(Princípios Gerais) e 10 (Design e Comunicação Visual).

Ao mudar uma dessas duas regras aqui, mude também lá — são cópias, não um
arquivo compartilhado. Não use `cat >> ~/.claude/CLAUDE.md`: aquele caminho é um
symlink para o `claude-config`, e o comando despejaria neste arquivo inteiro
dentro da config global, incluindo as convenções que só valem aqui.

Na nuvem, o equivalente são as Instruções de perfil em claude.ai → Settings →
Profile.

## Convenções ao editar skills deste repositório

- `SKILL.md` com frontmatter YAML contendo `name`, `version`, `description`.
  A `description` precisa listar os ativadores em português, porque é por ela
  que a skill é encontrada.
- Conteúdo extenso vai em `references/`, não no `SKILL.md`. O `SKILL.md` roteia.
- Arquivos copiáveis em `assets/`. Scripts executáveis em `scripts/`.
- Documente a skill nova no `README.md` da raiz.
