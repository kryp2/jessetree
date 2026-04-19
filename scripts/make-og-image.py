#!/usr/bin/env python3
"""Generate the 1200x630 Open Graph image for jessetree."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / "static" / "og-image.png"

W, H = 1200, 630
BG = (250, 247, 240)        # parchment
INK = (63, 46, 20)
INK_MUTED = (154, 123, 63)
BORDER = (230, 215, 173)

SERIF_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
SERIF_ITALIC = "/usr/share/fonts/opentype/urw-base35/URWBookman-LightItalic.otf"
SANS = "/usr/share/fonts/truetype/ubuntu/Ubuntu-R.ttf"

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

# Subtle top/bottom rule
d.rectangle([0, 0, W, 4], fill=BORDER)
d.rectangle([0, H - 4, W, H], fill=BORDER)

# Tree glyph — simple centered Jesse Tree silhouette
tree_cx, tree_cy = 200, H // 2
# Trunk
d.rectangle(
    [tree_cx - 6, tree_cy - 40, tree_cx + 6, tree_cy + 140],
    fill=INK,
)
# Branch lines
branches = [
    ((tree_cx, tree_cy - 10), (tree_cx - 80, tree_cy - 100)),
    ((tree_cx, tree_cy - 10), (tree_cx + 80, tree_cy - 100)),
    ((tree_cx, tree_cy - 40), (tree_cx - 120, tree_cy - 120)),
    ((tree_cx, tree_cy - 40), (tree_cx + 120, tree_cy - 120)),
    ((tree_cx, tree_cy - 70), (tree_cx - 60, tree_cy - 170)),
    ((tree_cx, tree_cy - 70), (tree_cx + 60, tree_cy - 170)),
]
for (x1, y1), (x2, y2) in branches:
    d.line([(x1, y1), (x2, y2)], fill=INK, width=6)

# Ornaments (dots — each one a "transaction")
ornaments = [
    (tree_cx - 80, tree_cy - 100),
    (tree_cx + 80, tree_cy - 100),
    (tree_cx - 120, tree_cy - 120),
    (tree_cx + 120, tree_cy - 120),
    (tree_cx - 60, tree_cy - 170),
    (tree_cx + 60, tree_cy - 170),
    (tree_cx, tree_cy - 200),
    (tree_cx - 95, tree_cy - 40),
    (tree_cx + 95, tree_cy - 40),
]
for cx, cy in ornaments:
    d.ellipse([cx - 10, cy - 10, cx + 10, cy + 10], fill=INK_MUTED)

# Ground line
d.line([(tree_cx - 140, tree_cy + 140), (tree_cx + 140, tree_cy + 140)], fill=INK, width=3)

# Text block, right of tree
text_x = 420
# Title
title_font = ImageFont.truetype(SERIF_BOLD, 120)
d.text((text_x, 140), "jessetree", fill=INK, font=title_font)

# Subtitle
sub_font = ImageFont.truetype(SANS, 28)
d.text((text_x, 290), "AN OPEN BIBLE, HUNG ON BITCOIN", fill=INK_MUTED, font=sub_font)

# Quote
quote_font = ImageFont.truetype(SERIF_ITALIC, 34)
lines = [
    "“A shoot will come up from the stump",
    "of Jesse; from his roots a Branch",
    "will bear fruit.”",
]
for i, line in enumerate(lines):
    d.text((text_x, 360 + i * 48), line, fill=INK, font=quote_font)

# Attribution of the quote
attr_font = ImageFont.truetype(SANS, 22)
d.text((text_x, 520), "— Isaiah 11:1", fill=INK_MUTED, font=attr_font)

# Footer
foot_font = ImageFont.truetype(SANS, 20)
d.text((text_x, 560), "11 translations · 320,494 verses · on-chain", fill=INK_MUTED, font=foot_font)

img.save(OUT, "PNG", optimize=True)
print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")
