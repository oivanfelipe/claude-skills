# Apresentações — PPTX e deck HTML

Aplica-se a slides executivos, decks de diagnóstico, planejamento, pitch e
check-in mensal. Vale para `pptxgenjs`, `python-pptx` e HTML de scroll vertical.

---

## 1) A regra dos dois tipos de slide

**Slide claro (conteúdo) — o padrão.** Toda análise, dado, recomendação e
próximo passo. Fundo branco, preto no texto, vermelho só no acento. É a maioria
absoluta do deck.

**Slide escuro (impacto) — a exceção.** Somente capa, separador de seção e
encerramento. Fundo `#0A0A0A` ou imagem escura de alta qualidade. Uma frase
grande, nada mais: sem cabeçalho, sem subtítulo, sem conclusão, sem bullet.

Um deck de 20 slides tem tipicamente 4 escuros (capa, dois separadores,
encerramento) e 16 claros. Se você está desenhando o quinto slide escuro, algo
saiu do padrão.

---

## 2) Anatomia do slide claro

Sempre nesta ordem, sempre nas mesmas posições:

```
┌──────────────────────────────────────────────── V4 Carvalho & Co ┐
│  02 // DIAGNÓSTICO DE AQUISIÇÃO          ← cabeçalho, Oswald 14   │
│  ──────────────────────────────────────  ← régua vermelha 2px     │
│                                                                   │
│  O CAC SUBIU 41% EM SEIS MESES           ← título, Oswald 22 caps │
│  Enquanto o ticket médio ficou estável.  ← subtítulo, Arial 14    │
│                                                                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐     ← conteúdo               │
│  │  card   │ │  card   │ │  card   │                              │
│  └─────────┘ └─────────┘ └─────────┘                              │
│                                                                   │
│  ─────────────────────────────────────── ← régua vermelha         │
│  CONCLUSÃO ESTRATÉGICA                   ← Oswald 14 bold vermelho│
│  Texto da conclusão em uma ou duas linhas. ← Arial 14 preto       │
└───────────────────────────────────────────────────────────────────┘
```

**Cabeçalho.** Número da seção + nome da seção, em vermelho `#C00000`, caixa
alta, alinhado à esquerda, Oswald 14 bold. Régua vermelha logo abaixo, ocupando
quase toda a largura útil.

**Título.** Caixa alta, preto `#111111`, alinhado à esquerda, no máximo duas
linhas, Oswald 22 bold. Descreve o achado, não é headline publicitária.
"O CAC subiu 41% em seis meses", não "A hora de virar o jogo".

**Subtítulo.** Uma frase, cinza escuro `#595959`, Arial 14. Contextualiza.

**Conteúdo.** Cards, blocos, tabela, gráfico ou funil. Um tipo por slide.

**Conclusão estratégica.** Fecha todo slide claro, separada por régua vermelha.
Label `CONCLUSÃO ESTRATÉGICA` em Oswald 14 bold vermelho, texto em Arial 14
preto. Curta. É o que o cliente leva.

**Assinatura.** `V4 Carvalho & Co`, canto superior direito, Oswald 10 bold,
preto.

---

## 3) Anatomia do slide escuro

Fundo `#0A0A0A`. Uma frase em display gigante — Bebas Neue em HTML, Oswald bold
em PPTX — branca, centralizada ou alinhada à esquerda. Acento em `#E10600`
quando houver (nunca `#C00000`, que reprova em contraste sobre preto).

Logo do cliente no canto inferior esquerdo, assinatura V4 no canto inferior
direito, ambos em branco.

Nada de bullet, nada de card, nada de gráfico em slide escuro.

---

## 4) Componentes

### Card

Fundo `#F5F5F5`, raio 8, borda vertical esquerda de 4px: vermelha `#C00000` para
destaque ou problema, cinza `#D9D9D9` para neutro.

Dentro, nesta ordem: número grande em vermelho (Oswald bold) → categoria em
caixa alta (Arial 14 bold) → headline objetiva (Arial 14 bold) → texto de no
máximo quatro linhas (Arial 14 normal).

