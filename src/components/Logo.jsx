// Aipan House — Kumaon ridgeline mark.
// variant: 'primary' (layered red on light), 'reverse' (cream on dark/colored),
//          'mono' (single-colour outline, small sizes / stamps)

export default function Logo({ variant = 'primary', size = 34, className = '' }) {
  const common = { width: size, height: size, viewBox: '0 0 100 100', className, role: 'img', 'aria-label': 'Aipan House' }

  if (variant === 'mono') {
    // single colour = currentColor; outline hills
    return (
      <svg {...common} fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="46" strokeWidth="3" />
        <circle cx="64" cy="37" r="6" strokeWidth="2.4" />
        <path d="M18,62 L34,46 L46,56 L60,42 L74,58 L82,51" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M24,68 L40,56 L52,64 L66,54 L80,64" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" opacity="0.55" />
      </svg>
    )
  }

  if (variant === 'reverse') {
    // cream hills + gold sun, for geru / slate / coloured grounds
    return (
      <svg {...common}>
        <circle cx="50" cy="50" r="46" fill="none" stroke="#FBF6EE" strokeWidth="3" />
        <circle cx="64" cy="38" r="7" fill="#E0A04A" />
        <path d="M16,58 L32,44 L44,54 L60,38 L76,56 L84,48 L84,72 L16,72Z" fill="#FBF6EE" opacity="0.85" />
        <path d="M16,66 L30,56 L46,66 L62,54 L78,66 L84,60 L84,72 L16,72Z" fill="#FBF6EE" />
      </svg>
    )
  }

  // primary — layered two-tone red hills, gold sun, geru ring
  return (
    <svg {...common}>
      <circle cx="50" cy="50" r="46" fill="none" stroke="#9E2B1E" strokeWidth="3" />
      <circle cx="64" cy="36" r="7" fill="#E0A04A" />
      <path d="M16,58 L32,44 L44,54 L60,38 L76,56 L84,48 L84,72 L16,72Z" fill="#C9472E" />
      <path d="M16,66 L30,56 L46,66 L62,54 L78,66 L84,60 L84,72 L16,72Z" fill="#9E2B1E" />
    </svg>
  )
}
