import Link from 'next/link'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import Motif from './Motif'
import Mdx from './Mdx'
import Schema from './Schema'
import { extractFaqs } from '@/lib/content'

// derive a darker shade for headings from the accent (simple darken)
function darken(hex, amt = 0.7) {
  const n = parseInt(hex.slice(1), 16)
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  r = Math.round(r * amt); g = Math.round(g * amt); b = Math.round(b * amt)
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}
function softTint(hex) {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  const mix = (c) => Math.round(c + (255 - c) * 0.86)
  return `#${((1 << 24) + (mix(r) << 16) + (mix(g) << 8) + mix(b)).toString(16).slice(1)}`
}

export default function Article({ data, toc = [], facts = [], motif = 'lotus' }) {
  const accent = data.accent || '#9E2B1E'
  const accentDeep = darken(accent)
  const accentSoft = softTint(accent)
  const themeVars = { '--accent': accent, '--accent-deep': accentDeep, '--accent-soft': accentSoft }
  const faqs = extractFaqs(data.content)

  return (
    <div style={themeVars}>
      <Schema data={data} faqs={faqs} pillar={data.pillar} />

      {/* colored title strip — full-bleed, runs up behind the transparent header */}
      <div className="relative px-6 pb-11 pt-28 md:px-10 md:pt-32" style={{ background: accent, color: '#FBFDF8' }}>
        <SiteHeader transparent />
        <div className={`mx-auto grid max-w-content items-center gap-10 ${data.hero ? 'md:grid-cols-[1.1fr_1fr]' : ''}`}>
          <div>
            <div className="font-sans text-xs font-bold uppercase tracking-[.1em] opacity-85">{data.kicker}</div>
            <h1 className="mt-3 max-w-[18ch] font-head text-4xl font-extrabold leading-[1.0] tracking-tight md:text-5xl">{data.title}</h1>
            {data.excerpt && <p className="mt-4 max-w-[52ch] text-lg italic leading-relaxed opacity-90">{data.excerpt}</p>}
            <div className="mt-4 font-sans text-xs uppercase tracking-wide opacity-80">
              By {data.author || 'Aipan House'} · {data.date} · {data.readingTime}
            </div>
          </div>
          {data.hero && (
            <div className="hidden md:block">
              <img src={data.hero} alt={data.heroAlt || data.title} loading="eager"
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_18px_50px_rgba(0,0,0,.22)]" />
            </div>
          )}
        </div>
      </div>

      {/* hero on mobile — full width below banner */}
      {data.hero && (
        <div className="mx-auto max-w-content px-6 md:hidden">
          <img src={data.hero} alt={data.heroAlt || data.title} loading="eager"
            className="-mt-6 aspect-[16/9] w-full rounded-2xl object-cover shadow-[0_18px_50px_rgba(35,50,62,.18)]" />
        </div>
      )}

      {/* two-column layout */}
      <div className="mx-auto grid max-w-content gap-12 px-6 pb-20 pt-11 md:grid-cols-[260px_1fr] md:px-10">
        <aside className="order-2 md:order-1">
          <div className="md:sticky md:top-8">
            {toc.length > 0 && (
              <div className="mb-7">
                <h4 className="border-b border-[#e8e8e8] pb-2 font-sans text-[11px] font-bold uppercase tracking-[.1em]" style={{ color: accentDeep }}>On this page</h4>
                <nav className="mt-1">
                  {toc.map((t, i) => (
                    <a key={t.id} href={`#${t.id}`} className="block border-b border-[#f2f2f2] py-1.5 font-sans text-sm text-[#4a5044] hover:opacity-70">
                      <span className="mr-2 font-sans text-[11px] text-[#a8b09c]">{String(i + 1).padStart(2, '0')}</span>{t.label}
                    </a>
                  ))}
                </nav>
              </div>
            )}
            {facts.length > 0 && (
              <div className="mb-7">
                <h4 className="border-b border-[#e8e8e8] pb-2 font-sans text-[11px] font-bold uppercase tracking-[.1em]" style={{ color: accentDeep }}>Quick facts</h4>
                <dl className="mt-2">
                  {facts.map((f) => (
                    <div key={f.k} className="mt-3">
                      <dt className="font-sans text-[11px] uppercase tracking-wide text-[#8a907e]">{f.k}</dt>
                      <dd className="font-sans text-[15px] font-semibold text-[#222a20]">{f.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            <div>
              <h4 className="border-b border-[#e8e8e8] pb-2 font-sans text-[11px] font-bold uppercase tracking-[.1em]" style={{ color: accentDeep }}>The motif of the season</h4>
              <div className="mt-2 flex justify-center rounded-xl p-5" style={{ background: accent }}>
                <Motif shape={motif} size={120} stroke="#FBFDF8" sw={4} />
              </div>
            </div>
          </div>
        </aside>

        <article className="order-1 max-w-reading md:order-2">
          <Mdx source={data.content} accent={accent} />
        </article>
      </div>

      <SiteFooter />
    </div>
  )
}
