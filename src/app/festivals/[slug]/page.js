import { notFound } from 'next/navigation'
import { getOne, getSlugs } from '@/lib/content'
import Article from '@/components/Article'

export function generateStaticParams() {
  return getSlugs('festivals').map((slug) => ({ slug }))
}
export function generateMetadata({ params }) {
  const a = getOne('festivals', params.slug)
  if (!a) return {}
  const url = `/festivals/${params.slug}`
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: url },
    openGraph: { title: a.title, description: a.excerpt, type: 'article', url, ...(a.hero ? { images: [a.hero] } : {}) },
    twitter: { card: 'summary_large_image', title: a.title, description: a.excerpt, ...(a.hero ? { images: [a.hero] } : {}) },
  }
}

export default function FestivalArticle({ params }) {
  const data = getOne('festivals', params.slug)
  if (!data) notFound()
  return <Article data={data} toc={data.toc || []} facts={data.facts || []} motif={data.motif || 'vasudhara'} />
}
