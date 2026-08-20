#!/usr/bin/env bash
# Empacota skills deste repositório para upload em claude.ai
# (Settings > Capabilities > Skills > Upload skill).
#
# Gera dist/<skill>.zip com o SKILL.md na raiz do zip, que é o formato que o
# upload espera. Valida o repositório antes de empacotar.
#
# Uso:  bash empacotar.sh <skill> [<skill> ...]
#       bash empacotar.sh --todas          empacota toda skill com SKILL.md
#       bash empacotar.sh --lista          mostra as skills disponíveis

set -euo pipefail

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="$RAIZ/dist"
VALIDADOR="$RAIZ/.github/scripts/validar-repo.py"

# Lixo e arquivos regeneráveis nunca entram no pacote.
EXCLUI=('*.DS_Store' '*/__pycache__/*' '*.pyc' '*-preview.png')

skills_do_repo() {
  for caminho in "$RAIZ"/*/; do
    local nome; nome="$(basename "$caminho")"
    [ -f "$caminho/SKILL.md" ] && echo "$nome"
  done
}

case "${1:-}" in
  ""|-h|--help) sed -n '2,12p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit 0 ;;
  --lista) skills_do_repo; exit 0 ;;
  --todas) mapfile -t ALVOS < <(skills_do_repo) ;;
  *) ALVOS=("$@") ;;
esac

# Uma skill inexistente é erro de digitação — pare antes de empacotar qualquer coisa.
for nome in "${ALVOS[@]}"; do
  if [ ! -f "$RAIZ/$nome/SKILL.md" ]; then
    echo "erro: '$nome' não é uma skill deste repositório (sem SKILL.md)" >&2
    echo "      veja as disponíveis com: bash empacotar.sh --lista" >&2
    exit 1
  fi
done

if [ -f "$VALIDADOR" ] && command -v python3 >/dev/null 2>&1; then
  echo "→ validando o repositório"
  python3 "$VALIDADOR" >/dev/null
  echo "  ok"
else
  echo "aviso: validador não encontrado, empacotando sem verificar" >&2
fi

mkdir -p "$DEST"

for nome in "${ALVOS[@]}"; do
  zip_path="$DEST/$nome.zip"
  rm -f "$zip_path"
  ( cd "$RAIZ/$nome" && zip -q -r "$zip_path" . -x "${EXCLUI[@]}" )
  n=$(unzip -l "$zip_path" | tail -1 | awk '{print $2}')
  kb=$(( $(wc -c < "$zip_path") / 1024 ))
  printf "  %-32s %4s arquivos  %4s KB\n" "$nome.zip" "$n" "$kb"
done

echo
echo "pacotes em: $DEST"
echo "Próximo passo: claude.ai > Settings > Capabilities > Skills > Upload skill"
echo "Refaça o upload sempre que editar a skill neste repositório."
