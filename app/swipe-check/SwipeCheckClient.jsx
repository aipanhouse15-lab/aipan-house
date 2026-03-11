"use client";
import { useState } from "react";
import Link from "next/link";
import { CARDS } from "@/data/cards";
import { MERCHANTS } from "@/data/merchants";
import SectionHeader from "@/components/SectionHeader";

export default function SwipeCheckClient() {
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedMerchant, setSelectedMerchant] = useState(null);

  const merchant = selectedMerchant
    ? Object.values(MERCHANTS).flatMap(c => c.items).find(m => m.id === selectedMerchant)
    : null;

  return (
    <section className="pt-24 pb-20 px-6 max-w-[1000px] mx-auto">
      <SectionHeader badge="🔍 Tool #3 — NEW" badgeBg="rgba(236,72,153,0.08)" badgeBorder="rgba(236,72,153,0.18)" badgeColor="#ec4899" title="Swipe Check" subtitle="Pick where you're spending. We'll tell you the exact best card with pro tips." />

      {/* Category Grid */}
      {!selectedCat && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>What are you spending on?</h3>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
            {Object.entries(MERCHANTS).map(([key, cat]) => (
              <button key={key} onClick={() => setSelectedCat(key)}
                className="rounded-2xl p-6 text-left cursor-pointer transition-all hover:-translate-y-0.5 flex flex-col gap-2"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
                <div className="text-3xl">{cat.icon}</div>
                <div className="text-base font-bold" style={{ color: "var(--text)" }}>{cat.label}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{cat.items.length} merchants</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Merchant Selection */}
      {selectedCat && !selectedMerchant && (
        <div className="animate-fade-up">
          <button onClick={() => setSelectedCat(null)} className="rounded-lg px-4 py-2 text-sm font-medium cursor-pointer mb-6 border-none"
            style={{ background: "var(--bg-muted)", color: "var(--text-muted)" }}>← Back to categories</button>
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
            {MERCHANTS[selectedCat].icon} {MERCHANTS[selectedCat].label} — Pick a merchant
          </h3>
          <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
            {MERCHANTS[selectedCat].items.map(m => (
              <button key={m.id} onClick={() => setSelectedMerchant(m.id)}
                className="rounded-xl p-4 flex items-center gap-3 text-left cursor-pointer transition-all hover:shadow-md"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
                <span className="text-3xl">{m.icon}</span>
                <span className="text-base font-semibold" style={{ color: "var(--text)" }}>{m.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {merchant && (
        <div className="animate-fade-up">
          <button onClick={() => setSelectedMerchant(null)} className="rounded-lg px-4 py-2 text-sm font-medium cursor-pointer mb-6 border-none"
            style={{ background: "var(--bg-muted)", color: "var(--text-muted)" }}>← Back to {MERCHANTS[selectedCat].label}</button>

          {/* Merchant Header */}
          <div className="rounded-2xl p-7 mb-6" style={{ background: "rgba(236,72,153,0.05)", border: "1px solid rgba(236,72,153,0.15)" }}>
            <div className="flex items-center gap-3.5 mb-4">
              <span className="text-4xl">{merchant.icon}</span>
              <div>
                <h3 className="text-2xl font-extrabold" style={{ color: "var(--text)" }}>{merchant.name}</h3>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>Best cards for this merchant</span>
              </div>
            </div>
          </div>

          {/* Card Recommendations */}
          <div className="flex flex-col gap-2.5 mb-6">
            {merchant.tips.map((tip, i) => {
              const card = CARDS.find(c => c.id === tip.card);
              if (!card) return null;
              return (
                <div key={i} className="rounded-2xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)", animation: `fadeUp 0.3s ease-out ${i * 0.06}s both` }}>
                  <div className="flex items-center justify-between mb-2.5 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      {i === 0 && <span className="text-[11px] font-bold bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-md px-2 py-0.5">BEST</span>}
                      <Link href={`/cards/${card.id}`} className="flex items-center gap-1.5 no-underline">
                        <span className="text-xl">{card.img}</span>
                        <span className="text-base font-bold" style={{ color: "var(--text)" }}>{card.name}</span>
                      </Link>
                    </div>
                    <div className="rounded-lg px-3 py-1 text-sm font-bold font-mono" style={{ background: "var(--green-bg)", color: "var(--green)" }}>{tip.rate}</div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{tip.note}</p>
                  <Link href={`/cards/${card.id}`} className="inline-block mt-2.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold no-underline"
                    style={{ background: `${card.color}18`, border: `1px solid ${card.color}25`, color: "var(--text)" }}>View card details →</Link>
                </div>
              );
            })}
          </div>

          {/* Pro Tip */}
          <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(251,191,36,0.02))", border: "1px solid rgba(251,191,36,0.2)" }}>
            <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#d97706" }}>💡 Pro Tip</div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{merchant.proTip}</p>
          </div>
        </div>
      )}
    </section>
  );
}
