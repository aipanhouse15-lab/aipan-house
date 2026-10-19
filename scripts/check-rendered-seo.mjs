import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

// Run after a production build: inspect actual HTML, not just frontmatter promises.
const BASE = 'https://www.aipanhouse.com'
const build = path.join(process.cwd(), '.next/server/app')
const errors = []
const metadata = JSON.parse(fs.readFileSync('src/lib/image-metadata.json', 'utf8'))
const pages = ['/', '/aipan', '/festivals', '/about', '/contact', '/traditions']
const articleRoutes = new Set()
for (const pillar of ['aipan', 'festivals', 'traditions']) {
  const dir = path.join('content', pillar)
  if (!fs.existsSync(dir)) continue
  for (const file of fs.readdirSync(dir).filter((name) => name.endsWith('.mdx'))) {
    const route = `/${pillar}/${file.slice(0, -4)}`
    articleRoutes.add(route)
    pages.push(route)
  }
}
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]))
let imagesChecked = 0
for (const route of pages) {
  const file = path.join(build, route === '/' ? 'index.html' : `${route.slice(1)}.html`)
  if (!fs.existsSync(file)) {
    errors.push(`${route}: built HTML missing; run npm run build first.`)
    continue
  }
  const fullHtml = fs.readFileSync(file, 'utf8')
  const html = fullHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map((match) => attributes(match[0]))
  const canonical = links.filter((link) => link.rel === 'canonical')
  if (canonical.length !== 1 || canonical[0].href !== BASE + (route === '/' ? '' : route)) {
    errors.push(`${route}: expected exactly one self-referencing canonical.`)
  }
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map((match) => attributes(match[0]))
  const robots = metas.filter((meta) => meta.name === 'robots').map((meta) => meta.content).join(',')
  const emptyTraditions = route === '/traditions' && ![...articleRoutes].some((item) => item.startsWith('/traditions/'))
  if (emptyTraditions ? !robots.includes('noindex') : robots.includes('noindex')) {
    errors.push(`${route}: unexpected robots value: ${robots}`)
  }
  if ((html.match(/<h1\b/g) || []).length !== 1) errors.push(`${route}: expected one H1.`)
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]))
  for (const match of html.matchAll(/href="#([^"]+)"/g)) {
    if (!ids.has(match[1])) errors.push(`${route}: broken rendered section link #${match[1]}`)
  }
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    const image = attributes(match[0])
    if (!image.src?.startsWith('/images/')) continue
    imagesChecked++
    if (!image.alt) errors.push(`${route}: image missing alt text: ${image.src}`)
    if (!(Number(image.width) > 0 && Number(image.height) > 0)) errors.push(`${route}: image dimensions missing: ${image.src}`)
    if (!metadata[image.src]) errors.push(`${route}: image dimensions not recorded: ${image.src}`)
  }
  if (articleRoutes.has(route)) {
    const schemas = [...fullHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]))
    const article = schemas.find((schema) => schema['@type'] === 'Article')
    if (article?.mainEntityOfPage?.['@id'] !== BASE + route) errors.push(`${route}: Article schema URL is incorrect.`)
    const parts = route.split('/')
    const data = matter(fs.readFileSync(path.join('content', parts[1], parts[2] + '.mdx'), 'utf8')).data
    if (article?.dateModified !== (data.updated || data.published)) errors.push(`${route}: schema update date differs from content.`)
  }
}
const sitemapFile = path.join(build, 'sitemap.xml.body')
if (!fs.existsSync(sitemapFile)) errors.push('Built sitemap missing.')
else {
  const sitemap = fs.readFileSync(sitemapFile, 'utf8')
  const entries = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  for (const route of articleRoutes) if (!entries.includes(BASE + route)) errors.push(`${route}: missing from sitemap.`)
  if (new Set(entries).size !== entries.length) errors.push('Sitemap contains duplicate URLs.')
  if (![...articleRoutes].some((route) => route.startsWith('/traditions/')) && entries.includes(BASE + '/traditions')) errors.push('Empty noindex Traditions hub is in the sitemap.')
}
if (errors.length) {
  console.error(`Rendered SEO check failed with ${errors.length} issue(s):\n${errors.map((error) => '- ' + error).join('\n')}`)
  process.exit(1)
}
console.log(`Rendered SEO check passed: ${pages.length} pages, ${imagesChecked} images, canonicals, robots, H1s, section links, Article schema and sitemap.`)
