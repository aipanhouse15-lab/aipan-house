'use client'
import { useState } from 'react'
import Link from 'next/link'

// 12 Kumaoni months; festivals carry a slug to link out
const MONTHS = [
  { m: 'CHAITRA', f: 'Phool Dei', slug: 'phool-dei', d: 'Children scatter spring flowers on every threshold.' },
  { m: 'BAISAKH', f: 'Bikhauti', slug: null, d: 'The Syalde fair and the spring bathing rites.' },
  { m: 'JETH', f: '', d: 'The dry heat before the rains — fields prepared.' },
  { m: 'ASARH', f: '', d: 'First clouds gather over the high ridges.' },
  { m: 'SHRAVAN', f: 'Harela', slug: 'harela', d: 'Seven grains sown; the Kumaoni new year turns green.' },
  { m: 'BHADO', f: 'Ghee Sankranti', slug: 'ghee-sankranti', d: 'Olgia — a harvest gratitude of ghee-rich food.' },
  { m: 'ASOJ', f: 'Khatarua', slug: null, d: 'A seasonal bonfire marking the harvest.' },
  { m: 'KARTIK', f: 'Egaas Bagwal', slug: null, d: 'Diwali, eleven days later, with Bhailo fire-twirling.' },
  { m: 'MANGSIR', f: '', d: 'The cold settles; weddings and home rites begin.' },
  { m: 'POUSH', f: '', d: 'Deep winter in the hills, hearth season.' },
  { m: 'MAGH', f: 'Uttarayani', slug: 'ghughutiya', d: 'Ghughutia — necklaces of sweet fried flour for the crows.' },
  { m: 'PHAGUN', f: 'Kumaoni Holi', slug: 'kumaoni-holi', d: 'Baithki and Khari — the long musical Holi of Kumaon.' },
]
const cx = 300, cy = 300, rO = 270, rI = 140
const pol = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)]

export default function AlmanacWheel() {
  const [sel, setSel] = useState(4)
  const mo = MONTHS[sel]

  return (
    <div className="relative flex w-full justify-center">
      {/* Desktop / tablet: the wheel */}
      <div className="relative hidden items-center justify-center sm:flex">
        <svg viewBox="0 0 600 600" className="h-auto w-[84vw] max-w-[480px]">
          <circle cx="300" cy="300" r="284" fill="#F0E8D6" />
          {MONTHS.map((m, i) => {
            const a0 = (i / 12) * 2 * Math.PI - Math.PI / 2 - Math.PI / 12
            const a1 = ((i + 1) / 12) * 2 * Math.PI - Math.PI / 2 - Math.PI / 12
            const [x0, y0] = pol(rO, a0), [x1, y1] = pol(rO, a1)
            const [x2, y2] = pol(rI, a1), [x3, y3] = pol(rI, a0)
            const mid = (a0 + a1) / 2
            const [tx, ty] = pol((rO + rI) / 2, mid)
            const deg = (mid * 180) / Math.PI
            const active = i === sel
            return (
              <g key={i} onClick={() => setSel(i)} className="cursor-pointer">
                <path
                  d={`M${x0},${y0} A${rO},${rO} 0 0,1 ${x1},${y1} L${x2},${y2} A${rI},${rI} 0 0,0 ${x3},${y3} Z`}
                  fill={active ? '#9E2B1E' : m.f ? '#E4C99A' : '#C7D2BE'}
                  stroke="#F0E8D6" strokeWidth="2.5"
                  className="transition-colors"
                />
                <text x={tx} y={ty} textAnchor="middle" transform={`rotate(${deg + 90} ${tx} ${ty})`}
                  className="font-mono" style={{ fontSize: 9, fill: active ? '#FBF6EE' : '#6a5436', letterSpacing: '.04em' }}>
                  {m.m}
                </text>
              </g>
            )
          })}
          <circle cx="300" cy="300" r={rI - 4} fill="#FBF5E9" stroke="#E4C99A" strokeWidth="2" />
          <g transform="translate(300 178)" fill="none" stroke="#9E2B1E" strokeWidth="2">
            <path d="M-16,10 L0,-12 L16,10 Z" /><path d="M-6,1 L0,-8 L6,1" />
          </g>
        </svg>
        <div className="pointer-events-none absolute w-[230px] text-center">
          <div className="font-mono text-[11px] uppercase tracking-[.16em] text-geru">{mo.m}</div>
          {mo.f ? (
            <>
              <div className="mt-1.5 font-display text-2xl leading-tight text-[#3a2a18]">{mo.f}</div>
              <div className="mt-2 text-xs leading-snug text-[#6a5436]">{mo.d}</div>
              {mo.slug && (
                <Link href={`/festivals/${mo.slug}`} className="pointer-events-auto mt-3 inline-block rounded-full border border-[#c9a06a] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-geru hover:bg-geru hover:text-rice">
                  Read the festival →
                </Link>
              )}
            </>
          ) : (
            <>
              <div className="mt-1.5 font-display text-2xl text-[#a8895c]">— a quiet month —</div>
              <div className="mt-2 text-xs leading-snug text-[#6a5436]">{mo.d}</div>
            </>
          )}
        </div>
      </div>

      {/* Mobile: clean vertical month list (no overlap) */}
      <ul className="w-full max-w-sm divide-y divide-[#e3d6bf] sm:hidden">
        {MONTHS.filter((m) => m.f).map((m) => (
          <li key={m.m}>
            {m.slug ? (
              <Link href={`/festivals/${m.slug}`} className="flex items-baseline justify-between gap-3 py-3">
                <span><span className="font-mono text-[11px] uppercase tracking-wider text-geru">{m.m}</span>
                  <span className="ml-2 font-display text-lg text-[#3a2a18]">{m.f}</span></span>
                <span className="font-mono text-[11px] text-[#a8895c]">→</span>
              </Link>
            ) : (
              <div className="py-3"><span className="font-mono text-[11px] uppercase tracking-wider text-geru">{m.m}</span>
                <span className="ml-2 font-display text-lg text-[#3a2a18]">{m.f}</span></div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
