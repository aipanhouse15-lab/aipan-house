import { notFound } from 'next/navigation'
import { getOne, getSlugs } from '@/lib/content'
import { articleMetadata } from '@/lib/seo'
import Article from '@/components/Article'

export function generateStaticParams() {
  return getSlugs('aipan').map((slug) => ({ slug }))
}
export async function generateMetadata({ params }) {
  const { slug } = await params
  const a = getOne('aipan', slug)
  if (!a) return {}
  return articleMetadata(a, 'aipan')
}

export default async function AipanArticle({ params }) {
  const { slug } = await params
  const data = getOne('aipan', slug)
  if (!data) notFound()
  return <Article data={data} toc={data.toc || []} facts={data.facts || []} motif={data.motif || 'vasudhara'} />
}
