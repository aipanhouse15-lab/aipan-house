import { getAll } from '@/lib/content'
import PillarList from '@/components/PillarList'
export const metadata = { alternates: { canonical: '/traditions' }, title: 'Kumaoni Life & Traditions', description: 'The food, attire, music and language of everyday Kumaoni life.' }
export default function Traditions() {
  return <PillarList title="Kumaoni Life & Traditions" intro="Beyond art and festivals — the food, dress, music and language that make up everyday Kumaoni life." pillar="traditions" items={getAll('traditions')} />
}
