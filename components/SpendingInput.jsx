"use client";
import { CATEGORIES } from "@/data/cards";

export default function SpendingInput({ spending, setSpending }) {
  const total = Object.values(spending).reduce((a, b) => a + b, 0);

  return (
    <div className="mb-6 animate-fade-up">
      <div className="flex justify-between items-center mb-3.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Monthly spending (₹)</h3>
        <div className="text-sm font-bold font-mono" style={{ color: "var(--accent-text)" }}>Total: ₹{total.toLocaleString()}/mo</div>
      </div>
      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="flex items-center gap-2.5 rounded-lg p-2 px-3"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
            <span className="text-xl">{cat.icon}</span>
            <div className="flex-1">
              <div className="text-xs font-semibold" style={{ color: "var(--text)" }}>{cat.label}</div>
              <input
                type="number" min="0" step="500"
                value={spending[cat.id]}
                onChange={e => setSpending(p => ({ ...p, [cat.id]: Math.max(0, parseInt(e.target.value) || 0) }))}
                className="w-full bg-transparent border-none text-base font-bold font-mono outline-none py-0.5"
                style={{ color: "var(--accent-text)" }}
              />
            </div>
            <span className="text-xs" style={{ color: "var(--text-faint)" }}>₹/mo</span>
          </div>
        ))}
      </div>
    </div>
  );
}
