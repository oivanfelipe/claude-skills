# Web e interface — HTML, CSS, React

Aplica-se a landing page, página institucional, ferramenta interna, calculadora,
portal de cliente e qualquer interface em nome da V4.

Ponto de partida: importe `assets/v4-tokens.css`. Ele já traz as custom
properties, a base tipográfica, os componentes e o tratamento de
`prefers-reduced-motion`.

---

## 1) Estrutura de página

Fundo branco. Largura de conteúdo em `min(1200px, 92vw)`, centralizada. Seções
com `padding-block` de 96px em desktop, 48px em mobile.

O ritmo da página alterna respiro e densidade: seção de conteúdo em fundo
branco, seção de separação ocasional em `#F5F5F5`. **Fundo escuro `.v4-dark` só
em hero de impacto e no rodapé** — nunca em seção de conteúdo, formulário ou
tabela de preço.

---

## 2) Cabeçalho de seção

O mesmo padrão dos slides, e é o que dá unidade à marca entre meios:

```html
<p class="v4-eyebrow">02 // Como funciona</p>
<hr class="v4-regua">
<h2>O que muda no seu funil em 90 dias</h2>
<p class="v4-subtitulo">Uma frase que contextualiza a seção.</p>
```

Eyebrow em Space Grotesk caps com `letter-spacing: .2em`, régua vermelha de 2px,
título em Inter 800, subtítulo em `#595959`.

---

## 3) Botões e CTA

| Variante | Fundo | Texto | Borda | Uso |
|---|---|---|---|---|
| Primário | `#C00000` | `#FFFFFF` | — | Ação principal, um por tela |
| Primário hover | `#A30400` | `#FFFFFF` | — | — |
| Secundário | transparente | `#111111` | 2px `#111111` | Ação alternativa |
| Terciário | transparente | `#C00000` | — | Link de ação, sublinhado no hover |
| Desabilitado | `#F0F0F0` | `#8C8C8C` | — | — |

Texto de botão **nunca** em preto sobre vermelho (2,91:1, reprova). Altura mínima
de 44px em qualquer variante — é o alvo mínimo de toque.

Foco visível obrigatório: `outline: 3px solid` com `outline-offset: 2px`.
Nunca `outline: none` sem substituto.

---

## 4) Formulário

Label acima do campo, Inter 600 14px `#111111`. Campo com borda de 1px
`#D9D9D9`, raio 4, altura 48px, padding 12px 16px, fundo branco.

| Estado | Tratamento |
|---|---|
| Foco | Borda `#111111` 2px + outline vermelho |
| Erro | Borda `#C00000` + mensagem abaixo em `#C00000` 13px + ícone |
| Sucesso | Borda `#177230` + ícone de confirmação |
| Desabilitado | Fundo `#F5F5F5`, texto `#8C8C8C` |

Mensagem de erro descreve a correção, não o problema: "Informe um e-mail com @",
não "Campo inválido". Erro sempre associado ao campo por `aria-describedby`.

Formulário de conversão: máximo de 5 campos visíveis. Cada campo extra custa
conversão — se o time comercial pedir mais, negocie enriquecimento posterior.

---

## 5) Card e superfície

`.v4-card` — fundo `#F5F5F5`, raio 8, borda esquerda de acento de 4px.
Sobre fundo branco, card cinza. Sobre fundo `#F5F5F5`, card branco com borda
`#D9D9D9`. Nunca card cinza sobre fundo cinza.

Hover de card clicável: elevação para `--v4-shadow-md` e borda de acento
mudando para `#C00000`, em 150ms. Sem translação vertical maior que 2px.

---

## 6) Responsividade

Breakpoints: 640px, 900px, 1200px.

- Grid de 3 ou 4 colunas vira 2 em 900px e 1 em 640px.
- Display de `clamp(64px, 13vw, 220px)` já escala sozinho — evite media query
  para tipografia.
- Tabela larga rola horizontalmente dentro do próprio contêiner
  (`overflow-x: auto`), nunca faz a página rolar na horizontal.
- Alvo de toque mínimo de 44 × 44px em qualquer elemento interativo.
- Teste em 320px de largura — é onde o layout quebra primeiro.

---

## 7) Modo escuro de sistema

A identidade V4 é clara por definição, e uma landing page da V4 permanece clara
mesmo com o sistema em dark mode. Não implemente troca automática de tema em
peça de marketing.

Em **ferramenta interna ou portal**, onde o usuário passa horas na tela, o modo
escuro é legítimo. Nesse caso use os tokens `escuro`, troque o acento para
`#E10600` e revalide todo par de contraste com o script.

---

## 8) Performance

Peça de marketing da V4 carrega em menos de 2,5s de LCP em 4G. Regras práticas:

- Fontes com `display=swap` e `preconnect` para `fonts.gstatic.com`. Se possível,
  self-host as três famílias em `woff2` — remove uma dependência externa e um
  round-trip.
- Imagem em WebP ou AVIF, com `width` e `height` explícitos para não gerar CLS.
- Nada de biblioteca de animação pesada para reveal — `IntersectionObserver` com
  `opacity` e `transform` resolve.
- CSS crítico inline quando a página for uma landing única.

---

## 9) Acessibilidade

- Todo par texto/fundo em 4,5:1 (3:1 em texto grande). Valide com
  `scripts/validar-contraste.py`.
- Hierarquia de heading sem pular nível: h1 → h2 → h3.
- Imagem decorativa com `alt=""`; imagem informativa com alt descritivo.
- Vídeo com legenda. Áudio com transcrição.
- Navegação completa por teclado, com foco visível em cada parada.
- `prefers-reduced-motion` respeitado — já coberto pelo CSS de tokens.
- Idioma declarado: `<html lang="pt-BR">`.

---

## 10) Erros que quebram o padrão

- Seção de conteúdo em fundo escuro.
- Vermelho como fundo de seção inteira.
- Texto preto sobre botão vermelho.
- Mais de um CTA primário na mesma tela.
- `outline: none` sem substituto visível.
- Gradiente em texto, sombra colorida, glassmorphism, elemento 3D.
- Fonte fora do trio Bebas Neue / Inter / Space Grotesk.
- Caixa alta em parágrafo.
