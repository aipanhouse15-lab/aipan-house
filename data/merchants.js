export const MERCHANTS = {
  food: {
    label: "Food & Delivery", icon: "🍔",
    items: [
      { id: "swiggy", name: "Swiggy", icon: "🟠", cat: "dining", tips: [
        { card: "hdfc-swiggy", rate: "5% cashback", note: "Best for Swiggy — dedicated card. Orders under ₹150 may not qualify." },
        { card: "axis-ace", rate: "4% cashback", note: "Good alternative via Google Pay bill payment." },
        { card: "icici-coral", rate: "5% (dining)", note: "Counts as dining category. Movie BOGO bonus." },
      ], proTip: "Stack Swiggy Super (free delivery) + HDFC Swiggy Card for max savings. On orders ₹1,500+, HDFC Diners Black's points can beat flat 5%." },
      { id: "zomato", name: "Zomato", icon: "🔴", cat: "dining", tips: [
        { card: "hdfc-regalia", rate: "5% (dining)", note: "Top dining rate." },
        { card: "axis-ace", rate: "4% cashback", note: "Zomato is a preferred partner." },
        { card: "icici-coral", rate: "5% (dining)", note: "Dining category + Buy 1 Get 1 movies." },
      ], proTip: "HDFC Diners Black gives free Zomato Gold membership — ₹600/year saved before any cashback." },
      { id: "blinkit", name: "Blinkit", icon: "🟡", cat: "groceries", tips: [
        { card: "rbl-shoprite", rate: "5% (grocery)", note: "Best free grocery card." },
        { card: "au-lit", rate: "3% (grocery)", note: "Solid free alternative." },
        { card: "amazon-icici", rate: "2% (grocery)", note: "Decent if paying via Amazon Pay." },
      ], proTip: "Blinkit often codes as 'grocery' — verify on your statement. Some cards classify it as 'online shopping'." },
      { id: "bigbasket", name: "BigBasket", icon: "🟢", cat: "groceries", tips: [
        { card: "rbl-shoprite", rate: "5% (grocery)", note: "Highest grocery rate, free card." },
        { card: "au-lit", rate: "3% (grocery)", note: "Free card with 3% on groceries." },
        { card: "au-zenith", rate: "3.5% (flat)", note: "No category guessing needed." },
      ], proTip: "BigBasket accepts TATA Neu payments — if your card gives bonuses on TATA Neu, that could stack." },
      { id: "restaurant", name: "Restaurant Dining", icon: "🍽️", cat: "dining", tips: [
        { card: "hdfc-regalia", rate: "5% (dining)", note: "Best widely-available dining card." },
        { card: "hdfc-diners-black", rate: "5% (dining)", note: "Same rate + Zomato Gold + guest lounge." },
        { card: "sbi-elite", rate: "5% (dining)", note: "Plus dining privileges at partner restaurants." },
      ], proTip: "Check EazyDiner or Dineout for extra 20-30% off that stacks on top of card rewards." },
    ]
  },
  travel: {
    label: "Travel & Transport", icon: "✈️",
    items: [
      { id: "makemytrip", name: "MakeMyTrip", icon: "🔵", cat: "travel", tips: [
        { card: "hdfc-regalia", rate: "5% (travel)", note: "Great for flights and hotels on MMT." },
        { card: "axis-atlas", rate: "5% (travel)", note: "Points transfer to airlines." },
        { card: "hdfc-diners-black", rate: "5% + free membership", note: "Free MMT Black membership worth ₹3,000/year." },
      ], proTip: "HDFC Diners Black gives free MMT Black. Book via MMT using Diners Black = 5% + Black discounts. Double dip." },
      { id: "cleartrip", name: "Cleartrip", icon: "🟣", cat: "travel", tips: [
        { card: "sbi-simplyclick", rate: "10x points", note: "Best rate for Cleartrip — 10x reward points." },
        { card: "axis-atlas", rate: "5% (travel)", note: "Solid travel rate across all platforms." },
        { card: "hdfc-infinia", rate: "5% (travel)", note: "Premium rate + lounge + concierge." },
      ], proTip: "SBI SimplyCLICK gives 10x on Cleartrip — effectively 5%+ value. Best Cleartrip-specific deal in India." },
      { id: "uber", name: "Uber / Ola", icon: "🚕", cat: "travel", tips: [
        { card: "axis-atlas", rate: "5% (travel)", note: "Cab rides count as travel." },
        { card: "idfc-wow", rate: "3% (travel)", note: "Free card, decent rate." },
        { card: "au-zenith", rate: "3.5% (flat)", note: "Flat rate, no guessing." },
      ], proTip: "Uber/Ola sometimes code as 'transport' not 'travel.' Check your first statement to confirm." },
      { id: "airlines", name: "Airlines", icon: "🛫", cat: "travel", tips: [
        { card: "axis-atlas", rate: "5% + mile transfers", note: "Only Indian card that transfers to airline miles." },
        { card: "hdfc-infinia", rate: "5% (travel)", note: "Points convertible to airline miles too." },
        { card: "hdfc-regalia", rate: "5% (travel)", note: "Solid airline booking rate." },
      ], proTip: "Axis Atlas points transfer to Vistara/Air India/Singapore Airlines. If you fly 4+ times a year, this is the card." },
    ]
  },
  shopping: {
    label: "Online Shopping", icon: "🛒",
    items: [
      { id: "amazon", name: "Amazon", icon: "📦", cat: "online", tips: [
        { card: "amazon-icici", rate: "5% (Prime)", note: "Unbeatable for Amazon. Free card." },
        { card: "sbi-simplyclick", rate: "5% (online)", note: "Works if you don't have Amazon ICICI." },
        { card: "sbi-cashback", rate: "5% (online)", note: "Auto-credited cashback." },
      ], proTip: "Amazon Pay ICICI + Prime = 5%. ₹50 back per ₹1,000. At ₹5K/month that's ₹3,000/year in rewards." },
      { id: "flipkart", name: "Flipkart / Myntra", icon: "🛍️", cat: "online", tips: [
        { card: "axis-flipkart", rate: "5% (Flipkart/Myntra)", note: "Dedicated card for Flipkart ecosystem." },
        { card: "sbi-simplyclick", rate: "5% (online)", note: "Same rate on Flipkart." },
        { card: "hdfc-millennia", rate: "2.5% (online)", note: "Lower but versatile." },
      ], proTip: "During Big Billion Days, Axis Flipkart gives extra 5% on top of sale prices. Stack with exchange offers." },
      { id: "nykaa", name: "Nykaa / Ajio", icon: "💄", cat: "online", tips: [
        { card: "sbi-simplyclick", rate: "5% (online)", note: "Online shopping category." },
        { card: "axis-ace", rate: "4% (online)", note: "Good online rate, free card." },
        { card: "hdfc-millennia", rate: "2.5% (online)", note: "Works on all online merchants." },
      ], proTip: "Check payment page for bank-specific offers — HDFC/ICICI often have extra 10-15% off." },
      { id: "electronics", name: "Electronics / Apple", icon: "🍎", cat: "shopping", tips: [
        { card: "au-zenith", rate: "3.5% (flat)", note: "Big purchases = flat rate is king." },
        { card: "hdfc-infinia", rate: "3.3% (shopping)", note: "Strong rate + airline mile conversion." },
        { card: "axis-flipkart", rate: "4% (shopping)", note: "If buying via Flipkart stores." },
      ], proTip: "For ₹50K+ purchases, check if your card gives points on EMI — many cards claw back points after first EMI." },
    ]
  },
  entertainment: {
    label: "Entertainment", icon: "🎬",
    items: [
      { id: "streaming", name: "Netflix / Hotstar / Spotify", icon: "📺", cat: "entertainment", tips: [
        { card: "hdfc-infinia", rate: "5% (entertainment)", note: "Premium entertainment rate." },
        { card: "hdfc-diners-black", rate: "5% (entertainment)", note: "Same rate + free memberships." },
        { card: "indusind-legend", rate: "3.5% (entertainment)", note: "Good entertainment-focused card." },
      ], proTip: "OTT subscriptions are recurring — 2% extra on ₹500/month = ₹120/year per subscription. Multiply by 3-4 subs." },
      { id: "movies", name: "BookMyShow / PVR", icon: "🎬", cat: "entertainment", tips: [
        { card: "sbi-elite", rate: "Buy 1 Get 1", note: "BOGO on BookMyShow — saves ₹200-400 per movie." },
        { card: "icici-coral", rate: "Buy 1 Get 1", note: "Same BOGO deal. Lower fee." },
        { card: "au-lit", rate: "Movie BOGO", note: "Free card with movie benefit." },
      ], proTip: "SBI ELITE + ICICI Coral both give BOGO. 2+ movies/month = ₹5,000+ annual savings covering both cards' fees." },
    ]
  },
  bills: {
    label: "Bills & Utilities", icon: "💡",
    items: [
      { id: "electricity", name: "Electricity / Gas / Water", icon: "⚡", cat: "utilities", tips: [
        { card: "axis-ace", rate: "5% via GPay/PhonePe", note: "Pay via Google Pay for maximum." },
        { card: "au-lit", rate: "3% (utilities)", note: "Direct payment. Free card." },
        { card: "au-zenith", rate: "3.5% (flat)", note: "Flat rate on everything." },
      ], proTip: "Axis ACE gives 5% via Google Pay/PhonePe — don't pay directly on biller's site." },
      { id: "mobile", name: "Mobile / Broadband / DTH", icon: "📱", cat: "utilities", tips: [
        { card: "axis-ace", rate: "5% via bill pay apps", note: "Same trick — GPay/PhonePe." },
        { card: "au-lit", rate: "3% (utilities)", note: "Solid free alternative." },
        { card: "idfc-select", rate: "3% (online)", note: "If paying online." },
      ], proTip: "Annual prepaid recharges (₹2-3K) give bigger cashback in one shot. Axis ACE at 5% = ₹150 back." },
      { id: "insurance", name: "Insurance Premiums", icon: "🛡️", cat: "utilities", tips: [
        { card: "au-zenith", rate: "3.5% (flat)", note: "₹50K premium = ₹1,750 reward." },
        { card: "hdfc-infinia", rate: "3.3% (default)", note: "High default covers insurance." },
        { card: "idfc-select", rate: "3% (online)", note: "If paying online." },
      ], proTip: "Insurance premiums are huge transactions. ₹50K at 3.5% = ₹1,750. Always use best default-rate card." },
    ]
  },
  fuel: {
    label: "Fuel & Auto", icon: "⛽",
    items: [
      { id: "petrol", name: "Petrol Pumps", icon: "⛽", cat: "fuel", tips: [
        { card: "onecard", rate: "5% (auto-detected)", note: "If fuel is your top category." },
        { card: "au-zenith", rate: "3.5% (flat)", note: "No surcharge waiver needed." },
        { card: "au-lit", rate: "2% (fuel)", note: "Decent free option." },
      ], proTip: "Most cards waive fuel surcharge (1%) on ₹400-5,000. But the real win is cashback on top. OneCard's 5% is best if fuel is your top category." },
      { id: "fastag", name: "FASTag / Toll", icon: "🛣️", cat: "fuel", tips: [
        { card: "au-zenith", rate: "3.5% (flat)", note: "FASTag = general category. Flat rate safest." },
        { card: "hdfc-infinia", rate: "3.3% (default)", note: "High default covers FASTag." },
        { card: "axis-ace", rate: "2% (default)", note: "Decent free option." },
      ], proTip: "FASTag recharges don't count as 'fuel' — they code as 'transport' or 'general.' Use your best default-rate card." },
    ]
  },
};
