# Tokens — valores exatos

Fonte da verdade numérica. Todos os valores de contraste abaixo foram medidos
pela fórmula WCAG 2.1 e conferidos com `scripts/validar-contraste.py`.

---

## 1) Paleta de fundo claro (padrão)

| Token | Hex | Contraste sobre `#FFFFFF` | Nível | Uso |
|---|---|---|---|---|
| `preto` | `#111111` | 18,88:1 | AAA | Corpo de texto, títulos, header de tabela |
| `vermelho` | `#C00000` | 6,48:1 | AA | Acento, cabeçalho de seção, série primária |
| `vermelho-escuro` | `#A30400` | 8,16:1 | AAA | Hover, estado pressionado, texto sobre tinta clara |
| `vinho` | `#6B0000` | 12,92:1 | AAA | Extremo de escala sequencial, base de funil |
| `cinza-escuro` | `#595959` | 7,00:1 | AAA | Subtítulo, texto secundário |
| `cinza-medio` | `#737373` | 4,74:1 | AA | Eixos, labels de gráfico, metadados |
| `cinza-claro` | `#8C8C8C` | 3,36:1 | AA-large | **Não textual**: gridline, ícone decorativo |
| `borda` | `#D9D9D9` | 1,41:1 | — | Bordas e divisores apenas |
| `card` | `#F5F5F5` | 1,09:1 | — | Fundo de card, linha alternada |
| `branco` | `#FFFFFF` | — | — | Fundo padrão |

### Cores semânticas (fundo claro)

| Token | Hex | Sobre branco | Uso |
|---|---|---|---|
| `positivo` | `#177230` | 6,02:1 AA | Delta positivo, meta batida |
| `negativo` | `#C00000` | 6,48:1 AA | Delta negativo, risco, gargalo |
| `atencao` | `#A35F00` | 5,01:1 AA | Alerta, ponto de observação |
| `neutro` | `#595959` | 7,00:1 AAA | Sem variação relevante |

### Tintas de fundo (superfícies coloridas suaves)

| Token | Hex | Par de texto | Contraste |
|---|---|---|---|
| `tinta-negativa` | `#FFF5F5` | `#C00000` | 6,06:1 AA |
| `tinta-positiva` | `#E6F4EA` | `#177230` | 5,30:1 AA |
| `tinta-atencao` | `#FFF8E1` | `#A35F00` | 4,71:1 AA |
| `tinta-neutra` | `#F0F0F0` | `#595959` | 6,15:1 AA |

> Os skills antigos usam `#1B7F37` como verde e `#FDDEDE` como tinta negativa de
> badge. Ambos continuam válidos visualmente, mas `#1B7F37` sobre `#E6F4EA` mede
> 4,47:1 e reprova por pouco. Em texto, use `#177230`.

---

## 2) Paleta de fundo escuro (capa, separador, encerramento, impacto)

| Token | Hex | Contraste sobre `#0A0A0A` | Nível | Uso |
|---|---|---|---|---|
| `dark-bg` | `#0A0A0A` | — | — | Fundo |
| `dark-surface` | `#141414` | — | — | Card sobre fundo escuro |
| `dark-divisor` | `#1C1C1C` | — | — | Divisor |
| `branco` | `#FFFFFF` | 19,80:1 | AAA | Texto de display e corpo |
| `racing` | `#E10600` | 3,99:1 | AA-large | Acento e display **grande** apenas |
| `racing-claro` | `#FF4A45` | 5,96:1 | AA | Quando o vermelho precisa ser legível em corpo |
| `dark-texto-2` | `#B8B8B8` | 9,98:1 | AAA | Corpo secundário |
| `dark-texto-3` | `#9A9A9A` | 7,04:1 | AAA | Labels, metadados |
| `dark-positivo` | `#19C37D` | 8,62:1 | AAA | Delta positivo |
| `dark-atencao` | `#FFB020` | 10,83:1 | AAA | Atenção |
| `dark-borda` | `rgba(255,255,255,.08)` | — | — | Borda sutil |
| `dark-borda-2` | `rgba(255,255,255,.16)` | — | — | Borda de card em foco |

**Atenção:** `#C00000` sobre `#0A0A0A` mede 3,06:1. Em fundo escuro, troque
sempre por `#E10600` (display) ou `#FF4A45` (texto legível).

