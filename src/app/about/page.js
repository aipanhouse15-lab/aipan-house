import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata = { title: 'About & Methodology', description: 'Who writes Aipan House, and how — our sourcing and commitment to accurate Kumaoni cultural documentation.' }

export default function About() {
  return (
    <>
      <SiteHeader />
      <article className="mx-auto max-w-reading px-6 py-16">
        <h1 className="font-display text-4xl font-medium leading-tight text-geru md:text-5xl">About Aipan House</h1>
        <div className="prose-article mt-8" style={{ '--accent': '#9E2B1E', '--accent-deep': '#6E1A10', '--accent-soft': '#f3e7e4' }}>
          <p>Aipan House is a documentation project based in Dehradun, Uttarakhand. It exists to give Kumaoni art, festivals and traditions the clear, well-made English-language home they have never quite had online — written close to the source, in the hills themselves.</p>
          <h2>Why we started</h2>
          <p>Aipan, the red-and-white folk art of Kumaon, received its GI tag in 2021. Yet the wider world of Kumaoni culture remains scattered across thin, often inaccurate pages. We set out to change that, motif by motif, festival by festival.</p>
          <h2>How we work</h2>
          <ul>
            <li>Every article carries a byline, a date, and where relevant, first-hand notes from Kumaon.</li>
            <li>Cultural and ritual details are cross-checked against multiple sources.</li>
            <li>The motif diagrams are original illustrations, drawn to reflect traditional Aipan vocabulary.</li>
            <li>We correct openly. If you spot an error, write to us and we will fix it.</li>
          </ul>
          <h2>Who we are</h2>
          <p>Aipan House is published by Tallyard Ventures, Dehradun. For corrections, contributions, or to share your family's Kumaoni traditions, reach us at <a href="mailto:hello@aipanhouse.com">hello@aipanhouse.com</a>.</p>
        </div>
      </article>
      <SiteFooter />
    </>
  )
}
