import { getAllInPillar } from '@/lib/content'
import ArticleCard from '@/components/ArticleCard'

export const metadata = {
  title: 'Kumaoni Life & Traditions',
  description:
    'The texture of Kumaoni life — cuisine, attire, jewellery, folk music, language and sacred geography of the Kumaon Himalaya.',
}

export default function TraditionsIndex() {
  const articles = getAllInPillar('traditions')
  return (
    <>
      <section className="border-b border-sand bg-ivory/50">
        <div className="mx-auto max-w-content px-6 py-16">
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-gold">The Breadth Layer</span>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-tight text-geru-deep">Kumaoni Life &amp; Traditions</h1>
          <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-clay">
            Beyond art and festivals — the food, dress, music and language that make up everyday
            Kumaoni life, and the places that anchor it.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-content px-6 py-12">
        {articles.length === 0 ? (
          <p className="font-body text-clay">Essays coming soon — the cuisine cluster lands first.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => <ArticleCard key={a.slug} {...a} />)}
          </div>
        )}
      </section>
    </>
  )
}
