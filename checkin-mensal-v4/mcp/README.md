# MCP do n8n — Central de Operações

Conecta o Claude ao n8n da VPS por SSH (usa o host `if-server` do seu `~/.ssh/config`).
Sem token e sem porta aberta na internet.

## Ferramentas
Dados do relatório: `dados_relatorio(cliente, mes?)` coleta ao vivo dash + Central (workflow `dadosRelatorio01`, JSON em `n8n/`).
Leitura (sempre ligadas): `list_workflows`, `get_workflow`, `list_executions`, `get_execution`,
`get_credentials_overview` (nunca devolve segredos), `export_workflow_to_vps` (backup).
Escrita (só com `N8N_MCP_WRITE=1`): `set_workflow_active`, `import_workflow` (faz backup antes).

## Conectar
Somente leitura:
    claude mcp add n8n -- node /Users/macos/.agents/skills/checkin-mensal-v4/mcp/server.mjs
Com escrita:
    claude mcp add n8n -e N8N_MCP_WRITE=1 -- node /Users/macos/.agents/skills/checkin-mensal-v4/mcp/server.mjs

Variáveis opcionais: N8N_MCP_SSH_HOST, N8N_MCP_CONTAINER, N8N_MCP_PG_CONTAINER, N8N_MCP_BACKUP_DIR.
