import Link from 'next/link'
import { getAll } from '@/lib/content'
import { SITE } from '@/lib/site'
import PillarList from '@/components/PillarList'

export const metadata = {
  alternates: { canonical: '/aipan' },
  title: 'Aipan Art: the GI-Certified Folk Art of Kumaon, Uttarakhand',
  description:
    'What Aipan is, where it comes from, and what every motif means — the red geru and white rice-paste ritual folk art of Kumaon, Uttarakhand, GI-certified in 2021. Motifs, materials and method, decoded.',
  openGraph: {
    title: 'Aipan Art: the GI-Certified Folk Art of Kumaon, Uttarakhand',
    description:
      'The red-and-white ritual folk art of Kumaon, Uttarakhand — origins, motifs decoded, materials and method.',
    type: 'website',
    url: '/aipan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aipan Art: the GI-Certified Folk Art of Kumaon',
    description: 'Origins, motifs decoded, materials and method — the ritual folk art of Uttarakhand.',
  },
}

const MOTIFS = [
  {
    name: 'Lakshmi Pad',
    means: "The goddess's feet",
    when: 'Diwali, Harela, after a birth',
    href: '/aipan/lakshmi-pad',
    note: 'Stylised footprints walking inward from the threshold — prosperity entering the house.',
  },
  {
    name: 'Saraswati Chowki',
    means: 'Learning and speech',
    when: 'Basant Panchami, study rites',
    href: '/aipan/saraswati-chowki-lotus',
    note: 'A square built around a lotus, drawn where a child begins to read or a musician practises.',
  },
  {
    name: 'Vasudhara',
    means: 'Flowing lines of plenty',
    when: 'Harvest and household rites',
    href: '/aipan/what-is-aipan',
    note: 'Parallel vertical lines, sometimes read as rain, sometimes as streams of milk.',
  },
  {
    name: 'Sur Mandir',
    means: 'The house of music',
    when: 'Baithki Holi gatherings',
    href: '/festivals/kumaoni-holi',
    note: 'Drawn in the room where the singing happens, marking it as consecrated for music.',
  },
  {
    name: 'Swastika & lotus borders',
    means: 'Auspiciousness, purity',
    when: 'Almost every occasion',
    href: '/aipan/what-is-aipan',
    note: 'The connective vocabulary — the frames and fillers that hold the larger patterns together.',
  },
]

const FAQS = [
  {
    q: 'What is Aipan art?',
    a: 'Aipan is the ritual folk art of the Kumaon region of Uttarakhand — white rice-paste patterns drawn freehand on a red-brown geru ground, at thresholds, in puja rooms and on the floor for ceremonies. It is drawn almost entirely by women, and it is made to be temporary.',
  },
  {
    q: 'Is Aipan GI-certified?',
    a: 'Yes. Aipan received a Geographical Indication tag in 2021, recognising it as a protected craft of Kumaon, Uttarakhand.',
  },
  {
    q: 'What materials is Aipan made from?',
    a: 'Two materials: geru, a red-brown clay wash that colours the ground, and bisvar, a white paste of soaked rice ground fine. The paste is applied with the fingers — usually the ring finger — rather than a brush.',
  },
  {
    q: 'What is the difference between Aipan and rangoli?',
    a: 'Rangoli is usually made with coloured powders and is broadly decorative. Aipan uses only two materials, is drawn with the fingers rather than poured, and each pattern is tied to a specific ritual occasion. Related traditions include Alpana in Bengal, Aripana in Bihar, Mandana in Rajasthan and Kolam in the south.',
  },
  {
    q: 'Who draws Aipan?',
    a: 'Traditionally the women of the household, with the knowledge passed from mother and grandmother to daughter by watching and copying rather than by formal teaching.',
  },
  {
    q: 'Can I learn to draw Aipan at home?',
    a: 'Yes. The materials are rice and clay, and the basic grid logic can be learned from a step-by-step guide before attempting the full patterns.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Aipan House', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Aipan', item: `${SITE.url}/aipan` },
  ],
}

function H2({ children }) {
  return <h2 className="mt-12 font-head text-2xl font-extrabold tracking-tight text-ink md:text-3xl">{children}</h2>
}
function P({ children }) {
  return <p className="mt-4 max-w-[68ch] font-body text-base leading-relaxed text-[#4a463d]">{children}</p>
}
const A = ({ href, children }) => (
  <Link href={href} className="underline decoration-[#c9a06a] underline-offset-2 hover:text-geru">
    {children}
  </Link>
)

