---
name: identidade-visual-v4
version: 1.0.0
description: |
  Fonte da verdade da identidade visual da V4 Company — Carvalho & Co. Aplica a
  paleta, tipografia, grid, componentes e regras de marca em qualquer entrega:
  apresentações (PPTX e deck HTML), dashboards e gráficos, documentos (DOCX/PDF)
  e interfaces web (HTML/React/CSS). Padrão obrigatório: fundo branco, preto como
  cor de texto, vermelho apenas como acento. Fundo escuro cinematográfico só em
  capa, separadores de seção, encerramento e peças de impacto.
  Ativadores: "identidade visual da V4", "identidade da V4", "identidade visual
  V4", "padrão visual da V4", "cores da V4", "paleta da V4", "marca da V4",
  "brand V4", "no padrão V4", "com a cara da V4", "aplicar a identidade",
  "usar a identidade visual", "design da V4", "template da V4",
  "Carvalho & Co", "identidade visual da Carvalho".
compatibility: claude-code
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# Identidade Visual — V4 Company | Carvalho & Co

## O que esta skill faz

Sempre que o pedido mencionar a identidade visual da V4, esta skill define **como
a peça deve parecer**, independentemente do que está sendo construído. Ela não
produz conteúdo — ela governa a forma.

Ela é a **fonte única da verdade visual**. Outras skills (`criar-apresentacao`,
`monthly-traffic-deck`, `doutor-carvalho`, `argus`, `scope-auditor`,
`planejamento-estrategico`) devem consumir estes tokens em vez de redefinir
paletas próprias.

## Quando ativar

Esta skill é o **padrão de toda entrega em nome da V4**. Não espere o usuário
pedir a identidade visual — se a peça leva a marca da V4, o padrão é este.

Ative quando:

- O pedido contiver qualquer variação de "identidade visual da V4", "padrão V4",
  "cores da V4", "com a cara da V4".
- O usuário pedir apresentação, deck, documento, proposta, relatório,
  diagnóstico, dashboard, gráfico ou página em nome da V4 / Carvalho & Co, sem
  especificar estilo.
- Outra skill V4 (`criar-apresentacao`, `monthly-traffic-deck`,
  `doutor-carvalho`, `argus`, `scope-auditor`, `planejamento-estrategico`)
  estiver gerando a peça.

Carregue antes de escrever a primeira linha da peça, não depois de montada —
retrofitar identidade em layout pronto quase sempre sai pior.

**Não ative** para: código de aplicação sem interface, scripts e análise de dados
sem entrega visual.

## Precedência

Quando houver conflito, resolva nesta ordem:

1. **Instrução explícita do usuário na conversa.** Vale só para aquela peça.
2. **Marca do cliente**, quando a entrega é assinada pelo cliente e não pela V4.
   A paleta do cliente substitui o vermelho V4 como acento — mas a estrutura
   desta skill permanece: fundo branco, alinhamento rigoroso, um destaque por
   tela, conclusão por bloco.
3. **Esta skill.**
4. Paleta ou token definido dentro de outra skill.

O item 4 existe porque as demais skills V4 trazem paletas próprias, escritas
antes desta existir. Onde divergirem, esta ganha — é a única versão validada
contra WCAG. A divergência conhecida é o verde semântico: elas usam `#1B7F37`,
que mede 4,47:1 sobre a tinta clara e reprova por pouco; o valor correto é
`#177230`.

## Regra número um: o branco é o padrão

Toda peça de **conteúdo** — slide de análise, página de documento, tela de
dashboard, seção de landing page — usa **fundo branco `#FFFFFF`**, texto em
**preto `#111111`** e **vermelho `#C00000` somente como acento**.

O vermelho nunca é fundo de área extensa, nunca é cor de corpo de texto, e nunca
compete com o dado. Ele marca: o cabeçalho de seção, a borda esquerda de blocos e
cards, a linha divisória, o número que importa, a série em destaque de um
gráfico, o CTA.

O modo escuro cinematográfico é **exceção controlada**, permitido apenas em:
capa, separadores de seção, slide de encerramento e peças de impacto isoladas.
Nunca em slide de conteúdo, nunca em página de relatório, nunca em dashboard
operacional.

Se você está em dúvida se uma peça é "conteúdo" ou "impacto": ela carrega dado,
argumento ou instrução? É conteúdo. Fundo branco.

## Paleta essencial

Os tokens completos, com variantes e valores de contraste medidos, estão em
`references/tokens.md`. O mínimo que você precisa saber:

| Papel | Hex | Uso |
|---|---|---|
| Preto principal | `#111111` | Todo texto de corpo e título em fundo claro |
| Vermelho V4 | `#C00000` | Acento, cabeçalho de seção, destaque, série primária |
| Branco | `#FFFFFF` | Fundo padrão de toda peça de conteúdo |
| Cinza escuro | `#595959` | Subtítulo, texto secundário, legenda |
| Cinza médio | `#737373` | Eixos, labels de gráfico, metadados |
| Cinza de card | `#F5F5F5` | Fundo de card, linha alternada de tabela |
| Cinza de borda | `#D9D9D9` | Bordas, divisores, gridlines |
| Verde positivo | `#177230` | Delta positivo, badge de sucesso |
| Âmbar atenção | `#A35F00` | Alerta, ponto de atenção |
| Vinho | `#6B0000` | Extremo de escala sequencial, base de funil |
| Preto cinematográfico | `#0A0A0A` | Fundo de capa/separador/encerramento |
| Vermelho racing | `#E10600` | Acento **apenas** em fundo escuro |

**Duas proibições de contraste, medidas e não negociáveis:**

