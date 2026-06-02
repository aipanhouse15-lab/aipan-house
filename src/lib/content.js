import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const DIR = path.join(process.cwd(), 'content')

export function getAll(pillar) {
  const dir = path.join(DIR, pillar)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'))
    return { slug, pillar, ...data, readingTime: readingTime(content).text, content }
  }).sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

export function getOne(pillar, slug) {
  const file = path.join(DIR, pillar, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, 'utf8'))
  return { slug, pillar, ...data, readingTime: readingTime(content).text, content }
}

export function getSlugs(pillar) {
  const dir = path.join(DIR, pillar)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''))
}

// festivals keyed to Kumaoni month index for the almanac wheel
export function festivalByMonth() {
  const fests = getAll('festivals')
  const map = {}
  fests.forEach((f) => { if (f.monthIndex != null) map[f.monthIndex] = f })
  return map
}
