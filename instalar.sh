#!/usr/bin/env bash
# Liga as skills deste repositório ao Claude Code, criando um symlink por skill
# em ~/.claude/skills/.
#
# Existe porque `npx skills experimental_sync` só enxerga skills instaladas via
# CLI (que ficam em node_modules). As skills escritas à mão neste repositório —
# identidade-visual-v4, planejamento-estrategico — ele ignora silenciosamente,
# respondendo "No skills found" sem criar link nenhum.
#
# Idempotente: rode quantas vezes quiser. Nunca apaga diretório real.
#
# Uso:  bash instalar.sh          instala tudo
#       bash instalar.sh <nome>   instala uma skill só
#       bash instalar.sh --dry    mostra o que faria, sem escrever

set -euo pipefail

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DESTINO="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"
DRY=0
FILTRO=""

for arg in "$@"; do
  case "$arg" in
    --dry|--dry-run) DRY=1 ;;
    -h|--help) sed -n '2,16p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) FILTRO="$arg" ;;
  esac
done

mkdir -p "$DESTINO"

criados=0; atualizados=0; ok=0; pulados=0

for caminho in "$RAIZ"/*/; do
  nome="$(basename "$caminho")"
  [ -f "$caminho/SKILL.md" ] || continue
  [ -n "$FILTRO" ] && [ "$nome" != "$FILTRO" ] && continue

  alvo="$DESTINO/$nome"

  # Diretório real no destino: pode ser skill gerenciada por outro processo.
  # Não tocar — apagar aqui destruiria conteúdo que não é nosso.
  if [ -d "$alvo" ] && [ ! -L "$alvo" ]; then
    echo "  pulado   $nome — já existe como diretório real em $DESTINO"
    pulados=$((pulados + 1))
    continue
  fi

  if [ -L "$alvo" ]; then
    atual="$(readlink "$alvo")"
    if [ "$atual" = "$RAIZ/$nome" ]; then
      echo "  ok       $nome"
      ok=$((ok + 1))
      continue
    fi
    echo "  religado $nome — apontava para $atual"
    [ "$DRY" -eq 0 ] && ln -sfn "$RAIZ/$nome" "$alvo"
    atualizados=$((atualizados + 1))
    continue
  fi

  echo "  criado   $nome"
  [ "$DRY" -eq 0 ] && ln -s "$RAIZ/$nome" "$alvo"
  criados=$((criados + 1))
done

echo
[ "$DRY" -eq 1 ] && echo "(simulação — nada foi escrito)"
echo "destino: $DESTINO"
echo "criados: $criados | religados: $atualizados | já ok: $ok | pulados: $pulados"
echo
echo "Abra uma sessão nova do Claude Code para as skills serem carregadas."
