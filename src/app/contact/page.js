import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Motif from '@/components/Motif'

export const metadata = { title: 'Contact', description: 'Get in touch with Aipan House — corrections, contributions and Kumaoni cultural stories.' }

export default function Contact() {
  return (
    <>
      <SiteHeader />
      <section className="relative overflow-hidden bg-[#FBF6EE] px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-content items-center gap-10 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h1 className="font-head text-4xl font-extrabold tracking-tight text-geru md:text-5xl">Contact us</h1>
            <p className="mt-4 max-w-xl font-body text-lg leading-relaxed text-slate-soft">
              We would love to hear from you — whether you have spotted a detail to correct, want to
              contribute your family's traditions, or are a Kumaoni artist who would like to be featured.
            </p>
            <div className="mt-8 space-y-4 font-sans text-sm">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-mute">Write to us</div>
                <a href="mailto:hello@aipanhouse.com" className="font-head text-xl font-bold text-geru">hello@aipanhouse.com</a>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-mute">Based in</div>
                <div className="font-head text-lg text-ink">Dehradun, Uttarakhand</div>
              </div>
            </div>
          </div>
          <div className="hidden justify-center md:flex">
            <span className="grid h-44 w-44 place-items-center rounded-full bg-geru">
              <Motif shape="chowki" size={120} stroke="#FBF6EE" sw={3} />
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-reading px-6 py-14">
        <form action="#" method="post" className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="rounded-lg border border-[#e2dccf] px-4 py-3 font-sans text-sm focus:border-geru focus:outline-none" placeholder="Your name" aria-label="Name" />
            <input className="rounded-lg border border-[#e2dccf] px-4 py-3 font-sans text-sm focus:border-geru focus:outline-none" placeholder="Your email" type="email" aria-label="Email" />
          </div>
          <textarea rows="5" className="rounded-lg border border-[#e2dccf] px-4 py-3 font-sans text-sm focus:border-geru focus:outline-none" placeholder="Your message, correction, or story" aria-label="Message" />
          <button type="submit" className="justify-self-start rounded-full bg-geru px-7 py-3 font-sans text-sm font-semibold text-rice hover:bg-geru-deep">Send message</button>
        </form>
        <p className="mt-4 font-sans text-xs text-slate-mute">This form is a placeholder — wire it to Resend or Formspree before launch.</p>
      </section>
      <SiteFooter />
    </>
  )
}
