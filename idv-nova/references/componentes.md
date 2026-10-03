# Componentes do Cartaz Editorial

Todos os exemplos usam as variáveis de `tokens.css`. Importe o arquivo antes.

## Botões

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--e-2);
  min-height: var(--area-toque); padding: var(--e-3) var(--e-5);
  font: var(--peso-extra) 0.9375rem/1 var(--fonte);
  text-transform: uppercase; letter-spacing: var(--tracking-rotulo);
  border: var(--borda-forte); border-radius: var(--raio);
  box-shadow: var(--sombra-m); cursor: pointer;
  transition: transform 80ms linear, box-shadow 80ms linear;
}
.btn:hover  { transform: translate(2px, 2px); box-shadow: 4px 4px 0 var(--preto); }
.btn:active { transform: translate(6px, 6px); box-shadow: 0 0 0 var(--preto); }

.btn--primario   { background: var(--vermelho); color: var(--branco); border-color: var(--preto); }
.btn--secundario { background: var(--preto);    color: var(--branco); border-color: var(--preto); }
.btn--claro      { background: var(--branco);   color: var(--preto);  border-color: var(--preto); }

.btn[disabled] { background: var(--branco); color: var(--preto); border-style: dashed; box-shadow: none; cursor: not-allowed; }
```

Regra: um único botão primário por área de decisão.

## Cards e blocos

```css
.card {
  background: var(--branco); color: var(--preto);
  border: var(--borda-forte); border-radius: var(--raio);
  box-shadow: var(--sombra-m); padding: var(--e-5);
}
.card--preto    { background: var(--preto);    color: var(--branco); box-shadow: 6px 6px 0 var(--vermelho); }
.card--vermelho { background: var(--vermelho); color: var(--branco); }

/* Sobreposição controlada (somente desktop) */
.card--invade { margin-top: -24px; margin-left: 24px; position: relative; z-index: 2; }

/* Extensão gráfica: bloco atrás, deslocado */
.bloco-duplo { position: relative; }
.bloco-duplo::before {
  content: ""; position: absolute; inset: 8px -8px -8px 8px;
  background: var(--preto); z-index: -1;
}
```

Variação de cor de card: alternar entre branco, preto e (raramente) vermelho. Nunca mais de um card vermelho por grupo.

## Métrica (dado como elemento visual)

```html
<article class="metrica">
  <p class="metrica__rotulo">Faturamento</p>
  <p class="metrica__valor">R$ 184.500</p>
  <p class="metrica__variacao">+18,4%</p>