Todos os cards de uma linha com **largura, altura e espaçamento idênticos**.
Máximo de 4 por linha; acima disso, quebre em duas linhas ou corte conteúdo.

Card de destaque negativo: fundo `#FFF5F5` com borda `#C00000`.

### Bloco executivo

Substitui lista com marcador. Borda vertical vermelha de 4px à esquerda,
recuo de 16px. Cada bloco é uma conclusão, nunca só informação.

Estrutura: título em caixa alta (Arial 14 bold) → tag de classificação em
vermelho (`// HIPÓTESE`, `// FATO OBSERVADO`, `// RECOMENDAÇÃO`) → texto em
Arial 14, máximo quatro linhas.

### Badge

Retângulo de raio 4 com texto centralizado, caixa alta, 12px:

| Estado | Fundo | Texto |
|---|---|---|
| Positivo | `#E6F4EA` | `#177230` |
| Negativo | `#FFF5F5` | `#C00000` |
| Atenção | `#FFF8E1` | `#A35F00` |
| Neutro | `#F0F0F0` | `#595959` |

Badge sempre acompanhado de sinal ou seta — `▲ 12%`, `▼ 8%` — para não depender
só da cor.

### Tabela

Header com fundo preto `#111111` e texto branco em caixa alta (Arial 14 bold).
Linhas alternadas branco / `#F5F5F5`. Células em Arial 14, números alinhados à
direita com dígitos tabulares. Linha de destaque com fundo `#FFF5F5`.

Máximo de 7 linhas e 5 colunas por slide. Acima disso, vire gráfico ou quebre em
dois slides.

### Funil horizontal

Barras horizontais empilhadas, da mais larga (topo) à mais estreita (base).
Gradiente de cor: `#111111` no topo → `#C00000` no meio → `#6B0000` na base.
Texto branco centralizado em cada barra (etapa + número). Taxa de conversão
entre etapas à direita, em `#595959`.

---

## 5) PPTX — notas de implementação

**Fontes.** Declare `fontFace: 'Oswald'` no cabeçalho, no título e nos números
de destaque; `fontFace: 'Arial'` em todo o resto. Nenhuma terceira família.
Oswald pode não estar instalada na máquina do cliente — se o deck vai circular
para edição, considere embutir a fonte ou trocar o display por Arial Black.

**Dimensões.** 16:9 (13,333" × 7,5"). Margens: 0,5" nas laterais, 0,4" no topo e
na base.

**Acentuação.** Todo texto em literal Unicode. Nunca aplique encoding, escape ou
normalização que remova diacríticos. No QA, leia cada slide procurando por
acento perdido — é o defeito mais comum e o mais visível para o cliente.

**Cores.** No pptxgenjs, hexadecimal **sem** cerquilha: `color: 'C00000'`.

**Sombra.** Não use. Se usar, `{ type: 'outer', blur: 4, offset: 1, opacity: 0.08 }`
e nada além disso.

---

## 6) Deck HTML — notas de implementação

Estrutura: uma seção de `100vh` por slide, scroll vertical, barra de progresso
no topo, navegação por dots à direita, reveal por `IntersectionObserver`.

Importe `assets/v4-tokens.css` e use as classes `.v4-card`, `.v4-bloco`,
`.v4-badge`, `.v4-kpi-valor`, `.v4-tabela`. Seções escuras recebem `.v4-dark`.

Tipografia web (Bebas Neue + Inter + Space Grotesk) substitui Oswald + Arial.
A hierarquia é a mesma; só as famílias mudam.

Respeite `prefers-reduced-motion` — já coberto pelo CSS de tokens.

---

## 7) Erros que quebram o padrão

- Slide de conteúdo com fundo escuro.
- Vermelho como fundo de área grande, ou texto preto sobre vermelho.
- Mais de um destaque vermelho competindo na mesma tela.
- Título publicitário no lugar do achado.
- Slide sem conclusão estratégica.
- Cards de alturas diferentes na mesma linha.
- Caixa alta em frase longa.
- Bullet point em vez de bloco executivo.
- Ícone decorativo, ilustração grande, gradiente em texto, elemento 3D.
