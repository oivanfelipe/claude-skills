# Instalação — PC e nuvem

A skill chega ao Claude por **dois caminhos independentes**. Eles não se
comunicam: instalar em um não instala no outro.

| Ambiente | De onde a skill vem | Coberto por |
|---|---|---|
| Claude Code no seu PC | `~/.agents/skills` (este repositório) → symlink em `~/.claude/skills/` | `git pull` + sync |
| Claude Code na web / GitHub / app | Skills da sua conta claude.ai (`~/.claude/skills/synced/`) | upload do pacote `.zip` |
| Sessão remota **neste** repositório | `.claude/skills/` do próprio repo | já resolvido pelo symlink versionado |

---

## 1) PC — Claude Code local

```bash
cd ~/.agents/skills
git pull origin main
npx skills experimental_sync -y
```

Confirme que apareceu:

```bash
ls -l ~/.claude/skills/identidade-visual-v4
```

Se o comando acima não listar nada, crie o link à mão:

```bash
ln -s ~/.agents/skills/identidade-visual-v4 ~/.claude/skills/identidade-visual-v4
```

Teste numa sessão nova do Claude Code: peça *"monte um slide com a identidade
visual da V4"*. Se a skill carregar, ela aparece no rastro da sessão.

### Windows

O repositório versiona um symlink em `.claude/skills/`. O Git no Windows só
materializa symlink com a opção ligada — rode **antes** de clonar:

```powershell
git config --global core.symlinks true
```

Se o repositório já estiver clonado sem isso, o arquivo
`.claude/skills/identidade-visual-v4` vem como texto contendo um caminho. Apague
e recrie como cópia:

```powershell
Remove-Item .claude\skills\identidade-visual-v4
Copy-Item -Recurse identidade-visual-v4 .claude\skills\identidade-visual-v4
```

Isso afeta **apenas** as sessões abertas dentro deste repositório. A instalação
global (`~/.claude/skills/`) não depende de symlink do Git.

---

## 2) Nuvem — claude.ai, app e sessões do GitHub

As skills da nuvem vêm da sua conta claude.ai, não deste repositório. Para a
identidade visual valer lá também, suba o pacote:

```bash
cd ~/.agents/skills
bash identidade-visual-v4/scripts/empacotar.sh
```

O script gera `dist/identidade-visual-v4.zip` com `SKILL.md` na raiz do zip, que
é o formato que o upload espera.

Depois, em **claude.ai → Settings → Capabilities → Skills → Upload skill**,
envie o `.zip`.

A partir daí a skill aparece junto das outras skills V4 já sincronizadas
(`criar-apresentacao`, `doutor-carvalho`, `argus`, `scope-auditor`,
`planejamento-estrategico-v4`) em qualquer sessão da conta — web, app, mobile e
sessões remotas de qualquer projeto.

**Refaça o upload sempre que editar a skill aqui.** O repositório e a conta
claude.ai não sincronizam sozinhos — este é o passo manual do processo, e é o
único.

---

## 3) Tornar padrão fora deste repositório

O `CLAUDE.md` na raiz deste repositório já torna a identidade visual o padrão
para sessões abertas **aqui**. Para valer em todo projeto do seu PC, acrescente
a regra ao seu `CLAUDE.md` de usuário:

```bash
mkdir -p ~/.claude
cat >> ~/.claude/CLAUDE.md <<'EOF'

## Identidade visual da V4

Toda entrega em nome da V4 Company / Carvalho & Co — apresentação, deck,
documento, proposta, relatório, diagnóstico, dashboard, gráfico ou página web —
usa a skill `identidade-visual-v4`. Carregue-a antes de começar a peça.

Padrão: fundo branco, texto preto #111111, vermelho #C00000 só como acento.
Fundo escuro apenas em capa, separador de seção e encerramento.

Precedência: instrução explícita do usuário > marca do cliente > 
identidade-visual-v4 > paleta interna de outra skill.
EOF
```

Na nuvem, o equivalente são as **Instruções de perfil** em claude.ai → Settings
→ Profile. Cole o mesmo texto lá.

---

## 4) Verificação

Rode a auditoria completa da paleta. Ela deve terminar em
`Tudo dentro do padrão.`:

```bash
python3 identidade-visual-v4/scripts/validar-contraste.py --auditoria
```

Para ver a identidade renderizada, abra
`identidade-visual-v4/assets/exemplo.html` no navegador.

---

## 5) O que ainda não está automatizado, e por quê

As outras skills V4 (`criar-apresentacao`, `monthly-traffic-deck`,
`doutor-carvalho`, `argus`, `scope-auditor`) trazem paletas próprias, escritas
antes desta skill existir. Elas vivem na sua conta claude.ai, não neste
repositório — o diretório `~/.claude/skills/synced/` é recriado a cada
sincronização, então editar aquelas cópias localmente não dura.

Enquanto elas não forem atualizadas em claude.ai, a regra de precedência do
`CLAUDE.md` cobre o conflito: onde divergirem, `identidade-visual-v4` ganha.

A divergência real é pequena e está mapeada — o verde semântico. Elas usam
`#1B7F37`, que mede 4,47:1 sobre a tinta clara `#E6F4EA` e reprova por pouco.
O valor correto é `#177230`.
