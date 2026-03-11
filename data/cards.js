// ─── 25 INDIAN CREDIT CARDS ───
// Last verified: March 2026
// Reward rates show effective cashback %. Partner/SmartBuy rates shown separately.
// To update: edit values below and push to GitHub. Vercel auto-deploys.

export const CARDS = [
  // ═══ VERIFIED CARDS (March 2026) ═══

  { id: "hdfc-regalia", name: "HDFC Regalia", bank: "HDFC", img: "💳", color: "#1a3c6e", fee: 2500, feeWaiver: "₹4L annual spend", type: "Premium", verified: true,
    rewards: { dining: 1.33, travel: 1.33, online: 1.33, groceries: 1.33, fuel: 0, utilities: 1.33, entertainment: 1.33, shopping: 1.33, default: 1.33 },
    caps: { monthlyPoints: 50000, pointValue: 0.20, spendPer: 150, pointsPer: 4 },
    // Cap math: 50000 pts × ₹0.20 = ₹10,000 max cashback/month. At 4pts/₹150, need ₹18.75L spend to hit cap. Unlikely for most users.
    partnerRates: [
      { name: "SmartBuy (flights/hotels)", rate: "up to 13.33%" },
      { name: "Myntra, Nykaa, Reliance Digital", rate: "5x points (~3.33%)" },
    ],
    pointsInfo: "4 points/₹150 · 1pt = ₹0.20 cashback or ₹0.50 travel",
    highlights: ["12 domestic + 6 intl lounge/yr", "Up to 10x on SmartBuy", "5x on select partners", "Fee waiver on ₹4L spend"],
    pros: ["Excellent lounge access (18/yr total)", "SmartBuy gives up to 13% on travel", "Partner brands 5x rewards"],
    cons: ["Base rate only 1.33%", "Fuel excluded from rewards", "₹2,500 + GST fee"],
    network: "Visa/MC", lounge: "18/year" },

  { id: "hdfc-infinia", name: "HDFC Infinia", bank: "HDFC", img: "💎", color: "#1a1a2e", fee: 12500, feeWaiver: "None", type: "Super Premium", verified: true,
    rewards: { dining: 3.33, travel: 3.33, online: 3.33, groceries: 3.33, fuel: 0, utilities: 3.33, entertainment: 3.33, shopping: 3.33, default: 3.33 },
    partnerRates: [
      { name: "SmartBuy (flights/hotels)", rate: "up to 33.33%" },
    ],
    pointsInfo: "5 points/₹150 · 1pt = ₹0.20 cashback or ₹1.00 travel",
    highlights: ["Unlimited lounge worldwide", "24/7 concierge", "10x on SmartBuy", "Golf 100+ courses"],
    pros: ["Best all-round rate (3.33%)", "Unlimited lounge", "SmartBuy up to 33% on travel"],
    cons: ["₹12,500 fee", "Invite-only", "Fuel excluded"],
    network: "Visa", lounge: "Unlimited" },

  { id: "hdfc-millennia", name: "HDFC Millennia", bank: "HDFC", img: "✨", color: "#7c3aed", fee: 1000, feeWaiver: "₹1L annual spend", type: "Lifestyle", verified: true,
    rewards: { dining: 5, travel: 1, online: 5, groceries: 1, fuel: 0, utilities: 1, entertainment: 5, shopping: 5, default: 1 },
    caps: { monthlyCashback: 1000, capRate: 5, fallbackRate: 1, capAppliesTo: ["dining", "online", "entertainment", "shopping"] },
    // Cap math: ₹1000/mo at 5% = max beneficial spend ₹20,000/mo across partner categories. After that, drops to 1%.
    partnerRates: [
      { name: "Swiggy, Zomato", rate: "5% cashback" },
      { name: "Amazon, Flipkart, Myntra", rate: "5% cashback" },
      { name: "Tata CLiQ, Uber, BookMyShow, Sony LIV, Cult.fit", rate: "5% cashback" },
    ],
    pointsInfo: "5% on partners (cap ₹1000/mo), 1% on all other",
    highlights: ["5% on 10+ partner brands", "₹1000/mo cashback cap on 5%", "4 domestic lounge/yr", "Fee waiver ₹1L spend"],
    pros: ["5% on Swiggy/Zomato/Amazon/Flipkart", "Low ₹1000 fee (waivable)", "4 lounge visits"],
    cons: ["Only 1% on non-partner spends", "₹1000/mo cap on 5% cashback", "Fuel excluded"],
    network: "Visa/MC", lounge: "4/year" },

  { id: "hdfc-diners-black", name: "HDFC Diners Black", bank: "HDFC", img: "🖤", color: "#111827", fee: 10000, feeWaiver: "None", type: "Super Premium", verified: false,
    rewards: { dining: 3.33, travel: 3.33, online: 3.33, groceries: 3.33, fuel: 0, utilities: 3.33, entertainment: 3.33, shopping: 3.33, default: 3.33 },
    partnerRates: [
      { name: "SmartBuy (flights/hotels)", rate: "up to 33.33%" },
    ],
    pointsInfo: "5 points/₹150 · 10x on SmartBuy",
    highlights: ["8 lounge visits/year", "Amazon/Zomato/MMT memberships", "Golf & spa", "10x SmartBuy"],
    pros: ["3.33% on everything", "Free annual memberships", "SmartBuy 33%"],
    cons: ["Diners Club acceptance limited", "₹10K fee", "8 lounge visits (not unlimited)"],
    network: "Diners Club", lounge: "8/year" },

  { id: "hdfc-swiggy", name: "HDFC Swiggy Card", bank: "HDFC", img: "🍕", color: "#fc8019", fee: 500, feeWaiver: "₹2L annual spend", type: "Entry", verified: false,
    rewards: { dining: 10, travel: 1, online: 5, groceries: 1, fuel: 0, utilities: 0, entertainment: 5, shopping: 5, default: 1 },
    caps: { monthlyCashback: 1500, capRate: 10, fallbackRate: 1, capAppliesTo: ["dining", "online", "entertainment", "shopping"] },
    // Cap math: ₹1500/mo across 10%/5% categories. At 10% Swiggy, max beneficial = ₹15,000. At 5% online, ₹30,000.
    partnerRates: [
      { name: "Swiggy", rate: "10% cashback (cap ₹1500)" },
      { name: "Online (apparel, electronics, entertainment)", rate: "5% (cap ₹1500)" },
    ],
    pointsInfo: "10% Swiggy, 5% online categories, 1% other",
    highlights: ["10% on Swiggy", "5% on online shopping", "Fee waiver on ₹2L", "₹500 joining voucher"],
    pros: ["Best for Swiggy users (10%)", "5% on online categories", "Low fee"],
    cons: ["Cashback caps (₹1500)", "Fuel/utilities excluded", "1% base rate"],
    network: "MC", lounge: "None" },

  { id: "sbi-simplyclick", name: "SBI SimplyCLICK", bank: "SBI", img: "🛒", color: "#1d4ed8", fee: 499, feeWaiver: "₹1L annual spend", type: "Online", verified: true,
    rewards: { dining: 0.25, travel: 0.25, online: 1.25, groceries: 0.25, fuel: 0, utilities: 0.25, entertainment: 0.25, shopping: 0.25, default: 0.25 },
    partnerRates: [
      { name: "Apollo 24/7, BookMyShow, Cleartrip, Dominos, Myntra, Swiggy, Yatra", rate: "10x = 2.5%" },
    ],
    pointsInfo: "10x (2.5%) partners, 5x (1.25%) online, 1x (0.25%) other · 1pt = ₹0.25",
    highlights: ["2.5% on 9 partner brands", "1.25% all online", "Fee waiver ₹1L", "E-voucher redemption"],
    pros: ["2.5% on Swiggy/Cleartrip/Myntra/BookMyShow", "1.25% on all online", "Easy fee waiver"],
    cons: ["Only 0.25% offline", "No lounge access", "Point redemption limited to e-vouchers"],
    network: "Visa/MC", lounge: "None" },

  { id: "sbi-cashback", name: "SBI Cashback Card", bank: "SBI", img: "💰", color: "#0369a1", fee: 999, feeWaiver: "₹2L annual spend", type: "Cashback", verified: true,
    rewards: { dining: 1, travel: 1, online: 5, groceries: 1, fuel: 0, utilities: 0, entertainment: 1, shopping: 1, default: 1 },
    caps: { yearlyCashback: 5000, capRate: 5, fallbackRate: 1, capAppliesTo: ["online"] },
    // Cap math: ₹5000/year at 5% = max beneficial online spend ₹1,00,000/year or ₹8,333/month. After that, drops to 1%.
    partnerRates: [],
    pointsInfo: "5% online, 1% offline · Auto-credited cashback",
    highlights: ["5% online cashback", "Auto-credited to statement", "Fee waiver ₹2L spend", "No point conversion needed"],
    pros: ["Simple 5% on all online", "Cashback auto-credited", "Fee waiver available"],
    cons: ["₹5K cashback cap/year", "Fuel/utilities excluded", "Only 1% offline"],
    network: "Visa", lounge: "None" },

  { id: "sbi-elite", name: "SBI Card ELITE", bank: "SBI", img: "👑", color: "#4338ca", fee: 4999, feeWaiver: "₹10L annual spend", type: "Premium", verified: false,
    rewards: { dining: 1.25, travel: 0.5, online: 0.5, groceries: 1.25, fuel: 0, utilities: 0.5, entertainment: 1.25, shopping: 1.25, default: 0.5 },
    partnerRates: [
      { name: "BookMyShow", rate: "Buy 1 Get 1 (up to 2/month)" },
    ],
    pointsInfo: "5x (1.25%) dining/grocery/dept stores, 2x (0.5%) other · 1pt = ₹0.25",
    highlights: ["Movie BOGO BookMyShow", "1.25% on dining & grocery", "Lounge access", "Milestone rewards"],
    pros: ["Movie BOGO is great value", "Better than average dining rate", "Milestone bonuses"],
    cons: ["₹4,999 fee (waiver needs ₹10L!)", "Low general rate 0.5%", "Fuel excluded"],
    network: "Visa/MC/Amex", lounge: "8/year" },

  { id: "amazon-icici", name: "Amazon Pay ICICI", bank: "ICICI", img: "📦", color: "#d97706", fee: 0, feeWaiver: "Lifetime free", type: "Cashback", verified: true,
    rewards: { dining: 1, travel: 1, online: 5, groceries: 1, fuel: 0, utilities: 1, entertainment: 1, shopping: 1, default: 1 },
    partnerRates: [
      { name: "Amazon (Prime member)", rate: "5%" },
      { name: "Amazon (non-Prime)", rate: "3%" },
      { name: "Amazon Pay partners", rate: "2%" },
    ],
    pointsInfo: "5% Amazon Prime, 3% non-Prime, 2% partners, 1% other · Credited as Amazon Pay balance",
    highlights: ["5% on Amazon (Prime)", "3% non-Prime", "Lifetime free", "No cashback cap"],
    pros: ["Best for Amazon shopping", "Lifetime free", "Instant issuance", "No cap"],
    cons: ["Rewards locked to Amazon Pay balance", "Only 1% non-Amazon", "Fuel surcharge waiver only"],
    network: "Visa", lounge: "None" },

  { id: "icici-coral", name: "ICICI Coral", bank: "ICICI", img: "🪸", color: "#dc2626", fee: 500, feeWaiver: "₹1.5L annual spend", type: "Entry Premium", verified: true,
    rewards: { dining: 0.5, travel: 0.5, online: 0.5, groceries: 0.5, fuel: 0, utilities: 0.25, entertainment: 0.5, shopping: 0.5, default: 0.5 },
    partnerRates: [
      { name: "BookMyShow", rate: "Buy 1 Get 1" },
      { name: "Culinary Treats dining", rate: "15% off at partner restaurants" },
    ],
    pointsInfo: "2 points/₹100 retail (0.5%), 1 point/₹100 utility (0.25%) · 1pt = ₹0.25",
    highlights: ["Movie BOGO BookMyShow", "Culinary Treats 15% off dining", "4+4 lounge (domestic+railway)", "Fee waiver ₹1.5L"],
    pros: ["Movie BOGO excellent value", "8 total lounge visits", "Dining discounts", "Low fee"],
    cons: ["Very low reward rate (0.5%)", "Fuel excluded", "Points redemption limited"],
    network: "Visa/MC/RuPay/Amex", lounge: "8/year" },

  { id: "icici-sapphiro", name: "ICICI Sapphiro", bank: "ICICI", img: "💠", color: "#0891b2", fee: 3500, feeWaiver: "₹6L annual spend", type: "Premium", verified: false,
    rewards: { dining: 0.5, travel: 1, online: 0.5, groceries: 0.5, fuel: 0, utilities: 0.25, entertainment: 0.5, shopping: 0.5, default: 0.5 },
    partnerRates: [
      { name: "International spends", rate: "4 points/₹100 (~1%)" },
    ],
    pointsInfo: "2 points/₹100 domestic, 4 intl · 1pt = ₹0.25",
    highlights: ["Lounge access", "Golf 2x/quarter", "Concierge", "Zero forex markup"],
    pros: ["Zero forex markup", "Golf privileges", "Lounge access"],
    cons: ["Low domestic rate (0.5%)", "₹3,500 fee", "Limited redemption options"],
    network: "MC/Amex", lounge: "6/year" },

  { id: "icici-emeralde", name: "ICICI Emeralde", bank: "ICICI", img: "💚", color: "#047857", fee: 12000, feeWaiver: "None", type: "Super Premium", verified: false,
    rewards: { dining: 1, travel: 1, online: 1, groceries: 1, fuel: 0, utilities: 0.25, entertainment: 1, shopping: 1, default: 1 },
    partnerRates: [],
    pointsInfo: "4 points/₹100 most categories, 1 utility/insurance · 1pt = ₹0.25",
    highlights: ["Unlimited lounge worldwide", "World Elite perks", "Concierge"],
    pros: ["Unlimited lounge access", "Premium lifestyle benefits"],
    cons: ["₹12K fee", "Invite-only typically", "Rate only 1% effective"],
    network: "MC", lounge: "Unlimited" },

  { id: "axis-flipkart", name: "Axis Flipkart", bank: "Axis", img: "🛍️", color: "#2563eb", fee: 500, feeWaiver: "₹3.5L annual spend", type: "Cashback", verified: true,
    rewards: { dining: 4, travel: 1, online: 1, groceries: 1, fuel: 0, utilities: 1, entertainment: 1, shopping: 1, default: 1 },
    partnerRates: [
      { name: "Flipkart", rate: "5% cashback" },
      { name: "Myntra", rate: "5% cashback" },
      { name: "Cleartrip", rate: "5% cashback" },
      { name: "Swiggy, Uber, PVR, Cure.fit", rate: "4% cashback" },
    ],
    pointsInfo: "5% Flipkart/Myntra/Cleartrip, 4% preferred, 1.25% dining, 1% other",
    highlights: ["5% Flipkart/Myntra/Cleartrip", "4% Swiggy/Uber/PVR", "4 lounge visits/yr", "No cashback cap"],
    pros: ["Best for Flipkart ecosystem", "4% on Swiggy/dining", "Now has lounge access"],
    cons: ["₹500 fee", "1% on non-partner spends", "Fuel excluded"],
    network: "Visa", lounge: "4/year" },

  { id: "axis-ace", name: "Axis ACE", bank: "Axis", img: "🎯", color: "#7c3aed", fee: 499, feeWaiver: "₹2L annual spend", type: "Cashback", verified: true,
    rewards: { dining: 4, travel: 1.5, online: 1.5, groceries: 1.5, fuel: 0, utilities: 5, entertainment: 1.5, shopping: 1.5, default: 1.5 },
    caps: { monthlyCashback: 500, capRate: 5, fallbackRate: 1.5, capAppliesTo: ["utilities", "dining"] },
    // Cap math: ₹500/mo total cap. At 5% utilities, max = ₹10,000. At 4% dining, max = ₹12,500. Combined cap across all categories.
    partnerRates: [
      { name: "Bill payments via Google Pay", rate: "5%" },
      { name: "Swiggy, Zomato, Ola", rate: "4%" },
    ],
    pointsInfo: "5% bills (GPay), 4% Swiggy/Zomato/Ola, 1.5% all other · ₹500/mo cap",
    highlights: ["5% on bills via GPay", "4% Swiggy/Zomato", "4 lounge visits/yr", "₹500/mo cashback cap"],
    pros: ["5% on utility bills is rare", "4% on food delivery", "Lounge access at low fee"],
    cons: ["₹500/month cashback cap", "₹499 fee (waivable)", "Fuel excluded"],
    network: "Visa", lounge: "4/year" },

  { id: "axis-atlas", name: "Axis Atlas", bank: "Axis", img: "🌍", color: "#0f766e", fee: 5000, feeWaiver: "None", type: "Travel", verified: false,
    rewards: { dining: 2, travel: 5, online: 2, groceries: 2, fuel: 0, utilities: 0, entertainment: 2, shopping: 2, default: 2 },
    partnerRates: [
      { name: "Travel bookings", rate: "5 EDGE Miles/₹100 (~5%)" },
    ],
    pointsInfo: "5 EDGE Miles/₹100 travel (~5%), 2 other (~2%) · Transferable to airlines",
    highlights: ["5% on travel", "Zero forex", "Airline mile transfers", "Lounge tier-based"],
    pros: ["Best Indian travel card", "Airline mile transfers", "Zero forex markup"],
    cons: ["₹5K fee", "Fuel/utilities excluded", "Complex reward system"],
    network: "Visa", lounge: "8-18/year" },

  // ═══ PARTIALLY VERIFIED / NEEDS UPDATE ═══

  { id: "au-lit", name: "AU LIT Credit Card", bank: "AU Bank", img: "🔥", color: "#ea580c", fee: 0, feeWaiver: "Lifetime free", type: "Lifestyle", verified: true,
    rewards: { dining: 1, travel: 1, online: 1, groceries: 1, fuel: 0, utilities: 1, entertainment: 1, shopping: 5, default: 1 },
    partnerRates: [
      { name: "Selected feature pack categories", rate: "Up to 5% or 10x points" },
    ],
    pointsInfo: "Customizable rewards — pick your categories · Up to 5% on selected, 1pt/₹100 other",
    highlights: ["Lifetime free", "Customizable reward categories", "Up to 5% on your picks", "Fuel surcharge waiver"],
    pros: ["Choose your own reward categories", "Lifetime free", "Up to 5% on selected"],
    cons: ["Need to actively select feature packs", "1% base on non-selected", "10K points cap/cycle"],
    network: "Visa/RuPay", lounge: "Add-on" },

  { id: "au-zenith", name: "AU Zenith+", bank: "AU Bank", img: "⚜️", color: "#b45309", fee: 5999, feeWaiver: "None", type: "Premium", verified: false,
    rewards: { dining: 0.5, travel: 0.5, online: 0.5, groceries: 0.5, fuel: 0.5, utilities: 0.5, entertainment: 0.5, shopping: 0.5, default: 0.5 },
    partnerRates: [],
    pointsInfo: "2 points/₹100 dining/travel/intl · Unverified — may differ",
    highlights: ["Lounge access", "Dining/travel rewards"],
    pros: ["Lounge access", "Travel benefits"],
    cons: ["₹6K fee", "AU less established", "Data needs verification"],
    network: "Visa", lounge: "Available" },

  { id: "idfc-wow", name: "IDFC FIRST WOW", bank: "IDFC", img: "🌟", color: "#059669", fee: 0, feeWaiver: "Lifetime free", type: "Travel", verified: false,
    rewards: { dining: 1, travel: 1, online: 1, groceries: 1, fuel: 1, utilities: 1, entertainment: 1, shopping: 1, default: 1 },
    partnerRates: [
      { name: "Up to 4x on select spends", rate: "~2-4%" },
    ],
    pointsInfo: "Up to 4x reward points · Points never expire · Redeemable as cash",
    highlights: ["Lifetime free", "Zero forex markup", "Points never expire", "Redeemable as cash"],
    pros: ["Zero forex (rare for free card)", "Points never expire", "Free forever"],
    cons: ["Base rate unclear (~1%)", "No lounge", "IDFC app mediocre"],
    network: "Visa Infinite", lounge: "None" },

  { id: "idfc-select", name: "IDFC FIRST Select", bank: "IDFC", img: "⭐", color: "#0d9488", fee: 0, feeWaiver: "Lifetime free", type: "Premium Entry", verified: true,
    rewards: { dining: 1, travel: 1, online: 1, groceries: 1, fuel: 0, utilities: 1, entertainment: 1, shopping: 1, default: 1 },
    partnerRates: [
      { name: "UPI spends", rate: "3x points" },
      { name: "Travel bookings", rate: "3x + bonus" },
      { name: "Birthday month", rate: "10x points" },
    ],
    pointsInfo: "3x base (up to ₹20K), 10x on birthday/₹20K+ · Zero forex · Free forever",
    highlights: ["Lifetime free (not ₹999)", "Zero forex markup", "3x base + 10x birthday", "Complimentary lounge"],
    pros: ["Free card with lounge access", "Zero forex markup", "10x on birthday month"],
    cons: ["Base rate ~1% effective", "Higher rewards need high spend", "Fuel excluded"],
    network: "Visa", lounge: "Complimentary" },

  { id: "onecard", name: "OneCard", bank: "OneCard", img: "⚡", color: "#18181b", fee: 0, feeWaiver: "Lifetime free", type: "Lifestyle", verified: true,
    rewards: { dining: 0.2, travel: 0.2, online: 0.2, groceries: 0.2, fuel: 1, utilities: 0.2, entertainment: 0.2, shopping: 0.2, default: 0.2 },
    partnerRates: [
      { name: "Top 2 spending categories (auto-detected)", rate: "5x points (~1%)" },
    ],
    pointsInfo: "5x on top 2 categories (~1%), 1x others (~0.2%) · 1pt = ₹0.10 · Points never expire",
    highlights: ["Metal card", "5x on top 2 categories", "Lifetime free", "Points never expire"],
    pros: ["Metal card (premium feel)", "Auto-optimizes for your spending", "Free forever"],
    cons: ["Effective rate only ~1% even at 5x", "0.2% on non-top categories", "No lounge"],
    network: "Visa/MC", lounge: "None" },

  { id: "bob-eterna", name: "BOB Eterna", bank: "BOB", img: "🏛️", color: "#1e40af", fee: 1499, feeWaiver: "None", type: "Premium", verified: false,
    rewards: { dining: 3.75, travel: 3.75, online: 3.75, groceries: 0.75, fuel: 0, utilities: 0.75, entertainment: 0.75, shopping: 0.75, default: 0.75 },
    partnerRates: [],
    pointsInfo: "15 points/₹100 dining/travel/online/intl (5x), 3 other · 1pt = ₹0.25",
    highlights: ["Unlimited lounge", "3.75% on dining/travel/online", "Movie BOGO", "Golf"],
    pros: ["Strong dining/travel/online rate", "Unlimited lounge", "Golf access"],
    cons: ["BOB app poor", "Low rate on other categories", "Redemption tricky"],
    network: "Visa", lounge: "Unlimited" },

  { id: "kotak-811", name: "Kotak 811 Dream", bank: "Kotak", img: "🌊", color: "#e11d48", fee: 0, feeWaiver: "Lifetime free", type: "Entry", verified: false,
    rewards: { dining: 0.25, travel: 0.25, online: 1, groceries: 0.25, fuel: 0, utilities: 0.25, entertainment: 0.25, shopping: 0.25, default: 0.25 },
    partnerRates: [],
    pointsInfo: "4 points/₹100 online (~1%), 1 other (~0.25%) · No fuel/railway rewards",
    highlights: ["Lifetime free", "1% online", "Easy approval", "Good starter card"],
    pros: ["Easy approval", "Free forever", "Good first card"],
    cons: ["Very low rewards", "Low credit limit", "No lounge/perks"],
    network: "Visa", lounge: "None" },

  { id: "indusind-legend", name: "IndusInd Legend", bank: "IndusInd", img: "🦁", color: "#7e22ce", fee: 2999, feeWaiver: "None", type: "Premium", verified: false,
    rewards: { dining: 0.25, travel: 0.25, online: 0.25, groceries: 0.25, fuel: 0, utilities: 0.25, entertainment: 0.5, shopping: 0.25, default: 0.25 },
    partnerRates: [
      { name: "Weekend spends", rate: "2x points (~0.5%)" },
    ],
    pointsInfo: "1 point/₹100 weekday, 2 weekend · Bonus on ₹5L spend",
    highlights: ["Weekend 2x points", "Milestone rewards", "Fuel waiver"],
    pros: ["Weekend double points", "Milestone bonuses"],
    cons: ["Very low base rate", "App average", "Lounge discontinued March 2025"],
    network: "Visa/MC", lounge: "Discontinued" },

  { id: "yes-ace", name: "YES Private Ace", bank: "YES Bank", img: "🃏", color: "#ca8a04", fee: 499, feeWaiver: "On spends", type: "Premium", verified: false,
    rewards: { dining: 1, travel: 1, online: 2, groceries: 1, fuel: 0, utilities: 0, entertainment: 1, shopping: 1, default: 1 },
    partnerRates: [],
    pointsInfo: "8 points/₹200 online (2%), 4/₹200 offline (1%) · 5000 points cap/cycle",
    highlights: ["2% online", "1% offline", "Fee waiver available"],
    pros: ["2% online rate", "Low fee"],
    cons: ["5000 points cap/cycle", "Fuel/rent excluded", "YES Bank reputation"],
    network: "Visa", lounge: "None" },

  { id: "rbl-shoprite", name: "RBL ShopRite", bank: "RBL", img: "🧺", color: "#c026d3", fee: 0, feeWaiver: "Lifetime free", type: "Cashback", verified: false,
    rewards: { dining: 0, travel: 0, online: 0, groceries: 5, fuel: 2.5, utilities: 0, entertainment: 0, shopping: 0, default: 0 },
    partnerRates: [
      { name: "BookMyShow", rate: "10% on movies" },
    ],
    pointsInfo: "5% grocery, 2.5% fuel, 10% BookMyShow movies · 2000 welcome points",
    highlights: ["5% on grocery", "2.5% on fuel", "10% on movies", "Lifetime free"],
    pros: ["Best free grocery card", "Fuel cashback rare", "Movie benefit"],
    cons: ["No rewards on most other categories", "RBL less known", "Low credit limit usually"],
    network: "MC", lounge: "None" },
];

