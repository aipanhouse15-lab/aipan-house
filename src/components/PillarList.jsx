import Link from 'next/link'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import Motif from './Motif'

export default function PillarList({ title, intro, pillar, items }) {
  return (
    <>
      <section className="relative px-6 pb-12 pt-28 md:px-10 md:pt-32" style={{ background: '#9E2B1E', color: '#FBF6EE' }}>
        <SiteHeader transparent />
        <div className="mx-auto max-w-content">
          <h1 className="font-head text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-3 max-w-2xl font-body text-lg leading-relaxed opacity-90">{intro}</p>
        </div>
      </section>
      <section className="mx-auto max-w-content px-6 py-12 md:px-10">
        {items.length === 0 ? (
          <p className="font-body text-slate-mute">Entries coming soon.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((a) => {
              const accent = a.accent || '#9E2B1E'
              return (
                <Link key={a.slug} href={`/${pillar}/${a.slug}`}
                  className="group overflow-hidden rounded-xl border border-[#e7e2da] bg-white transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-28 items-center justify-center" style={{ background: accent }}>
                    <Motif shape={a.motif || 'lotus'} size={74} stroke="#FBFDF8" sw={4} />
                  </div>
                  <div className="p-5">
                    {a.season && <div className="font-sans text-[11px] font-semibold uppercase tracking-wide" style={{ color: accent }}>{a.season}</div>}
                    <h3 className="mt-1 font-head text-lg font-bold leading-snug text-ink">{a.title}</h3>
                    {a.excerpt && <p className="mt-1.5 font-body text-sm leading-relaxed text-slate-mute">{a.excerpt}</p>}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
      <SiteFooter />
    </>
  )
}
