export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Aipan House — corrections, contributions and Kumaoni cultural stories.',
}

export default function Contact() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold leading-tight text-geru-deep md:text-5xl">Contact</h1>
      <div className="prose-aipan mt-8">
        <p>
          We would love to hear from you — whether you have spotted a detail to correct, want to
          contribute your family's traditions, or are a Kumaoni artist who would like to be featured.
        </p>
        <p>
          Write to us at{' '}
          <a href="mailto:hello@aipanhouse.com">hello@aipanhouse.com</a>.
        </p>
      </div>
    </article>
  )
}
