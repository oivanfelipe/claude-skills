# MCP remoto — dados do check-in (V4)

Endereço: `https://mcp.oivanfelipe.workers.dev/mcp` · Somente leitura · Custo zero (Workers Free + Workers VPC em beta gratuito).

## Como funciona

```
Claude da pessoa ──Bearer token──▶ Worker "mcp" ──Workers VPC──▶ túnel vps-ivan ──▶ n8n 127.0.0.1:5678/webhook/dados-relatorio
```

- Uma única ferramenta: `dados_relatorio`. Nada de escrita, nada de credenciais.
- O n8n **não** tem endereço público. O serviço VPC `n8n-dados` só alcança `127.0.0.1:5678`.
- Token por pessoa; no KV fica só o hash SHA-256. Revogar vale na hora.
- Restrição por cliente opcional (lista no momento de emitir).

## Conectar (cada pessoa)

```bash
claude mcp add --transport http v4-dados https://mcp.oivanfelipe.workers.dev/mcp --header "Authorization: Bearer SEU_TOKEN"
```

Depois instale a skill `checkin-mensal-v4` (gera o PPTX localmente; precisa de Node).

## Administrar

```bash
./emitir-token.sh "Maria"                  # acesso a todos os clientes
./emitir-token.sh "João" "alice,argiplam"  # só esses clientes
./revogar-token.sh <token>
```

## Recursos na Cloudflare

| Recurso | Nome / ID |
|---|---|
| Worker | `mcp` |
| KV | `TOKENS` (`0d1e96e5…`) |
| Serviço VPC | `n8n-dados` (`01a1d270…`) → túnel `vps-ivan` |
| Secret do Worker | `N8N_TOKEN` (mesmo token de entrada do n8n) |

## Pontos de atenção

- O dash é acessado pelo n8n com a conta pessoal de quem configurou. Ideal: conta de serviço.
- O túnel precisa rodar em QUIC (já roda) e a VPS liberar UDP 7844 de saída.
- Workers VPC está em beta; se a Cloudflare mudar o preço, reavaliar.
- Para rotacionar `N8N_TOKEN`: troque o token de entrada no n8n/Hermes e rode `npx wrangler secret put N8N_TOKEN`.
