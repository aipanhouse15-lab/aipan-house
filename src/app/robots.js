import { SITE } from '@/lib/site'

// Allow all crawlers, including AI/LLM bots. Sitemap points crawlers to all pages.
// To block everything pre-launch, set `disallow: '/'` in the rules below.
export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // AI / LLM crawlers — explicitly welcomed
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
