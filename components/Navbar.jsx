"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/smart-swipe", label: "Smart Swipe" },
  { href: "/gap-finder", label: "Gap Finder" },
  { href: "/swipe-check", label: "Swipe Check" },
  { href: "/compare", label: "Compare" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const { mode, toggle } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobOpen(false); }, [pathname]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-400"
      style={{
        background: scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-extrabold">C</div>
          <span className="text-lg font-bold tracking-tight" style={{ color: "var(--text)" }}>CardStack</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(n => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href}
                className="px-3.5 py-2 rounded-lg text-sm font-medium no-underline transition-all"
                style={{
                  background: active ? "var(--accent-light)" : "transparent",
                  color: active ? "var(--accent-text)" : "var(--text-muted)",
                }}
              >{n.label}</Link>
            );
          })}
          <div className="w-px h-5 mx-1.5" style={{ background: "var(--border)" }} />
          <button onClick={toggle} className="w-10 h-10 rounded-lg flex items-center justify-center text-lg border-none cursor-pointer transition-all"
            style={{ background: mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.08)" }}>
            {mode === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Mobile buttons */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggle} className="w-10 h-10 rounded-lg flex items-center justify-center text-lg border-none cursor-pointer"
            style={{ background: mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.08)" }}>
            {mode === "light" ? "🌙" : "☀️"}
          </button>
          <button onClick={() => setMobOpen(!mobOpen)} className="text-2xl border-none bg-transparent cursor-pointer" style={{ color: "var(--text)" }}>
            {mobOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobOpen && (
        <div className="md:hidden flex flex-col gap-1 pb-4 px-2" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}>
          {NAV.map(n => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href}
                className="px-4 py-3 rounded-lg text-base font-medium no-underline"
                style={{
                  background: active ? "var(--accent-light)" : "transparent",
                  color: active ? "var(--accent-text)" : "var(--text-secondary)",
                }}
              >{n.label}</Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
