// Original Aipan motif SVGs. stroke defaults to rice-white for use on colored grounds.
function Lotus({ stroke = '#FBF6EE', sw = 1.8 }) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <g fill="none" stroke={stroke} strokeWidth={sw}>
      <g transform="translate(100 100)">
        {petals.map((d) => (
          <path key={d} d="M0,-12 C18,-44 18,-62 0,-76 C-18,-62 -18,-44 0,-12Z" transform={`rotate(${d})`} />
        ))}
        <circle r="9" />
        <circle r="3" fill={stroke} />
      </g>
    </g>
  )
}
function Vasudhara({ stroke = '#FBF6EE', sw = 4 }) {
  return (
    <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round">
      <path d="M60,40 q14,40 0,80 q-14,40 0,40" />
      <path d="M100,40 q14,40 0,80 q-14,40 0,40" />
      <path d="M140,40 q14,40 0,80 q-14,40 0,40" />
    </g>
  )
}
function Chowki({ stroke = '#FBF6EE', sw = 1.8 }) {
  return (
    <g fill="none" stroke={stroke} strokeWidth={sw}>
      <rect x="50" y="50" width="100" height="100" transform="rotate(45 100 100)" />
      <rect x="70" y="70" width="60" height="60" transform="rotate(45 100 100)" />
      <circle cx="100" cy="100" r="13" />
    </g>
  )
}
function Feet({ stroke = '#FBF6EE', sw = 1.8 }) {
  return (
    <g fill="none" stroke={stroke} strokeWidth={sw}>
      <ellipse cx="72" cy="120" rx="13" ry="22" />
      <ellipse cx="128" cy="120" rx="13" ry="22" />
      <circle cx="72" cy="92" r="4" fill={stroke} />
      <circle cx="128" cy="92" r="4" fill={stroke} />
    </g>
  )
}

const SHAPES = { lotus: Lotus, vasudhara: Vasudhara, chowki: Chowki, feet: Feet }

export default function Motif({ shape = 'lotus', size = 120, stroke, sw, className = '' }) {
  const Shape = SHAPES[shape] || Lotus
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className} role="img" aria-label={`${shape} motif`}>
      <Shape stroke={stroke} sw={sw} />
    </svg>
  )
}
