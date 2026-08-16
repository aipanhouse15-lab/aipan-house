import { getAll } from '@/lib/content'
import { SITE } from '@/lib/site'

// llms.txt — a curated, AI-friendly map of the site (https://llmstxt.org)
export const dynamic = 'force-static'

export function GET() {
  const section = (pillar, title) => {
    const items = getAll(pillar)
    if (!items.length) return ''
    const lines = items
      .map((a) => `- [${a.title}](${SITE.url}/${pillar}/${a.slug})${a.excerpt ? `: ${a.excerpt}` : ''}`)
      .join('\n')
    return `## ${title}\n\n${lines}\n`
  }

  const body = `# ${SITE.name}

> ${SITE.description}

Aipan House is the definitive English-language home of Kumaoni art, culture and heritage,
written from Nainital, Uttarakhand. Aipan — the red-and-white ritual folk art of Kumaon —
is the anchor; the festivals, food and living traditions of the Kumaon Himalaya are the body.
All motif diagrams are original illustrations.

${section('aipan', 'Aipan — the folk art')}
${section('festivals', 'Festivals of Uttarakhand')}
${section('traditions', 'Kumaoni life & traditions')}
## About

- [About & methodology](${SITE.url}/about): How Aipan House is researched and written.
- [Contact](${SITE.url}/contact): Corrections, contributions, and artist features.
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
