#!/usr/bin/env bash
# Emite um token para uma pessoa. Uso: ./emitir-token.sh "Nome" [cliente1,cliente2]
# Sem a lista de clientes, a pessoa acessa todos. O token aparece UMA vez; só o hash fica no KV.
set -euo pipefail
cd "$(dirname "$0")"
NOME="${1:?uso: ./emitir-token.sh \"Nome\" [cliente1,cliente2]}"
CLIENTES="${2:-}"
T=$(openssl rand -hex 32)
H=$(printf %s "$T" | shasum -a 256 | cut -d' ' -f1)
if [ -n "$CLIENTES" ]; then
  V=$(python3 -c 'import json,sys;print(json.dumps({"nome":sys.argv[1],"clientes":[c.strip() for c in sys.argv[2].split(",") if c.strip()]}))' "$NOME" "$CLIENTES")
else
  V=$(python3 -c 'import json,sys;print(json.dumps({"nome":sys.argv[1]}))' "$NOME")
fi
npx --yes wrangler kv key put --binding TOKENS --remote "tok:$H" "$V" >/dev/null
echo "Token de $NOME (guarde agora, não será mostrado de novo):"
echo "$T"
echo
echo "Para a pessoa conectar:"
echo "claude mcp add --transport http v4-dados https://mcp.oivanfelipe.workers.dev/mcp --header \"Authorization: Bearer $T\""
echo
echo "Para revogar: ./revogar-token.sh <token>"
