#!/usr/bin/env bash
# Empacota a skill para upload em claude.ai (Settings > Capabilities > Skills).
# Gera dist/identidade-visual-v4.zip com SKILL.md na raiz do zip.
#
# Uso:  bash identidade-visual-v4/scripts/empacotar.sh

set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILL_NOME="$(basename "$SKILL_DIR")"
RAIZ="$(dirname "$SKILL_DIR")"
DEST="$RAIZ/dist"
ZIP="$DEST/$SKILL_NOME.zip"

if [ ! -f "$SKILL_DIR/SKILL.md" ]; then
  echo "erro: $SKILL_DIR/SKILL.md não encontrado" >&2
  exit 1
fi

# A paleta precisa passar antes de virar pacote.
if command -v python3 >/dev/null 2>&1; then
  echo "→ validando contraste da paleta"
  python3 "$SKILL_DIR/scripts/validar-contraste.py" --auditoria >/dev/null
  echo "  paleta ok"
else
  echo "aviso: python3 não encontrado, pulando a validação de contraste" >&2
fi

mkdir -p "$DEST"
rm -f "$ZIP"

echo "→ empacotando"
# -x exclui o preview (regenerável e pesado) e lixo de sistema.
( cd "$SKILL_DIR" && zip -q -r "$ZIP" . \
    -x '*.DS_Store' '*/__pycache__/*' '*.pyc' 'assets/exemplo-preview.png' )

echo
echo "pacote: $ZIP"
echo "conteúdo:"
unzip -l "$ZIP" | sed 's/^/  /'
echo
echo "Próximo passo: claude.ai > Settings > Capabilities > Skills > Upload skill"
echo "Refaça o upload sempre que editar a skill neste repositório."
