import { MDXRemote } from 'next-mdx-remote/rsc'
import Motif from './Motif'

function slug(children) {
  return String(Array.isArray(children) ? children.join('') : children)
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
function Figure({ shape = 'vasudhara', caption, accent = '#9E2B1E' }) {
  return (
    <figure>
      <span className="inline-block rounded-[10px] p-6" style={{ background: accent }}>
        <Motif shape={shape} size={140} stroke="#FBFDF8" sw={4} />
      </span>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
function Callout({ children }) { return <div className="callout">{children}</div> }

export default function Mdx({ source, accent }) {
  const components = {
    Figure: (p) => <Figure {...p} accent={accent} />,
    Callout, Motif,
    h2: ({ children }) => <h2 id={slug(children)}>{children}</h2>,
    h3: ({ children }) => <h3 id={slug(children)}>{children}</h3>,
  }
  return <div className="prose-article"><MDXRemote source={source} components={components} /></div>
}
