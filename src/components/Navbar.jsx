'use client'
import Link from 'next/link'
import { useState } from 'react'

const NAV = [
  { label: 'Aipan', href: '/aipan' },
  { label: 'Festivals', href: '/festivals' },
  { label: 'Traditions', href: '/traditions' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-sand/70 bg-rice/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-geru/30">
            <span className="h-2.5 w-2.5 rotate-45 bg-geru transition-transform group-hover:rotate-[135deg]" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-geru-deep">
            Aipan House
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className="font-sans text-sm font-medium text-ink/70 transition-colors hover:text-geru"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span className="h-0.5 w-5 bg-geru-deep" />
          <span className="h-0.5 w-5 bg-geru-deep" />
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-sand/70 px-6 py-3 md:hidden">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                onClick={() => setOpen(false)}
                className="block py-2 font-sans text-sm font-medium text-ink/80"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
