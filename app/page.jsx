import HomeClient from "@/components/HomeClient";

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Which credit card gives the best dining rewards in India?", acceptedAnswer: { "@type": "Answer", text: "HDFC Regalia, HDFC Diners Black, ICICI Coral, and SBI ELITE all offer 5% rewards on dining. The best choice depends on your other spending categories and whether you value lounge access, movie benefits, or annual fee savings." } },
      { "@type": "Question", name: "What is the best lifetime free credit card in India?", acceptedAnswer: { "@type": "Answer", text: "The best free credit cards in India include Amazon Pay ICICI (5% on Amazon), Axis ACE (5% on bill payments via GPay), AU LIT (3% on groceries/utilities), OneCard (5% on top category), and IDFC FIRST WOW (3% on travel with zero forex). Choice depends on your primary spending." } },
      { "@type": "Question", name: "Which credit card should I use for fuel in India?", acceptedAnswer: { "@type": "Answer", text: "OneCard gives 5% on fuel if it's your highest spending category (auto-detected). AU Zenith+ gives a flat 3.5% on everything including fuel. Most other cards only offer fuel surcharge waiver (1%) which is minimal." } },
      { "@type": "Question", name: "How do I maximize credit card rewards in India?", acceptedAnswer: { "@type": "Answer", text: "Use different cards for different spending categories — no single card is best for everything. Use CardStack's Smart Swipe Guide to see which card to use for dining, travel, groceries, fuel, and more based on the cards you own." } },
      { "@type": "Question", name: "Which card gives the best Amazon cashback?", acceptedAnswer: { "@type": "Answer", text: "Amazon Pay ICICI credit card gives 5% back on Amazon purchases for Prime members (3% for non-Prime). It's lifetime free and has instant issuance. For non-Amazon online shopping, SBI SimplyCLICK and SBI Cashback Card also offer 5%." } },
    ],
  };

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CardStack",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Free credit card optimization tool for India. Compare 25+ cards, find the best card for every purchase, and discover how much you could save.",
    featureList: "Smart Swipe Guide, Card Gap Finder, Swipe Check, Head-to-Head Comparison, 25+ Indian credit cards, Real savings calculator",
    screenshot: "https://cardstack.vercel.app/og-image.png",
    author: { "@type": "Organization", name: "CardStack" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <HomeClient />
    </>
  );
}
