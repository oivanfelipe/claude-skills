# Mensagem pronta para colar no Claude Code

Troque `SEU_TOKEN` pelo token recebido e cole tudo no Claude Code (aberto em qualquer pasta).

````
Configure o check-in mensal da V4 para mim. Faça na ordem, sem pedir confirmação a cada passo, e no final me diga o que deu certo e o que falhou.

1. Verifique se Node.js (versão 18 ou maior) e git estão instalados. Se faltar algum, me explique como instalar e pare.

2. Conecte o servidor de dados rodando:
   claude mcp add --transport http v4-dados https://mcp.oivanfelipe.workers.dev/mcp --header "Authorization: Bearer SEU_TOKEN"

3. Instale as skills:
   - clone https://github.com/oivanfelipe/claude-skills em uma pasta temporária;
   - copie as pastas "checkin-mensal-v4" e "identidade-visual-v4" para ~/.claude/skills/ (se já existirem, me avise antes de sobrescrever);
   - rode "npm install" dentro de ~/.claude/skills/checkin-mensal-v4/scripts;
   - apague a pasta temporária.

4. Não grave o token em nenhum arquivo nem o repita nas suas respostas.

5. Ao terminar, me diga para fechar e abrir o Claude Code de novo e, depois disso, testar com a frase:
   "Monte o check-in mensal da Alice Salazar de outubro."
````
