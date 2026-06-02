'use client'
import { useEffect, useState } from 'react'

const BANDS = [
  { id: 'peak', label: 'The high snows · myth' },
  { id: 'temple', label: 'The temple · Aipan' },
  { id: 'village', label: 'The village · the year' },
  { id: 'valley', label: 'The valley · food & life' },
]

export default function ElevationTracker() {
  const [active, setActive] = useState('valley')
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.5 }
    )
    BANDS.forEach((b) => { const el = document.getElementById(b.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])
  return (
    <div className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-3.5 md:flex">
      {BANDS.map((b) => (
        <a key={b.id} href={`#${b.id}`} style={{ mixBlendMode: 'difference' }}
          className={`flex items-center gap-2 text-[11px] tracking-wide ${active === b.id ? 'font-bold text-white' : 'text-white/50'}`}>
          <span>{b.label}</span>
          <span className="h-[7px] w-[7px] rounded-full bg-current" />
        </a>
      ))}
    </div>
  )
}
