import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { SITE } from '@/lib/site'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE.url}/about#ashutosh`,
  name: 'Ashutosh',
  homeLocation: {
    '@type': 'Place',
    address: { '@type': 'PostalAddress', addressLocality: 'Nainital', addressRegion: 'Uttarakhand', addressCountry: 'IN' },
  },
  knowsAbout: ['Aipan art', 'Kumaoni festivals', 'Kumaon', 'Uttarakhand folk art'],
  description:
    'Writer of Aipan House. A Nainital resident who has worked in the Aipan craft trade in Kumaon, Uttarakhand.',
  worksFor: { '@id': `${SITE.url}/#organization` },
}

export const metadata = {
  alternates: { canonical: '/about' },
  title: 'About & Methodology',
  description:
    'Who writes Aipan House, and how — written from Nainital by someone who worked in the Aipan craft trade, with sourcing and correction policy set out in full.',
}

export default function About() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <SiteHeader />
      <article className="mx-auto max-w-reading px-6 py-16">
        <h1 className="font-display text-4xl font-medium leading-tight text-geru md:text-5xl">About Aipan House</h1>
        <div className="prose-article mt-8" style={{ '--accent': '#9E2B1E', '--accent-deep': '#6E1A10', '--accent-soft': '#f3e7e4' }}>
          <p>Aipan House is a documentation project written from <strong>Nainital, in the Kumaon Himalaya</strong>. It exists to give Kumaoni art, festivals and traditions the clear, well-made English-language home they have never quite had online — written close to the source, by someone from the region rather than about it.</p>

          <h2>Who writes this</h2>
          <p>Aipan House is written and run by <strong>Ashutosh</strong>, a resident of <strong>Nainital, Uttarakhand</strong>, who has <strong>worked in the Aipan craft trade</strong> — with the artisans who draw it, and with the practical realities of producing and selling the work. That background shapes what is on this site: the material detail about geru and bisvar, the distinction between what is drawn for which occasion, and the honesty about which traditions are thriving and which are thinning as the hill villages empty.</p>
          <p>Kumaon is home, not a subject. The festivals documented here are ones observed in the hills around Nainital and Almora, and the account of a tradition fading is written from having watched it thin rather than from having read about it.</p>
          <p>This is a personal project, not a corporate publication and not a content farm. It is not affiliated with any other business.</p>

          <h2>Why we started</h2>
          <p>Aipan, the red-and-white folk art of Kumaon, received its GI tag in 2021. Yet the wider world of Kumaoni culture remains scattered across thin, often inaccurate pages — festival dates copied wrong from one site to the next, motifs mislabelled, and Garhwali and Kumaoni traditions flattened into a single undifferentiated &ldquo;Uttarakhand culture.&rdquo; We set out to change that, motif by motif, festival by festival.</p>

          <h2>How we work</h2>
          <ul>
            <li>Every article carries a byline, a publication date and a last-updated date.</li>
            <li>Festival dates are checked against panchang sources rather than copied from other websites. Where panchang sources disagree — as they do for Holi 2027 — we say so on the page instead of picking one silently.</li>
            <li>Where a date is set annually by a local mela committee rather than by the calendar, we give the expected window and say plainly that it needs confirming. We do not invent precision we do not have.</li>
            <li>Where a tradition belongs to Garhwal more than Kumaon, or is fading, we say that too. Accuracy matters more to us than making the culture look uniformly healthy.</li>
            <li>Folk history is labelled as folk history. Several Kumaoni festivals carry origin stories told as fact locally; we record them as they are told and mark them as tradition rather than documented record.</li>
            <li>The motif diagrams are original illustrations, drawn to reflect traditional Aipan vocabulary.</li>
            <li>We correct openly. If you spot an error, write to us and we will fix it — and note the correction.</li>
          </ul>

          <h2>Get in touch</h2>
          <p>For corrections, contributions, or to share your family&rsquo;s Kumaoni traditions, reach us at <a href="mailto:aipanhouse15@gmail.com">aipanhouse15@gmail.com</a>. Corrections from people who grew up with these festivals are especially welcome — if your village does something differently from what is described here, we want to know.</p>
        </div>
      </article>
      <SiteFooter />
    </>
  )
}
