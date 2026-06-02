// Original Aipan motif SVGs + diagram visuals. All themeable.
// stroke defaults to rice-white for use on the geru/colored grounds.

function Lotus({ stroke = '#FBF6EE', sw = 1.8 }) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <g fill="none" stroke={stroke} strokeWidth={sw}>
      <g transform="translate(100 100)">
        {petals.map((d) => (
          <path key={d} d="M0,-12 C18,-44 18,-62 0,-76 C-18,-62 -18,-44 0,-12Z" transform={`rotate(${d})`} />
        ))}
        <circle r="9" /><circle r="3" fill={stroke} />
      </g>
    </g>
  )
}

// Eight-petalled lotus in a square frame with dot border + corner swastikas (Saraswati Chowki)
function ChowkiLotus({ stroke = '#FBF6EE', sw = 1.6 }) {
  const dots = (n, fx) => Array.from({ length: n }).map((_, i) => fx(i))
  const sw_ = sw
  const Swastika = ({ x, y }) => (
    <g transform={`translate(${x} ${y})`} stroke={stroke} strokeWidth={sw_ + 0.8}>
      <line x1="-9" y1="0" x2="9" y2="0" /><line x1="0" y1="-9" x2="0" y2="9" />
      <line x1="0" y1="-9" x2="6" y2="-9" /><line x1="9" y1="0" x2="9" y2="6" />
      <line x1="0" y1="9" x2="-6" y2="9" /><line x1="-9" y1="0" x2="-9" y2="-6" />
    </g>
  )
  return (
    <g>
      {dots(11, (i) => <circle key={`t${i}`} cx={10 + i * 18} cy={10} r="2.4" fill={stroke} opacity="0.85" />)}
      {dots(11, (i) => <circle key={`b${i}`} cx={10 + i * 18} cy={190} r="2.4" fill={stroke} opacity="0.85" />)}
      {dots(11, (i) => <circle key={`l${i}`} cx={10} cy={10 + i * 18} r="2.4" fill={stroke} opacity="0.85" />)}
      {dots(11, (i) => <circle key={`r${i}`} cx={190} cy={10 + i * 18} r="2.4" fill={stroke} opacity="0.85" />)}
      <rect x="24" y="24" width="152" height="152" fill="none" stroke={stroke} strokeWidth={sw} opacity="0.55" />
      <rect x="44" y="44" width="112" height="112" fill="none" stroke={stroke} strokeWidth={sw} opacity="0.7" />
      <Swastika x={34} y={34} /><Swastika x={166} y={34} /><Swastika x={34} y={166} /><Swastika x={166} y={166} />
      <g transform="translate(100 100)" fill="none" stroke={stroke} strokeWidth={sw}>
        {[0,45,90,135,180,225,270,315].map((a)=>(
          <ellipse key={a} cx={Math.cos(a*Math.PI/180)*30} cy={Math.sin(a*Math.PI/180)*30} rx="7" ry="15" transform={`rotate(${a} ${Math.cos(a*Math.PI/180)*30} ${Math.sin(a*Math.PI/180)*30})`} opacity="0.85"/>
        ))}
        {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map((a)=>(
          <ellipse key={a} cx={Math.cos(a*Math.PI/180)*18} cy={Math.sin(a*Math.PI/180)*18} rx="5" ry="10" transform={`rotate(${a} ${Math.cos(a*Math.PI/180)*18} ${Math.sin(a*Math.PI/180)*18})`} opacity="0.6"/>
        ))}
        <circle r="7" /><circle r="3" fill={stroke} />
      </g>
    </g>
  )
}

// Lakshmi Pad — two divine footprints with lotus rings + swastikas
function Feet({ stroke = '#FBF6EE', sw = 1.8 }) {
  const Foot = ({ cx }) => (
    <g fill={stroke}>
      <ellipse cx={cx} cy="125" rx="14" ry="10" opacity="0.92" />
      <ellipse cx={cx} cy="112" rx="10" ry="13" opacity="0.92" />
      <ellipse cx={cx} cy="100" rx="12.5" ry="9" opacity="0.92" />
      <ellipse cx={cx-9} cy="90" rx="4.5" ry="5" opacity="0.92" />
      <ellipse cx={cx-4} cy="86" rx="4" ry="4.5" opacity="0.92" />
      <ellipse cx={cx+1} cy="85" rx="4" ry="4.5" opacity="0.92" />
      <ellipse cx={cx+6} cy="87" rx="3.5" ry="4" opacity="0.92" />
      <ellipse cx={cx+10} cy="90" rx="3" ry="3.5" opacity="0.92" />
    </g>
  )
  return (
    <g>
      {Array.from({length:11}).map((_,i)=><circle key={`t${i}`} cx={10+i*18} cy={10} r="2.4" fill={stroke} opacity="0.85"/>)}
      {Array.from({length:11}).map((_,i)=><circle key={`b${i}`} cx={10+i*18} cy={190} r="2.4" fill={stroke} opacity="0.85"/>)}
      <rect x="22" y="22" width="156" height="156" fill="none" stroke={stroke} strokeWidth={sw} opacity="0.55"/>
      <g fill="none" stroke={stroke} strokeWidth={sw}>
        {[65,135].map((cx)=>[0,45,90,135,180,225,270,315].map((a)=>(
          <ellipse key={`${cx}-${a}`} cx={cx+Math.cos(a*Math.PI/180)*30} cy={105+Math.sin(a*Math.PI/180)*30} rx="6" ry="11" transform={`rotate(${a} ${cx+Math.cos(a*Math.PI/180)*30} ${105+Math.sin(a*Math.PI/180)*30})`} opacity="0.45"/>
        )))}
      </g>
      <Foot cx={65} /><Foot cx={135} />
    </g>
  )
}

