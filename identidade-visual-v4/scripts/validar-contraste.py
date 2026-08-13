#!/usr/bin/env python3
"""Valida contraste WCAG 2.1 para a identidade visual da V4.

Uso:
    python3 validar-contraste.py "#C00000" "#FFFFFF"   # um par
    python3 validar-contraste.py --auditoria           # toda a paleta
    python3 validar-contraste.py --rampa "#FFF0F0,#F8C9C9,#E88585,#D13A3A,#C00000,#6B0000"

Saída: razão de contraste e nível (AAA / AA / AA-large / FALHA).
"""

import json
import os
import sys

MIN_CORPO = 4.5
MIN_GRANDE = 3.0


def _lin(c: float) -> float:
    c /= 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def luminancia(hexcor: str) -> float:
    h = hexcor.strip().lstrip("#")
    if len(h) == 3:
        h = "".join(ch * 2 for ch in h)
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * _lin(r) + 0.7152 * _lin(g) + 0.0722 * _lin(b)


def contraste(a: str, b: str) -> float:
    la, lb = luminancia(a), luminancia(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def nivel(r: float) -> str:
    if r >= 7:
        return "AAA"
    if r >= MIN_CORPO:
        return "AA"
    if r >= MIN_GRANDE:
        return "AA-large"
    return "FALHA"


def _tokens() -> dict:
    caminho = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "..", "assets", "v4-tokens.json"
    )
    with open(caminho, encoding="utf-8") as f:
        return json.load(f)


def auditoria() -> int:
    t = _tokens()
    falhas = 0

    print("\n== Texto sobre branco #FFFFFF ==")
    for grupo in ("claro", "semantica"):
        for nome, cor in t[grupo].items():
            if nome in ("branco", "card", "borda"):
                continue
            r = contraste(cor, "#FFFFFF")
            n = nivel(r)
            falhas += n == "FALHA"
            print(f"  {nome:16s} {cor}  {r:6.2f}:1  {n}")

    print("\n== Texto sobre tinta ==")
    pares = [
        ("positiva", t["semantica"]["positivo"]),
        ("negativa", t["semantica"]["negativo"]),
        ("atencao", t["semantica"]["atencao"]),
        ("neutra", t["semantica"]["neutro"]),
    ]
    for tinta, texto in pares:
        fundo = t["tintas"][tinta]
        r = contraste(texto, fundo)
        n = nivel(r)
        falhas += n in ("FALHA", "AA-large")
        print(f"  {texto} sobre {fundo} ({tinta:9s}) {r:6.2f}:1  {n}")

    print("\n== Texto sobre fundo escuro #0A0A0A ==")
    for nome, cor in t["escuro"].items():
        if nome in ("bg", "surface", "divisor"):
            continue
        r = contraste(cor, t["escuro"]["bg"])
        print(f"  {nome:16s} {cor}  {r:6.2f}:1  {nivel(r)}")

    print("\n== Séries de data viz sobre branco ==")
    print("  Estas cores são preenchimento de marca (barra, linha, fatia), não texto.")
    print("  Precisam de >= 3.0:1 para servir também como cor do rótulo da série.")
    for nome in ("destaqueMaisNeutros", "categorica"):
        print(f"  [{nome}]")
        for cor in t["dataviz"][nome]:
            r = contraste(cor, "#FFFFFF")
            uso = "marca + rótulo" if r >= MIN_GRANDE else "só marca (rótulo em #595959)"
            print(f"    {cor}  {r:6.2f}:1  {uso}")

    print("\n== Rampa sequencial: luminância deve ser monotônica ==")
    falhas += _rampa(t["dataviz"]["sequencial"])

    print("\n== Pares proibidos (devem reprovar) ==")
    for p in t["regras"]["paresProibidos"]:
        r = contraste(p["texto"], p["fundo"])
        ok = "confirmado" if r < MIN_CORPO else "INESPERADO — revise a regra"
        print(f"  {p['texto']} sobre {p['fundo']}  {r:6.2f}:1  {ok}")

    print(f"\n{'FALHAS: ' + str(falhas) if falhas else 'Tudo dentro do padrão.'}")
    return 1 if falhas else 0


def _rampa(cores) -> int:
    lums = [luminancia(c) for c in cores]
    problemas = 0
    for i, (c, l) in enumerate(zip(cores, lums)):
        marca = ""
        if i and lums[i] >= lums[i - 1]:
            marca = "  <-- quebra a ordem"
            problemas += 1
        print(f"  {c}  L={l:.4f}{marca}")
    if not problemas:
        print("  monotônica (claro -> escuro)")
    return problemas


def main() -> int:
    args = sys.argv[1:]
    if not args or args[0] in ("-h", "--help"):
        print(__doc__)
        return 0
    if args[0] == "--auditoria":
        return auditoria()
    if args[0] == "--rampa":
        return _rampa([c.strip() for c in args[1].split(",")])
    if len(args) >= 2:
        r = contraste(args[0], args[1])
        print(f"{args[0]} sobre {args[1]}: {r:.2f}:1  {nivel(r)}")
        print(f"corpo (>= {MIN_CORPO}): {'passa' if r >= MIN_CORPO else 'reprova'} | "
              f"texto grande (>= {MIN_GRANDE}): {'passa' if r >= MIN_GRANDE else 'reprova'}")
        return 0 if r >= MIN_GRANDE else 1
    print(__doc__)
    return 1


if __name__ == "__main__":
    sys.exit(main())
