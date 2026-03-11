"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { CARDS, CATEGORIES, defaultSpending } from "@/data/cards";
import CardSelector from "@/components/CardSelector";
import SpendingInput from "@/components/SpendingInput";
import SectionHeader from "@/components/SectionHeader";

export default function GapFinderClient() {
  const [sel, setSel] = useState([]);
  const [show, setShow] = useState(false);
  const [spend, setSpend] = useState(defaultSpending());
  const [showS, setShowS] = useState(false);
  const toggle = id => { setSel(p => p.includes(id) ? p.filter(c => c !== id) : [...p, id]); setShow(false); };

  const gaps = useMemo(() => {
    if (!show) return [];
    const g = [];
    CATEGORIES.forEach(cat => {
      let bOwned = 0;
      sel.forEach(cid => { const c = CARDS.find(x => x.id === cid); const r = c.rewards[cat.id] || c.rewards.default || 0; if (r > bOwned) bOwned = r; });
      let bCard = null, bR = 0;
      CARDS.forEach(card => { if (sel.includes(card.id)) return; const r = card.rewards[cat.id] || card.rewards.default || 0; if (r > bOwned && r > bR) { bCard = card; bR = r; } });
      if (bCard && bR - bOwned >= 0.5) { const extra = Math.round((spend[cat.id] || 0) * 12 * (bR - bOwned) / 100); g.push({ cat, cur: bOwned, card: bCard, rate: bR, imp: bR - bOwned, extra }); }
    });
    return g.sort((a, b) => b.extra - a.extra);
  }, [show, sel, spend]);

  const total = gaps.reduce((s, g) => s + g.extra, 0);

  return (
    <section className="pt-24 pb-20 px-6 max-w-[1000px] mx-auto">
      <SectionHeader badge="💡 Tool #2" badgeBg="var(--orange-bg)" badgeBorder="var(--orange-border)" badgeColor="var(--orange)" title="Card Gap Finder" subtitle="Find where you're leaving money behind and which cards could fix it." />

      <div className="mb-8">
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>Cards you own</h3>
        <CardSelector selected={sel} onToggle={toggle} />
      </div>

      {sel.length === 0 && <div className="text-center py-10 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
        <div className="text-4xl mb-3">👆</div>
        <div className="text-base font-semibold" style={{ color: "var(--text)" }}>Select your cards to find reward gaps</div>
        <div className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>We'll show you where better cards exist</div>
      </div>}

      {sel.length > 0 && <>
        <button onClick={() => setShowS(!showS)} className="rounded-lg px-4 py-2.5 text-sm font-semibold cursor-pointer mb-4"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--accent-text)", boxShadow: "var(--shadow)" }}>
          {showS ? "▾" : "▸"} Customize spending for accurate savings (optional)
        </button>
        {showS && <SpendingInput spending={spend} setSpending={setSpend} />}
        <button onClick={() => setShow(true)} className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white border-none rounded-xl py-4 text-base font-semibold cursor-pointer mb-10 shadow-lg">Find My Gaps →</button>
      </>}

      {show && <div className="animate-fade-up">
        {gaps.length === 0 ? (
          <div className="rounded-2xl p-8 text-center" style={{ background: "var(--green-bg)", border: "1px solid var(--green-border)" }}>
            <div className="text-5xl mb-3">🎉</div>
            <div className="text-xl font-bold mb-2" style={{ color: "var(--green)" }}>Your stack is solid!</div>
            <div className="text-sm" style={{ color: "var(--text-muted)" }}>No significant reward gaps found.</div>
          </div>
        ) : <>
          {total > 0 && <div className="rounded-xl p-5 mb-5 text-center" style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)" }}>
            <div className="text-sm font-semibold mb-1" style={{ color: "var(--orange)" }}>You're leaving an estimated</div>
            <div className="text-4xl font-extrabold" style={{ color: "var(--orange)" }}>₹{total.toLocaleString()}<span className="text-base" style={{ color: "var(--text-muted)" }}>/year</span></div>
            <div className="text-sm" style={{ color: "var(--text-muted)" }}>on the table across {gaps.length} categories</div>
          </div>}

          <div className="flex flex-col gap-3">
            {gaps.map((g, i) => (
              <div key={i} className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)", animation: `fadeUp 0.4s ease-out ${i * 0.06}s both` }}>
                <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{g.cat.icon}</span>
                    <span className="text-base font-semibold" style={{ color: "var(--text)" }}>{g.cat.label}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="rounded-md px-2.5 py-1 text-xs font-bold font-mono" style={{ background: "var(--orange-bg)", color: "var(--orange)" }}>+{g.imp}%</span>
                    <span className="rounded-md px-2.5 py-1 text-xs font-bold font-mono" style={{ background: "var(--green-bg)", color: "var(--green)" }}>+₹{g.extra.toLocaleString()}/yr</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex-1 min-w-[100px] rounded-lg p-3" style={{ background: "var(--bg-muted)" }}>
                    <div className="text-[11px] mb-1" style={{ color: "var(--text-faint)" }}>Your best now</div>
                    <div className="text-xl font-bold font-mono" style={{ color: "var(--text-muted)" }}>{g.cur}%</div>
                  </div>
                  <div className="text-lg" style={{ color: "var(--text-faint)" }}>→</div>
                  <Link href={`/cards/${g.card.id}`} className="flex-1 min-w-[180px] rounded-lg p-3 flex items-center gap-2.5 no-underline cursor-pointer"
                    style={{ background: `${g.card.color}18`, border: `1px solid ${g.card.color}25` }}>
                    <span className="text-xl">{g.card.img}</span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>{g.card.name}</div>
                      <div className="text-[11px]" style={{ color: "var(--text-faint)" }}>{g.card.fee === 0 ? "Free" : `₹${g.card.fee}/yr`} · Tap for details</div>
                    </div>
                    <div className="text-xl font-bold font-mono" style={{ color: "var(--green)" }}>{g.rate}%</div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>}
      </div>}
    </section>
  );
}
