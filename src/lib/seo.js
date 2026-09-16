import { AUTHOR } from './site'

export function articleMetadata(article, pillar) {
  const path = `/${pillar}/${article.slug}`
  const title = article.seoTitle || article.title
  const description = article.seoDescription || article.excerpt
  const publishedTime = article.published
  const modifiedTime = article.updated || article.published

  return {
    // Use an absolute title so the root template does not turn concise SERP titles
    // back into long titles by appending the site name.
    title: { absolute: title },
    description,
    authors: [{ name: AUTHOR.name, url: AUTHOR.path }],
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: 'article',
      url: path,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      authors: [AUTHOR.name],
      ...(article.hero ? { images: [{ url: article.hero, alt: article.heroAlt || article.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(article.hero ? { images: [article.hero] } : {}),
    },
  }
}
