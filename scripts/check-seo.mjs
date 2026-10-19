import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { createRequire } from 'node:module'
import { collectImageMetadata } from './update-image-metadata.mjs'

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
const articleByRoute = new Map(articles.map((article) => [article.route, article]))
const imageMetadata = JSON.parse(fs.readFileSync('src/lib/image-metadata.json', 'utf8'))
const actualImageMetadata = collectImageMetadata()
const imageManifest = JSON.parse(fs.readFileSync('src/lib/image-manifest.json', 'utf8'))
const require = createRequire(import.meta.url)
const redirects = await require(path.join(process.cwd(), 'next.config.js')).redirects()

function headingIds(body) {
  return new Set([...body.matchAll(/^#{2,3}\s+(.+)$/gm)].map((match) => match[1]
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')))
}

function checkLink(href, article, label) {
  if (!href.startsWith('/') && !href.startsWith('#')) return
  if (href.startsWith('//')) return
  const parsed = new URL(href, `https://www.aipanhouse.com${article.route}`)
  const target = parsed.pathname.replace(/\/$/, '') || '/'
  if (!routes.has(target)) errors.push(`${label}: internal link target does not exist: ${href}`)
  const targetArticle = articleByRoute.get(target)
  if (parsed.hash && targetArticle && !headingIds(targetArticle.body).has(parsed.hash.slice(1))) {
    errors.push(`${label}: section link target does not exist: ${href}`)
  }
}

for (const [src, size] of Object.entries(actualImageMetadata)) {
  if (JSON.stringify(imageMetadata[src]) !== JSON.stringify(size)) {
    errors.push(`Image dimensions missing or stale: ${src}. Run npm run images:metadata.`)
  }
}
for (const [base, widths] of Object.entries(imageManifest)) {
  for (const width of widths) {
    if (!fs.existsSync(path.join('public/images', `${base}-${width}.webp`))) {
      errors.push(`Responsive image derivative is missing: ${base}-${width}.webp`)
    }
  }
}
const redirectSources = new Set()
for (const redirect of redirects) {
  if (redirectSources.has(redirect.source)) errors.push(`Duplicate redirect: ${redirect.source}`)
  redirectSources.add(redirect.source)
  if (redirect.source === redirect.destination) errors.push(`Redirect points to itself: ${redirect.source}`)
  if (!routes.has(redirect.destination)) errors.push(`Redirect destination does not exist: ${redirect.destination}`)
}

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

  for (const match of body.matchAll(/\]\(([^)\s]+)\)/g)) checkLink(match[1], article, label)
  for (const match of body.matchAll(/\bhref=["']([^"']+)["']/g)) checkLink(match[1], article, label)
  const ids = headingIds(body)
  for (const item of data.toc || []) {
    if (!ids.has(item.id)) errors.push(`${label}: TOC section does not exist: #${item.id}`)
  }
  const images = [data.hero, ...[...body.matchAll(/\b(?:src|aSrc|bSrc)=["']([^"']+)["']/g)].map((match) => match[1])].filter(Boolean)
  for (const src of images) {
    if (!src.startsWith('/')) continue
    if (!fs.existsSync(path.join('public', src))) errors.push(`${label}: image does not exist: ${src}`)
    if (!imageMetadata[src]) errors.push(`${label}: image has no recorded dimensions: ${src}`)
  }
  for (const image of body.matchAll(/<img\b[^>]*>/g)) {
    if (!/\bwidth=/.test(image[0]) || !/\bheight=/.test(image[0])) {
      errors.push(`${label}: raw <img> needs width/height; use <Photo> for managed images.`)
    }
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

console.log(`SEO source check passed: ${articles.length} articles, ${routes.size} routes, valid titles, links, section IDs, images and ${redirects.length} redirects.`)