- Texto preto sobre preenchimento vermelho `#C00000` dá 2,91:1 — **reprova**.
  Sobre vermelho, o texto é sempre branco (6,48:1).
- Vermelho `#C00000` sobre fundo escuro dá 3,06:1 — só serve para texto grande.
  Em fundo escuro, o acento é `#E10600`, e ainda assim nunca em corpo de texto.

## Tipografia

**Peças em PPTX e DOCX** (fontes com instalação garantida no Office):

- Cabeçalho de seção e título: **Oswald**, negrito, caixa alta.
- Todo o resto: **Arial**, peso normal. Negrito só em headline de bloco e
  categoria de card.

**Peças em HTML, web e dashboards** (via Google Fonts):

- Display e números de impacto: **Bebas Neue**.
- Títulos e corpo: **Inter** (300–900).
- Labels técnicos, eyebrows, valores tabulares: **Space Grotesk**, caixa alta,
  `letter-spacing` entre `.15em` e `.3em`.

Regra transversal: caixa alta **apenas** em labels curtos e eyebrows, sempre com
`letter-spacing`. Nunca caixa alta em frase longa. Títulos e corpo em caixa
mista.

## Princípios de composição

Cinco, e eles decidem quase toda dúvida de layout:

1. **Espaço em branco é estrutura, não sobra.** Margens amplas, respiro entre
   blocos. Densidade se resolve cortando conteúdo, não apertando o grid.
2. **Alinhamento rigoroso.** Tudo se alinha a uma grade. Cards de mesma família
   têm a mesma largura, a mesma altura e o mesmo espaçamento.
3. **Um destaque por tela.** Se tudo está em vermelho, nada está.
4. **Aparência técnica e corporativa.** Sem gradiente em texto, sem sombra
   exagerada, sem elemento 3D, sem ilustração decorativa, sem ícone chamativo,
   sem estética de startup.
5. **Todo bloco carrega uma conclusão, não apenas informação.** A forma existe
   para tornar o argumento legível.

## Como aplicar por tipo de entrega

Carregue o arquivo de referência correspondente ao que você está construindo.
Não leia todos — leia o que se aplica.

| Você está construindo | Leia |
|---|---|
| Apresentação PPTX ou deck HTML | `references/apresentacoes.md` |
| Dashboard, gráfico, KPI, relatório de performance | `references/dataviz.md` |
| Documento DOCX, PDF, proposta, relatório escrito | `references/documentos.md` |
| Landing page, interface, componente web | `references/web-ui.md` |
| Qualquer coisa — valores exatos de token | `references/tokens.md` |

Arquivos prontos para copiar:

- `assets/v4-tokens.css` — custom properties para qualquer peça web/HTML.
- `assets/v4-tokens.json` — mesmos tokens para consumo programático
  (pptxgenjs, python-docx, matplotlib, scripts de build).
- `assets/exemplo.html` — a identidade renderizada, com todos os componentes.
  Abra no navegador; serve de referência de implementação.

Instalação no PC e na nuvem: `INSTALACAO.md`.

## Assinatura de marca

A assinatura padrão é **V4 Carvalho & Co**.

- Em peça de fundo claro: canto superior direito, Oswald bold, preto `#111111`.
- Em peça de fundo escuro: canto inferior direito, Oswald bold, branco.
- Tamanho de referência: 10pt em slide 16:9; escale proporcionalmente.

Nunca distorça, rotacione, aplique sombra ou recolora a assinatura fora do par
preto/branco. Se houver arquivo de logo disponível no projeto, use o arquivo em
vez do texto — procure em `assets/`, `brand/`, `logo*` antes de recorrer ao
texto.

### Co-branding com o cliente

Em peça para cliente, o logo do cliente vai à **esquerda** e a assinatura V4 à
**direita**, com a mesma altura óptica e um divisor vertical `#D9D9D9` entre eles
quando estiverem adjacentes.

Quando o pedido for para aplicar a identidade **do cliente**, a paleta do cliente
substitui o vermelho V4 como acento — mas a **estrutura** desta skill permanece:
fundo branco, alinhamento rigoroso, um destaque por tela, conclusão por bloco.

## Acessibilidade

Todo par texto/fundo deve atingir **4,5:1** para corpo de texto e **3:1** para
texto grande (≥24px, ou ≥18,66px em negrito). Os valores medidos de cada token
estão em `references/tokens.md`.

Para validar qualquer par novo, rode:

```bash
python3 scripts/validar-contraste.py "#C00000" "#FFFFFF"
```

Cor nunca é o único portador de significado. Positivo e negativo precisam de
sinal, seta ou rótulo além do verde e do vermelho — há leitores daltônicos em
toda audiência de cliente.

## Checklist antes de entregar

- [ ] Toda peça de conteúdo está em fundo branco; escuro só em capa, separador,
      encerramento ou impacto.
- [ ] O vermelho aparece como acento, não como fundo de área extensa nem como
      cor de corpo de texto.
- [ ] Há no máximo um destaque visual por tela.
- [ ] Nenhum texto preto sobre preenchimento vermelho.
- [ ] Tipografia correta para o meio: Oswald+Arial em PPTX/DOCX,
      Bebas+Inter+Space Grotesk em HTML.
- [ ] Caixa alta só em labels curtos, com letter-spacing.
- [ ] Cards da mesma família com largura, altura e espaçamento idênticos.
- [ ] Assinatura V4 Carvalho & Co presente e posicionada corretamente.
- [ ] Acentuação do português preservada em todo texto (à, ç, ã, é, õ).
- [ ] Todo par texto/fundo passa 4,5:1 (ou 3:1 em texto grande).
- [ ] Significado não depende só de cor.
