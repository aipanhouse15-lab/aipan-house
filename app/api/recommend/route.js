import { CARDS, CATEGORIES } from "@/data/cards";
import { NextResponse } from "next/server";

// Public API: GET /api/recommend
// Query params:
//   ?for=dining         → best card for a category
//   ?merchant=swiggy    → best card for a merchant
//   ?budget=free        → best free card overall
//   ?budget=under5000   → best card under ₹5000 fee
//   ?use=travel         → best travel-focused card
//   ?cards=hdfc-regalia,amazon-icici&optimize=true → optimal swipe guide for owned cards

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // Best card for a specific category
  const forCat = searchParams.get("for");
  if (forCat) {
    const cat = CATEGORIES.find(c => c.id === forCat);
    if (!cat) {
      return json({ error: "Invalid category", available: CATEGORIES.map(c => c.id) }, 400);
    }
    const ranked = [...CARDS]
      .map(c => ({ ...c, rate: c.rewards[forCat] || c.rewards.default }))
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 5);

    return json({
      query: { type: "best_for_category", category: forCat },
      recommendation: ranked[0].name,
      top_5: ranked.map(c => ({ id: c.id, name: c.name, bank: c.bank, rate: c.rate, fee: c.fee })),
      insight: `The best card for ${cat.label} is ${ranked[0].name} at ${ranked[0].rate}% reward rate. ${ranked[0].fee === 0 ? "It's lifetime free." : `Annual fee is ₹${ranked[0].fee}.`}`,
    });
  }

  // Best free cards
  const budget = searchParams.get("budget");
  if (budget === "free") {
    const freeCards = CARDS.filter(c => c.fee === 0)
      .map(c => {
        const rates = Object.values(c.rewards).filter((_, i, arr) => i < arr.length); // all rates
        const avg = Object.entries(c.rewards).filter(([k]) => k !== "default").reduce((s, [, r]) => s + r, 0) / 8;
        return { ...c, avgRate: parseFloat(avg.toFixed(2)) };
      })
      .sort((a, b) => b.avgRate - a.avgRate)
      .slice(0, 5);

    return json({
      query: { type: "best_free_cards" },
      top_5: freeCards.map(c => ({ id: c.id, name: c.name, bank: c.bank, avgRate: c.avgRate, best_for: Object.entries(c.rewards).filter(([k]) => k !== "default").sort((a, b) => b[1] - a[1])[0][0] })),
      insight: `Best free credit card in India is ${freeCards[0].name} with an average reward rate of ${freeCards[0].avgRate}%.`,
    });
  }

  if (budget === "under5000") {
    const affordable = CARDS.filter(c => c.fee < 5000)
      .map(c => {
        const avg = Object.entries(c.rewards).filter(([k]) => k !== "default").reduce((s, [, r]) => s + r, 0) / 8;
        return { ...c, avgRate: parseFloat(avg.toFixed(2)) };
      })
      .sort((a, b) => b.avgRate - a.avgRate)
      .slice(0, 5);

    return json({
      query: { type: "best_under_5000" },
      top_5: affordable.map(c => ({ id: c.id, name: c.name, bank: c.bank, fee: c.fee, avgRate: c.avgRate })),
      insight: `Best credit card under ₹5,000/year is ${affordable[0].name} (₹${affordable[0].fee}/year) with avg ${affordable[0].avgRate}% rewards.`,
    });
  }

  // Optimize existing cards — the Smart Swipe API
  const cardsParam = searchParams.get("cards");
  if (cardsParam) {
    const cardIds = cardsParam.split(",").map(s => s.trim());
    const ownedCards = cardIds.map(id => CARDS.find(c => c.id === id)).filter(Boolean);

    if (ownedCards.length === 0) {
      return json({ error: "No valid card IDs provided", available: CARDS.map(c => c.id) }, 400);
    }

    const optimization = CATEGORIES.map(cat => {
      let bestCard = null, bestRate = 0;
      ownedCards.forEach(c => {
        const r = c.rewards[cat.id] || c.rewards.default || 0;
        if (r > bestRate) { bestRate = r; bestCard = c; }
      });

      // Find if a better card exists
      let betterCard = null, betterRate = 0;
      CARDS.forEach(c => {
        if (cardIds.includes(c.id)) return;
        const r = c.rewards[cat.id] || c.rewards.default || 0;
        if (r > bestRate && r > betterRate) { betterRate = r; betterCard = c; }
      });

      return {
        category: cat.id,
        category_label: cat.label,
        best_owned_card: bestCard ? { id: bestCard.id, name: bestCard.name, rate: bestRate } : null,
        potential_upgrade: betterCard ? { id: betterCard.id, name: betterCard.name, rate: betterRate, improvement: parseFloat((betterRate - bestRate).toFixed(1)) } : null,
      };
    });

    const totalGaps = optimization.filter(o => o.potential_upgrade).length;

    return json({
      query: { type: "optimize_stack", cards: cardIds },
      owned_cards: ownedCards.map(c => ({ id: c.id, name: c.name })),
      optimization,
      summary: {
        total_categories: CATEGORIES.length,
        optimized_categories: CATEGORIES.length - totalGaps,
        gaps_found: totalGaps,
        insight: totalGaps === 0
          ? "Your card stack is fully optimized across all categories!"
          : `Found ${totalGaps} categories where better cards exist. Check the optimization array for details.`,
      },
    });
  }

  // Default: API documentation
  return json({
    name: "CardStack API",
    version: "1.0",
    description: "Real-time Indian credit card reward data and recommendations. Free to use.",
    base_url: "https://cardstack.vercel.app/api",
    endpoints: {
      "GET /api/cards": {
        description: "List all 25+ Indian credit cards with reward rates",
        params: { bank: "Filter by bank (e.g., HDFC)", free: "true for free cards only", sort: "Sort by category reward (e.g., dining)", limit: "Max results", best_for: "Get single best card for category" },
        example: "/api/cards?bank=HDFC&sort=dining",
      },
      "GET /api/cards/[id]": {
        description: "Full details for a specific card with computed insights",
        example: "/api/cards/hdfc-regalia",
      },
      "GET /api/recommend": {
        description: "Smart recommendations based on your query",
        params: {
          for: "Best card for a category (dining, travel, online, groceries, fuel, utilities, entertainment, shopping)",
          budget: "free or under5000",
          cards: "Comma-separated card IDs to optimize your existing stack",
        },
        examples: [
          "/api/recommend?for=dining",
          "/api/recommend?budget=free",
          "/api/recommend?cards=hdfc-regalia,amazon-icici",
        ],
      },
    },
    available_categories: CATEGORIES.map(c => ({ id: c.id, label: c.label })),
    available_cards: CARDS.map(c => ({ id: c.id, name: c.name, bank: c.bank })),
    data_updated: "March 2026",
    attribution: "Data by CardStack (cardstack.vercel.app). Free to use with attribution.",
  });
}

function json(data, status = 200) {
  const response = NextResponse.json(data, { status });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET");
  response.headers.set("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  return response;
}
