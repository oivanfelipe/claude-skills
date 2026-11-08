# Dashboards e gráficos

Aplica-se a dashboard de performance, gráfico em slide, relatório de mídia,
KPI tile e qualquer visualização em nome da V4. Vale para Recharts, Chart.js,
D3, matplotlib, plotly e SVG escrito à mão.

> Se a skill `dataviz` estiver disponível, leia-a para a **forma** do gráfico
> (que marca usar, como codificar, regras de eixo). Este arquivo define a
> **cor e a tipografia V4** que substituem a paleta neutra de placeholder dela.

---

## 1) Fundo branco, sempre

Dashboard é conteúdo. Fundo `#FFFFFF`, sem exceção — inclusive o fundo do
plot, que nunca é cinza. Gridlines em `#D9D9D9`, eixos e ticks em `#737373`,
rótulos em `#595959`, título do gráfico em `#111111`.

Se o dashboard precisar de tema escuro (TV de operação, sala de guerra), use os
tokens `escuro` — mas troque o acento para `#E10600` e revalide contraste.

---

## 2) A regra de cor que resolve 80% dos casos

**Um destaque em vermelho, todo o resto em cinza.**

A série que sustenta o argumento recebe `#C00000`. As demais recebem a rampa
neutra: `#111111`, `#595959`, `#8C8C8C`, `#C4C4C4`. Isso mantém a peça
corporativa, evita arco-íris e faz o olho ir direto ao ponto.

```
--v4-serie-destaque: #C00000
--v4-serie-n1:       #111111
--v4-serie-n2:       #595959
--v4-serie-n3:       #8C8C8C
--v4-serie-n4:       #C4C4C4
```

Use esta abordagem quando houver uma série que importa mais que as outras — que
é quase sempre o caso em relatório de cliente.

---

## 3) Paleta categórica estendida

Só quando as categorias forem genuinamente equivalentes e você precisar de 4 ou
mais cores distinguíveis (canais de mídia, por exemplo).

| Ordem | Hex | Contraste sobre branco |
|---|---|---|
| 1 | `#C00000` | 6,48:1 |
| 2 | `#111111` | 18,88:1 |
| 3 | `#0F6E7A` | 5,95:1 |
| 4 | `#A35F00` | 5,01:1 |
| 5 | `#5B3A8E` | 8,60:1 |
| 6 | `#177230` | 6,02:1 |

Todas passam 4,5:1 sobre branco, então servem também como cor do rótulo da série
— o que permite rotular a série diretamente e dispensar a legenda.

Acima de 6 categorias, agrupe em "outros". Não estenda a paleta.

---

## 4) Escala sequencial

Para heatmap, mapa de calor de horário, intensidade. Claro → escuro,
luminância monotônica (validada):

```
#FFF0F0 → #F8C9C9 → #E88585 → #D13A3A → #C00000 → #6B0000
```

Sobre os três passos mais escuros, o rótulo é branco; sobre os três mais claros,
`#111111`.

---

## 5) Escala divergente

Para variação em torno de zero — delta de meta, crescimento vs. queda:

```
#C00000 ← #E88585 ← #E8E8E8 → #7FBF92 → #177230
negativo forte      neutro       positivo forte
```

O ponto neutro é sempre o zero real, nunca a média dos dados.

---

## 6) KPI tile

```
┌─────────────────────────┐
│ CAC                     │  ← label: Space Grotesk 12, caps, .2em, #737373
│ R$ 184                  │  ← valor: Bebas Neue 72, #111111 (ou #C00000)
│ ▲ 41% vs. mês anterior  │  ← delta: Inter 14, cor semântica + seta
└─────────────────────────┘
```

Regras:

- O valor usa `#111111` por padrão. `#C00000` **só** no KPI que é o argumento do
  slide — no máximo um por tela.
- O delta carrega **seta e sinal**, além da cor. `▲ 41%` / `▼ 8%`.
- Atenção à polaridade: CAC subindo é ruim. A cor segue o **significado de
  negócio**, não a direção da seta. Verde `#177230` = bom, vermelho `#C00000` =
  ruim, âmbar `#A35F00` = atenção.
