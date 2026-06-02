import { MDXRemote } from 'next-mdx-remote/rsc'
import { LakshmiPad, Padma, SaraswatiChowki, Vasudhara } from './Motifs'

const components = { LakshmiPad, Padma, SaraswatiChowki, Vasudhara }

export default function Mdx({ source }) {
  return (
    <div className="prose-aipan">
      <MDXRemote source={source} components={components} />
    </div>
  )
}
