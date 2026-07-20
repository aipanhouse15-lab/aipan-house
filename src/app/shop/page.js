import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Motif from '@/components/Motif'
import NewsletterBlock from '@/components/NewsletterBlock'

export const metadata = {
  alternates: { canonical: '/shop' },
  title: 'Shop — GI-Certified Aipan Art & Décor (Launching Soon)',
  description:
    'Authentic, GI-certified Kumaoni Aipan art — wall pieces, chowkis, festival décor and gifting, hand-drawn in Uttarakhand. Join the waitlist for launch access.',
}

const CATEGORIES = [
  { motif: 'chowkiLotus', title: 'Wall Art & Chowkis', text: 'Hand-drawn Aipan on geru ground — framed pieces and traditional chowkis for the home.' },
  { motif: 'feet', title: 'Festival & Puja Décor', text: 'Lakshmi Pad thresholds, diya plates and puja-room pieces for Diwali, Harela and every festival of the hills.' },
  { motif: 'vasudhara', title: 'Gifting', text: 'Housewarming, weddings and Diwali gifting with a story — sacred art of Kumaon, made to be given.' },
]

export default function Shop() {
  return (
    <div>
      <div className="relative px-5 pb-12 pt-24 sm:px-6 md:px-10 md:pb-16 md:pt-32" style={{ background: '#9E2B1E', color: '#FBFDF8' }}>
        <SiteHeader transparent />
        <div className="mx-auto max-w-content">
          <div className="font-sans text-[11px] font-bold uppercase tracking-[.12em] opacity-85">The Aipan House Shop</div>
          <h1 className="mt-3 max-w-[22ch] font-head text-[2rem] font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            GI-certified Aipan art, from the hills of Kumaon to your home
          </h1>
          <p className="mt-4 max-w-[58ch] text-base italic leading-relaxed opacity-90 md:text-lg">
            Hand-drawn by Kumaoni artists. Every piece authentic, every motif documented. The shop opens soon — the waitlist gets first access and launch pricing.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-content px-5 py-12 sm:px-6 md:px-10 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((c) => (
            <div key={c.title} className="rounded-2xl border border-[#efe7d8] bg-[#FCFAF4] p-6">
              <div className="flex justify-center rounded-xl bg-[#9E2B1E] p-5">
                <Motif shape={c.motif} size={96} stroke="#FBFDF8" sw={4} />
              </div>
              <h3 className="mt-4 font-head text-lg font-extrabold text-[#26231c]">{c.title}</h3>
              <p className="mt-2 font-sans text-[14px] leading-relaxed text-[#5c584d]">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-2xl">
          <NewsletterBlock
            source="shop-waitlist"
            heading="Join the launch waitlist"
            sub="Be first when the shop opens — early access, launch pricing, and the story behind every piece."
          />
        </div>

        <p className="mt-10 max-w-[70ch] font-sans text-[14px] leading-relaxed text-[#6a665a]">
          Aipan received its Geographical Indication (GI) tag in 2021, recognising it as the protected heritage craft of
          Kumaon, Uttarakhand. Aipan House works only with the real thing — rice-paste bisvar on geru, drawn by hand.
          While we prepare the first collection, read about the art itself: <a className="underline" href="/aipan/what-is-aipan">what Aipan is</a>,{' '}
          <a className="underline" href="/aipan/how-to-make-aipan">how it is made</a>, and{' '}
          <a className="underline" href="/aipan/lakshmi-pad">the Lakshmi Pad motif</a>.
        </p>
      </div>
      <SiteFooter />
    </div>
  )
}
