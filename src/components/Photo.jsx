// Real-photo blocks for articles.
import ResponsiveImg from './ResponsiveImg'

export function Photo({ src, alt, caption, priority = false }) {
  if (!src) return null
  return (
    <figure className="my-8">
      <ResponsiveImg
        src={src}
        alt={alt || ''}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 680px"
        className="h-auto w-full rounded-2xl border border-[#e7e2da] object-cover"
      />
      {caption && <figcaption className="mt-3 text-center font-sans text-[13px] text-slate-mute">{caption}</figcaption>}
    </figure>
  )
}

// Two photos side by side (e.g. materials).
//
// IMPORTANT: takes flat scalar props, not objects. Object-valued props (a={{...}}) do NOT
// survive next-mdx-remote/rsc — they arrive undefined and the images render empty, which is
// exactly what happened on /aipan/what-is-aipan. The legacy a/b object form is still accepted
// so older MDX does not break, but new content should use the scalar props.
function asObj(v) {
  if (typeof v === 'string') {
    try { return JSON.parse(v) } catch { return {} }
  }
  return v || {}
}

export function PhotoPair({ aSrc, aAlt, aCaption, bSrc, bAlt, bCaption, a, b }) {
  const la = asObj(a)
  const lb = asObj(b)
  const items = [
    { src: aSrc || la.src, alt: aAlt || la.alt, caption: aCaption || la.caption },
    { src: bSrc || lb.src, alt: bAlt || lb.alt, caption: bCaption || lb.caption },
  ].filter((p) => p.src)

  if (items.length === 0) return null

  return (
    <div className="my-8 grid gap-4 sm:grid-cols-2">
      {items.map((p, i) => (
        <figure key={p.src || i} className="m-0">
          <ResponsiveImg
            src={p.src}
            alt={p.alt || ''}
            width={1200}
            height={960}
            sizes="(max-width: 640px) 100vw, 340px"
            className="aspect-[4/3] w-full rounded-xl border border-[#e7e2da] object-cover"
          />
          {p.caption && <figcaption className="mt-2 text-center font-sans text-[12px] text-slate-mute">{p.caption}</figcaption>}
        </figure>
      ))}
    </div>
  )
}
