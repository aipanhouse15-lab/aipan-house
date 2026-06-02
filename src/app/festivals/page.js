import { getFestivalsByCalendar } from '@/lib/content'
import ArticleCard from '@/components/ArticleCard'

export const metadata = {
  title: 'Festivals of Uttarakhand — The Kumaoni Calendar',
  description:
    'A year of Kumaoni festivals — Harela, Phool Dei, Ghee Sankranti, Uttarayani, Kumaoni Holi and more. Their rituals, foods, dates and meaning, festival by festival.',
}

export default function FestivalsIndex() {
  const festivals = getFestivalsByCalendar()
  return (
    <>
      <section className="border-b border-sand bg-ivory/50">
        <div className="mx-auto max-w-content px-6 py-16">
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-gold">The Kumaoni Year</span>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-tight text-geru-deep">Festivals of Uttarakhand</h1>
          <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-clay">
            The Kumaoni calendar turns on its festivals — sowing and harvest, spring and new year,
            each with its own rituals, songs and foods. A living almanac of the hills.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-content px-6 py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {festivals.map((f) => (
            <ArticleCard key={f.slug} {...f} />
          ))}
        </div>
      </section>
    </>
  )
}
