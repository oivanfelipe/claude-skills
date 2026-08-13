# Instruções do repositório

Este repositório é a pasta real de skills globais (`~/.agents/skills`). Cada
diretório de primeiro nível é uma skill, com seu `SKILL.md` na raiz.

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

## Convenções ao editar skills deste repositório

- `SKILL.md` com frontmatter YAML contendo `name`, `version`, `description`.
  A `description` precisa listar os ativadores em português, porque é por ela
  que a skill é encontrada.
- Conteúdo extenso vai em `references/`, não no `SKILL.md`. O `SKILL.md` roteia.
- Arquivos copiáveis em `assets/`. Scripts executáveis em `scripts/`.
- Documente a skill nova no `README.md` da raiz.
