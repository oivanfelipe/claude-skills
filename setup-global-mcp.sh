#!/bin/bash
# Adiciona o MCP server do Composio ao ~/.claude/settings.json global.
# Execute uma vez na sua máquina local após clonar este repo.
# Requer: jq

set -euo pipefail

SETTINGS="$HOME/.claude/settings.json"
MCP_BLOCK='{
  "composio": {
    "type": "http",
    "url": "https://connect.composio.dev/mcp",
    "headers": {
      "Authorization": "Bearer ${COMPOSIO_API_KEY}"
    }
  }
}'

if [ ! -f "$SETTINGS" ]; then
  echo "{}" > "$SETTINGS"
fi

# Merge o bloco composio em mcpServers sem sobrescrever o resto
jq --argjson mcp "$MCP_BLOCK" '.mcpServers = (.mcpServers // {}) + $mcp' "$SETTINGS" \
  > "$SETTINGS.tmp" && mv "$SETTINGS.tmp" "$SETTINGS"

echo "✓ MCP Composio adicionado em $SETTINGS"

# Cria settings.local.json com a API key (não commitado)
LOCAL="$HOME/.claude/settings.local.json"
if [ ! -f "$LOCAL" ]; then
  echo "{}" > "$LOCAL"
fi

if [ -z "${COMPOSIO_API_KEY:-}" ]; then
  echo ""
  echo "⚠️  Defina COMPOSIO_API_KEY antes de rodar, ou edite $LOCAL manualmente:"
  echo '   {"env": {"COMPOSIO_API_KEY": "ck_..."}}'
else
  jq --arg key "$COMPOSIO_API_KEY" '.env.COMPOSIO_API_KEY = $key' "$LOCAL" \
    > "$LOCAL.tmp" && mv "$LOCAL.tmp" "$LOCAL"
  echo "✓ COMPOSIO_API_KEY salvo em $LOCAL"
fi

echo ""
echo "Reinicie o Claude Code para carregar as mudanças."
