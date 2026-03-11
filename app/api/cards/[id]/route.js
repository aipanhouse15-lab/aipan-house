import { CARDS, CATEGORIES, getCardById } from "@/data/cards";
import { NextResponse } from "next/server";

// Public API: GET /api/cards/[id]
// Returns full card details with computed insights
export async function GET(request, { params }) {
  const card = getCardById(params.id);
  if (!card) {
    return NextResponse.json({ error: "Card not found", available_cards: CARDS.map(c => c.id) }, { status: 404 });
  }

  // Compute insights
  const sorted = Object.entries(card.rewards)
    .filter(([k]) => k !== "default")
    .sort((a, b) => b[1] - a[1]);

  const insights = {
    best_category: sorted[0][0],
    best_rate: sorted[0][1],
    worst_category: sorted[sorted.length - 1][0],
    worst_rate: sorted[sorted.length - 1][1],
    average_rate: parseFloat((sorted.reduce((s, [, r]) => s + r, 0) / sorted.length).toFixed(2)),
    fee_per_month: card.fee === 0 ? 0 : Math.round(card.fee / 12),
    // How much monthly spend needed to justify the fee at avg rate
    breakeven_monthly_spend: card.fee === 0 ? 0 : Math.round(card.fee / (sorted.reduce((s, [, r]) => s + r, 0) / sorted.length / 100)),
    reward_rates_ranked: sorted.map(([cat, rate]) => ({ category: cat, rate })),
  };

  const response = NextResponse.json({ ...card, insights });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  return response;
}
