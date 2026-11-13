#!/usr/bin/env bash
# Revoga um token. Uso: ./revogar-token.sh <token>   (efeito imediato)
set -euo pipefail
cd "$(dirname "$0")"
H=$(printf %s "${1:?uso: ./revogar-token.sh <token>}" | shasum -a 256 | cut -d' ' -f1)
npx --yes wrangler kv key delete --binding TOKENS --remote "tok:$H"
