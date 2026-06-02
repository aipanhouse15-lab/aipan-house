import { getAll } from '@/lib/content'
import PillarList from '@/components/PillarList'
export const metadata = { title: 'Aipan — The Folk Art of Kumaon', description: 'The definitive guide to Aipan: origins, motifs decoded, and the geru-and-rice technique of Uttarakhand\'s sacred folk art.' }
export default function Aipan() {
  return <PillarList title="Aipan" intro="The ritual folk art of Kumaon — white rice paste on a red geru ground, at every threshold and auspicious occasion. Every motif and method, decoded." pillar="aipan" items={getAll('aipan')} />
}