- Números com dígitos tabulares (`font-variant-numeric: tabular-nums`) para
  alinhar colunas.
- Sempre com período de comparação explícito. "R$ 184" sozinho não informa nada.

---

## 7) Regras de gráfico

**Eixos.** Barra sempre começa em zero — sem exceção. Linha pode ter eixo
truncado se o zero não for informativo, e nesse caso o corte precisa estar
visível no rótulo.

**Gridline.** Só horizontal, `#D9D9D9`, 1px. Sem gridline vertical, sem borda de
plot, sem fundo cinza.

**Rótulo direto.** Prefira rotular a série no fim da linha ou dentro da barra a
usar legenda. Legenda só quando houver 4+ séries e o rótulo direto poluir.

**Ordenação.** Barras ordenadas por valor, não por alfabeto — a menos que a
categoria tenha ordem natural (meses, etapas de funil).

**Fonte dos dados.** Todo gráfico em entrega para cliente termina com a fonte e
o período, em Inter 13 italic `#737373`. "Meta Ads, 1–31 de julho de 2026."

**Densidade.** Máximo de 2 gráficos por slide, 6 por tela de dashboard. Um
gráfico que precisa de explicação de três linhas deveria ser dois gráficos.

**Sem 3D, sem pizza com mais de 4 fatias, sem eixo duplo** — eixo duplo faz o
leitor inferir correlação que não existe. Use dois painéis lado a lado.

---

## 8) Snippet — Recharts

```jsx
const V4 = {
  destaque: '#C00000', n1: '#111111', n2: '#595959',
  eixo: '#737373', grid: '#D9D9D9', rotulo: '#595959',
};

<LineChart data={dados} margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
  <CartesianGrid stroke={V4.grid} vertical={false} />
  <XAxis dataKey="mes" stroke={V4.eixo} tick={{ fill: V4.rotulo, fontSize: 13 }}
         tickLine={false} axisLine={{ stroke: V4.grid }} />
  <YAxis stroke={V4.eixo} tick={{ fill: V4.rotulo, fontSize: 13 }}
         tickLine={false} axisLine={false} />
  <Line type="monotone" dataKey="receita" stroke={V4.destaque}
        strokeWidth={3} dot={false} />
  <Line type="monotone" dataKey="meta" stroke={V4.n2}
        strokeWidth={2} strokeDasharray="4 4" dot={false} />
</LineChart>
```

## 9) Snippet — matplotlib

```python
import json, matplotlib as mpl, matplotlib.pyplot as plt

T = json.load(open('assets/v4-tokens.json'))['dataviz']

mpl.rcParams.update({
    'figure.facecolor': 'white', 'axes.facecolor': 'white',
    'axes.edgecolor': T['gridline'], 'axes.labelcolor': T['rotulo'],
    'axes.spines.top': False, 'axes.spines.right': False,
    'axes.grid': True, 'grid.color': T['gridline'], 'grid.linewidth': .8,
    'axes.axisbelow': True,
    'xtick.color': T['eixo'], 'ytick.color': T['eixo'],
    'font.family': 'Inter', 'font.size': 12,
    'axes.prop_cycle': mpl.cycler(color=T['destaqueMaisNeutros']),
})
```

Se Inter não estiver instalada, `matplotlib` cai no fallback silenciosamente —
verifique com `mpl.font_manager.findfont('Inter')` antes de gerar a entrega.

---

## 10) Acessibilidade

Nenhuma informação depende só de cor: use seta, sinal, marcador diferente
(círculo / quadrado / losango) ou traço (sólido / tracejado) para separar
séries. Cerca de 8% dos homens têm alguma deficiência de visão de cor, e
vermelho contra verde é exatamente o par que eles confundem — por isso a regra
do delta com seta não é opcional.

Rótulo de série precisa de 4,5:1 contra o fundo. `#8C8C8C` e `#C4C4C4` servem
como preenchimento de barra, mas o rótulo dessas séries vai em `#595959`.
