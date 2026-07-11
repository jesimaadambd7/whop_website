#!/usr/bin/env python3
"""Generate animated portfolio preview GIF with UGC-style creator figure."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

W, H = 640, 360
FRAMES = 24
DURATION_MS = 90
OUT = Path(__file__).resolve().parents[1] / "public/assets/creators/portfolio-preview.gif"


def bbox(*coords: float) -> list[int]:
    return [int(round(c)) for c in coords]


def make_background(t: float) -> Image.Image:
    img = Image.new("RGBA", (W, H), (2, 6, 23, 255))
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)

    cx = W * (0.28 + 0.04 * math.sin(t * 2 * math.pi))
    cy = H * 0.22
    for radius, alpha in ((220, 95), (160, 70), (100, 45)):
        draw.ellipse(
            bbox(cx - radius, cy - radius, cx + radius, cy + radius),
            fill=(0, 168, 255, alpha),
        )

    glow = glow.filter(ImageFilter.GaussianBlur(28))
    img = Image.alpha_composite(img, glow)

    # floor wash
    floor = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    fd = ImageDraw.Draw(floor)
    fd.rectangle([0, int(H * 0.55), W, H], fill=(8, 47, 73, 120))
    img = Image.alpha_composite(img, floor)
    return img


def draw_creator(draw: ImageDraw.ImageDraw, t: float) -> None:
    bob = 3 * math.sin(t * 2 * math.pi)
    sway = 4 * math.sin(t * 2 * math.pi + 0.6)
    cx = int(W * 0.5 + sway)
    cy = int(H * 0.46 + bob)

    # soft spotlight behind subject
    draw.ellipse(bbox(cx - 95, cy - 120, cx + 95, cy + 95), fill=(0, 168, 255, 35))

    # torso
    draw.rounded_rectangle(
        bbox(cx - 52, cy + 8, cx + 52, cy + 118),
        radius=26,
        fill=(15, 23, 42, 255),
    )
    draw.rounded_rectangle(
        bbox(cx - 36, cy + 20, cx - 6, cy + 100),
        radius=16,
        fill=(0, 168, 255, 55),
    )

    # neck + head
    draw.rounded_rectangle(bbox(cx - 12, cy - 8, cx + 12, cy + 16), radius=8, fill=(203, 173, 154, 255))
    hx, hy = cx, int(cy - 34)
    draw.ellipse(bbox(hx - 34, hy - 34, hx + 34, hy + 34), fill=(226, 198, 178, 255))

    # hair
    draw.pieslice(bbox(hx - 36, hy - 38, hx + 36, hy + 10), 200, 340, fill=(20, 20, 24, 255))
    draw.rectangle(bbox(hx - 34, hy - 36, hx + 34, hy - 4), fill=(20, 20, 24, 255))

    # face shading
    draw.ellipse(bbox(hx - 16, hy - 2, hx + 18, hy + 24), fill=(188, 158, 140, 120))

    # blink
    blink = (math.sin(t * 2 * math.pi * 2.4) + 1) / 2
    eye_h = 5 if blink > 0.1 else 1
    for ex in (-11, 11):
        draw.ellipse(bbox(hx + ex - 4, hy + 2 - eye_h / 2, hx + ex + 4, hy + 2 + eye_h / 2), fill=(25, 25, 30, 255))
        if eye_h > 3:
            draw.ellipse(bbox(hx + ex - 1.5, hy + 1, hx + ex + 1.5, hy + 3), fill=(255, 255, 255, 255))

    # talking mouth
    talk = (math.sin(t * 2 * math.pi * 5) + 1) / 2
    mw = 8 + 5 * talk
    mh = 2 + 4 * talk
    draw.rounded_rectangle(bbox(hx - mw / 2, hy + 18, hx + mw / 2, hy + 18 + mh), radius=2, fill=(140, 72, 72, 255))

    # phone in right hand (UGC creator)
    px = int(cx + 58 + 3 * math.sin(t * 2 * math.pi + 0.3))
    py = int(cy + 42 + 2 * math.cos(t * 2 * math.pi))
    draw.rounded_rectangle(bbox(px, py, px + 24, py + 42), radius=5, fill=(10, 15, 25, 255), outline=(56, 189, 248, 255), width=2)
    draw.rounded_rectangle(bbox(px + 4, py + 6, px + 20, py + 32), radius=3, fill=(0, 168, 255, 220))

    # left hand gesture
    lx = int(cx - 62 + 2 * math.sin(t * 2 * math.pi + 1.1))
    ly = int(cy + 52)
    draw.ellipse(bbox(lx - 10, ly - 10, lx + 10, ly + 10), fill=(226, 198, 178, 255))


def draw_overlay(draw: ImageDraw.ImageDraw, t: float) -> None:
    # subtle scanlines
    for y in range(0, H, 4):
        draw.line([(0, y), (W, y)], fill=(255, 255, 255, 8))

    # progress bar
    bar_w = int(W * 0.62)
    x0 = (W - bar_w) // 2
    y0 = H - 18
    draw.rounded_rectangle([x0, y0, x0 + bar_w, y0 + 3], radius=2, fill=(255, 255, 255, 30))
    fill = int(bar_w * (0.45 + 0.2 * math.sin(t * 2 * math.pi)))
    draw.rounded_rectangle([x0, y0, x0 + fill, y0 + 3], radius=2, fill=(125, 211, 252, 255))


def main() -> None:
    rgba_frames: list[Image.Image] = []

    for i in range(FRAMES):
        t = i / FRAMES
        frame = make_background(t)
        draw = ImageDraw.Draw(frame)
        draw_creator(draw, t)
        draw_overlay(draw, t)

        # vignette
        vig = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        vd = ImageDraw.Draw(vig)
        vd.rectangle([0, 0, W, H], fill=(0, 0, 0, 0))
        for y in range(H):
            alpha = int(min(90, max(0, (y - H * 0.75) * 0.9))) if y > H * 0.55 else 0
            if alpha:
                vd.line([(0, y), (W, y)], fill=(0, 0, 0, alpha))
        rgba_frames.append(Image.alpha_composite(frame, vig))

    # shared palette prevents flicker between frames
    reference = rgba_frames[0].convert("RGB").quantize(colors=256, method=Image.Quantize.MEDIANCUT)
    palettized = [f.convert("RGB").quantize(palette=reference) for f in rgba_frames]

    OUT.parent.mkdir(parents=True, exist_ok=True)
    palettized[0].save(
        OUT,
        save_all=True,
        append_images=palettized[1:],
        duration=DURATION_MS,
        loop=0,
        optimize=True,
    )
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
