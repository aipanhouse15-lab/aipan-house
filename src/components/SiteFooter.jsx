import Link from 'next/link'
import Motif from './Motif'
import Logo from './Logo'

export default function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-slate text-slate-mute">
      {/* ridge line */}
      <svg className="absolute left-0 top-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,80 L180,40 L360,72 L560,36 L760,74 L960,40 L1180,74 L1380,44 L1440,64 L1440,80Z" fill="#1a2730" />
      </svg>

      <div className="relative z-10 mx-auto max-w-content px-6 pb-10 pt-24 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <Logo variant="reverse" size={36} />
              <span className="font-head text-lg font-extrabold text-rice">Aipan House</span>
            </div>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-slate-mute">
              The home of Kumaoni art, festivals and heritage — written from the Kumaon Himalaya,
              in Dehradun, Uttarakhand.
            </p>
          </div>

          {/* explore */}
          <div>
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[.12em] text-gold">Explore</h4>
            <ul className="mt-4 space-y-2.5 font-sans text-sm">
              <li><Link href="/aipan" className="hover:text-rice">Aipan art</Link></li>
              <li><Link href="/festivals" className="hover:text-rice">Festivals</Link></li>
              <li><Link href="/traditions" className="hover:text-rice">Traditions</Link></li>
            </ul>
          </div>

          {/* about */}
          <div>
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[.12em] text-gold">The project</h4>
            <ul className="mt-4 space-y-2.5 font-sans text-sm">
              <li><Link href="/about" className="hover:text-rice">About & methodology</Link></li>
              <li><Link href="/contact" className="hover:text-rice">Contact us</Link></li>
            </ul>
          </div>

          {/* newsletter / connect */}
          <div>
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[.12em] text-gold">Stay in touch</h4>
            <p className="mt-4 font-body text-sm leading-relaxed">A letter from the hills now and then — new writing, no noise.</p>
            <form className="mt-3 flex gap-2" action="#" method="post">
              <input type="email" placeholder="your email" aria-label="Email"
                className="w-full rounded-full border border-rice/25 bg-transparent px-4 py-2 font-sans text-sm text-rice placeholder:text-slate-mute focus:border-gold focus:outline-none" />
              <button type="submit" className="rounded-full bg-gold px-4 py-2 font-sans text-[13px] font-semibold text-slate">Join</button>
            </form>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-wider md:flex-row md:items-center">
          <span>© {year} Aipan House · Tallyard Ventures · Dehradun, Uttarakhand</span>
          <span className="flex gap-5">
            <a href="https://instagram.com" className="hover:text-rice">Instagram</a>
            <a href="https://pinterest.com" className="hover:text-rice">Pinterest</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
