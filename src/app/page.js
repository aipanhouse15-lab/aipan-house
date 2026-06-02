import Link from 'next/link'
import AlmanacWheel from '@/components/AlmanacWheel'
import ElevationTracker from '@/components/ElevationTracker'
import SiteFooter from '@/components/SiteFooter'
import HomeHeader from '@/components/HomeHeader'

function Ridge({ d, fill, opacity = 1 }) {
  return (
    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
      <path d={d} fill={fill} opacity={opacity} />
    </svg>
  )
}

export default function Home() {
  return (
    <>
      <HomeHeader />
      <ElevationTracker />

      {/* VALLEY */}
      <section id="valley" className="relative flex min-h-screen items-center overflow-hidden px-[8vw]"
        style={{ background: 'linear-gradient(180deg,#cdd8c4,#b3c2a0)', color: '#2f3a26' }}>
        <Ridge d="M0,200 L0,120 C300,90 500,140 760,120 C1000,102 1200,150 1440,110 L1440,200Z" fill="#9caf86" opacity={0.6} />
        <div className="relative z-10 max-w-xl">
          <div className="font-mono text-xs uppercase tracking-[.16em] opacity-75">Elevation 1,200 m · the valley floor</div>
          <h2 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">Where the day <em>begins</em>.</h2>
          <p className="mt-4 text-lg leading-relaxed opacity-90">Terraced fields, the kitchen fire, the food that names a season. Start in the valley — the everyday life and cuisine of Kumaon.</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link href="/traditions" className="rounded-full border border-current px-4 py-2 text-sm font-semibold">Kumaoni food</Link>
            <Link href="/traditions" className="rounded-full border border-current px-4 py-2 text-sm font-semibold">Daily life</Link>
          </div>
        </div>
      </section>

      {/* VILLAGE — almanac wheel */}
      <section id="village" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-[6vw] py-24"
        style={{ background: 'linear-gradient(180deg,#e7d9bf,#dcc59c)', color: '#42301c' }}>
        <Ridge d="M0,200 L0,150 C320,110 520,160 780,138 C1040,118 1240,166 1440,130 L1440,200Z" fill="#c9ad79" opacity={0.55} />
        <div className="relative z-10 max-w-2xl text-center">
          <div className="font-mono text-xs uppercase tracking-[.16em] opacity-75">Elevation 1,800 m · the village</div>
          <h2 className="mt-2 font-display text-4xl leading-tight md:text-5xl">The wheel of the <em>Kumaoni year</em>.</h2>
          <p className="mx-auto mt-3.5 max-w-md text-base leading-relaxed">Up in the village, the calendar comes alive. Turn the year to find each festival in its season — what's sown, sung, cooked and drawn.</p>
        </div>
        <div className="relative z-10 mt-6 w-full">
          <AlmanacWheel />
        </div>
      </section>

      {/* TEMPLE */}
      <section id="temple" className="relative flex min-h-screen items-center overflow-hidden px-[8vw]"
        style={{ background: 'linear-gradient(180deg,#caa98e,#9E2B1E)', color: '#fbeee6' }}>
        <Ridge d="M0,200 L0,150 C300,120 540,160 800,140 C1060,120 1260,160 1440,132 L1440,200Z" fill="#7e1f12" opacity={0.7} />
        <div className="relative z-10 max-w-xl">
          <div className="font-mono text-xs uppercase tracking-[.16em] opacity-75">Elevation 2,200 m · the temple threshold</div>
          <h2 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">Where the art is <em>drawn</em>.</h2>
          <p className="mt-4 text-lg leading-relaxed opacity-90">At the threshold of the hill temple, the rice paste meets the red ground. This is Aipan — every motif and method, decoded in depth.</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link href="/aipan" className="rounded-full border border-current px-4 py-2 text-sm font-semibold">What is Aipan?</Link>
            <Link href="/aipan" className="rounded-full border border-current px-4 py-2 text-sm font-semibold">The motifs</Link>
          </div>
        </div>
      </section>

      {/* PEAK */}
      <section id="peak" className="relative flex min-h-screen items-center overflow-hidden px-[8vw]"
        style={{ background: 'linear-gradient(180deg,#dfeaf2,#aebfca)', color: '#23323e' }}>
        <Ridge d="M0,200 L0,160 C300,130 540,170 800,150 C1060,128 1260,168 1440,142 L1440,200Z" fill="#93a6b3" opacity={0.6} />
        <div className="relative z-10 max-w-xl">
          <div className="font-mono text-xs uppercase tracking-[.16em] opacity-75">Elevation 3,500 m · the high snows</div>
          <h2 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">Where the stories <em>live</em>.</h2>
          <p className="mt-4 text-lg leading-relaxed opacity-90">Above the tree line are the gods and the old tales — Nanda Devi, the sacred peaks, the myths the festivals remember.</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link href="/traditions" className="rounded-full border border-current px-4 py-2 text-sm font-semibold">Sacred geography</Link>
            <Link href="/about" className="rounded-full border border-current px-4 py-2 text-sm font-semibold">Why Kumaon</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
