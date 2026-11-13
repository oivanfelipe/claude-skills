# Como montar o check-in mensal de um cliente (passo a passo)

Você vai precisar de: **Claude Code** instalado, **Node.js** instalado e o **token** que o Ivan te enviou.

## 1. Conectar (só uma vez)

Abra o terminal e cole, trocando `SEU_TOKEN` pelo token recebido:

```bash
claude mcp add --transport http v4-dados https://mcp.oivanfelipe.workers.dev/mcp --header "Authorization: Bearer SEU_TOKEN"
```

Para conferir, abra o Claude Code e digite `/mcp`. Deve aparecer **v4-dados** conectado.

## 2. Instalar a skill (só uma vez)

Peça ao Ivan a pasta `checkin-mensal-v4` e coloque em `~/.claude/skills/`. Depois, dentro dessa pasta, rode:

```bash
cd ~/.claude/skills/checkin-mensal-v4/scripts && npm install
```

## 3. Pedir o check-in

No Claude Code, escreva por exemplo:

> Monte o check-in mensal da Alice Salazar de outubro.

O Claude busca os dados reais, escreve os textos e gera um arquivo **.pptx** na identidade da V4.

## 4. Antes de enviar ao cliente

- Leia os **avisos** que o Claude trouxer (ex.: "dados do dash e da Central divergem", "GA4 não conectado").
- Confira os números principais no dash.
- Slides marcados como pendentes (entregas, plano, redes sociais) dependem de informação que você precisa passar.

## Problemas comuns

| Sintoma | O que fazer |
|---|---|
| `/mcp` mostra erro 401 | Token errado ou revogado. Peça um novo ao Ivan. |
| Cliente não encontrado | Use parte do nome (ex.: "alice"). |
| Demora ~1 minuto | Normal: ele consulta o dash e a Central ao vivo. |
| "Seu acesso não inclui este cliente" | Seu token é restrito. Fale com o Ivan. |

Não compartilhe seu token. Se perder ou vazar, avise o Ivan para revogar.