export const BANKS = [...new Set(CARDS.map(c => c.bank))].sort();

export const CATEGORIES = [
  { id: "dining", label: "Dining", icon: "🍽️", desc: "Restaurants, Swiggy, Zomato", avgSpend: 5000 },
  { id: "travel", label: "Travel", icon: "✈️", desc: "Flights, hotels, MakeMyTrip", avgSpend: 4000 },
  { id: "online", label: "Online Shopping", icon: "🛒", desc: "Amazon, Flipkart, Myntra", avgSpend: 8000 },
  { id: "groceries", label: "Groceries", icon: "🥦", desc: "BigBasket, Blinkit, stores", avgSpend: 6000 },
  { id: "fuel", label: "Fuel", icon: "⛽", desc: "Petrol pumps, EV charging", avgSpend: 5000 },
  { id: "utilities", label: "Utilities", icon: "💡", desc: "Electricity, water, broadband", avgSpend: 4000 },
  { id: "entertainment", label: "Entertainment", icon: "🎬", desc: "Netflix, movies, concerts", avgSpend: 2000 },
  { id: "shopping", label: "Shopping", icon: "🛍️", desc: "Malls, fashion, electronics", avgSpend: 5000 },
];

export const defaultSpending = () => Object.fromEntries(CATEGORIES.map(c => [c.id, c.avgSpend]));