---

## 3) Pares proibidos

| Par | Contraste | Por quê |
|---|---|---|
| `#111111` sobre `#C00000` | 2,91:1 | Reprova em qualquer tamanho. Use branco. |
| `#C00000` sobre `#0A0A0A` | 3,06:1 | Só texto grande. Prefira `#E10600`. |
| `#8C8C8C` sobre `#FFFFFF` em corpo | 3,36:1 | Reprova para texto. Use `#737373`. |
| `#D9D9D9` como texto | 1,41:1 | Nunca é cor de texto. |

---

## 4) Tipografia

### Meio Office (PPTX, DOCX)

| Papel | Fonte | Peso | Tamanho (16:9 / A4) |
|---|---|---|---|
| Cabeçalho de seção | Oswald | Bold | 14 |
| Título | Oswald | Bold | 22 |
| Número de destaque | Oswald | Bold | 32–44 |
| Corpo, card, tabela, legenda | Arial | Normal | 14 |
| Headline de bloco, categoria | Arial | Bold | 14 |
| Assinatura V4 | Oswald | Bold | 10 |

Somente estas duas famílias. Declare `fontFace: 'Oswald'` e `fontFace: 'Arial'`
no pptxgenjs; não introduza uma terceira.

### Meio web (HTML, dashboard, React)

```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
```

| Papel | Fonte | Peso | Tamanho |
|---|---|---|---|
| Display / capa | Bebas Neue | 400 | `clamp(64px, 13vw, 220px)` |
| H1 | Bebas Neue ou Inter | 400 / 900 | `clamp(40px, 6vw, 84px)` |
| H2 | Inter | 800 | `clamp(28px, 4vw, 56px)` |
| H3 | Inter | 700 | 22–28px |
| Corpo | Inter | 400–500 | 16–19px |
| Número de KPI | Bebas Neue | 400 | 54–110px |
| Eyebrow, label, tag | Space Grotesk | 700 | 10–14px, uppercase, `letter-spacing: .2em` |
| Valor tabular | Space Grotesk | 500 | 14–16px, `font-variant-numeric: tabular-nums` |
| Fonte de dados / rodapé | Inter | 400 italic | 13–14px |

Space Grotesk nunca em título nem em corpo — só em label técnico.

### Escala tipográfica

Razão 1,25 (quarta maior) para peças densas; 1,333 para peças de impacto.
Altura de linha: 1,15 em display, 1,3 em título, 1,55 em corpo.

---

## 5) Espaçamento e grid

Escala base de **8px** (0,08" em PPTX). Use múltiplos: 8, 16, 24, 32, 48, 64, 96.

| Contexto | Valor |
|---|---|
| Margem de slide 16:9 | 0,5" nas laterais, 0,4" topo/base |
| Margem de página A4 | 2,5cm laterais, 2cm topo/base |
| Gutter entre cards | 24px (0,25") |
| Padding interno de card | 24px |
| Raio de canto | 8px em card, 4px em badge, 0 em tabela |
| Espessura de borda de acento | 4px (borda vertical esquerda) |
| Espessura de divisor | 1px `#D9D9D9`; 2px `#C00000` quando é régua de seção |

Grid de conteúdo: 12 colunas. Cards em linhas de 2, 3 ou 4 — nunca 5+ numa
mesma linha em slide.

---

## 6) Elevação

Sombra é discreta ou inexistente. Quando necessária:

```css
--v4-shadow-sm: 0 1px 2px rgba(17,17,17,.06);
--v4-shadow-md: 0 2px 8px rgba(17,17,17,.08);
```

Nunca sombra colorida, nunca `box-shadow` maior que 8px de blur em peça
corporativa, nunca sombra em texto.

---

## 7) Movimento (web)

| Interação | Duração | Easing |
|---|---|---|
| Hover, mudança de estado | 150ms | `cubic-bezier(.4,0,.2,1)` |
| Entrada de elemento | 400ms | `cubic-bezier(.16,1,.3,1)` |
| Transição de seção | 600ms | `cubic-bezier(.16,1,.3,1)` |

Respeite `prefers-reduced-motion: reduce` — quando ativo, reduza toda duração a
`.01ms` e remova translações.
