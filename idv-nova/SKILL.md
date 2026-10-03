---
name: idv-nova
description: Design system de interface em preto, branco e vermelho com linguagem de cartaz editorial contemporâneo (tipografia pesada, blocos geométricos, sombras sólidas, composição assimétrica). Use sempre que o usuário pedir para criar, reformular ou padronizar a interface de um aplicativo, dashboard, painel, landing page ou componente seguindo essa identidade visual, ou mencionar "cartaz editorial", "preto branco e vermelho", "sombra sólida", "identidade visual do projeto" ou "design system da marca".
---

# Cartaz Editorial

Transforma a linguagem gráfica de um cartaz editorial contemporâneo em um design system digital funcional. A referência visual é inspiração, nunca cópia: o que se aproveita é o DNA (composição, contraste, tipografia, blocos, sobreposição, hierarquia), nunca textos, símbolos, personagens, marcas ou elementos políticos.

Princípio central: não transformar o aplicativo em um cartaz. Transformar a linguagem do cartaz em interface.

Prioridade de decisão, nesta ordem: usabilidade, hierarquia, clareza, identidade visual, impacto. Se a estética conflitar com a usabilidade, a usabilidade vence.

## Arquivos desta skill

- `references/tokens.css`: variáveis de cor, tipografia, espaçamento, borda e sombra. Sempre importar e usar, nunca repetir valores soltos.
- `references/componentes.md`: receitas de botão, card, navegação, métrica, campo, notificação e ícone, com código.
- `assets/preview.html`: página de demonstração do sistema. Abrir como referência de qualidade antes de construir telas novas.

Leia `tokens.css` antes de escrever qualquer interface. Leia `componentes.md` ao construir componentes.

## Paleta (exclusivamente três cores)

| Papel | Valor | Uso |
|---|---|---|
| Preto | `#000000` | Estrutura, texto principal, bordas, sombras sólidas |
| Branco | `#FFFFFF` | Superfícies, fundo, texto sobre preto |
| Vermelho | `#E10600` | Destaque e ação |

Regras:
- Preto e branco formam a estrutura. Vermelho é exceção controlada, e é por isso que funciona.
- Vermelho entra em: botão primário, estado ativo, indicador importante, número de destaque, notificação, estado crítico, meta, variação.
- Regra prática: em uma tela, vermelho deve ocupar uma fração pequena da área. Se tudo é vermelho, nada é destaque.
- Proibido: tons de cinza como terceira cor estrutural, qualquer outra matiz, gradientes, transparências decorativas. Para estados desabilitados, usar preto ou branco com borda tracejada, não cinza.
- Ao inverter uma seção (fundo preto, texto branco), o vermelho permanece o mesmo.

## Tipografia

Sans-serif moderna, pesada e legível. Família padrão: **Archivo** (pesos 400 a 900, importada do Google Fonts), com fallback para `Inter`, `Helvetica Neue`, `Arial`, `sans-serif`. Se o projeto já tiver uma família de marca com pesos Black a Regular, usar a da marca.

Pesos: Black (títulos e números grandes), ExtraBold (subtítulos), Bold (rótulos e botões), Medium (corpo enfatizado), Regular (corpo).

A tipografia é elemento gráfico, não apenas informação. Hierarquia por escala, peso, espaçamento, contraste e posicionamento.

- Títulos de impacto: Black, caixa alta quando fizer sentido, entrelinha compacta (0.9 a 1.0), espaçamento levemente negativo.
- Números de métrica: escala muito grande, Black.
- Corpo de texto: Regular ou Medium, caixa mista, linha com no máximo 70 caracteres, entrelinha 1.5.
- Caixa alta é para títulos e rótulos curtos. Nunca em parágrafos.

## Blocos e cards

Cards são parte da identidade, não contêineres neutros.

Fazer: formas geométricas, borda de 2 px, cantos retos (ou no máximo 4 px), blocos sobrepostos, deslocamentos controlados, sombra sólida, alto contraste.

Evitar: cantos muito arredondados, sombras suaves, superfícies neutras, aparência "soft".

Profundidade é gráfica, não realista: um bloco branco ou vermelho com uma extensão preta deslocada alguns pixels para baixo e para a direita. Sombra padrão: `6px 6px 0 #000`. Nunca usar blur.

## Composição

Modular e assimétrica. A composição deve parecer construída, não preenchida.

- Não centralizar tudo. Alternar alinhamentos, larguras e níveis de profundidade.
- Permitir deslocamento e sobreposição pontuais (por exemplo, um card que invade a seção vizinha em 16 ou 24 px).
- Hierarquia por escala, peso, contraste, posicionamento e sobreposição.
- Assimetria sempre controlada: grid de 12 colunas por baixo, quebrado de propósito em poucos pontos.
- Gastar a ousadia em um elemento memorável por tela. O resto fica disciplinado.

## Dashboard e dados