export function getCardById(id) {
  return CARDS.find(c => c.id === id) || null;
}

export function getCardsByBank(bank) {
  return CARDS.filter(c => c.bank === bank);
}

// ─── CAP-AWARE REWARD CALCULATION ───
// This is the killer feature — no other Indian site does this.
// Returns { cashback, effectiveRate, capped, capNote } for a card + category + monthly spend

export function calcReward(card, categoryId, monthlySpend) {
  const baseRate = card.rewards[categoryId] || card.rewards.default || 0;
  if (baseRate === 0 || monthlySpend === 0) return { cashback: 0, effectiveRate: 0, capped: false, capNote: null };

  const rawCashback = monthlySpend * baseRate / 100;

  if (!card.caps) {
    return { cashback: Math.round(rawCashback), effectiveRate: baseRate, capped: false, capNote: null };
  }

  const caps = card.caps;

  // Monthly cashback cap (Axis ACE, HDFC Millennia, HDFC Swiggy)
  if (caps.monthlyCashback !== undefined) {
    const isCappedCategory = !caps.capAppliesTo || caps.capAppliesTo.includes(categoryId);

    if (isCappedCategory && rawCashback > caps.monthlyCashback) {
      // Spend beyond cap earns fallback rate
      const maxBeneficialSpend = caps.monthlyCashback / (baseRate / 100);
      const overflowSpend = monthlySpend - maxBeneficialSpend;
      const fallback = caps.fallbackRate || 0;
      const totalCashback = caps.monthlyCashback + (overflowSpend * fallback / 100);
      const effectiveRate = parseFloat(((totalCashback / monthlySpend) * 100).toFixed(2));

      return {
        cashback: Math.round(totalCashback),
        effectiveRate,
        capped: true,
        capNote: `${baseRate}% up to ₹${Math.round(maxBeneficialSpend).toLocaleString()}/mo, then ${fallback}%. Cap: ₹${caps.monthlyCashback}/mo`,
      };
    }

    // Under cap — full rate
    return { cashback: Math.round(rawCashback), effectiveRate: baseRate, capped: false, capNote: `Cap: ₹${caps.monthlyCashback}/mo (you're under it)` };
  }

  // Yearly cashback cap (SBI Cashback)
  if (caps.yearlyCashback !== undefined) {
    const isCappedCategory = !caps.capAppliesTo || caps.capAppliesTo.includes(categoryId);

    if (isCappedCategory) {
      const yearlySpend = monthlySpend * 12;
      const rawYearly = yearlySpend * baseRate / 100;

      if (rawYearly > caps.yearlyCashback) {
        const maxBeneficialYearlySpend = caps.yearlyCashback / (baseRate / 100);
        const maxBeneficialMonthly = maxBeneficialYearlySpend / 12;
        const fallback = caps.fallbackRate || 0;

        if (monthlySpend > maxBeneficialMonthly) {
          const overflowSpend = monthlySpend - maxBeneficialMonthly;
          const totalCashback = (maxBeneficialMonthly * baseRate / 100) + (overflowSpend * fallback / 100);
          const effectiveRate = parseFloat(((totalCashback / monthlySpend) * 100).toFixed(2));

          return {
            cashback: Math.round(totalCashback),
            effectiveRate,
            capped: true,
            capNote: `${baseRate}% up to ₹${Math.round(maxBeneficialMonthly).toLocaleString()}/mo (₹${caps.yearlyCashback.toLocaleString()}/yr cap), then ${fallback}%`,
          };
        }
      }

      return { cashback: Math.round(rawCashback), effectiveRate: baseRate, capped: false, capNote: `Yearly cap: ₹${caps.yearlyCashback.toLocaleString()}/yr (you're under it)` };
    }
  }

  // Monthly points cap (HDFC Regalia — 50K points/cycle)
  if (caps.monthlyPoints !== undefined) {
    const pointsEarned = (monthlySpend / caps.spendPer) * caps.pointsPer;
    if (pointsEarned > caps.monthlyPoints) {
      const maxBeneficialSpend = (caps.monthlyPoints / caps.pointsPer) * caps.spendPer;
      const effectiveRate = parseFloat(((caps.monthlyPoints * caps.pointValue / monthlySpend) * 100).toFixed(2));

      return {
        cashback: Math.round(caps.monthlyPoints * caps.pointValue),
        effectiveRate,
        capped: true,
        capNote: `Capped at ${caps.monthlyPoints.toLocaleString()} points/month (₹${Math.round(caps.monthlyPoints * caps.pointValue).toLocaleString()})`,
      };
    }
  }

  return { cashback: Math.round(rawCashback), effectiveRate: baseRate, capped: false, capNote: null };
}

// Calculate total monthly reward across all categories for a card
export function calcTotalMonthlyReward(card, spending) {
  let total = 0;
  let anyCapped = false;
  const details = {};

  CATEGORIES.forEach(cat => {
    const result = calcReward(card, cat.id, spending[cat.id] || 0);
    total += result.cashback;
    if (result.capped) anyCapped = true;
    details[cat.id] = result;
  });

  return { total, anyCapped, details };
}

