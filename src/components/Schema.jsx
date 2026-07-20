import { SITE } from '@/lib/site'

const PILLAR_LABEL = { aipan: 'Aipan', festivals: 'Festivals', traditions: 'Traditions' }

export default function Schema({ data, faqs = [], pillar }) {
  const url = `${SITE.url}/${pillar}/${data.slug}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.excerpt,
    author: { '@type': 'Organization', name: data.author || 'Aipan House', url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: 'Aipan House',
      url: SITE.url,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/icon-512.png` },
    },
    inLanguage: 'en-IN',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(data.hero ? { image: `${SITE.url}${data.hero}` } : {}),
    datePublished: data.published || '2026-06-01',
    dateModified: data.updated || data.published || '2026-06-01',
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Aipan House', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: PILLAR_LABEL[pillar] || pillar, item: `${SITE.url}/${pillar}` },
      { '@type': 'ListItem', position: 3, name: data.title, item: url },
    ],
  }
  const faqSchema = faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null
  // Optional Event schema — driven by `event` frontmatter:
  // event: { name, startDate, endDate }
  const eventSchema = data.event?.startDate
    ? {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: data.event.name || data.title,
        startDate: data.event.startDate,
        ...(data.event.endDate ? { endDate: data.event.endDate } : {}),
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: 'Kumaon, Uttarakhand',
          address: { '@type': 'PostalAddress', addressRegion: 'Uttarakhand', addressCountry: 'IN' },
        },
        ...(data.hero ? { image: `${SITE.url}${data.hero}` } : {}),
        description: data.excerpt,
        organizer: { '@type': 'Organization', name: 'Aipan House', url: SITE.url },
      }
    : null

  const blocks = [articleSchema, breadcrumbSchema, faqSchema, eventSchema].filter(Boolean)
  return (
    <>
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }} />
      ))}
    </>
  )
}
