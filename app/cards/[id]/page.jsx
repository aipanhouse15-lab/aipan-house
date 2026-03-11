import { CARDS, CATEGORIES } from "@/data/cards";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return CARDS.map(card => ({ id: card.id }));
}

export async function generateMetadata({ params }) {
  const card = CARDS.find(c => c.id === params.id);
  if (!card) return { title: "Card Not Found" };
  return {
    title: `${card.name} Review — Rewards, Fees & Benefits`,
    description: `${card.name} by ${card.bank}: ${card.fee === 0 ? "Lifetime free" : `₹${card.fee}/year`}. Best for ${Object.entries(card.rewards).filter(([k]) => k !== "default").sort((a, b) => b[1] - a[1])[0][0]} at ${Object.entries(card.rewards).filter(([k]) => k !== "default").sort((a, b) => b[1] - a[1])[0][1]}%. Full review with pros, cons, and reward breakdown.`,
  };
}

export default function CardPage({ params }) {
  const card = CARDS.find(c => c.id === params.id);
  if (!card) notFound();

  const sorted = Object.entries(card.rewards).filter(([k]) => k !== "default").sort((a, b) => b[1] - a[1]);
  const maxRate = sorted[0][1];
  const bestCategory = sorted[0][0];

  // JSON-LD: Product schema for credit card
  const cardSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: card.name,
    description: `${card.name} by ${card.bank}. ${card.type} credit card with up to ${maxRate}% rewards on ${bestCategory}. ${card.fee === 0 ? "Lifetime free — no annual fee." : `Annual fee: ₹${card.fee}.`} ${card.highlights.join(". ")}.`,
    brand: { "@type": "Organization", name: card.bank },
    category: "Credit Card",
    offers: {
      "@type": "Offer",
      price: card.fee,
      priceCurrency: "INR",
      description: card.fee === 0 ? "Lifetime free — no annual fee" : `Annual fee: ₹${card.fee}`,
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Card Type", value: card.type },
      { "@type": "PropertyValue", name: "Card Network", value: card.network },
      { "@type": "PropertyValue", name: "Lounge Access", value: card.lounge },
      { "@type": "PropertyValue", name: "Best Reward Category", value: bestCategory },
      { "@type": "PropertyValue", name: "Best Reward Rate", value: `${maxRate}%` },
      ...sorted.map(([catId, rate]) => ({
        "@type": "PropertyValue",
        name: `${catId.charAt(0).toUpperCase() + catId.slice(1)} Reward Rate`,
        value: `${rate}%`,
      })),
    ],
    feesAndCommissionsSpecification: card.fee === 0 ? "No annual fee" : `Annual fee of ₹${card.fee}`,
    areaServed: { "@type": "Country", name: "India" },
  };

  // JSON-LD: Review/Rating schema
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "FinancialProduct", name: card.name },
    author: { "@type": "Organization", name: "CardStack" },
    reviewBody: `${card.name} review: ${card.pros.join(". ")}. Downsides: ${card.cons.join(". ")}.`,
    positiveNotes: { "@type": "ItemList", itemListElement: card.pros.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p })) },
    negativeNotes: { "@type": "ItemList", itemListElement: card.cons.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c })) },
  };

  // JSON-LD: BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://cardstack.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Cards", item: "https://cardstack.vercel.app/compare" },
      { "@type": "ListItem", position: 3, name: card.name, item: `https://cardstack.vercel.app/cards/${card.id}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cardSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <section className="pt-24 pb-20 px-6 max-w-[700px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: "var(--text-faint)" }}>
        <Link href="/" className="no-underline hover:underline" style={{ color: "var(--text-faint)" }}>Home</Link>
        <span>/</span>
        <Link href="/compare" className="no-underline hover:underline" style={{ color: "var(--text-faint)" }}>Cards</Link>
        <span>/</span>
        <span style={{ color: "var(--text-muted)" }}>{card.name}</span>
      </div>

      {/* Header */}
      <div className="rounded-2xl p-7 mb-8" style={{ background: `${card.color}12`, border: `1px solid ${card.color}20` }}>
        <div className="flex items-center gap-4 flex-wrap mb-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl" style={{ background: `${card.color}18`, border: `1px solid ${card.color}25` }}>{card.img}</div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--text)" }}>{card.name}</h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{card.bank} · {card.type} · {card.network}</p>
          </div>
        </div>
        <div className="flex gap-6 flex-wrap">
          {[["Annual Fee", card.fee === 0 ? "FREE" : `₹${card.fee.toLocaleString()}`],
            ["Fee Waiver", card.feeWaiver || "N/A"],
            ["Lounge Access", card.lounge],
            ["Best Rate", `${maxRate}%`],
            ["Network", card.network],
          ].map(([label, value], i) => (
            <div key={i}>
              <div className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>{label}</div>
              <div className="text-lg font-bold font-mono" style={{ color: i === 3 ? "var(--green)" : "var(--text)" }}>{value}</div>
            </div>
          ))}
        </div>
        {card.verified && (
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "var(--green-bg)", border: "1px solid var(--green-border)", color: "var(--green)" }}>✅ Data verified March 2026</div>
        )}
        {!card.verified && (
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)", color: "var(--orange)" }}>⚠️ Data being verified</div>
        )}
      </div>

      {/* Reward Rates */}
      <div className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>Reward Rates by Category</h2>
        <div className="flex flex-col gap-2">
          {sorted.map(([catId, rate]) => {
            const cat = CATEGORIES.find(c => c.id === catId);
            return (
              <div key={catId} className="flex items-center gap-3">
                <span className="text-base w-6">{cat?.icon || "📋"}</span>
                <span className="text-sm w-24" style={{ color: "var(--text-secondary)" }}>{cat?.label || catId}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-muted)" }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(rate / maxRate) * 100}%`, background: rate === maxRate ? "var(--green)" : "var(--accent)" }} />
                </div>
                <span className="text-sm font-bold font-mono w-10 text-right" style={{ color: rate === maxRate ? "var(--green)" : "var(--text)" }}>{rate}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Points Info */}
      {card.pointsInfo && (
        <div className="mb-6 rounded-xl p-4" style={{ background: "var(--bg-muted)", border: "1px solid var(--border)" }}>
          <div className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-faint)" }}>How Points Work</div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{card.pointsInfo}</p>
        </div>
      )}

      {/* Partner / SmartBuy Rates */}
      {card.partnerRates && card.partnerRates.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>🚀 Boosted Rates (Partners & SmartBuy)</h2>
          <div className="flex flex-col gap-2">
            {card.partnerRates.map((pr, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: "var(--accent-light)", border: "1px solid var(--accent-border)" }}>
                <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{pr.name}</span>
                <span className="text-sm font-bold font-mono rounded-md px-2.5 py-1" style={{ background: "var(--green-bg)", color: "var(--green)" }}>{pr.rate}</span>
              </div>
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--text-faint)" }}>These rates apply when using specific platforms or partners — higher than the base category rate shown above.</p>
        </div>
      )}

      {/* Benefits */}
      <div className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>Key Benefits</h2>
        <div className="flex flex-wrap gap-1.5">
          {card.highlights.map((h, i) => (
            <span key={i} className="text-xs rounded-lg px-3 py-1.5" style={{ color: "var(--text-secondary)", background: "var(--bg-muted)" }}>{h}</span>
          ))}
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <div className="rounded-xl p-5" style={{ background: "var(--green-bg)", border: "1px solid var(--green-border)" }}>
          <div className="text-xs font-bold mb-3" style={{ color: "var(--green)" }}>PROS</div>
          {card.pros.map((p, i) => <div key={i} className="text-sm mb-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>✅ {p}</div>)}
        </div>
        <div className="rounded-xl p-5" style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)" }}>
          <div className="text-xs font-bold mb-3" style={{ color: "var(--orange)" }}>CONS</div>
          {card.cons.map((c, i) => <div key={i} className="text-sm mb-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>⚠️ {c}</div>)}
        </div>
      </div>

      {/* CTA */}
      <button className="w-full rounded-xl py-3.5 text-base font-semibold text-white border-none cursor-pointer opacity-80"
        style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}cc)` }}>
        Check {card.name} on bank website →
      </button>
      <p className="text-[11px] text-center mt-2" style={{ color: "var(--text-faint)" }}>Affiliate links coming soon</p>

      {/* Compare CTA */}
      <div className="mt-8 rounded-xl p-5 text-center" style={{ background: "var(--accent-light)", border: "1px solid var(--accent-border)" }}>
        <p className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>Want to compare this card?</p>
        <Link href="/compare" className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white no-underline rounded-lg px-6 py-2.5 text-sm font-semibold">
          Go to Compare Tool →
        </Link>
      </div>
    </section>
    </>
  );
}
