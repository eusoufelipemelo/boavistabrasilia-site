#!/usr/bin/env python3
"""
Gera as imagens de compartilhamento (1200x630) com o logo branco da marca, uma frase
e uma foto real do cliente ao fundo.

Uso: python3 scripts/gerar-og.py <caminho-do-Manrope[wght].ttf>
Saída: public/compartilhamento.jpg, public/og/*.jpg e public/og/projetos/*.jpg
"""
import os
import sys
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, "public")
FONT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "scripts", "Manrope.ttf")
W, H = 1200, 630

# (arquivo de saída, foto de fundo, frase)
CARDS = [
    ("compartilhamento.jpg", "fotos/hero-desktop-a.jpg", "Móveis planejados de alto padrão em Brasília"),
    ("og/servicos.jpg", "fotos/gaveta-mao.jpg", "Do projeto à montagem, com quem acompanha cada etapa"),
    ("og/projetos.jpg", "fotos/cozinha-madeira.jpg", "Ambientes planejados sob medida em Brasília"),
    ("og/sobre.jpg", "fotos/socios-sofa.jpg", "Três sócios, uma loja e um jeito de fazer"),
    ("og/contato.jpg", "fotos/vista-brasilia.jpg", "Vamos conversar sobre o seu ambiente"),
    ("og/projetos/cozinha.jpg", "ambientes/cozinha-1.jpg", "Cozinha planejada em Brasília"),
    ("og/projetos/closet.jpg", "ambientes/closet-1.jpg", "Closet planejado em Brasília"),
    ("og/projetos/dormitorio.jpg", "ambientes/dormitorio-1.jpg", "Dormitório planejado em Brasília"),
    ("og/projetos/home-office.jpg", "ambientes/home-office-1.jpg", "Home office planejado em Brasília"),
    ("og/projetos/sala-e-home-theater.jpg", "ambientes/sala-2.jpg", "Sala e home theater planejados em Brasília"),
    ("og/projetos/banheiro-e-lavabo.jpg", "ambientes/banheiro-1.jpg", "Banheiro e lavabo planejados em Brasília"),
]


def cover(im: Image.Image) -> Image.Image:
    """Recorta a foto preenchendo 1200x630."""
    r = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    x, y = (im.width - W) // 2, (im.height - H) // 2
    return im.crop((x, y, x + W, y + H))


def wrap(draw, text, font, max_width):
    words, lines, line = text.split(), [], ""
    for w in words:
        test = f"{line} {w}".strip()
        if draw.textlength(test, font=font) <= max_width:
            line = test
        else:
            lines.append(line)
            line = w
    if line:
        lines.append(line)
    return lines


def main():
    logo = Image.open(os.path.join(PUB, "marca", "boa-vista-branco.png")).convert("RGBA")
    logo.thumbnail((360, 360), Image.LANCZOS)
    title = ImageFont.truetype(FONT, 62)
    title.set_variation_by_name("Medium")

    for out, photo, phrase in CARDS:
        base = cover(Image.open(os.path.join(PUB, photo)).convert("RGB"))
        # escurece de baixo para cima, para o texto branco ter contraste
        veil = Image.new("L", (1, H))
        for y in range(H):
            veil.putpixel((0, y), int(30 + 200 * (y / H) ** 1.5))
        veil = veil.resize((W, H))
        base = Image.composite(Image.new("RGB", (W, H), (32, 30, 30)), base, veil.point(lambda v: v))
        draw = ImageDraw.Draw(base)
        base.paste(logo, (64, 60), logo)
        lines = wrap(draw, phrase, title, W - 128)
        y = H - 72 - len(lines) * 74
        for line in lines:
            draw.text((64, y), line, font=title, fill=(255, 255, 255))
            y += 74
        path = os.path.join(PUB, out)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        base.save(path, "JPEG", quality=84, optimize=True, progressive=True)
        print(out, round(os.path.getsize(path) / 1024), "KB")


if __name__ == "__main__":
    main()
