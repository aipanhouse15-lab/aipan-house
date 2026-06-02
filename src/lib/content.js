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

// Extract FAQ Q&A pairs from the MDX body (### under the "## FAQ" section)
export function extractFaqs(content) {
  if (!content) return []
  const faqIdx = content.search(/^##\s+FAQ\s*$/m)
  if (faqIdx === -1) return []
  const section = content.slice(faqIdx)
  const faqs = []
  // match ### question then the text until the next ### or ## or end
  const re = /^###\s+(.+?)\s*$([\s\S]*?)(?=^###\s|^##\s|\Z)/gm
  let m
  while ((m = re.exec(section)) !== null) {
    const q = m[1].trim()
    // first non-empty paragraph as the answer, strip markdown links/emphasis
    const ans = m[2]
      .split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean)[0] || ''
    const clean = ans
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/[*_`]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    if (q && clean) faqs.push({ q, a: clean })
  }
  return faqs
}
