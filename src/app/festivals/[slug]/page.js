import { notFound } from 'next/navigation'
import { getOne, getSlugs } from '@/lib/content'
import { articleMetadata } from '@/lib/seo'
import Article from '@/components/Article'

export function generateStaticParams() {
  return getSlugs('festivals').map((slug) => ({ slug }))
}
export async function generateMetadata({ params }) {
  const { slug } = await params
  const a = getOne('festivals', slug)
  if (!a) return {}
  return articleMetadata(a, 'festivals')
}

export default async function FestivalArticle({ params }) {
  const { slug } = await params
  const data = getOne('festivals', slug)
  if (!data) notFound()
  return <Article data={data} toc={data.toc || []} facts={data.facts || []} motif={data.motif || 'vasudhara'} />
}
