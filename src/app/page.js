import Link from 'next/link'
import { Padma } from '@/components/Motifs'
import { getAllInPillar } from '@/lib/content'

export default function Home() {
  const aipan = getAllInPillar('aipan').slice(0, 3)
  const festivals = getAllInPillar('festivals').slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-content items-center gap-10 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
          <div className="animate-rise-in">
            <span className="inline-flex items-center gap-2 rounded-pill border border-geru/20 px-4 py-1.5 font-sans text-xs font-medium uppercase tracking-wider text-geru">
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              Kumaon · Uttarakhand
            </span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-geru-deep md:text-6xl">
              The living art &amp; heritage of the Kumaon Himalaya
            </h1>
            <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-clay">
              The definitive English-language home for Aipan folk art, the festivals of
              Uttarakhand, and the traditions that carry them — written from the hills themselves.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/aipan" className="rounded-pill bg-geru px-6 py-3 font-sans text-sm font-semibold text-rice transition-colors hover:bg-geru-deep">
                Explore Aipan
              </Link>
              <Link href="/festivals" className="rounded-pill border border-geru/30 px-6 py-3 font-sans text-sm font-semibold text-geru transition-colors hover:bg-geru/5">
                Festivals of Uttarakhand
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <Padma size={360} />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-content px-6 py-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { t: 'Aipan, decoded', d: 'Every motif, meaning, and method — deeper than anywhere on the web.', h: '/aipan' },
            { t: 'Festivals', d: 'Harela, Phool Dei, Kumaoni Holi — the Kumaoni year, festival by festival.', h: '/festivals' },
            { t: 'Traditions', d: 'Food, attire, language and the texture of Kumaoni life.', h: '/traditions' },
          ].map((p) => (
            <Link key={p.h} href={p.h} className="group rounded-md border border-sand bg-cream p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-hover">
              <span className="mb-4 block h-3 w-3 rotate-45 bg-gold" />
              <h2 className="font-display text-2xl font-semibold text-geru-deep group-hover:text-geru">{p.t}</h2>
              <p className="mt-2 font-body text-sm leading-relaxed text-clay">{p.d}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest from Aipan + Festivals */}
      {[{ items: aipan, title: 'From the Aipan archive', href: '/aipan' }, { items: festivals, title: 'Festivals of the Kumaoni year', href: '/festivals' }].map(
        (block) =>
          block.items.length > 0 && (
            <section key={block.title} className="mx-auto max-w-content px-6 py-10">
              <div className="mb-6 flex items-end justify-between">
                <h2 className="font-display text-3xl font-semibold text-geru-deep">{block.title}</h2>
                <Link href={block.href} className="font-sans text-sm font-medium text-geru hover:text-geru-deep">
                  View all →
                </Link>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {block.items.map((a) => (
                  <Link key={a.slug} href={`/${a.pillar}/${a.slug}`} className="group rounded-md border border-sand bg-cream p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-hover">
                    <h3 className="font-display text-lg font-semibold leading-snug text-geru-deep group-hover:text-geru">{a.title}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-clay">{a.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )
      )}
    </>
  )
}
