import { CARDS, CATEGORIES, BANKS } from "@/data/cards";
import { NextResponse } from "next/server";

// Public API: GET /api/cards
// Query params: ?bank=HDFC&category=dining&sort=reward&limit=10&free=true
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let results = [...CARDS];

  // Filter by bank
  const bank = searchParams.get("bank");
  if (bank) results = results.filter(c => c.bank.toLowerCase() === bank.toLowerCase());

  // Filter by free cards only
  const free = searchParams.get("free");
  if (free === "true") results = results.filter(c => c.fee === 0);

  // Filter by card type
  const type = searchParams.get("type");
  if (type) results = results.filter(c => c.type.toLowerCase().includes(type.toLowerCase()));

  // Sort by reward in a specific category
  const sortCat = searchParams.get("sort");
  if (sortCat && CATEGORIES.find(c => c.id === sortCat)) {
    results.sort((a, b) => (b.rewards[sortCat] || b.rewards.default) - (a.rewards[sortCat] || a.rewards.default));
  }

  // Limit results
  const limit = parseInt(searchParams.get("limit"));
  if (limit > 0) results = results.slice(0, limit);

  // Get best card for a category
  const bestFor = searchParams.get("best_for");
  if (bestFor && CATEGORIES.find(c => c.id === bestFor)) {
    results.sort((a, b) => (b.rewards[bestFor] || b.rewards.default) - (a.rewards[bestFor] || a.rewards.default));
    results = results.slice(0, 1);
  }

  const response = NextResponse.json({
    cards: results,
    total: results.length,
    available_banks: BANKS,
    available_categories: CATEGORIES.map(c => c.id),
    api_version: "1.0",
    documentation: "/api/docs",
  });

  // CORS headers for public API access
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET");
  response.headers.set("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");

  return response;
}
