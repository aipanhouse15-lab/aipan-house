export default function SectionHeader({ badge, badgeBg, badgeBorder, badgeColor, title, subtitle }) {
  return (
    <div className="text-center mb-12">
      {badge && (
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-sm font-medium"
          style={{
            background: badgeBg || "var(--accent-light)",
            border: `1px solid ${badgeBorder || "var(--accent-border)"}`,
            color: badgeColor || "var(--accent-text)",
          }}>
          {badge}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3" style={{ color: "var(--text)" }}>{title}</h2>
      {subtitle && <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>{subtitle}</p>}
    </div>
  );
}