// Vasudhara — flowing lines of abundance
function Vasudhara({ stroke = '#FBF6EE', sw = 4 }) {
  return (
    <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round">
      {[40,70,100,130,160].map((x)=><path key={x} d={`M${x},35 q14,40 0,80 q-14,40 0,50`}/>)}
    </g>
  )
}

// Swastika — single, clockwise
function Swastika({ stroke = '#FBF6EE', sw = 5 }) {
  return (
    <g transform="translate(100 100)" stroke={stroke} strokeWidth={sw} strokeLinecap="square" fill="none">
      <line x1="-50" y1="0" x2="50" y2="0" /><line x1="0" y1="-50" x2="0" y2="50" />
      <line x1="0" y1="-50" x2="34" y2="-50" /><line x1="50" y1="0" x2="50" y2="34" />
      <line x1="0" y1="50" x2="-34" y2="50" /><line x1="-50" y1="0" x2="-50" y2="-34" />
    </g>
  )
}

// Dot-grid / bindu structure (the layout skeleton of a chowki)
function DotGrid({ stroke = '#FBF6EE', sw = 1.4 }) {
  const pts = []
  for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) pts.push([30 + c * 23, 30 + r * 23])
  return (
    <g>
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.6" fill={stroke} opacity="0.8" />)}
      <path d="M30,100 L100,30 L170,100 L100,170 Z" fill="none" stroke={stroke} strokeWidth={sw} opacity="0.6" />
      <circle cx="100" cy="100" r="8" fill="none" stroke={stroke} strokeWidth={sw} />
    </g>
  )
}

// Sun / Sur Mandir style radial (music, Saraswati)
function SurMandir({ stroke = '#FBF6EE', sw = 1.8 }) {
  return (
    <g transform="translate(100 100)" fill="none" stroke={stroke} strokeWidth={sw}>
      <circle r="20" /><circle r="34" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * 2 * Math.PI
        return <line key={i} x1={Math.cos(a) * 36} y1={Math.sin(a) * 36} x2={Math.cos(a) * 64} y2={Math.sin(a) * 64} />
      })}
      <circle r="70" strokeDasharray="3 5" opacity="0.6" />
    </g>
  )
}

// Flower / Phool Dei blossom cluster
function Blossom({ stroke = '#FBF6EE', sw = 1.8 }) {
  const Flower = ({ x, y, s = 1 }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke={stroke} strokeWidth={sw}>
      {[0,60,120,180,240,300].map((a)=>(
        <ellipse key={a} cx={Math.cos(a*Math.PI/180)*13} cy={Math.sin(a*Math.PI/180)*13} rx="6" ry="11" transform={`rotate(${a} ${Math.cos(a*Math.PI/180)*13} ${Math.sin(a*Math.PI/180)*13})`}/>
      ))}
      <circle r="5" fill={stroke} />
    </g>
  )
  return <g><Flower x={100} y={70} s={1.1} /><Flower x={62} y={130} s={0.8} /><Flower x={140} y={130} s={0.8} /></g>
}

const SHAPES = {
  lotus: Lotus, chowkiLotus: ChowkiLotus, chowki: ChowkiLotus, feet: Feet,
  vasudhara: Vasudhara, swastika: Swastika, dotgrid: DotGrid, surmandir: SurMandir, blossom: Blossom,
}

export default function Motif({ shape = 'lotus', size = 120, stroke, sw, className = '' }) {
  const Shape = SHAPES[shape] || Lotus
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className} role="img" aria-label={`${shape} motif`}>
      <Shape stroke={stroke} sw={sw} />
    </svg>
  )
}
