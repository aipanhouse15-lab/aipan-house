import { getAll } from '@/lib/content'
import PillarList from '@/components/PillarList'
export const metadata = { title: 'Festivals of Uttarakhand', description: 'The festivals of the Kumaoni year — Harela, Phool Dei, Kumaoni Holi and more.' }
export default function Festivals() {
  return <PillarList title="Festivals of Uttarakhand" intro="The Kumaoni calendar turns on its festivals — sowing and harvest, spring and new year, each with its own rituals, songs and foods." pillar="festivals" items={getAll('festivals')} />
}
