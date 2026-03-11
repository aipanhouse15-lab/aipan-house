"use client";
import { useState, useEffect } from "react";

/*
  FINAL HOMEPAGE — 12 sections
  1. Dark hero + live demo
  2. Quick answers ticker
  3. How It Works (3 steps)
  4. Award-style card picks
  5. Four Tools (2×2)
  6. Why Trust Us (6 cards)
  7. Testimonials
  8. Monthly Updates
  9. Did You Know (rotating)
  10. Methodology + worked example
  11. Trust bar (compact)
  12. Dark CTA
*/

// ─── DATA ───
const DEMO_CARDS = [
  { id: "amazon", name: "Amazon Pay ICICI", img: "📦", color: "#d97706", sel: true },
  { id: "ace", name: "Axis ACE", img: "🎯", color: "#7c3aed", sel: true },
  { id: "millennia", name: "HDFC Millennia", img: "✨", color: "#8b5cf6", sel: true },
  { id: "regalia", name: "HDFC Regalia", img: "💳", color: "#1a3c6e", sel: false },
  { id: "aulit", name: "AU LIT", img: "🔥", color: "#ea580c", sel: false },
];
const DEMO_RESULTS = [
  { cat: "Dining", icon: "🍽️", card: "HDFC Millennia", rate: "5%", save: "₹250", cap: null },
  { cat: "Online Shopping", icon: "🛒", card: "Amazon Pay ICICI", rate: "5%", save: "₹400", cap: null },
  { cat: "Utilities", icon: "💡", card: "Axis ACE", rate: "5%→3.2%", save: "₹200", cap: "Cap hit: ₹500/mo. After ₹10K spend, drops to 1.5%" },
  { cat: "Groceries", icon: "🥦", card: "Amazon Pay ICICI", rate: "1%", save: "₹60", cap: null },
];
const AWARD_CARDS = [
  { badge: "Best Free All-Rounder 2026", name: "Axis ACE Credit Card", bank: "Axis Bank", img: "🎯", color: "#7c3aed", grad: "linear-gradient(135deg,#7c3aed,#6d28d9)", fee: "₹499/yr", feeNote: "Waived on ₹2L", rate: "5%", rateCat: "Bills via GPay", base: "1.5%", lounge: "4/yr", cap: "₹500/mo cap", verdict: "Unmatched 5% on utility bills via Google Pay. 4% back on Swiggy, Zomato, and Ola. Solid 1.5% base. ₹500/mo cap means pair with another card for heavy spend.", pros: ["5% bills via GPay","4% food delivery","4 lounge visits"], cons: ["₹500/mo total cap","Fuel excluded"], id: "axis-ace" },
  { badge: "Best for Amazon Shoppers 2026", name: "Amazon Pay ICICI Card", bank: "ICICI Bank", img: "📦", color: "#d97706", grad: "linear-gradient(135deg,#d97706,#b45309)", fee: "Lifetime Free", feeNote: "", rate: "5%", rateCat: "Amazon Prime", base: "1%", lounge: "None", cap: null, verdict: "5% with Prime, 3% without. Rewards as Amazon Pay balance — no points to convert. No fee, no cap, instant issuance. Only 1% outside Amazon.", pros: ["5% Amazon Prime","No fee ever","No cap"], cons: ["1% non-Amazon","Locked to Amazon Pay"], id: "amazon-icici" },
  { badge: "Best Premium Card 2026", name: "HDFC Infinia", bank: "HDFC Bank", img: "💎", color: "#1e293b", grad: "linear-gradient(135deg,#1e293b,#0f172a)", fee: "₹12,500/yr", feeNote: "Not waivable", rate: "3.33%", rateCat: "Everything", base: "3.33%", lounge: "Unlimited", cap: null, verdict: "Highest flat rate in India. Up to 33% on SmartBuy travel. Unlimited lounge worldwide. Invite-only, ₹8L+ income, fuel excluded.", pros: ["3.33% flat","Unlimited lounge","33% SmartBuy"], cons: ["₹12.5K fee","Invite only"], id: "hdfc-infinia" },
  { badge: "Best for Partner Brands 2026", name: "HDFC Millennia", bank: "HDFC Bank", img: "✨", color: "#8b5cf6", grad: "linear-gradient(135deg,#8b5cf6,#7c3aed)", fee: "₹1,000/yr", feeNote: "Waived ₹1L", rate: "5%", rateCat: "10+ brands", base: "1%", lounge: "4/yr", cap: "₹1K/mo on 5%", verdict: "5% on Swiggy, Zomato, Amazon, Flipkart, Myntra, Uber, BookMyShow + more. Widest partner list in India. ₹1K/mo cap on 5% categories.", pros: ["5% on 10+ brands","Low fee waivable","4 lounge"], cons: ["₹1K/mo cap","1% non-partner"], id: "hdfc-millennia" },
];
const QUICK_PICKS = [
  { q: "Best for Swiggy?", a: "HDFC Millennia (5%)", c: "#8b5cf6" },
  { q: "Best free card?", a: "Axis ACE (5% bills)", c: "#7c3aed" },
  { q: "Best for Amazon?", a: "Amazon ICICI (5%)", c: "#d97706" },
  { q: "Best for fuel?", a: "OneCard (5x auto)", c: "#18181b" },
  { q: "Best for groceries?", a: "RBL ShopRite (5%)", c: "#c026d3" },
  { q: "Best for travel?", a: "Axis Atlas (5%)", c: "#0f766e" },
];
const TOOLS = [
  { icon: "🎯", name: "Smart Swipe Guide", desc: "Select your cards and spending. See the best card for every category — with real cashback after caps.", color: "#6366f1", tag: "Most popular", cta: "Try it free →", href: "/smart-swipe" },
  { icon: "💡", name: "Card Gap Finder", desc: "Find categories where better cards exist. See the exact ₹ you're leaving on the table per year.", color: "#f59e0b", tag: "Eye-opener", cta: "Find gaps →", href: "/gap-finder" },
  { icon: "🔍", name: "Swipe Check", desc: "Pick a merchant — Swiggy, Amazon, Zomato, petrol — get top 3 cards with pro tips.", color: "#ec4899", tag: "New", cta: "Check merchant →", href: "/swipe-check" },
  { icon: "⚖️", name: "Compare Cards", desc: "Visual head-to-head with bar charts, category scores, and auto-generated verdict.", color: "#06b6d4", tag: "Popular", cta: "Compare now →", href: "/compare" },
];
const TRUST_CARDS = [
  { icon: "📊", title: "Real Math, Not Ads", text: "We calculate effective cashback after caps. No inflated numbers." },
  { icon: "🔒", title: "Zero Data Collected", text: "No name, email, phone. No cookies. No tracking whatsoever." },
  { icon: "🧠", title: "Smart, Not Salesy", text: "We optimize your rewards — not our commissions." },
  { icon: "🇮🇳", title: "Built for India", text: "25 Indian cards. Indian spending patterns. Rupee calculations." },
  { icon: "⚡", title: "Cap-Aware Savings", text: "Only site showing effective rate after cashback caps. Real ₹ savings." },
  { icon: "🆓", title: "Free Forever", text: "All tools free. We earn only through optional affiliate links." },
];
const TESTIMONIALS = [
  { name: "Priya S.", loc: "Mumbai", text: "Finally someone showing REAL cashback rates. 1.33% on Regalia was a shock — but I trust this more than sites showing 5%.", avatar: "👩‍💼", accent: "#6366f1" },
  { name: "Arjun M.", loc: "Bangalore", text: "The cap calculator is brilliant. I was spending ₹20K on bills thinking I'm earning 5% — turns out only first ₹10K counts.", avatar: "👨‍💻", accent: "#f59e0b" },
  { name: "Sneha R.", loc: "Delhi", text: "Showed my husband we were losing ₹8K/year using wrong cards. He applied for Axis ACE that same evening.", avatar: "👩‍🎓", accent: "#ec4899" },
];
const UPDATES = [
  { icon: "📊", card: "HDFC Regalia", text: "Base rate confirmed at 1.33% effective. SmartBuy up to 13.33% on travel.", type: "verified", date: "Mar 2026", color: "#6366f1" },
  { icon: "⚠️", card: "Axis ACE", text: "Monthly cashback cap is ₹500. After ₹10K utility spend, effective rate drops to 1.5%.", type: "alert", date: "Mar 2026", color: "#7c3aed" },
  { icon: "🆕", card: "HDFC Swiggy", text: "10% on Swiggy with ₹1500/mo cap. 5% on online categories. Better than originally listed.", type: "new", date: "Mar 2026", color: "#fc8019" },
  { icon: "✅", card: "11 Cards Verified", text: "Effective cashback rates now verified from bank product pages, including cap calculations.", type: "update", date: "Mar 2026", color: "#16a34a" },
  { icon: "📦", card: "Amazon Pay ICICI", text: "Confirmed: 5% Prime, 3% non-Prime, 2% partners, 1% other. No cap. Lifetime free.", type: "verified", date: "Mar 2026", color: "#d97706" },
];
const DID_YOU_KNOW_TIPS = [
  { tip: "Swiggy orders under ₹150 don't qualify for credit card cashback on most cards. Always check minimum transaction limits.", icon: "🍕" },
  { tip: "Fuel surcharge waiver only applies at fuel stations — not EV charging or toll payments.", icon: "⛽" },
  { tip: "Paying your credit card bill with another card (via CRED, etc.) doesn't earn rewards on most cards.", icon: "🔁" },
  { tip: "Annual fee waiver is usually based on spending in the previous year, not the current year. Plan ahead.", icon: "📅" },
  { tip: "Reward points earned on EMI purchases are often reversed after the first EMI. Read the fine print.", icon: "⚡" },
  { tip: "HDFC Regalia's advertised '5x rewards' is actually 1.33% effective cashback. The real value is SmartBuy at 13%.", icon: "💳" },
  { tip: "Axis ACE gives 5% on bills via GPay — but only up to ₹500/month. After ₹10K spend, rate drops to 1.5%.", icon: "🎯" },
  { tip: "International transactions on most Indian cards have 1-3.5% forex markup — even 'premium' cards. Only IDFC WOW and Axis Atlas waive it.", icon: "🌍" },
];
const TRUST_BAR = [["📊","Cap-aware math"],["🔒","Zero tracking"],["✅","11 verified"],["🆓","Free forever"],["🇮🇳","India-built"],["🤖","AI-ready API"]];

