"use client";
import { useState, useMemo } from "react";
import { CARDS, BANKS } from "@/data/cards";

export default function CardSelector({ selected, onToggle }) {
  const [query, setQuery] = useState("");
  const [bankFilter, setBankFilter] = useState("All");

  const filtered = useMemo(() =>
    CARDS.filter(c =>
      (!query || c.name.toLowerCase().includes(query.toLowerCase()) || c.bank.toLowerCase().includes(query.toLowerCase())) &&
      (bankFilter === "All" || c.bank === bankFilter)
    ), [query, bankFilter]);

  return (
    <div>
      <div className="flex gap-2.5 mb-4 flex-wrap">
        <div className="flex-1 min-w-[180px] relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base opacity-50">🔍</span>
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search cards..."
            className="w-full py-2.5 pl-10 pr-3 rounded-lg text-sm outline-none"
            style={{ border: "1px solid var(--border)", background: "var(--bg-input)", color: "var(--text)", fontFamily: "inherit" }}
          />
        </div>
        <select value={bankFilter} onChange={e => setBankFilter(e.target.value)}
          className="py-2.5 px-3.5 rounded-lg text-sm cursor-pointer"
          style={{ border: "1px solid var(--border)", background: "var(--bg-input)", color: "var(--text)", fontFamily: "inherit", minWidth: 120 }}>
          <option value="All">All Banks</option>
          {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        {selected.length > 0 && (
          <div className="flex items-center px-3.5 rounded-lg text-sm font-semibold"
            style={{ background: "var(--accent-light)", border: "1px solid var(--accent-border)", color: "var(--accent-text)" }}>
            {selected.length} selected
          </div>
        )}
      </div>

      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
        {filtered.map(card => {
          const sel = selected.includes(card.id);
          return (
            <button key={card.id} onClick={() => onToggle(card.id)}
              className="flex items-center gap-2.5 rounded-xl py-3 px-3.5 text-left transition-all cursor-pointer"
              style={{
                background: sel ? `${card.color}${sel ? "15" : ""}` : "var(--bg-card)",
                border: sel ? `2px solid ${card.color}66` : "1px solid var(--border)",
                boxShadow: sel ? "none" : "var(--shadow)",
              }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: `${card.color}18` }}>{card.img}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: "var(--text)" }}>{card.name}</div>
                <div className="text-xs" style={{ color: "var(--text-faint)" }}>{card.bank} · {card.fee === 0 ? "Free" : `₹${card.fee}/yr`}</div>
              </div>
              {sel && (
                <div className="w-[18px] h-[18px] rounded flex items-center justify-center text-[10px] text-white flex-shrink-0"
                  style={{ background: card.color }}>✓</div>
              )}
            </button>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-8 text-sm" style={{ color: "var(--text-faint)" }}>No cards found</div>
      )}
    </div>
  );
}
