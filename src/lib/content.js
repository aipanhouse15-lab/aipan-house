import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// Read all .mdx files in a pillar directory, return sorted metadata + body
export function getAllInPillar(pillar) {
  const dir = path.join(CONTENT_DIR, pillar)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(dir, file), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug,
        pillar,
        ...data,
        readingTime: readingTime(content).text,
        content,
      }
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

export function getBySlug(pillar, slug) {
  const file = path.join(CONTENT_DIR, pillar, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  return { slug, pillar, ...data, readingTime: readingTime(content).text, content }
}

export function getSlugs(pillar) {
  const dir = path.join(CONTENT_DIR, pillar)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''))
}

// Festivals sorted by calendar month for the hub
const MONTH_ORDER = { Jan:1, Feb:2, Mar:3, Apr:4, May:5, Jun:6, Jul:7, Aug:8, Sep:9, Oct:10, Nov:11, Dec:12 }
export function getFestivalsByCalendar() {
  return getAllInPillar('festivals').sort(
    (a, b) => (MONTH_ORDER[a.month] ?? 13) - (MONTH_ORDER[b.month] ?? 13)
  )
}
