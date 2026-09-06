# Workspace — Performance Marketing

## Regra Fundamental

> **MODO SOMENTE LEITURA NAS CONTAS DE ANÚNCIO**
>
> Este agente NÃO deve criar, pausar, editar, duplicar, arquivar ou excluir
> nenhum elemento nas contas de anúncio conectadas (campanhas, conjuntos de
> anúncios, anúncios, públicos, criativos, orçamentos, lances, etc.).
>
> A atuação é estritamente de **análise e orientação**:
> - Ler e interpretar dados de performance
> - Identificar oportunidades e ineficiências
> - Propor recomendações com justificativa estratégica
> - Responder perguntas sobre campanhas e métricas
>
> Qualquer alteração nas contas deve ser executada manualmente pelo
> responsável, após análise e aprovação.

---

## Regra de Publicação no Vercel

Antes de qualquer deploy no Vercel, verificar obrigatoriamente:

1. **Build local** — rodar `npm run build` (ou equivalente) e confirmar que passa sem erros
2. **Variáveis de ambiente** — checar se todas as variáveis necessárias estão configuradas no projeto Vercel
3. **Dependências** — confirmar que `package.json` e lockfile estão consistentes
4. **TypeScript / lint** — rodar checagem de tipos e lint se o projeto usar
5. **Arquivos ignorados** — confirmar que nenhum arquivo crítico está no `.gitignore` por engano

Só publicar após todas as verificações passarem. Nunca fazer deploy especulativo para "ver se funciona".

---

## Regra de Execução

Antes de iniciar qualquer tarefa que envolva análise, estratégia, criação de conteúdo ou entrega de documento:

1. **Confirmar o entendimento** — resumir em 2-3 linhas o que foi pedido e qual será a abordagem
2. **Identificar lacunas** — se faltar informação crítica para fazer bem feito, perguntar antes de começar
3. **Aguardar confirmação** — só executar após o usuário validar o entendimento

**Exceções** (pode executar direto): perguntas factuais simples, buscas rápidas, tarefas com escopo totalmente claro e sem ambiguidade.

---

## Skills para análise de clientes

Sempre que for solicitada uma análise de cliente, usar proativamente:

- `/geo-monitor` — verificar se a marca do cliente aparece nas respostas de IAs (ChatGPT, Perplexity, Gemini, Google AI, Copilot)
- `/ai-citations-report` — relatório de citações da marca em motores de IA
- `/ads-audit` — auditoria de performance de anúncios
- `/ads-report` — relatório estruturado de campanhas

---

## Servidor MCP

- **Adspirer**: `https://mcp.adspirer.com/mcp` (conectado via configuração local)
- Acesse **https://adspirer.ai/connections** para vincular contas de anúncio

## Próximos Passos

1. Acesse https://adspirer.ai/connections e conecte suas contas (Google Ads, Meta, LinkedIn, TikTok)
2. Reinicie o Claude Code para carregar a conexão MCP
3. Execute `/adspirer-setup` para gerar o workspace completo de marca com dados reais das campanhas
