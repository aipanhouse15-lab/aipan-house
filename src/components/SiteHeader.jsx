'use client'
import Link from 'next/link'
import { useState } from 'react'
import Logo from './Logo'

const EXPLORE = [
  { label: 'Aipan — the folk art', href: '/aipan', desc: 'Motifs, meaning & method', shape: '◆' },
  { label: 'Festivals of the year', href: '/festivals', desc: 'The Kumaoni calendar', shape: '✦' },
  { label: 'Life & traditions', href: '/traditions', desc: 'Food, dress, music & language', shape: '❋' },
]

// transparent=true → overlay with light text (sits over a colored banner)
export default function SiteHeader({ transparent = false }) {
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)
  const light = transparent  // light text when transparent

  const wrap = transparent
    ? 'absolute left-0 right-0 top-0 z-50 bg-transparent'
    : 'sticky top-0 z-50 border-b border-[#e9e4da] bg-white/90 backdrop-blur-md'
  const brandTxt = light ? 'text-white' : 'text-geru'
  const brandRing = light ? 'border-white/50' : 'border-geru/30'
  const brandDot = light ? 'bg-white' : 'bg-geru'
  const navTxt = light ? 'text-white/90 hover:text-white' : 'text-slate-soft hover:text-geru'
  const contactCls = light
    ? 'bg-white/15 text-white ring-1 ring-white/40 hover:bg-white/25'
    : 'bg-geru text-rice hover:bg-geru-deep'
  const barCls = light ? 'bg-white' : 'bg-geru'

  return (
    <header className={wrap}>
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-3.5 md:px-10">
        <Link href="/" className="group flex items-center gap-2.5">
          <Logo variant={light ? 'reverse' : 'primary'} size={34} className="transition-transform group-hover:scale-105" />
          <span className={`font-head text-lg font-extrabold tracking-tight ${brandTxt}`}>Aipan House</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <div className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
            <button className={`flex items-center gap-1.5 font-sans text-[14px] font-semibold ${navTxt}`}>
              Explore
              <svg width="10" height="10" viewBox="0 0 10 10" className={`transition-transform ${drop ? 'rotate-180' : ''}`}><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {drop && (
              <div className="absolute left-1/2 top-full w-[320px] -translate-x-1/2 pt-3">
                <div className="overflow-hidden rounded-2xl border border-[#e9e4da] bg-white shadow-[0_20px_60px_rgba(35,50,62,.18)]">
                  {EXPLORE.map((e) => (
                    <Link key={e.href} href={e.href} className="flex items-start gap-3 border-b border-[#f2efe9] px-5 py-3.5 last:border-0 hover:bg-[#FBF6EE]">
                      <span className="mt-0.5 text-geru">{e.shape}</span>
                      <span>
                        <span className="block font-head text-[15px] font-bold text-ink">{e.label}</span>
                        <span className="block font-sans text-[12px] text-slate-mute">{e.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/about" className={`font-sans text-[14px] font-semibold ${navTxt}`}>About</Link>
          <Link href="/contact" className={`rounded-full px-5 py-2 font-sans text-[13px] font-semibold transition-colors ${contactCls}`}>Contact us</Link>
        </nav>

        <button onClick={() => setOpen(!open)} className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden" aria-label="Menu">
          <span className={`h-0.5 w-5 transition-transform ${barCls} ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-0.5 w-5 transition-opacity ${barCls} ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-5 transition-transform ${barCls} ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-white/15 bg-black/20 px-6 py-3 backdrop-blur-md md:hidden">
          {EXPLORE.map((e) => (
            <Link key={e.href} href={e.href} onClick={() => setOpen(false)} className={`block py-2.5 font-head text-[15px] font-bold ${light ? 'text-white' : 'text-ink'}`}>{e.label}</Link>
          ))}
          <Link href="/about" onClick={() => setOpen(false)} className={`block border-t py-2.5 font-sans text-[14px] font-semibold ${light ? 'border-white/15 text-white/90' : 'border-[#f2efe9] text-slate-soft'}`}>About</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 block rounded-full bg-white px-5 py-2.5 text-center font-sans text-[13px] font-semibold text-geru">Contact us</Link>
        </div>
      )}
    </header>
  )
}
