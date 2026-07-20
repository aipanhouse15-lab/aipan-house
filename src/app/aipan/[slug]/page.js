import { notFound } from 'next/navigation'
import { getOne, getSlugs } from '@/lib/content'
import Article from '@/components/Article'

export function generateStaticParams() {
  return getSlugs('aipan').map((slug) => ({ slug }))
}
export function generateMetadata({ params }) {
  const a = getOne('aipan', params.slug)
  if (!a) return {}
  const url = `/aipan/${params.slug}`
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: url },
    openGraph: { title: a.title, description: a.excerpt, type: 'article', url, ...(a.hero ? { images: [a.hero] } : {}) },
  }
}

export default function AipanArticle({ params }) {
  const data = getOne('aipan', params.slug)
  if (!data) notFound()
  return <Article data={data} toc={data.toc || []} facts={data.facts || []} motif={data.motif || 'vasudhara'} />
}
