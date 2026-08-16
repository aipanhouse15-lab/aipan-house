import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-sand bg-ivory/60">
      <div className="mx-auto grid max-w-content gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-full border border-geru/30">
              <span className="h-2 w-2 rotate-45 bg-geru" />
            </span>
            <span className="font-display text-lg font-semibold text-geru-deep">Aipan House</span>
          </div>
          <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-clay">
            The digital home of Kumaoni art, culture and heritage — written from the Kumaon
            Himalaya, in Nainital, Uttarakhand.
          </p>
        </div>

        <div>
          <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-taupe">Explore</h4>
          <ul className="mt-4 space-y-2.5 font-sans text-sm text-ink/75">
            <li><Link href="/aipan" className="hover:text-geru">Aipan Art</Link></li>
            <li><Link href="/festivals" className="hover:text-geru">Festivals of Uttarakhand</Link></li>
            <li><Link href="/traditions" className="hover:text-geru">Kumaoni Traditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-taupe">About</h4>
          <ul className="mt-4 space-y-2.5 font-sans text-sm text-ink/75">
            <li><Link href="/about" className="hover:text-geru">Our Methodology</Link></li>
            <li><Link href="/contact" className="hover:text-geru">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sand">
        <p className="mx-auto max-w-content px-6 py-5 font-sans text-xs text-taupe">
          © {new Date().getFullYear()} Aipan House · Nainital, Uttarakhand
        </p>
      </div>
    </footer>
  )
}
