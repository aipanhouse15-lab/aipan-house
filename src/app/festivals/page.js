import { getAll } from '@/lib/content'
import PillarList from '@/components/PillarList'
import Link from 'next/link'

export const metadata = {
  alternates: { canonical: '/festivals' },
  title: { absolute: 'Festivals of Uttarakhand: Kumaoni Calendar and Dates' },
  description:
    'Dates and traditions for Harela, Nanda Ashtami, Ghee Sankranti, Phool Dei, Kumaoni Holi and other festivals of Kumaon.',
}

export default function Festivals() {
  return (
    <PillarList
      title="Festivals of Uttarakhand"
      intro="The Kumaoni calendar turns on its festivals — sowing and harvest, spring and new year, each with its own rituals, songs and foods."
      pillar="festivals"
      items={getAll('festivals')}
    >
      <p className="max-w-[68ch] font-body text-base leading-relaxed text-[#4a463d]">
        Looking for dates rather than a particular festival? The{' '}
        <Link href="/festivals/kumaoni-calendar" className="underline decoration-[#c9a06a] underline-offset-2 hover:text-geru">
          Kumaoni festival calendar 2026–27
        </Link>{' '}
        lists the whole year in one table — Harela to Harela — with every date, the Kumaoni month it falls in, and the Aipan
        pattern drawn for each occasion.
      </p>
    </PillarList>
  )
}
