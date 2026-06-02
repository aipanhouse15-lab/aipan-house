import { getAllInPillar } from '@/lib/content'
import ArticleCard from '@/components/ArticleCard'
import { SaraswatiChowki } from '@/components/Motifs'

export const metadata = {
  title: 'Aipan — The Folk Art of Kumaon',
  description:
    'The definitive guide to Aipan: its origins, ritual significance, motifs decoded, and the geru-and-rice technique behind Uttarakhand\'s sacred red-and-white folk art.',
}

export default function AipanIndex() {
  const articles = getAllInPillar('aipan')
  return (
    <>
      <section className="border-b border-sand bg-ivory/50">
        <div className="mx-auto grid max-w-content items-center gap-8 px-6 py-16 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-gold">The Anchor</span>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-tight text-geru-deep">Aipan</h1>
            <p className="mt-4 max-w-xl font-body text-lg leading-relaxed text-clay">
              The ritual folk art of Kumaon — white rice paste drawn on a red geru ground, at
              thresholds, in prayer rooms, on every auspicious occasion. Here, every motif and
              method is decoded more deeply than anywhere on the web.
            </p>
          </div>
          <div className="hidden md:block"><SaraswatiChowki size={260} /></div>
        </div>
      </section>
      <section className="mx-auto max-w-content px-6 py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} {...a} />
          ))}
        </div>
      </section>
    </>
  )
}
