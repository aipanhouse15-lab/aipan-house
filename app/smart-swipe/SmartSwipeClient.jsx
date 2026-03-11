"use client";
import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { CARDS, CATEGORIES, defaultSpending, calcReward } from "@/data/cards";
import CardSelector from "@/components/CardSelector";
import SpendingInput from "@/components/SpendingInput";
import SectionHeader from "@/components/SectionHeader";

export default function SmartSwipeClient() {
  const [sel, setSel] = useState([]);
  const [show, setShow] = useState(false);
  const [spend, setSpend] = useState(defaultSpending());
  const [showS, setShowS] = useState(false);

  const toggle = id => { setSel(p => p.includes(id) ? p.filter(c => c !== id) : [...p, id]); setShow(false); };

  // Find best card for each category — now cap-aware
  const results = useMemo(() => {
    if (!show || !sel.length) return [];

    return CATEGORIES.map(cat => {
      let bestCard = null;
      let bestResult = { cashback: 0, effectiveRate: 0, capped: false, capNote: null };
      let bestBaseRate = 0;

      sel.forEach(cid => {
        const card = CARDS.find(x => x.id === cid);
        if (!card) return;
        const result = calcReward(card, cat.id, spend[cat.id] || 0);

        // Compare by actual cashback (post-cap), not just base rate
        if (result.cashback > bestResult.cashback) {
          bestCard = card;
          bestResult = result;
          bestBaseRate = card.rewards[cat.id] || card.rewards.default || 0;
        }
      });

      return {
        cat,
        card: bestCard,
        baseRate: bestBaseRate,
        effectiveRate: bestResult.effectiveRate,
        cashback: bestResult.cashback,
        capped: bestResult.capped,
        capNote: bestResult.capNote,
      };
    });
  }, [show, sel, spend]);

  const totalMonthlyCashback = useMemo(() => results.reduce((s, r) => s + r.cashback, 0), [results]);
  const totalBaselineCashback = useMemo(() => {
    return CATEGORIES.reduce((s, cat) => s + Math.round((spend[cat.id] || 0) * 1 / 100), 0);
  }, [spend]);
  const annualSavings = (totalMonthlyCashback - totalBaselineCashback) * 12;
  const anyCapped = results.some(r => r.capped);

  return (
    <section className="pt-24 pb-20 px-6 max-w-[1000px] mx-auto">
      <SectionHeader
        badge="🎯 Tool #1"
        badgeBg="var(--green-bg)" badgeBorder="var(--green-border)" badgeColor="var(--green)"
        title="Smart Swipe Guide"
        subtitle="Select your cards, enter your spending, and see which card to swipe for every purchase."
      />

      <div className="mb-8">
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>Step 1: Select your cards</h3>
        <CardSelector selected={sel} onToggle={toggle} />
      </div>

      {sel.length === 0 && (
        <div className="text-center py-10 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
          <div className="text-4xl mb-3">👆</div>
          <div className="text-base font-semibold" style={{ color: "var(--text)" }}>Select at least one card to get started</div>
          <div className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Pick the cards you use from the grid above</div>
        </div>
      )}

      {sel.length > 0 && <>
        <button onClick={() => setShowS(!showS)} className="rounded-lg px-4 py-2.5 text-sm font-semibold cursor-pointer mb-4"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--accent-text)", boxShadow: "var(--shadow)" }}>
          {showS ? "▾" : "▸"} Step 2: Customize monthly spending (optional)
        </button>
        {showS && <SpendingInput spending={spend} setSpending={setSpend} />}

        <button onClick={() => setShow(true)} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none rounded-xl py-4 text-base font-semibold cursor-pointer mb-10 shadow-lg">
          Show My Best Cards →
        </button>
      </>}

      {show && results.length > 0 && (
        <div className="animate-fade-up">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Your optimal card for each category</h3>
            {anyCapped && (
              <div className="text-[11px] font-semibold rounded-full px-3 py-1" style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)", color: "var(--orange)" }}>
                ⚠️ Some cards hit cashback caps at your spending
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {results.map((r, i) => {
              if (!r.card) return null;
              return (
                <div key={r.cat.id} className="rounded-xl px-4 py-3.5 flex flex-col gap-2"
                  style={{ background: "var(--bg-card)", border: `1px solid ${r.capped ? "var(--orange-border)" : "var(--border)"}`, boxShadow: "var(--shadow)", animation: `fadeUp 0.4s ease-out ${i * 0.04}s both` }}>

                  {/* Main row */}
                  <div className="flex items-center justify-between flex-wrap gap-2.5">
                    <div className="flex items-center gap-3 min-w-[140px]">
                      <span className="text-2xl">{r.cat.icon}</span>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>{r.cat.label}</div>
                        <div className="text-[11px]" style={{ color: "var(--text-faint)" }}>{r.cat.desc}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link href={`/cards/${r.card.id}`} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 no-underline text-xs font-semibold"
                        style={{ background: `${r.card.color}18`, border: `1px solid ${r.card.color}25`, color: "var(--text)" }}>
                        {r.card.img} {r.card.name}
                      </Link>
                      <div className="rounded-md px-2 py-1 text-sm font-bold font-mono" style={{ background: "var(--green-bg)", color: "var(--green)" }}>
                        {r.capped ? `${r.effectiveRate}%` : `${r.baseRate}%`}
                      </div>
                      <div className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>≈ ₹{r.cashback}/mo</div>
                    </div>
                  </div>

                  {/* Cap warning row */}
                  {r.capped && (
                    <div className="flex items-start gap-2 rounded-lg px-3 py-2 text-xs leading-relaxed"
                      style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)", color: "var(--orange)" }}>
                      <span className="flex-shrink-0">⚡</span>
                      <div>
                        <span className="font-bold">Cap hit!</span> {r.capNote}
                        {r.effectiveRate < r.baseRate && (
                          <span className="block mt-0.5" style={{ color: "var(--text-muted)" }}>
                            Advertised {r.baseRate}% → your effective rate is {r.effectiveRate}% at ₹{(spend[r.cat.id] || 0).toLocaleString()}/mo spend
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Under-cap note */}
                  {!r.capped && r.capNote && (
                    <div className="text-[10px] px-1" style={{ color: "var(--text-faint)" }}>
                      ℹ️ {r.capNote}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Savings summary */}
          <div className="mt-6 rounded-2xl p-7 text-center" style={{ background: "var(--accent-light)", border: "1px solid var(--accent-border)" }}>
            <div className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>Extra rewards vs a basic 1% card</div>
            <div className="text-4xl font-extrabold" style={{ color: "var(--green)" }}>
              ₹{annualSavings.toLocaleString()}<span className="text-lg" style={{ color: "var(--text-muted)" }}>/year</span>
            </div>
            <div className="text-sm mt-2" style={{ color: "var(--text-faint)" }}>
              Monthly: ₹{totalMonthlyCashback.toLocaleString()} cashback · Spend: ₹{Object.values(spend).reduce((a, b) => a + b, 0).toLocaleString()}/mo · {sel.length} card{sel.length > 1 ? "s" : ""}
            </div>
            {anyCapped && (
              <div className="mt-3 text-xs font-semibold" style={{ color: "var(--orange)" }}>
                ⚠️ Savings calculated with cashback caps applied — these are your REAL savings, not inflated numbers
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
