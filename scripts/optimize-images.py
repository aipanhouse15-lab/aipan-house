#!/usr/bin/env python3
"""
Optimise every image in public/images.

For each source .jpg it writes:
  name.jpg              full-size JPEG fallback (also the og:image / social card)
  name-600.webp         responsive WebP widths for <picture>/srcset
  name-1000.webp
  name-1400.webp

Phones were downloading 1400px files to paint them at ~380 CSS px. The srcset lets
the browser pick a width that matches the device instead.

Run:  python3 scripts/optimize-images.py
"""
import os, glob, json
from PIL import Image

SRC = 'public/images'
WIDTHS = [400, 700, 1000, 1400]
FULL_W = 1400
JPEG_QUALITY = 74
WEBP_QUALITY = 72

def human(n): return f'{n/1024:.0f} KB'

# clean previously generated derivatives so reruns are idempotent
for f in glob.glob(f'{SRC}/*.webp'):
    os.remove(f)

before = after_full = 0
per_width = {w: 0 for w in WIDTHS}
count = 0
manifest = {}

for path in sorted(glob.glob(f'{SRC}/*.jpg')):
    before += os.path.getsize(path)
    base = os.path.splitext(path)[0]
    im = Image.open(path).convert('RGB')

    full = im if im.width <= FULL_W else im.resize(
        (FULL_W, round(im.height * FULL_W / im.width)), Image.LANCZOS)
    full.save(path, 'JPEG', quality=JPEG_QUALITY, optimize=True,
              progressive=True, subsampling='4:2:0')
    after_full += os.path.getsize(path)

    made = []
    for w in WIDTHS:
        # never upscale: a 1200px source gets no 1400px derivative, and the manifest
        # records that so the component does not emit a srcset entry that 404s.
        if w > full.width:
            continue
        r = full if full.width == w else full.resize(
            (w, round(full.height * w / full.width)), Image.LANCZOS)
        out = f'{base}-{w}.webp'
        r.save(out, 'WEBP', quality=WEBP_QUALITY, method=6)
        per_width[w] += os.path.getsize(out)
        made.append(w)
    manifest[os.path.basename(base)] = made
    count += 1

with open('src/lib/image-manifest.json', 'w') as fh:
    json.dump(manifest, fh, indent=0, sort_keys=True)

print(f'{count} source images')
print(f'  JPEG fallbacks : {human(before)} -> {human(after_full)}')
for w in WIDTHS:
    print(f'  WebP @{w:>5}px : {human(per_width[w])}  (avg {human(per_width[w]/count)}/image)')