// ─── HERO DEMO ───
function HeroDemoCard() {
  const [step, setStep] = useState(0);
  const bdr = "rgba(255,255,255,0.08)";
  const muted = "rgba(255,255,255,0.35)";
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${bdr}`, borderRadius: 16, overflow: "hidden", backdropFilter: "blur(12px)", boxShadow: "0 8px 40px rgba(0,0,0,0.3)" }}>
      <div style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>Smart Swipe Guide</span>
        <div style={{ display: "flex", gap: 2 }}>
          {["Select","Results"].map((l,i)=>(<button key={l} onClick={()=>setStep(i)} style={{ background:step===i?"#fff":"transparent", color:step===i?"#111":muted, border:"none", borderRadius:6, padding:"4px 12px", fontSize:10, fontWeight:600, cursor:"pointer" }}>{l}</button>))}
        </div>
      </div>
      <div style={{ padding: "14px" }}>
        {step===0?(
          <div>
            {DEMO_CARDS.map(c=>(<div key={c.id} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", borderRadius:8, marginBottom:4, background:c.sel?`${c.color}18`:"transparent", border:c.sel?`1.5px solid ${c.color}40`:`1px solid ${bdr}` }}><span style={{fontSize:16}}>{c.img}</span><span style={{flex:1,fontSize:12,fontWeight:600,color:"#fff"}}>{c.name}</span>{c.sel&&<span style={{width:16,height:16,borderRadius:4,background:c.color,fontSize:9,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>✓</span>}</div>))}
            <button onClick={()=>setStep(1)} style={{ width:"100%", marginTop:8, background:"#fff", color:"#111", border:"none", borderRadius:8, padding:"10px", fontSize:12, fontWeight:700, cursor:"pointer" }}>Show Results →</button>
          </div>
        ):(
          <div>
            {DEMO_RESULTS.map((r,i)=>(<div key={i} style={{ padding:"10px", borderRadius:8, marginBottom:4, border:r.cap?`1px solid rgba(251,191,36,0.2)`:`1px solid ${bdr}`, background:r.cap?"rgba(251,191,36,0.06)":"transparent" }}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:16}}>{r.icon}</span><div><div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{r.cat}</div><div style={{fontSize:10,color:muted}}>{r.card}</div></div></div><span style={{fontSize:16,fontWeight:800,color:"#4ade80"}}>{r.rate}</span></div>{r.cap&&<div style={{marginTop:6,fontSize:10,color:"#fbbf24",padding:"4px 6px",background:"rgba(251,191,36,0.06)",borderRadius:4,lineHeight:1.4}}>⚡ {r.cap}</div>}</div>))}
            <div style={{ marginTop:10, padding:"12px", border:"1.5px solid rgba(255,255,255,0.15)", borderRadius:8, textAlign:"center" }}>
              <div style={{ fontSize:10, color:muted, textTransform:"uppercase", letterSpacing:"0.06em" }}>Annual savings</div>
              <div style={{ fontSize:22, fontWeight:800, color:"#fff" }}>₹10,920</div>
              <div style={{ fontSize:10, color:"#4ade80" }}>After cashback caps applied</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN ───
export default function HomeClient() {
  const [quickIdx, setQuickIdx] = useState(0);
  const [tipIdx, setTipIdx] = useState(0);
  const [vis, setVis] = useState(false);

  useEffect(() => { setTimeout(() => setVis(true), 200); }, []);
  useEffect(() => { const t = setInterval(() => setQuickIdx(i => (i+1) % QUICK_PICKS.length), 2500); return () => clearInterval(t); }, []);
  useEffect(() => { const t = setInterval(() => setTipIdx(i => (i+1) % DID_YOU_KNOW_TIPS.length), 5000); return () => clearInterval(t); }, []);

  return (
    <div>
      {/* ═══ 1. DARK HERO + DEMO ═══ */}
      <section style={{ background: "linear-gradient(135deg,#0f172a,#1e293b,#0f172a)", position: "relative", overflow: "hidden", marginTop: 64 }}>
        <div style={{ position:"absolute",top:-120,right:-80,width:450,height:450,borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,0.1),transparent 70%)",filter:"blur(60px)",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",bottom:-60,left:-40,width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(168,85,247,0.06),transparent 70%)",filter:"blur(50px)",pointerEvents:"none" }}/>
        <div className="max-w-[1060px] mx-auto px-6 py-16 md:py-[72px] grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-12 items-center relative z-[2]">
          <div style={{ transition:"all 0.7s", opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:100, padding:"5px 14px", marginBottom:22, fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.5)" }}>
              <span style={{ width:6,height:6,borderRadius:"50%",background:"#4ade80" }}/> Live tool — try it right now
            </div>
            <h1 style={{ fontSize:"clamp(30px,4.5vw,48px)", fontWeight:800, lineHeight:1.08, letterSpacing:"-0.035em", marginBottom:16, color:"#f1f5f9" }}>
              See what your cards <span style={{color:"#818cf8"}}>actually</span> earn you
            </h1>
            <p style={{ fontSize:16, color:"#94a3b8", lineHeight:1.7, marginBottom:28, maxWidth:440 }}>
              We calculate <strong style={{color:"#e2e8f0"}}>effective cashback after reward caps</strong> — the number banks don't advertise. 25 Indian cards. Verified. Free.
            </p>
            <div style={{ display:"flex", gap:10, marginBottom:32, flexWrap:"wrap" }}>
              <a href="/smart-swipe" style={{ background:"#fff", color:"#111", borderRadius:10, padding:"14px 28px", fontSize:14, fontWeight:700, textDecoration:"none" }}>Try Smart Swipe →</a>
              <a href="/compare" style={{ background:"rgba(255,255,255,0.06)", color:"#cbd5e1", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"14px 28px", fontSize:14, fontWeight:600, textDecoration:"none" }}>Compare cards</a>
            </div>
            <div style={{ display:"flex", gap:36, flexWrap:"wrap" }}>
              {[["25+","Cards analyzed"],["11","Verified from banks"],["₹15K+","Avg savings/year"]].map(([n,l],i)=>(
                <div key={i}><div style={{fontSize:22,fontWeight:800,color:"#e2e8f0"}}>{n}</div><div style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>{l}</div></div>
              ))}
            </div>
          </div>
          <div style={{ transition:"all 0.7s 0.2s", opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)" }}><HeroDemoCard/></div>
        </div>
      </section>

      {/* ═══ 2. QUICK ANSWERS MARQUEE ═══ */}
      <section style={{ background:"var(--bg-section-slate)", borderBottom:"1px solid var(--border-section-slate)", padding:"12px 0", overflow:"hidden" }}>
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .marquee-track { display: flex; gap: 8px; animation: marquee 25s linear infinite; width: max-content; }
          .marquee-track:hover { animation-play-state: paused; }
        `}</style>
        <div className="marquee-track">
          {[...QUICK_PICKS, ...QUICK_PICKS].map((q, i) => (
            <div key={i} style={{ display:"flex", gap:8, alignItems:"center", padding:"6px 16px", borderRadius:8, background:`${q.c}06`, border:`1px solid ${q.c}15`, flexShrink:0, cursor:"pointer" }}>
              <span className="text-xs font-bold" style={{color:"var(--text)"}}>{q.q}</span>
              <span className="text-xs font-semibold" style={{color:q.c}}>{q.a}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3. HOW IT WORKS ═══ */}
      <section style={{ maxWidth:900, margin:"0 auto", padding:"56px 24px" }}>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-sm font-medium" style={{background:"var(--accent-light)",border:"1px solid var(--accent-border)",color:"var(--accent-text)"}}>✨ Simple & Powerful</div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-2" style={{color:"var(--text)"}}>Three steps to maximize every swipe</h2>
          <p className="text-sm" style={{color:"var(--text-muted)"}}>No sign-up needed. Select your cards and get instant recommendations.</p>
        </div>
        <div className="grid gap-3" style={{gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))"}}>
          {[["01","Select Your Cards","Pick from 25+ popular Indian credit cards","🃏"],["02","Enter Your Spending","Monthly spend per category for real savings math","🎯"],["03","Get Recommendations","Best card per swipe with cap-aware calculations","💡"]].map(([step,title,desc,icon],i)=>(
            <div key={i} className="rounded-2xl p-6 text-left transition-all" style={{background:"var(--bg-card)",border:"1px solid var(--border)",boxShadow:"var(--shadow)"}}>
              <div className="text-4xl mb-4">{icon}</div>
              <div className="text-xs font-bold font-mono mb-2" style={{color:"var(--accent-text)"}}>STEP {step}</div>
              <div className="text-lg font-bold mb-2" style={{color:"var(--text)"}}>{title}</div>
              <div className="text-sm leading-relaxed" style={{color:"var(--text-muted)"}}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 4. AWARD CARDS ═══ */}
      <section style={{ background:"var(--bg-section-blue)", borderTop:"1px solid var(--border-section-blue)", borderBottom:"1px solid var(--border-section-blue)", padding:"56px 24px" }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1" style={{color:"var(--text)"}}>Best credit cards of 2026</h2>
          <p className="text-sm mb-8" style={{color:"var(--text-muted)"}}>Real cashback math — not bank-advertised rates. One winner per category.</p>
          {AWARD_CARDS.map((c,i)=>(
            <div key={i} className="mb-5 rounded-2xl overflow-hidden transition-all" style={{border:"1px solid var(--border)",boxShadow:"var(--shadow)"}}>
              <div style={{background:c.grad,padding:"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:12,fontWeight:800,color:"#fff",textTransform:"uppercase",letterSpacing:"0.06em"}}>🏆 {c.badge}</span>
                <span style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>Verified</span>
              </div>
              <div className="p-5" style={{background:"var(--bg-card)"}}>
                <div className="flex gap-5 flex-wrap">
                  <div className="flex-shrink-0 rounded-xl flex items-center justify-center text-4xl" style={{width:88,height:56,background:`${c.color}0a`,border:`1.5px solid ${c.color}18`}}>{c.img}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-extrabold" style={{color:"var(--text)"}}>{c.name}</h3>
                    <p className="text-sm mt-0.5 mb-3" style={{color:"var(--text-muted)"}}>{c.bank}</p>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3 py-3 mb-3" style={{borderTop:"1px solid var(--border-light)",borderBottom:"1px solid var(--border-light)"}}>
                      {[["Fee",c.fee,c.feeNote,false],["Best",c.rate,c.rateCat,true],["Base",c.base,null,false],["Lounge",c.lounge,null,false],["Cap",c.cap||"None",null,false]].map(([l,v,s,ig],j)=>(
                        <div key={j}><div className="text-[10px] font-semibold uppercase tracking-wider" style={{color:"var(--text-faint)"}}>{l}</div><div className="text-[15px] font-extrabold mt-0.5" style={{color:ig?"var(--green)":(l==="Cap"&&v!=="None"?"var(--orange)":"var(--text)")}}>{v}</div>{s&&<div className="text-[10px] mt-0.5" style={{color:ig?"var(--green)":"var(--text-faint)"}}>{s}</div>}</div>
                      ))}
                    </div>
                    <div className="rounded-lg p-3.5 mb-3" style={{background:"var(--bg-muted)"}}><div className="text-[10px] font-extrabold uppercase tracking-wider mb-1.5" style={{color:c.color}}>OUR TAKE</div><p className="text-sm leading-relaxed" style={{color:"var(--text-secondary)"}}>{c.verdict}</p></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>{c.pros.map((p,j)=><div key={j} className="text-xs mb-1 flex gap-1.5" style={{color:"var(--text-secondary)"}}><span style={{color:"var(--green)"}}>✓</span>{p}</div>)}</div>
                      <div>{c.cons.map((x,j)=><div key={j} className="text-xs mb-1 flex gap-1.5" style={{color:"var(--text-muted)"}}><span style={{color:"var(--orange)"}}>✕</span>{x}</div>)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 5. FOUR TOOLS ═══ */}
      <section style={{ maxWidth:900, margin:"0 auto", padding:"56px 24px" }}>
        <div className="text-center mb-9">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1.5" style={{color:"var(--text)"}}>Four free tools. Real math.</h2>
          <p className="text-sm" style={{color:"var(--text-muted)"}}>Each one answers a different credit card question.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {TOOLS.map((t,i)=>(
            <a key={i} href={t.href} style={{textDecoration:"none",color:"inherit"}}>
              <div className="rounded-2xl overflow-hidden transition-all cursor-pointer" style={{border:"1px solid var(--border)",boxShadow:"var(--shadow)",background:"var(--bg-card)"}}>
                <div style={{height:4,background:t.color}}/>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{background:`${t.color}08`,border:`1px solid ${t.color}15`}}>{t.icon}</div>
                    <span className="text-[10px] font-bold rounded-md px-2.5 py-1" style={{color:t.color,background:`${t.color}08`}}>{t.tag}</span>
                  </div>
                  <h3 className="text-base font-extrabold mb-1.5" style={{color:"var(--text)"}}>{t.name}</h3>
                  <p className="text-xs leading-relaxed mb-3.5" style={{color:"var(--text-muted)"}}>{t.desc}</p>
                  <span className="text-sm font-bold" style={{color:t.color}}>{t.cta}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ═══ 6. WHY TRUST US ═══ */}
      <section style={{ background:"var(--bg-section-green)", borderTop:"1px solid var(--border-section-green)", borderBottom:"1px solid var(--border-section-green)", padding:"56px 24px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-sm font-medium" style={{background:"var(--green-bg)",border:"1px solid var(--green-border)",color:"var(--green)"}}>🛡️ Trust</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{color:"var(--text)"}}>Why people trust CardStack</h2>
          </div>
          <div className="grid gap-3" style={{gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))"}}>
            {TRUST_CARDS.map((t,i)=>(
              <div key={i} className="rounded-2xl p-5 transition-all" style={{background:"var(--bg-card)",border:"1px solid var(--border)",boxShadow:"var(--shadow)"}}>
                <div className="text-3xl mb-3">{t.icon}</div>
                <div className="text-base font-bold mb-1.5" style={{color:"var(--text)"}}>{t.title}</div>
                <div className="text-sm leading-relaxed" style={{color:"var(--text-muted)"}}>{t.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. TESTIMONIALS ═══ */}
      <section style={{ background:"var(--bg-section-violet)", borderTop:"1px solid var(--border-section-violet)", borderBottom:"1px solid var(--border-section-violet)", padding:"56px 24px" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-sm font-medium" style={{background:"var(--blue-bg)",border:"1px solid var(--blue-border)",color:"var(--blue)"}}>💬 Users</div>
          <h2 className="text-2xl font-extrabold tracking-tight" style={{color:"var(--text)"}}>What our users say</h2>
        </div>
        <div className="grid gap-3.5" style={{gridTemplateColumns:"repeat(auto-fit, minmax(230px, 1fr))"}}>
          {TESTIMONIALS.map((t,i)=>(
            <div key={i} className="rounded-xl p-5" style={{background:"var(--bg-card)",borderLeft:`4px solid ${t.accent}`,boxShadow:"var(--shadow)"}}>
              <div style={{fontSize:14,color:"#f59e0b",letterSpacing:2,marginBottom:10}}>★★★★★</div>
              <p className="text-sm leading-relaxed mb-3.5" style={{color:"var(--text-secondary)"}}>"{t.text}"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{background:`${t.accent}10`}}>{t.avatar}</div>
                <div><div className="text-xs font-bold" style={{color:"var(--text)"}}>{t.name}</div><div className="text-[10px]" style={{color:"var(--text-faint)"}}>{t.loc}</div></div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ═══ 8. MONTHLY UPDATES ═══ */}
      <section style={{ background:"var(--bg-section-amber)", borderTop:"1px solid var(--border-section-amber)", borderBottom:"1px solid var(--border-section-amber)", padding:"56px 24px" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-sm font-medium" style={{background:"var(--orange-bg)",border:"1px solid var(--orange-border)",color:"var(--orange)"}}>📢 March 2026</div>
            <h2 className="text-2xl font-extrabold tracking-tight" style={{color:"var(--text)"}}>What changed this month</h2>
            <p className="text-sm mt-1.5" style={{color:"var(--text-muted)"}}>We track reward changes so you don't have to.</p>
          </div>
          <div className="flex flex-col gap-2.5">
            {UPDATES.map((u,i)=>(
              <div key={i} className="rounded-xl p-4 flex items-start gap-3.5" style={{background:"var(--bg-card)",border:"1px solid var(--border)",boxShadow:"var(--shadow)"}}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0" style={{background:`${u.color}18`}}>{u.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-bold" style={{color:"var(--text)"}}>{u.card}</span>
                    <span className="text-[11px] font-semibold uppercase rounded px-2 py-0.5" style={{
                      color:u.type==="alert"?"var(--orange)":u.type==="new"?"var(--green)":u.type==="verified"?"var(--blue)":"var(--text-muted)",
                      background:u.type==="alert"?"var(--orange-bg)":u.type==="new"?"var(--green-bg)":u.type==="verified"?"var(--blue-bg)":"var(--bg-muted)"
                    }}>{u.type}</span>
                    <span className="text-[11px]" style={{color:"var(--text-faint)"}}>{u.date}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{color:"var(--text-secondary)"}}>{u.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9. DID YOU KNOW ═══ */}
      <section style={{ maxWidth:800, margin:"0 auto", padding:"40px 24px" }}>
        <div className="rounded-2xl p-6 flex items-start gap-4" style={{background:"linear-gradient(135deg, rgba(251,191,36,0.08), rgba(251,191,36,0.02))",border:"1px solid rgba(251,191,36,0.2)"}}>
          <div className="text-3xl flex-shrink-0" key={tipIdx}>{DID_YOU_KNOW_TIPS[tipIdx].icon}</div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{color:"#d97706"}}>💡 Did you know?</div>
            <p className="text-sm leading-relaxed" style={{color:"var(--text-secondary)"}} key={tipIdx}>{DID_YOU_KNOW_TIPS[tipIdx].tip}</p>
            <p className="text-[11px] mt-2" style={{color:"var(--text-faint)"}}>New tip every few seconds</p>
          </div>
        </div>
      </section>

      {/* ═══ 10. METHODOLOGY ═══ */}
      <section style={{ maxWidth:720, margin:"0 auto", padding:"40px 24px 56px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight mb-3.5" style={{color:"var(--text)"}}>How we calculate</h2>
            <p className="text-sm leading-relaxed mb-2.5" style={{color:"var(--text-muted)"}}><strong style={{color:"var(--text)"}}>Formula:</strong> (Points × Value) ÷ Spend × 100 = Effective %</p>
            <p className="text-sm leading-relaxed mb-2.5" style={{color:"var(--text-muted)"}}>When a card has a cap, we calculate your <strong style={{color:"var(--text)"}}>actual rate at your spending level</strong>.</p>
            <p className="text-sm leading-relaxed" style={{color:"var(--text-muted)"}}>11 of 25 cards verified from bank pages. Unverified clearly labeled.</p>
          </div>
          <div className="rounded-2xl p-5" style={{background:"var(--bg-muted)",border:"1px solid var(--border)"}}>
            <h3 className="text-sm font-extrabold mb-3" style={{color:"var(--text)"}}>Example: Axis ACE</h3>
            <div className="text-xs leading-relaxed" style={{color:"var(--text-muted)"}}>
              <div className="mb-1.5"><strong style={{color:"var(--text)"}}>Advertised:</strong> 5% on utilities</div>
              <div className="mb-1.5"><strong style={{color:"var(--text)"}}>Cap:</strong> ₹500/mo cashback</div>
              <div className="mb-1.5"><strong style={{color:"var(--text)"}}>Your spend:</strong> ₹20K/mo on bills</div>
              <div className="rounded-lg p-3 mt-3" style={{background:"var(--orange-bg)",border:"1px solid var(--orange-border)"}}>
                <div className="text-[10px] font-extrabold uppercase mb-1" style={{color:"var(--orange)"}}>REAL EFFECTIVE RATE</div>
                <div className="text-[11px]" style={{color:"var(--orange)"}}>₹10K at 5% = ₹500 (cap hit)</div>
                <div className="text-[11px]" style={{color:"var(--orange)"}}>₹10K at 1.5% = ₹150</div>
                <div className="text-sm font-extrabold mt-1.5" style={{color:"var(--orange)"}}>₹650 total → Effective: 3.25%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 11. TRUST BAR ═══ */}
      <section style={{borderTop:"1px solid var(--border-section-slate)",borderBottom:"1px solid var(--border-section-slate)",background:"var(--bg-section-slate)",padding:"18px 24px"}}>
        <div style={{maxWidth:900,margin:"0 auto",display:"flex",justifyContent:"center",gap:28,flexWrap:"wrap"}}>
          {TRUST_BAR.map(([icon,text],i)=>(<div key={i} className="flex items-center gap-1.5 text-xs font-semibold" style={{color:"var(--text-secondary)"}}><span>{icon}</span>{text}</div>))}
        </div>
      </section>

      {/* ═══ 12. DARK CTA ═══ */}
      <section style={{background:"linear-gradient(135deg,#0f172a,#1e293b)",padding:"72px 24px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-60,left:"50%",transform:"translateX(-50%)",width:500,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(129,140,248,0.08),transparent 70%)",filter:"blur(50px)",pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:2,maxWidth:500,margin:"0 auto"}}>
          <h2 style={{fontSize:"clamp(26px,4vw,36px)",fontWeight:800,color:"#f1f5f9",letterSpacing:"-0.03em",lineHeight:1.15,marginBottom:14}}>Stop guessing.<br/>Start <span style={{color:"#818cf8"}}>knowing</span>.</h2>
          <p style={{fontSize:15,color:"#64748b",lineHeight:1.6,marginBottom:28}}>30 seconds. No sign-up. No tracking. Real math that banks don't show you.</p>
          <a href="/smart-swipe" style={{display:"inline-block",background:"#fff",color:"#111",borderRadius:12,padding:"16px 40px",fontSize:16,fontWeight:700,textDecoration:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.2)"}}>Try Smart Swipe — it's free →</a>
          <div style={{marginTop:16,fontSize:12,color:"rgba(255,255,255,0.3)"}}>Free forever · Works on mobile · No app needed</div>
        </div>
      </section>
    </div>
  );
}
