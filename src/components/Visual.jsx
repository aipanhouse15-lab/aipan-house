import Motif from './Motif'

// tolerate props passed as JSON strings (MDX edge cases) or objects
function asObj(v) { if (typeof v === 'string') { try { return JSON.parse(v) } catch { return {} } } return v || {} }
function asArr(v) { if (typeof v === 'string') { try { return JSON.parse(v) } catch { return [] } } return Array.isArray(v) ? v : [] }

export function Plate({ shape = 'lotus', caption, label, accent = '#9E2B1E' }) {
  return (
    <figure className="my-8">
      <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl p-7" style={{ background: accent }}>
        <Motif shape={shape} size={170} stroke="#FBFDF8" sw={3} />
        {label && <div className="mt-3 font-mono text-[11px] uppercase tracking-[.14em] text-white/80">{label}</div>}
      </div>
      {caption && <figcaption className="mt-3 text-center font-sans text-[13px] text-slate-mute">{caption}</figcaption>}
    </figure>
  )
}

export function TwoUp({ accent = '#9E2B1E', a, b }) {
  const items = [asObj(a), asObj(b)]
  return (
    <div className="my-8 grid gap-4 sm:grid-cols-2">
      {items.map((it, i) => (
        <div key={i} className="rounded-xl border border-[#e7e2da] p-5">
          <div className="mb-3 flex justify-center rounded-lg p-4" style={{ background: accent }}>
            <Motif shape={it.shape || 'dotgrid'} size={88} stroke="#FBFDF8" sw={3} />
          </div>
          <div className="font-head text-base font-bold text-ink">{it.title}</div>
          <div className="mt-1 font-sans text-sm leading-relaxed text-slate-mute">{it.desc}</div>
        </div>
      ))}
    </div>
  )
}

export function Step({ n, title, children, shape, accent = '#9E2B1E' }) {
  return (
    <div className="my-5 flex gap-4 rounded-xl border border-[#e7e2da] p-4">
      <div className="flex flex-col items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-full font-head text-sm font-bold text-white" style={{ background: accent }}>{n}</span>
        {shape && <Motif shape={shape} size={52} stroke={accent} sw={3} />}
      </div>
      <div>
        <div className="font-head text-[15px] font-bold text-ink">{title}</div>
        <div className="mt-1 font-sans text-sm leading-relaxed text-slate-soft">{children}</div>
      </div>
    </div>
  )
}

export function MotifRow({ items = [], accent = '#9E2B1E' }) {
  const list = asArr(items)
  return (
    <div className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {list.map((it, i) => (
        <div key={i} className="flex flex-col items-center rounded-xl border border-[#e7e2da] p-3 text-center">
          <div className="flex w-full justify-center rounded-lg p-3" style={{ background: accent }}>
            <Motif shape={(it && it.shape) || 'lotus'} size={62} stroke="#FBFDF8" sw={3} />
          </div>
          <div className="mt-2 font-head text-[13px] font-bold text-ink">{it && it.name}</div>
          {it && it.note && <div className="font-sans text-[11px] text-slate-mute">{it.note}</div>}
        </div>
      ))}
    </div>
  )
}

export function Timeline({ items = [], accent = '#9E2B1E' }) {
  const list = asArr(items)
  return (
    <div className="my-8 overflow-hidden rounded-xl border border-[#e7e2da]">
      {list.map((it, i) => (
        <div key={i} className="flex items-baseline gap-4 border-b border-[#f0ece4] px-5 py-3 last:border-0">
          <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-wide" style={{ color: accent }}>{it && it.when}</span>
          <span className="font-sans text-sm text-slate-soft"><b className="font-semibold text-ink">{it && it.what}</b>{it && it.note ? ` — ${it.note}` : ''}</span>
        </div>
      ))}
    </div>
  )
}
