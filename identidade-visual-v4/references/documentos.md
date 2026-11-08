# Documentos — DOCX e PDF

Aplica-se a proposta comercial, relatório de diagnóstico, documento de
planejamento, auditoria, contrato de escopo e qualquer entrega escrita em nome
da V4. Vale para `python-docx`, `docx` templates e PDF gerado de HTML.

---

## 1) Página

- Formato A4 retrato (21 × 29,7 cm). Paisagem só quando o documento for
  majoritariamente tabela larga.
- Margens: 2,5 cm laterais, 2,0 cm topo e base.
- Fundo branco. Nenhuma marca d'água, nenhuma textura, nenhuma borda de página.
- Coluna única. Duas colunas só em anexo denso.

---

## 2) Capa

A única página com permissão de fundo escuro.

Fundo `#0A0A0A`. Título do documento em Oswald bold, branco, caixa alta, grande
(28–36pt), alinhado à esquerda no terço inferior. Acima dele, uma régua vermelha
`#E10600` de 2px e o tipo do documento em Space Grotesk ou Arial caps
(`DIAGNÓSTICO DE AQUISIÇÃO`).

Rodapé da capa: nome do cliente à esquerda, `V4 Carvalho & Co` à direita, ambos
em branco, Oswald 10.

Data e versão em `#B8B8B8`, Arial 10, abaixo do título.

---

## 3) Hierarquia tipográfica

| Nível | Fonte | Tamanho | Cor | Tratamento |
|---|---|---|---|---|
| Título de seção (H1) | Oswald bold | 20 | `#111111` | Caixa alta, régua vermelha 2px abaixo |
| Subtítulo (H2) | Oswald bold | 15 | `#C00000` | Caixa alta |
| Sub-subtítulo (H3) | Arial bold | 12 | `#111111` | Caixa mista |
| Corpo | Arial | 11 | `#111111` | Entrelinha 1,4 |
| Legenda, nota, fonte | Arial italic | 9 | `#737373` | — |
| Citação / destaque | Arial | 12 | `#111111` | Borda esquerda vermelha 3px, recuo 1 cm |

Espaço antes de H1: 24pt. Antes de H2: 16pt. Entre parágrafos: 8pt. Nunca use
linha em branco para criar espaço — use espaçamento de parágrafo.

---

## 4) Numeração de seção

Seções numeradas com dois dígitos, no mesmo padrão dos slides:
`01 // CONTEXTO`, `02 // DIAGNÓSTICO`, `03 // ESTRATÉGIA`. O número e as barras
em vermelho `#C00000`, o nome em preto.

Documento com mais de 8 páginas leva sumário na segunda página, com os títulos
de H1 e H2 e o número da página, pontilhado em `#D9D9D9`.

---

## 5) Componentes

### Caixa de conclusão

Fecha cada seção. Fundo `#F5F5F5`, borda esquerda vermelha de 4px, padding
interno de 12pt. Label `CONCLUSÃO` em Oswald 10 bold vermelho, texto em Arial
11. Duas a quatro linhas.

### Caixa de alerta

Fundo `#FFF5F5`, borda esquerda `#C00000`. Para risco, gargalo e ponto crítico.
Label `ATENÇÃO` ou `RISCO`.

### Caixa de recomendação

Fundo `#E6F4EA`, borda esquerda `#177230`. Para próximo passo e ação
recomendada. Label `RECOMENDAÇÃO`.

### Tabela

Header com fundo `#111111`, texto branco, Arial 10 bold caixa alta. Linhas
alternadas branco / `#F5F5F5`. Células em Arial 10. Bordas horizontais de 0,5pt
em `#D9D9D9`; sem bordas verticais. Números à direita.

Tabela que ultrapassa a página repete o header — configure
`repeat_table_header` no python-docx.

### Lista

Marcador simples em vermelho `#C00000`, recuo de 0,6 cm, sem sub-níveis além do
segundo. Listas numeradas para sequência ou prioridade; com marcador para
conjunto sem ordem.

---

## 6) Cabeçalho e rodapé

**Cabeçalho** (a partir da página 2): nome do documento à esquerda em Arial 9
`#737373`; `V4 Carvalho & Co` à direita em Oswald 9 `#111111`. Linha de 0,5pt
`#D9D9D9` abaixo.

**Rodapé**: nome do cliente à esquerda, número da página à direita, ambos em
Arial 9 `#737373`. Formato `12 de 28`.

---

## 7) Imagens e gráficos no documento

Largura total da coluna, alinhadas à esquerda, sem borda e sem sombra. Legenda
imediatamente abaixo em Arial italic 9 `#737373`, começando com `Figura N —`.

Gráficos seguem `references/dataviz.md`. Exporte em pelo menos 300 DPI ou como
vetor — gráfico borrado em PDF de proposta desqualifica o documento inteiro.

Screenshot de plataforma (Meta, Google Ads, GA4) vai com borda de 1px `#D9D9D9`
e legenda identificando a fonte e a data de captura.

---

## 8) python-docx — notas

- Defina as cores com `RGBColor(0xC0, 0x00, 0x00)`.
- Oswald precisa estar instalada na máquina que abre o arquivo. Para documento
  que vai circular, defina a fonte de fallback no estilo (`w:eastAsia` e
  `w:cs`) ou use Arial Black no display.
- Configure os estilos no `styles.xml` uma vez e aplique por nome — não formate
  parágrafo a parágrafo, ou o documento fica impossível de manter.
- Acentuação: passe strings como literais Unicode, sem normalização.
- Para PDF final, exporte via LibreOffice (`soffice --headless --convert-to pdf`)
  e confira visualmente as duas primeiras e as duas últimas páginas — é onde as
  quebras costumam se perder.

---

## 9) Erros que quebram o padrão

- Fundo escuro em página de conteúdo (só a capa pode).
- Mais de duas famílias tipográficas.
- Bloco de texto com mais de 6 linhas sem respiro ou subtítulo.
- Tabela sem header preto, ou com borda vertical.
- Gráfico em resolução de tela dentro de PDF.
- Página sem numeração.
- Seção sem caixa de conclusão.
- Vermelho em corpo de texto.
