// Original Aipan motif SVGs — white rice-paste lines on red geru ground.
// Parametric and reusable; these are the Pinterest-shareable visual moat.
// All patterns are original geometric constructions inspired by traditional
// Aipan vocabulary (dots/bindu, lotus/padma, conch, stepped borders).

const RICE = '#FBF6EE'
const GERU = '#9E2B1E'

function Frame({ children, label, size = 280, ground = GERU }) {
  return (
    <figure className="my-8">
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        role="img"
        aria-label={label}
        className="mx-auto block rounded-md shadow-soft"
      >
        <rect width="200" height="200" fill={ground} />
        {/* stepped border common to Aipan thresholds */}
        <rect x="10" y="10" width="180" height="180" fill="none" stroke={RICE} strokeWidth="1.5" />
        <rect x="16" y="16" width="168" height="168" fill="none" stroke={RICE} strokeWidth="0.8" />
        {children}
      </svg>
      {label && (
        <figcaption className="mt-2 text-center font-sans text-xs text-taupe">{label}</figcaption>
      )}
    </figure>
  )
}

// Lakshmi Pad — the auspicious feet drawn at the threshold
export function LakshmiPad(props) {
  return (
    <Frame label="Lakshmi Pad — the feet of the goddess" {...props}>
      <g fill="none" stroke={RICE} strokeWidth="2" strokeLinecap="round">
        {[70, 130].map((cx) => (
          <g key={cx}>
            <ellipse cx={cx} cy="115" rx="15" ry="26" />
            {[-1, 0, 1].map((i) => (
              <circle key={i} cx={cx + i * 8} cy="82" r="3.5" fill={RICE} />
            ))}
            <circle cx={cx + 14} cy="90" r="3" fill={RICE} />
            <circle cx={cx - 14} cy="90" r="3" fill={RICE} />
          </g>
        ))}
        <circle cx="100" cy="55" r="6" fill={RICE} />
      </g>
    </Frame>
  )
}

// Padma — the eight-petalled lotus, core of many Aipan chowkis
export function Padma(props) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45)
  return (
    <Frame label="Padma — the eight-petalled lotus" {...props}>
      <g transform="translate(100 100)">
        {petals.map((deg) => (
          <path
            key={deg}
            d="M0,-12 C18,-40 18,-58 0,-72 C-18,-58 -18,-40 0,-12 Z"
            fill="none"
            stroke={RICE}
            strokeWidth="1.8"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="11" fill="none" stroke={RICE} strokeWidth="2" />
        <circle r="3.5" fill={RICE} />
      </g>
    </Frame>
  )
}

// Saraswati Chowki — the seat motif, concentric squares with lotus center
export function SaraswatiChowki(props) {
  return (
    <Frame label="Saraswati Chowki — the seat of learning" {...props}>
      <g fill="none" stroke={RICE} strokeWidth="1.6">
        {[30, 45, 60].map((d) => (
          <rect key={d} x={d} y={d} width={200 - d * 2} height={200 - d * 2} transform="rotate(45 100 100)" />
        ))}
        <g transform="translate(100 100)">
          {Array.from({ length: 8 }, (_, i) => i * 45).map((deg) => (
            <path key={deg} d="M0,-6 C10,-22 10,-32 0,-40 C-10,-32 -10,-22 0,-6 Z" stroke={RICE} strokeWidth="1.5" transform={`rotate(${deg})`} />
          ))}
          <circle r="5" fill={RICE} />
        </g>
        {[[100,18],[100,182],[18,100],[182,100]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="3" fill={RICE} />
        ))}
      </g>
    </Frame>
  )
}

// Vasudhara — vertical flowing lines, drawn for prosperity
export function Vasudhara(props) {
  return (
    <Frame label="Vasudhara — flowing lines of abundance" {...props}>
      <g fill="none" stroke={RICE} strokeWidth="1.6" strokeLinecap="round">
        {[50, 75, 100, 125, 150].map((x) => (
          <path key={x} d={`M${x},30 q12,30 0,60 q-12,30 0,60`} />
        ))}
        {[50, 75, 100, 125, 150].map((x) => (
          <circle key={x} cx={x} cy="30" r="3" fill={RICE} />
        ))}
      </g>
    </Frame>
  )
}

export const MOTIFS = { LakshmiPad, Padma, SaraswatiChowki, Vasudhara }
