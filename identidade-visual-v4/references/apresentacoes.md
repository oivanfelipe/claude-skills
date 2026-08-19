# Apresentações — deck de scroll e PPTX

Aplica-se a slides executivos, decks de diagnóstico, planejamento, pitch e
check-in mensal.

---

## 0) O formato de entrega: deck de scroll

**O padrão é HTML de scroll vertical, um slide por tela.** Cada slide ocupa a
altura inteira da janela, encaixa sozinho ao rolar e só se move para baixo. Não
há navegação lateral, não há setinha para o lado, não há rolagem horizontal em
lugar nenhum.

O leitor rola. Um slide sai, o próximo entra e para. Sempre um por vez.

Isso vale para toda apresentação da V4, inclusive as geradas por
`criar-apresentacao`, `monthly-traffic-deck`, `doutor-carvalho`, `argus`,
`scope-auditor` e `planejamento-estrategico-v4`. Onde essas skills descreverem
navegação por passador de slides, vale este arquivo.

Ponto de partida pronto: `assets/deck-template.html`. Ele já traz o encaixe, a
barra de progresso, o contador, a navegação por teclado e os dois tipos de
slide. Copie e preencha; não recomece do zero.

### Por que scroll e não passador

O deck circula por link. O decisor abre no celular, no meio da reunião ou depois
dela, e rola com o polegar — não procura seta de navegação. Scroll é o gesto que
ele já faz em tudo. Um passador de slides transforma leitura em operação de
interface, e quem abre no celular simplesmente não avança.

### Quando ainda entregar PPTX

Só quando o cliente precisar do **arquivo**: para editar, para reapresentar sem
você, ou porque o processo interno dele exige anexo em e-mail. Nesse caso,
entregue os dois — o link do deck de scroll para leitura, o `.pptx` para o
arquivo. A seção 5 cobre o PPTX.

Não entregue PDF de apresentação como formato principal. Ele perde o encaixe,
perde qualquer interação e vira um arquivo pesado que ninguém rola até o fim.

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

## 6) Deck de scroll — implementação

Use `assets/deck-template.html` como base. O que segue explica as decisões dele,
para você não desfazer sem querer o que faz o encaixe funcionar.

### O encaixe

```css
.deck {
  height: 100dvh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;   /* o encaixe é obrigatório, não sugerido */
  scroll-behavior: smooth;
}
.slide {
  min-height: 100dvh;
  scroll-snap-align: start;
  scroll-snap-stop: always;        /* impede pular dois slides num gesto só */
}
```

Três detalhes que decidem se funciona:

**`100dvh`, não `100vh`.** No celular, `100vh` conta a janela sem a barra do
navegador, então o slide fica mais alto que a tela e o encaixe treme a cada
rolagem. `dvh` acompanha a barra aparecendo e sumindo.

**`scroll-snap-stop: always`.** Sem ele, um gesto rápido no touch atravessa três
slides. Com ele, cada gesto anda exatamente um.

**O contêiner rola, não o `body`.** O encaixe precisa de um elemento com altura
fixa e `overflow-y: scroll`. Se você deixar a página inteira rolar, o snap
funciona em desktop e falha no iOS.

### `min-height`, não `height`

O slide tem altura **mínima** de uma tela, não altura fixa. A diferença aparece
em celular estreito: com `height`, conteúdo que não cabe fica cortado e
inacessível; com `min-height`, o slide cresce e o leitor rola dentro dele antes
de encaixar no próximo.

Isso é a válvula de escape, não a norma. Se um slide cresce no desktop, ele tem
conteúdo demais — corte, não deixe crescer. A regra continua sendo uma ideia por
tela.

### Sem rolagem horizontal, nunca

Tabela larga rola dentro do próprio contêiner (`.v4-tabela-wrap`, já em
`v4-tokens.css`). A página nunca rola na horizontal — verifique em 320px antes
de entregar.

### Teclado e acessibilidade

Setas, PageUp/PageDown, Home/End e espaço funcionam nativamente quando o
contêiner tem foco. O template força isso com `tabindex="0"` no contêiner e um
handler que chama `scrollIntoView` no slide vizinho, porque o comportamento
nativo varia entre navegadores.

Cada slide é um `<section>` com `aria-label`. A barra de progresso é decorativa
(`aria-hidden`). Com `prefers-reduced-motion: reduce`, o template desliga
`scroll-behavior: smooth` — movimento suave longo enjoa quem tem sensibilidade
vestibular.

### Progresso e contador

Barra de 3px no topo, `#C00000`, largura proporcional à posição. Contador
discreto no canto (`04 / 18`) em Space Grotesk. Ambos ajudam o leitor a saber
quanto falta — sem isso, deck longo em scroll parece infinito e a pessoa desiste.

### Reveal

`IntersectionObserver` com `opacity` e `transform: translateY(16px)`, 400ms.
Só isso. Nada de biblioteca de animação, nada de parallax, nada de efeito que
dispute com o conteúdo. Elementos com `data-anim` entram; o resto já está lá.

### Impressão

`@media print`: desliga o snap, `height: auto`, `page-break-after: always` por
slide. Assim o `Ctrl+P` do cliente gera um PDF decente sem você manter uma
segunda versão.

### Identidade

Importe `assets/v4-tokens.css` e use `.v4-card`, `.v4-bloco`, `.v4-badge`,
`.v4-kpi-valor`, `.v4-tabela`. Slides escuros recebem `.v4-dark`.

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
