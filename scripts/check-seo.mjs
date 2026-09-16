import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const contentRoot = path.join(process.cwd(), 'content')
const staticRoutes = new Set(['/', '/about', '/aipan', '/contact', '/festivals', '/shop', '/traditions'])
const files = []

function collect(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) collect(file)
    else if (entry.name.endsWith('.mdx')) files.push(file)
  }
}

collect(contentRoot)

const articles = files.map((file) => {
  const pillar = path.basename(path.dirname(file))
  const slug = path.basename(file, '.mdx')
  const parsed = matter(fs.readFileSync(file, 'utf8'))
  return { file, route: `/${pillar}/${slug}`, data: parsed.data, body: parsed.content }
})

const routes = new Set([...staticRoutes, ...articles.map((article) => article.route)])
const errors = []
const seenTitles = new Map()

for (const article of articles) {
  const { data, file, route, body } = article
  const label = path.relative(process.cwd(), file)
  const title = data.seoTitle || ''
  const description = data.seoDescription || ''

  if (title.length < 30 || title.length > 60) errors.push(`${label}: seoTitle must be 30–60 characters (found ${title.length})`)
  if (description.length < 90 || description.length > 160) errors.push(`${label}: seoDescription must be 90–160 characters (found ${description.length})`)
  if (data.author !== 'Ashutosh') errors.push(`${label}: author must identify Ashutosh`)
  if (seenTitles.has(title)) errors.push(`${label}: duplicate seoTitle also used by ${seenTitles.get(title)}`)
  else seenTitles.set(title, label)

  for (const match of body.matchAll(/\]\((\/[^)\s]+)\)/g)) {
    const target = match[1].split(/[?#]/)[0].replace(/\/$/, '') || '/'
    if (!routes.has(target)) errors.push(`${label}: internal link target does not exist: ${match[1]}`)
  }

  if (!route.startsWith('/aipan/') && !route.startsWith('/festivals/') && !route.startsWith('/traditions/')) {
    errors.push(`${label}: unsupported content route ${route}`)
  }
}

if (errors.length) {
  console.error(`SEO check failed with ${errors.length} issue(s):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`SEO check passed: ${articles.length} articles, ${routes.size} known routes, unique titles, valid descriptions and internal links.`)