</article>
```

```css
.metrica { border: var(--borda-forte); box-shadow: var(--sombra-m); padding: var(--e-5); background: var(--branco); }
.metrica__rotulo { margin: 0; font: var(--peso-bold) var(--t-pequeno)/1 var(--fonte); text-transform: uppercase; letter-spacing: var(--tracking-rotulo); }
.metrica__valor  { margin: var(--e-2) 0; font: var(--peso-black) var(--t-numero)/var(--entrelinha-titulo) var(--fonte); letter-spacing: var(--tracking-titulo); }
.metrica__variacao { display: inline-block; margin: 0; padding: var(--e-1) var(--e-2); background: var(--vermelho); color: var(--branco); font: var(--peso-black) 1.125rem/1 var(--fonte); }
```

Variação negativa: manter o mesmo bloco, trocar o sinal e acrescentar uma seta de ícone, porque a cor sozinha não comunica estado. Se a regra de negócio exigir distinguir queda de crescimento, usar bloco preto com texto branco para queda e vermelho para crescimento.

## Navegação

Lateral (desktop):

```css
.nav { display: grid; gap: var(--e-1); }
.nav a {
  padding: var(--e-3) var(--e-4); color: var(--texto); text-decoration: none;
  font: var(--peso-extra) 1rem/1 var(--fonte); text-transform: uppercase; letter-spacing: var(--tracking-rotulo);
  border-left: 6px solid transparent;
}
.nav a:hover { border-left-color: var(--preto); }
.nav a[aria-current="page"] { border-left-color: var(--vermelho); background: var(--preto); color: var(--branco); }
```

Mobile: barra inferior com quatro a cinco itens, ícone e rótulo curto, item ativo com bloco vermelho. Escolher um padrão de estado ativo e manter em todo o produto.

## Campos de formulário

```css
.campo { display: grid; gap: var(--e-2); }
.campo label { font: var(--peso-bold) var(--t-pequeno)/1 var(--fonte); text-transform: uppercase; letter-spacing: var(--tracking-rotulo); }
.campo input, .campo select, .campo textarea {
  min-height: var(--area-toque); padding: var(--e-3) var(--e-4);
  font: var(--peso-medium) 1rem/1.4 var(--fonte);
  background: var(--branco); color: var(--preto);
  border: var(--borda-forte); border-radius: var(--raio);
}
.campo input:focus { outline: var(--foco); outline-offset: var(--foco-offset); box-shadow: var(--sombra-s); }
.campo--erro input { border-color: var(--vermelho); box-shadow: 3px 3px 0 var(--vermelho); }
.campo__erro { margin: 0; font: var(--peso-bold) var(--t-pequeno)/1.3 var(--fonte); color: var(--vermelho); }
```

Mensagem de erro sempre com texto que explica o problema e como corrigir. Nunca só a borda vermelha.

## Notificação e selo

```css
.selo { display: inline-flex; align-items: center; min-width: 24px; height: 24px; padding: 0 var(--e-2); background: var(--vermelho); color: var(--branco); font: var(--peso-black) 0.75rem/1 var(--fonte); }
.aviso { border: var(--borda-forte); border-left: 12px solid var(--vermelho); padding: var(--e-4); background: var(--branco); box-shadow: var(--sombra-s); }
```

## Tabelas

Quando a tabela for inevitável: cabeçalho em fundo preto com texto branco em caixa alta, linhas separadas por borda de 1 px preta, número em Bold alinhado à direita, linha de destaque com marcador vermelho na borda esquerda. Em mobile, converter linhas em cards empilhados.

## Gráficos

Barras sólidas pretas, com a barra principal em vermelho. Eixos em linhas pretas de 1 a 2 px, rótulos em Bold. Sem gradiente, sem sombra difusa, sem animação decorativa. Valor-chave anotado direto sobre o gráfico, em tamanho grande.

## Ícones

Espessura de traço uniforme (2 px), grade de 24 px, pontas retas, cantos retos ou com raio de até 2 px. Biblioteca sugerida quando não houver conjunto próprio: Lucide, com `stroke-width="2"` e `stroke="currentColor"`. Não misturar linear e sólido na mesma tela.

## Grid e composição

```css
.grade { display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--e-5); max-width: var(--largura-max); margin-inline: auto; padding-inline: var(--e-5); }
.col-7 { grid-column: span 7; } .col-5 { grid-column: span 5; }
.col-8 { grid-column: span 8; } .col-4 { grid-column: span 4; }

@media (max-width: 768px) {
  .grade { grid-template-columns: 1fr; gap: var(--e-4); padding-inline: var(--e-4); }
  [class^="col-"] { grid-column: auto; }
  .card--invade, .bloco-duplo::before { margin: 0; inset: auto; display: block; }
  .bloco-duplo::before { display: none; }
}
```

Assimetria: pares 7/5 ou 8/4, nunca 6/6 em todas as seções. Alternar o lado do bloco forte de uma seção para outra.

## Padrões de tela

- **Painel**: faixa de título em Black (escala grande) alinhada à esquerda; métrica principal em bloco largo (8 colunas) e métricas secundárias empilhadas ao lado (4 colunas); um único botão primário por visão.
- **Lista e detalhe**: lista em coluna estreita com item ativo invertido (preto e branco), detalhe em coluna larga com título grande.
- **Formulário**: título grande, campos em coluna única, botão primário alinhado à esquerda com a sombra sólida, ação secundária ao lado.
- **Estado vazio**: título curto em Black, uma frase de orientação, um botão primário que resolve o vazio.
