"use client";
import { useState } from "react";
import Link from "next/link";
import { CARDS, CATEGORIES } from "@/data/cards";
import SectionHeader from "@/components/SectionHeader";

const POPULAR = [
  ["hdfc-regalia", "hdfc-infinia"],
  ["amazon-icici", "sbi-simplyclick"],
  ["axis-ace", "au-lit"],
  ["hdfc-diners-black", "icici-emeralde"],
  ["onecard", "au-zenith"],
  ["idfc-wow", "axis-atlas"],
];

export default function CompareClient() {
  const [id1, setId1] = useState("");
  const [id2, setId2] = useState("");
  const c1 = CARDS.find(c => c.id === id1);
  const c2 = CARDS.find(c => c.id === id2);

  const pickPopular = (a, b) => { setId1(a); setId2(b); };

  // Compute scores
  let s1 = 0, s2 = 0, ties = 0;
  if (c1 && c2) {
    CATEGORIES.forEach(cat => {
      const r1 = c1.rewards[cat.id] || c1.rewards.default;
      const r2 = c2.rewards[cat.id] || c2.rewards.default;
      if (r1 > r2) s1++; else if (r2 > r1) s2++; else ties++;
    });
  }

  const maxReward = c1 && c2 ? Math.max(
    ...CATEGORIES.map(cat => Math.max(c1.rewards[cat.id] || c1.rewards.default, c2.rewards[cat.id] || c2.rewards.default))
  ) : 5;

  return (
    <section className="pt-24 pb-20 px-6 max-w-[1000px] mx-auto">
      <SectionHeader badge="⚖️ Compare" badgeBg="var(--blue-bg)" badgeBorder="var(--blue-border)" badgeColor="var(--blue)" title="Head-to-Head Comparison" subtitle="Compare any two cards across all categories, fees, and benefits." />

      {/* Card Selectors */}
      <div className="rounded-2xl p-6 mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-faint)" }}>Card 1</div>
            <select value={id1} onChange={e => setId1(e.target.value)}
              className="w-full rounded-xl py-3 px-4 text-base font-medium"
              style={{ background: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text)", fontFamily: "inherit", cursor: "pointer" }}>
              <option value="">Select a card...</option>
              {CARDS.map(c => <option key={c.id} value={c.id}>{c.img} {c.name} ({c.bank})</option>)}
            </select>
          </div>
          <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full text-xl font-bold" style={{ background: "var(--accent-light)", color: "var(--accent-text)" }}>VS</div>
          <div className="flex sm:hidden items-center justify-center py-1 text-sm font-bold" style={{ color: "var(--text-faint)" }}>— VS —</div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-faint)" }}>Card 2</div>
            <select value={id2} onChange={e => setId2(e.target.value)}
              className="w-full rounded-xl py-3 px-4 text-base font-medium"
              style={{ background: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text)", fontFamily: "inherit", cursor: "pointer" }}>
              <option value="">Select a card...</option>
              {CARDS.map(c => <option key={c.id} value={c.id}>{c.img} {c.name} ({c.bank})</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Popular Comparisons */}
      {(!c1 || !c2) && (
        <div className="mb-10">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>🔥 Popular Comparisons</h3>
          <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {POPULAR.map(([a, b], i) => {
              const ca = CARDS.find(c => c.id === a);
              const cb = CARDS.find(c => c.id === b);
              if (!ca || !cb) return null;
              return (
                <button key={i} onClick={() => pickPopular(a, b)}
                  className="rounded-xl p-4 flex items-center gap-3 text-left cursor-pointer transition-all hover:shadow-md"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-xl">{ca.img}</span>
                    <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>{ca.name}</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-md" style={{ background: "var(--accent-light)", color: "var(--accent-text)" }}>VS</span>
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>{cb.name}</span>
                    <span className="text-xl">{cb.img}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Comparison Results */}
      {c1 && c2 && (
        <div className="animate-fade-up">
          {/* Card Headers */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[c1, c2].map((c, i) => (
              <Link key={i} href={`/cards/${c.id}`} className="rounded-2xl p-6 no-underline transition-all hover:shadow-lg relative overflow-hidden"
                style={{ background: `${c.color}10`, border: `1px solid ${c.color}20` }}>
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10" style={{ background: c.color, transform: "translate(30%, -30%)" }} />
                <div className="relative z-10">
                  <span className="text-4xl">{c.img}</span>
                  <div className="text-lg font-bold mt-2" style={{ color: "var(--text)" }}>{c.name}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{c.bank} · {c.type}</div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="rounded-lg p-2.5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                      <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Fee</div>
                      <div className="text-base font-bold font-mono" style={{ color: "var(--text)" }}>{c.fee === 0 ? "FREE" : `₹${c.fee.toLocaleString()}`}</div>
                    </div>
                    <div className="rounded-lg p-2.5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                      <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Lounge</div>
                      <div className="text-base font-bold font-mono" style={{ color: "var(--text)" }}>{c.lounge}</div>
                    </div>
                  </div>
                  <div className="text-[10px] mt-3" style={{ color: "var(--text-faint)" }}>Tap for full review →</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Visual Bar Comparison */}
          <div className="rounded-2xl overflow-hidden mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
            <div className="px-5 py-3.5 flex items-center justify-between" style={{ background: "var(--bg-muted)", borderBottom: "1px solid var(--border)" }}>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Reward Rates Comparison</span>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded" style={{ background: c1.color }} /><span style={{ color: "var(--text-muted)" }}>{c1.name}</span></span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded" style={{ background: c2.color }} /><span style={{ color: "var(--text-muted)" }}>{c2.name}</span></span>
              </div>
            </div>

            {CATEGORIES.map((cat, i) => {
              const r1 = c1.rewards[cat.id] || c1.rewards.default;
              const r2 = c2.rewards[cat.id] || c2.rewards.default;
              const w = r1 > r2 ? 1 : r2 > r1 ? 2 : 0;
              const bar1 = (r1 / maxReward) * 100;
              const bar2 = (r2 / maxReward) * 100;

              return (
                <div key={cat.id} className="px-5 py-4" style={{ borderBottom: i < CATEGORIES.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{cat.label}</span>
                    </div>
                    {w !== 0 && (
                      <span className="text-[10px] font-bold uppercase rounded-md px-2 py-0.5"
                        style={{ background: "var(--green-bg)", color: "var(--green)" }}>
                        {w === 1 ? c1.name : c2.name} wins
                      </span>
                    )}
                    {w === 0 && <span className="text-[10px] font-bold uppercase rounded-md px-2 py-0.5" style={{ background: "var(--bg-muted)", color: "var(--text-faint)" }}>TIE</span>}
                  </div>
                  {/* Card 1 bar */}
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-xs font-bold font-mono w-10 text-right" style={{ color: w === 1 ? "var(--green)" : "var(--text-muted)" }}>{r1}%</span>
                    <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "var(--bg-muted)" }}>
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${bar1}%`, background: w === 1 ? "var(--green)" : c1.color, opacity: w === 1 ? 1 : 0.5 }} />
                    </div>
                  </div>
                  {/* Card 2 bar */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold font-mono w-10 text-right" style={{ color: w === 2 ? "var(--green)" : "var(--text-muted)" }}>{r2}%</span>
                    <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "var(--bg-muted)" }}>
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${bar2}%`, background: w === 2 ? "var(--green)" : c2.color, opacity: w === 2 ? 1 : 0.5 }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Score + Verdict */}
          <div className="rounded-2xl p-6 mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 text-center" style={{ color: "var(--text-faint)" }}>Final Score</h3>
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
              <div className="text-center">
                <div className="text-4xl font-extrabold font-mono" style={{ color: s1 >= s2 ? "var(--green)" : "var(--text-muted)" }}>{s1}</div>
                <div className="text-sm font-semibold mt-1" style={{ color: s1 >= s2 ? "var(--green)" : "var(--text-muted)" }}>{c1.name}</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="text-2xl">⚔️</div>
                {ties > 0 && <div className="text-xs" style={{ color: "var(--text-faint)" }}>{ties} tied</div>}
              </div>
              <div className="text-center">
                <div className="text-4xl font-extrabold font-mono" style={{ color: s2 >= s1 ? "var(--green)" : "var(--text-muted)" }}>{s2}</div>
                <div className="text-sm font-semibold mt-1" style={{ color: s2 >= s1 ? "var(--green)" : "var(--text-muted)" }}>{c2.name}</div>
              </div>
            </div>

            {/* Verdict */}
            <div className="mt-5 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="text-xs font-semibold uppercase tracking-wider mb-2 text-center" style={{ color: "var(--text-faint)" }}>💡 Verdict</div>
              <p className="text-sm text-center leading-relaxed max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>
                {s1 > s2
                  ? `${c1.name} wins ${s1} out of ${CATEGORIES.length} categories. ${c1.fee <= c2.fee ? `It's also cheaper (${c1.fee === 0 ? "free" : "₹" + c1.fee.toLocaleString()} vs ₹${c2.fee.toLocaleString()}).` : `However, ${c2.name} is ${c2.fee === 0 ? "free" : "cheaper at ₹" + c2.fee.toLocaleString()} — so consider if the extra categories justify the cost.`}`
                  : s2 > s1
                  ? `${c2.name} wins ${s2} out of ${CATEGORIES.length} categories. ${c2.fee <= c1.fee ? `It's also cheaper (${c2.fee === 0 ? "free" : "₹" + c2.fee.toLocaleString()} vs ₹${c1.fee.toLocaleString()}).` : `However, ${c1.name} is ${c1.fee === 0 ? "free" : "cheaper at ₹" + c1.fee.toLocaleString()} — so consider if the extra categories justify the cost.`}`
                  : `It's a tie! Both cards win ${s1} categories each. Choose based on which specific categories matter most to your spending, and compare the annual fees (${c1.fee === 0 ? "free" : "₹" + c1.fee.toLocaleString()} vs ${c2.fee === 0 ? "free" : "₹" + c2.fee.toLocaleString()}).`
                }
              </p>
            </div>
          </div>

          {/* Quick Stats Comparison */}
          <div className="grid grid-cols-3 gap-3">
            {[
              ["Annual Fee", c1.fee === 0 ? "Free" : `₹${c1.fee.toLocaleString()}`, c2.fee === 0 ? "Free" : `₹${c2.fee.toLocaleString()}`, c1.fee <= c2.fee ? 1 : 2],
              ["Lounge Access", c1.lounge, c2.lounge, c1.lounge === "Unlimited" || c1.lounge === "Unlimited+guest" ? 1 : c2.lounge === "Unlimited" || c2.lounge === "Unlimited+guest" ? 2 : 0],
              ["Network", c1.network, c2.network, 0],
            ].map(([label, v1, v2, better], i) => (
              <div key={i} className="rounded-xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
                <div className="text-[10px] font-semibold uppercase tracking-wider mb-3 text-center" style={{ color: "var(--text-faint)" }}>{label}</div>
                <div className="text-center mb-1.5">
                  <div className="text-sm font-bold" style={{ color: better === 1 ? "var(--green)" : "var(--text)" }}>{v1}</div>
                  <div className="text-[10px]" style={{ color: "var(--text-faint)" }}>{c1.name}</div>
                </div>
                <div className="h-px my-2" style={{ background: "var(--border)" }} />
                <div className="text-center">
                  <div className="text-sm font-bold" style={{ color: better === 2 ? "var(--green)" : "var(--text)" }}>{v2}</div>
                  <div className="text-[10px]" style={{ color: "var(--text-faint)" }}>{c2.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