export default function Aipan() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PillarList
        title="Aipan"
        intro="The ritual folk art of Kumaon — white rice paste on a red geru ground, at every threshold and auspicious occasion. Every motif and method, decoded."
        pillar="aipan"
        items={getAll('aipan')}
      >
        <H2>What Aipan Is</H2>
        <P>
          <strong>Aipan</strong> (Kumaoni: <em>ēpaṇ</em>) is the ritual folk art of the Kumaon region of Uttarakhand: white
          rice-paste patterns drawn freehand on a red-brown <strong>geru</strong> ground, at the threshold of a house, on the
          floor of a puja room, and around the seat of anyone being married, initiated or blessed. It received a{' '}
          <strong>Geographical Indication (GI) tag in 2021</strong>, which recognises it as a protected craft of Kumaon.
        </P>
        <P>
          Two things about it are easy to miss. The first is that it is not decoration — a pattern is chosen because of what
          is happening that day, and drawing the wrong one would be like signing the wrong document. The second is that it is
          made to disappear. It is drawn on a floor that will be walked on, in a material that will flake off within days.
          Nobody in a Kumaoni village preserves an Aipan. It is redrawn instead.
        </P>
        <P>
          Start with <A href="/aipan/what-is-aipan">what Aipan is</A> for the full account of the origins, materials and
          motif vocabulary, or go straight to <A href="/aipan/how-to-make-aipan">how to make Aipan</A> for the practical
          method.
        </P>

        <H2>The Two Materials</H2>
        <P>
          The whole art runs on two substances. <strong>Geru</strong> is a red-brown clay, mixed with water into a thin wash
          and spread over the surface to make the ground. <strong>Bisvar</strong> is white paste made from rice soaked for
          six to eight hours and ground fine. The paste is applied with the fingers — traditionally the ring finger of the
          right hand — not with a brush, which is why Aipan lines have the particular weight and taper that they do.
        </P>
        <P>
          Red and white is not an aesthetic decision either. Red is the ground of the auspicious across ritual North India,
          and rice is the substance of sustenance. The art is made of food, on earth.
        </P>

        <H2>The Motifs, Briefly</H2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse font-body text-sm">
            <thead>
              <tr className="border-b border-[#e0dace] text-left font-sans text-[11px] uppercase tracking-wide text-slate-mute">
                <th className="py-2.5 pr-4 font-semibold">Motif</th>
                <th className="py-2.5 pr-4 font-semibold">Means</th>
                <th className="py-2.5 pr-4 font-semibold">Drawn at</th>
                <th className="py-2.5 font-semibold">Note</th>
              </tr>
            </thead>
            <tbody>
              {MOTIFS.map((m) => (
                <tr key={m.name} className="border-b border-[#efeae0] align-top">
                  <td className="py-3 pr-4 font-semibold text-ink">
                    <A href={m.href}>{m.name}</A>
                  </td>
                  <td className="py-3 pr-4 text-[#4a463d]">{m.means}</td>
                  <td className="py-3 pr-4 text-[#4a463d]">{m.when}</td>
                  <td className="py-3 text-[#6a665a]">{m.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H2>Aipan and the Kumaoni Year</H2>
        <P>
          Aipan does not exist on its own — it exists because the calendar keeps demanding it. The{' '}
          <A href="/aipan/lakshmi-pad">Lakshmi Pad</A> is drawn at Diwali and again, faster and simpler, on{' '}
          <A href="/festivals/harela">Harela</A> morning. The <A href="/aipan/saraswati-chowki-lotus">Saraswati chowki</A>{' '}
          appears at Basant Panchami. The largest public Aipan of the year is laid on fresh geru at the Nanda Devi temples in
          September, for <A href="/festivals/nanda-ashtami">Nanda Ashtami</A>.
        </P>
        <P>
          The full year, festival by festival with the pattern drawn for each, is set out in the{' '}
          <A href="/festivals/kumaoni-calendar">Kumaoni festival calendar 2026–27</A>. For why a given pattern belongs to a
          given day, see <A href="/aipan/aipan-ritual-significance">the ritual significance of Aipan</A>.
        </P>

        <H2>How Aipan Compares</H2>
        <P>
          Aipan belongs to a family of Indian floor-and-threshold arts that share a logic and differ in material.{' '}
          <strong>Alpana</strong> in Bengal and <strong>Aripana</strong> in Bihar are its closest relatives, also rice-paste
          traditions. <strong>Mandana</strong> in Rajasthan and Madhya Pradesh works on a red ground like Aipan.{' '}
          <strong>Kolam</strong> in the south and <strong>rangoli</strong> in the west use powders and dots. What separates
          Aipan is the strictness of the two-material palette and how tightly each pattern is bound to a named occasion.
        </P>

        <H2>Questions</H2>
        <dl className="mt-5 max-w-[68ch]">
          {FAQS.map((f) => (
            <div key={f.q} className="border-b border-[#efeae0] py-4">
              <dt className="font-head text-base font-bold text-ink">{f.q}</dt>
              <dd className="mt-1.5 font-body text-[15px] leading-relaxed text-[#4a463d]">{f.a}</dd>
            </div>
          ))}
        </dl>
      </PillarList>
    </>
  )
}
