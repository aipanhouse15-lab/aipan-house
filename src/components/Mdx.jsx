import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import Motif from './Motif'
import { Plate, TwoUp, Step, MotifRow, Timeline } from './Visual'

function slug(children) {
  return String(Array.isArray(children) ? children.join('') : children)
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
function Figure({ shape = 'vasudhara', caption, label, accent = '#9E2B1E' }) {
  return <Plate shape={shape} caption={caption} label={label} accent={accent} />
}
function Callout({ children }) { return <div className="callout">{children}</div> }

export default function Mdx({ source, accent }) {
  const withAccent = (C) => (p) => <C {...p} accent={accent} />
  const components = {
    Figure: (p) => <Figure {...p} accent={accent} />,
    Plate: withAccent(Plate),
    TwoUp: withAccent(TwoUp),
    Step: withAccent(Step),
    MotifRow: withAccent(MotifRow),
    Timeline: withAccent(Timeline),
    Callout, Motif,
    h2: ({ children }) => <h2 id={slug(children)}>{children}</h2>,
    h3: ({ children }) => <h3 id={slug(children)}>{children}</h3>,
  }
  return <div className="prose-article"><MDXRemote source={source} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} /></div>
}
