#!/usr/bin/env python3
"""Verifica a saúde do repositório de skills.

1. Todo diretório de skill tem SKILL.md com frontmatter contendo name e description.
2. O `name` do frontmatter bate com o nome do diretório.
3. A paleta da identidade visual passa na auditoria de contraste.
4. O symlink de escopo de projeto aponta para um SKILL.md que existe.

Uso: python3 .github/scripts/validar-repo.py
"""

import os
import re
import subprocess
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
IGNORAR = {".git", ".github", ".claude", "dist", "node_modules", "__pycache__"}

erros: list[str] = []
avisos: list[str] = []


def frontmatter(caminho: str) -> dict:
    with open(caminho, encoding="utf-8") as f:
        texto = f.read()
    m = re.match(r"^---\n(.*?)\n---", texto, re.S)
    if not m:
        return {}
    campos = {}
    for linha in m.group(1).split("\n"):
        achou = re.match(r"^([a-zA-Z_-]+):\s*(.*)$", linha)
        if achou:
            valor = achou.group(2).strip()
            # Escalar YAML pode vir entre aspas — as skills vindas do claude.ai
            # chegam assim. Remove só quando abre e fecha com a mesma aspa.
            if len(valor) >= 2 and valor[0] == valor[-1] and valor[0] in "\"'":
                valor = valor[1:-1]
            campos[achou.group(1)] = valor
    return campos


def checar_skills() -> None:
    encontradas = 0
    for nome in sorted(os.listdir(RAIZ)):
        caminho = os.path.join(RAIZ, nome)
        if not os.path.isdir(caminho) or nome in IGNORAR or nome.startswith("."):
            continue
        skill_md = os.path.join(caminho, "SKILL.md")
        if not os.path.isfile(skill_md):
            avisos.append(f"{nome}/ não tem SKILL.md na raiz")
            continue
        encontradas += 1
        campos = frontmatter(skill_md)
        if not campos:
            erros.append(f"{nome}/SKILL.md sem frontmatter YAML")
            continue
        if "name" not in campos:
            erros.append(f"{nome}/SKILL.md sem campo `name`")
        elif campos["name"] != nome:
            erros.append(
                f"{nome}/SKILL.md declara name={campos['name']!r}, "
                f"diferente do diretório"
            )
        if "description" not in campos:
            erros.append(f"{nome}/SKILL.md sem campo `description`")
    print(f"skills verificadas: {encontradas}")


def checar_contraste() -> None:
    script = os.path.join(RAIZ, "identidade-visual-v4", "scripts", "validar-contraste.py")
    if not os.path.isfile(script):
        erros.append("identidade-visual-v4/scripts/validar-contraste.py não encontrado")
        return
    r = subprocess.run(
        [sys.executable, script, "--auditoria"], capture_output=True, text=True
    )
    if r.returncode != 0:
        erros.append("auditoria de contraste reprovou:\n" + r.stdout[-2000:])
    else:
        print("auditoria de contraste: ok")


def checar_escopo_projeto() -> None:
    alvo = os.path.join(RAIZ, ".claude", "skills", "identidade-visual-v4", "SKILL.md")
    if not os.path.isfile(alvo):
        erros.append(
            ".claude/skills/identidade-visual-v4 não resolve para um SKILL.md — "
            "o symlink de escopo de projeto quebrou"
        )
    else:
        print("escopo de projeto (.claude/skills): ok")


checar_skills()
checar_contraste()
checar_escopo_projeto()

for a in avisos:
    print(f"aviso: {a}")
for e in erros:
    print(f"ERRO: {e}")

if erros:
    print(f"\n{len(erros)} erro(s).")
    sys.exit(1)
print("\nRepositório íntegro.")
