export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-slate px-10 pb-7 pt-14 text-center">
      <svg className="absolute left-0 top-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,80 L180,40 L360,72 L560,36 L760,74 L960,40 L1180,74 L1380,44 L1440,64 L1440,80Z" fill="#1a2730" />
      </svg>
      <p className="relative z-10 font-mono text-[11px] uppercase tracking-wider text-slate-mute">
        © {new Date().getFullYear()} Aipan House · from the valley to the snows · Dehradun, Uttarakhand
      </p>
    </footer>
  )
}
