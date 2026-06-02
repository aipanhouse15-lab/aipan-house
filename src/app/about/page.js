export const metadata = {
  title: 'About & Methodology',
  description: 'Who writes Aipan House, and how — our sourcing, methodology and commitment to accurate Kumaoni cultural documentation.',
}

export default function About() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold leading-tight text-geru-deep md:text-5xl">
        About Aipan House
      </h1>
      <div className="prose-aipan mt-8">
        <p>
          Aipan House is a documentation project based in Dehradun, Uttarakhand. It exists to give
          Kumaoni art, festivals and traditions the clear, well-made English-language home they have
          never quite had online — written close to the source, in the hills themselves.
        </p>
        <h2>Why we started</h2>
        <p>
          Aipan, the red-and-white folk art of Kumaon, received its GI tag in 2021. Yet the wider
          world of Kumaoni culture — its festivals, food and living customs — remains scattered
          across thin, often inaccurate pages. We set out to change that, motif by motif, festival by
          festival.
        </p>
        <h2>How we work</h2>
        <ul>
          <li>Every article carries a byline, a publication date, and where relevant, first-hand notes from Kumaon.</li>
          <li>Cultural and ritual details are cross-checked against multiple sources and, where possible, with practitioners.</li>
          <li>The motif diagrams are original illustrations — not stock imagery — drawn to reflect traditional Aipan vocabulary.</li>
          <li>We correct openly. If you spot an error, write to us and we will fix it with a note.</li>
        </ul>
        <h2>Who we are</h2>
        <p>
          Aipan House is published by Tallyard Ventures, Dehradun. For corrections, contributions, or
          to share your family's Kumaoni traditions, please reach out via our contact page.
        </p>
      </div>
    </article>
  )
}
