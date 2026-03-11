import Link from "next/link";

const TOOL_LINKS = [
  { href: "/smart-swipe", label: "Smart Swipe Guide" },
  { href: "/gap-finder", label: "Card Gap Finder" },
  { href: "/swipe-check", label: "Swipe Check" },
  { href: "/compare", label: "Compare Cards" },
  { href: "/blog", label: "Blog" },
];

const CARD_LINKS = [
  { href: "/cards/hdfc-regalia", label: "HDFC Regalia" },
  { href: "/cards/amazon-icici", label: "Amazon Pay ICICI" },
  { href: "/cards/axis-ace", label: "Axis ACE" },
  { href: "/cards/au-lit", label: "AU LIT" },
  { href: "/cards/onecard", label: "OneCard" },
];

export default function Footer() {
  const linkClass = "block mb-2.5 text-sm no-underline transition-colors";

  return (
    <footer className="py-14 px-6" style={{ borderTop: "1px solid var(--border)", background: "var(--bg-alt)" }}>
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-extrabold">C</div>
              <span className="text-lg font-bold" style={{ color: "var(--text)" }}>CardStack</span>
            </div>
            <p className="text-sm leading-relaxed max-w-[220px]" style={{ color: "var(--text-muted)" }}>
              India's smartest credit card tool. 25+ cards, real savings, zero tracking.
            </p>
          </div>

          {/* Tools */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "var(--text-faint)" }}>Tools</div>
            {TOOL_LINKS.map(l => (
              <Link key={l.href} href={l.href} className={linkClass} style={{ color: "var(--text-muted)" }}>{l.label}</Link>
            ))}
          </div>

          {/* Popular Cards */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "var(--text-faint)" }}>Popular Cards</div>
            {CARD_LINKS.map(l => (
              <Link key={l.href} href={l.href} className={linkClass} style={{ color: "var(--text-muted)" }}>{l.label}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "var(--text-faint)" }}>Company</div>
            {["About", "How We Earn", "Editorial Policy", "Contact"].map(l => (
              <span key={l} className={`${linkClass} cursor-pointer`} style={{ color: "var(--text-muted)" }}>{l}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text-faint)" }}>© 2026 CardStack. Not financial advice.</p>
          <p className="text-xs text-right max-w-[360px] leading-relaxed" style={{ color: "var(--text-faint)" }}>
            We may earn commissions through affiliate links — at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
