import { AUTHOR, SITE } from '@/lib/site'

const PILLAR_LABEL = { aipan: 'Aipan', festivals: 'Festivals', traditions: 'Traditions' }

export default function Schema({ data, faqs = [], pillar }) {
  const url = `${SITE.url}/${pillar}/${data.slug}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.excerpt,
    author: { '@type': 'Person', '@id': AUTHOR.id, name: AUTHOR.name, url: `${SITE.url}${AUTHOR.path}` },
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
  // Only describe a single physical event when the article provides a verified,
  // specific venue. A region-wide festival is not itself one schema.org Event.
  const eventSchema = data.event?.verified && data.event?.startDate && data.event?.location
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
          name: data.event.location.name,
          address: {
            '@type': 'PostalAddress',
            ...(data.event.location.locality ? { addressLocality: data.event.location.locality } : {}),
            addressRegion: 'Uttarakhand',
            addressCountry: 'IN',
          },
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
