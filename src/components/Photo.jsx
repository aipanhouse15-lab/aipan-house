// Real-photo blocks for articles. Plain <img> (works in MDX/RSC without next/image config).

export function Photo({ src, alt, caption }) {
  return (
    <figure className="my-8">
      <img src={src} alt={alt} loading="lazy"
        className="w-full rounded-2xl border border-[#e7e2da] object-cover" />
      {caption && <figcaption className="mt-3 text-center font-sans text-[13px] text-slate-mute">{caption}</figcaption>}
    </figure>
  )
}

// Two photos side by side (e.g. materials)
function asObj(v) { if (typeof v === 'string') { try { return JSON.parse(v) } catch { return {} } } return v || {} }
export function PhotoPair({ a, b }) {
  const items = [asObj(a), asObj(b)]
  return (
    <div className="my-8 grid gap-4 sm:grid-cols-2">
      {items.map((p, i) => (
        <figure key={i} className="m-0">
          <img src={p.src} alt={p.alt} loading="lazy"
            className="aspect-[4/3] w-full rounded-xl border border-[#e7e2da] object-cover" />
          {p.caption && <figcaption className="mt-2 text-center font-sans text-[12px] text-slate-mute">{p.caption}</figcaption>}
        </figure>
      ))}
    </div>
  )
}
