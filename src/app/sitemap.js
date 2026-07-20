import { getSlugs } from '@/lib/content'
import { SITE } from '@/lib/site'

export default function sitemap() {
  const now = new Date()
  const staticPages = ['', '/shop', '/aipan', '/festivals', '/traditions', '/about', '/contact'].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: now,
    changeFrequency: p === '' ? 'weekly' : 'monthly',
    priority: p === '' ? 1 : 0.8,
  }))
  const pillars = ['aipan', 'festivals', 'traditions']
  const articlePages = pillars.flatMap((pillar) =>
    getSlugs(pillar).map((slug) => ({
      url: `${SITE.url}/${pillar}/${slug}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    }))
  )
  return [...staticPages, ...articlePages]
}
