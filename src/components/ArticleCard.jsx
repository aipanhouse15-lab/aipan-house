import Link from 'next/link'

export default function ArticleCard({ pillar, slug, title, excerpt, month, season, readingTime }) {
  return (
    <Link
      href={`/${pillar}/${slug}`}
      className="group flex flex-col rounded-md border border-sand bg-cream p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-hover"
    >
      {(month || season) && (
        <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-pill bg-geru/8 px-3 py-1 font-sans text-xs font-medium text-geru">
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          {season || month}
        </span>
      )}
      <h3 className="font-display text-xl font-semibold leading-snug text-geru-deep transition-colors group-hover:text-geru">
        {title}
      </h3>
      {excerpt && <p className="mt-2 font-body text-sm leading-relaxed text-clay">{excerpt}</p>}
      {readingTime && <span className="mt-4 font-sans text-xs text-taupe">{readingTime}</span>}
    </Link>
  )
}
