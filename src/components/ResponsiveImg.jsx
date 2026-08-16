// Shared <picture> wrapper. Serves responsive WebP widths with a JPEG fallback.
//
// scripts/optimize-images.py writes name-600.webp / name-1000.webp / name-1400.webp
// alongside every name.jpg in /public/images. The JPEG stays as the fallback for the
// small share of clients without WebP, and remains the og:image for social cards.

import manifest from '@/lib/image-manifest.json'

export function webpSrcSet(src) {
  if (typeof src !== 'string') return null
  const base = src.replace(/\.(jpe?g|png)$/i, '')
  if (base === src) return null // not a raster we generated derivatives for
  // Only emit widths that actually exist. Smaller sources get fewer derivatives
  // (we never upscale), and referencing a missing width would 404.
  const widths = manifest[base.split('/').pop()]
  if (!widths || widths.length === 0) return null
  return widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ')
}

export default function ResponsiveImg({
  src,
  alt = '',
  sizes = '(max-width: 768px) 100vw, 700px',
  width = 1400,
  height = 1120,
  priority = false,
  className = '',
}) {
  if (!src) return null
  const srcSet = webpSrcSet(src)
  return (
    <picture>
      {srcSet && <source type="image/webp" srcSet={srcSet} sizes={sizes} />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' } : {})}
        className={className}
      />
    </picture>
  )
}
