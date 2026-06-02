'use client'
import Link from 'next/link'
import { useState } from 'react'

const EXPLORE = [
  { label: 'Aipan — the folk art', href: '/aipan', desc: 'Motifs, meaning & method', shape: '◆' },
  { label: 'Festivals of the year', href: '/festivals', desc: 'The Kumaoni calendar', shape: '✦' },
  { label: 'Life & traditions', href: '/traditions', desc: 'Food, dress, music & language', shape: '❋' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)      // mobile menu
  const [drop, setDrop] = useState(false)      // explore dropdown

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9e4da] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-3.5 md:px-10">
        {/* brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-geru/30">
            <span className="h-2.5 w-2.5 rotate-45 bg-geru transition-transform group-hover:rotate-[135deg]" />
          </span>
          <span className="font-head text-lg font-extrabold tracking-tight text-geru">Aipan House</span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          <div className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
            <button className="flex items-center gap-1.5 font-sans text-[14px] font-semibold text-slate-soft hover:text-geru">
              Explore
              <svg width="10" height="10" viewBox="0 0 10 10" className={`transition-transform ${drop ? 'rotate-180' : ''}`}><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {drop && (
              <div className="absolute left-1/2 top-full w-[320px] -translate-x-1/2 pt-3">
                <div className="overflow-hidden rounded-2xl border border-[#e9e4da] bg-white shadow-[0_20px_60px_rgba(35,50,62,.12)]">
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
          <Link href="/about" className="font-sans text-[14px] font-semibold text-slate-soft hover:text-geru">About</Link>
          <Link href="/contact" className="rounded-full bg-geru px-5 py-2 font-sans text-[13px] font-semibold text-rice transition-colors hover:bg-geru-deep">Contact us</Link>
        </nav>

        {/* mobile toggle */}
        <button onClick={() => setOpen(!open)} className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden" aria-label="Menu">
          <span className={`h-0.5 w-5 bg-geru transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-0.5 w-5 bg-geru transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-5 bg-geru transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="border-t border-[#e9e4da] px-6 py-3 md:hidden">
          {EXPLORE.map((e) => (
            <Link key={e.href} href={e.href} onClick={() => setOpen(false)} className="block py-2.5 font-head text-[15px] font-bold text-ink">{e.label}</Link>
          ))}
          <Link href="/about" onClick={() => setOpen(false)} className="block border-t border-[#f2efe9] py-2.5 font-sans text-[14px] font-semibold text-slate-soft">About</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 block rounded-full bg-geru px-5 py-2.5 text-center font-sans text-[13px] font-semibold text-rice">Contact us</Link>
        </div>
      )}
    </header>
  )
}
