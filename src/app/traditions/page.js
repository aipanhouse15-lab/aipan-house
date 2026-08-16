import { getAll } from '@/lib/content'
import PillarList from '@/components/PillarList'
// No articles published yet — noindex until the first ones ship, so this doesn't
// register as a thin page. Remove `robots` and re-add to sitemap.js when content lands.
export const metadata = {
  alternates: { canonical: '/traditions' },
  title: 'Kumaoni Life & Traditions',
  description: 'The food, attire, music and language of everyday Kumaoni life.',
  robots: { index: false, follow: true },
}
export default function Traditions() {
  return <PillarList title="Kumaoni Life & Traditions" intro="Beyond art and festivals — the food, dress, music and language that make up everyday Kumaoni life." pillar="traditions" items={getAll('traditions')} />
}
