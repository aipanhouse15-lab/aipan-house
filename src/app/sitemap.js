import { getAll } from '@/lib/content'
import { SITE } from '@/lib/site'

// Static pages with honest lastModified dates — bump these when a page meaningfully changes.
const STATIC_PAGES = [
  { path: '', updated: '2026-08-16', changeFrequency: 'weekly', priority: 1 },
  { path: '/aipan', updated: '2026-07-20', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/festivals', updated: '2026-07-20', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about', updated: '2026-06-01', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/contact', updated: '2026-06-01', changeFrequency: 'yearly', priority: 0.3 },
]
// NOTE: /traditions is excluded until it has content; re-add when the first article ships.

export default function sitemap() {
  const staticPages = STATIC_PAGES.map((p) => ({
    url: `${SITE.url}${p.path}`,
    lastModified: new Date(p.updated),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))
  const pillars = ['aipan', 'festivals', 'traditions']
  const articlePages = pillars.flatMap((pillar) =>
    getAll(pillar).map((a) => ({
      url: `${SITE.url}/${pillar}/${a.slug}`,
      lastModified: new Date(a.updated || a.published || '2026-06-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  )
  return [...staticPages, ...articlePages]
}