Dados fazem parte da identidade, não são tabela.

```
FATURAMENTO
R$ 184.500
+18,4%
```

O rótulo fica pequeno e em caixa alta, o número principal ocupa escala grande em Black, e a variação vai em vermelho (ou em bloco vermelho com texto branco). Gráficos usam apenas as três cores, barras sólidas, sem gradiente, sem sombra difusa, grade em linhas pretas finas ou ausente.

## Botões

- **Primário**: fundo vermelho, texto branco, borda preta de 2 px, sombra sólida preta. Alto contraste, presença forte.
- **Secundário**: fundo preto com texto branco, ou fundo branco com texto preto, sempre com borda definida.
- Estado de hover: o botão desloca 2 px na direção da sombra e a sombra diminui. Estado de clique: botão encosta na sombra (sem sombra). Sem gradientes, sem brilho, sem efeitos sofisticados.
- Rótulo do botão diz exatamente o que acontece: "Salvar alterações", não "Enviar".

## Navegação

Simples e funcional. Tipografia forte para categorias. Estado ativo por vermelho, barra lateral, sublinhado grosso, bloco de destaque ou inversão de contraste (escolher um e manter em todo o produto). A navegação tem personalidade, mas nunca compete com o conteúdo.

## Ícones

Minimalistas, geométricos, simples, de espessura uniforme (2 px). Lineares ou sólidos simples, nunca misturar os dois estilos na mesma tela. Sem ícones ilustrativos. Cor: preto, branco ou vermelho (este apenas quando o ícone for ação ou alerta).

## Espaçamento, bordas e profundidade

- Escala de espaçamento (somente estes valores): 4, 8, 12, 16, 24, 32, 48, 64.
- Bordas de 1 a 2 px. Cantos retos ou levemente arredondados (0 a 4 px).
- Sombras predominantemente sólidas, como `0 6px 0 #000`.
- Manter bastante respiro mesmo com identidade forte. Impacto visual não pode custar clareza.

## Responsividade

A identidade vale em desktop e mobile, sem desaparecer.

Em telas menores: reduzir elementos decorativos, simplificar sobreposições (de deslocamento para empilhamento), preservar hierarquia, manter títulos fortes (reduzir escala, não peso), priorizar conteúdo e ações. Área de toque mínima de 44 px.

## O que evitar

Gradientes, glassmorphism, blur excessivo, sombras difusas, border-radius excessivo, múltiplas cores, estética genérica de SaaS, excesso de decoração, vermelho em excesso, aparência infantil, elementos 3D, interfaces poluídas.

## Acessibilidade (piso de qualidade)

- Contraste: preto sobre branco e branco sobre preto passam com folga. Branco sobre `#E10600` passa para texto grande e negrito (botões, números); não usar texto pequeno e regular branco sobre vermelho.
- Foco visível em todo elemento interativo: contorno preto de 3 px com deslocamento de 2 px (ou branco sobre fundo preto).
- Respeitar `prefers-reduced-motion`.
- Estado nunca comunicado só por cor: combinar vermelho com ícone, texto ou forma.

## Processo de trabalho

1. **Confirmar o assunto**: qual é o produto, quem usa e qual a tarefa principal da tela. Se o pedido não disser, propor uma hipótese concreta e confirmar.
2. **Importar `tokens.css`** e montar a tela só com variáveis.
3. **Escolher o elemento memorável** da tela (normalmente um título ou um número) e dar a ele a maior escala e o vermelho.
4. **Construir** com os componentes de `componentes.md`.
5. **Revisar contra o checklist** abaixo antes de entregar. Se possível, tirar captura de tela em desktop e em mobile.

## Checklist de revisão

- [ ] Só existem preto, branco e vermelho?
- [ ] O vermelho está restrito a ação, destaque e estado?
- [ ] Há um elemento memorável e o resto está quieto?
- [ ] Títulos e números têm escala e peso reais?
- [ ] Sombras são sólidas e sem blur?
- [ ] Cantos retos ou até 4 px?
- [ ] A composição tem assimetria controlada, sem quebrar a leitura?
- [ ] Espaçamentos usam apenas a escala 4, 8, 12, 16, 24, 32, 48, 64?
- [ ] Há respiro suficiente?
- [ ] Mobile preserva hierarquia e identidade?
- [ ] Foco visível, contraste correto, movimento reduzido respeitado?
- [ ] Nenhum texto, símbolo ou marca da referência foi reproduzido?
- [ ] A tela parece interface com linguagem de cartaz, e não um cartaz?

## Texto da interface

Palavras servem para facilitar o uso. Escrever do ponto de vista de quem usa, em voz ativa, com verbos simples. Um botão diz o que acontece. A mesma ação mantém o mesmo nome em todo o fluxo ("Publicar" gera o aviso "Publicado"). Erros explicam o que houve e como corrigir, sem pedir desculpas. Tela vazia convida à ação.
