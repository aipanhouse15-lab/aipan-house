import { SITE } from '@/lib/site'

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
    },
    inLanguage: 'en-IN',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    dateModified: '2026-06-01',
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
    </>
  )
}
