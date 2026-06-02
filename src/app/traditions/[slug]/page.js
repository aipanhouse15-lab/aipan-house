import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBySlug, getSlugs } from '@/lib/content'
import Mdx from '@/components/Mdx'

export function generateStaticParams() {
  return getSlugs('traditions').map((slug) => ({ slug }))
}

export function generateMetadata({ params }) {
  const a = getBySlug('traditions', params.slug)
  if (!a) return {}
  return {
    title: a.title,
    description: a.excerpt,
    openGraph: { title: a.title, description: a.excerpt, type: 'article' },
  }
}

export default function TraditionsArticle({ params }) {
  const a = getBySlug('traditions', params.slug)
  if (!a) notFound()
  return (
    <article className="mx-auto max-w-3xl px-6 py-14">
      <Link href="/traditions" className="font-sans text-sm text-geru hover:text-geru-deep">← Traditions</Link>
      <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-geru-deep md:text-5xl">{a.title}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-3 font-sans text-sm text-taupe">
        {a.author && <span>By {a.author}</span>}
        {a.date && <><span>·</span><span>{a.date}</span></>}
        {a.readingTime && <><span>·</span><span>{a.readingTime}</span></>}
      </div>
      <div className="mt-3 h-px w-full bg-sand" />
      <div className="mt-8">
        <Mdx source={a.content} />
      </div>
    </article>
  )
}
