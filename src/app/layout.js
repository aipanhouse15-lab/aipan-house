import './globals.css'
import Script from 'next/script'
import { SITE } from '@/lib/site'

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Aipan House — Kumaoni Art, Festivals & Heritage', template: '%s · Aipan House' },
  description: SITE.description,
  openGraph: { type: 'website', siteName: SITE.name, locale: 'en_IN', url: SITE.url, title: 'Aipan House — Kumaoni Art, Festivals & Heritage', description: SITE.description },
  twitter: { card: 'summary_large_image', title: 'Aipan House', description: SITE.description },
  robots: { index: true, follow: true },  // live & indexable
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-144.png', sizes: '144x144', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

const sameAs = Object.values(SITE.social || {}).filter(Boolean)
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: 'Aipan House',
  url: SITE.url,
  logo: { '@type': 'ImageObject', url: `${SITE.url}/icon-512.png` },
  description: SITE.description,
  address: { '@type': 'PostalAddress', addressLocality: 'Nainital', addressRegion: 'Uttarakhand', addressCountry: 'IN' },
  knowsAbout: ['Aipan art', 'Kumaoni festivals', 'Kumaon', 'Uttarakhand folk art', 'Harela', 'GI-certified crafts'],
  ...(sameAs.length ? { sameAs } : {}),
}
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  name: 'Aipan House',
  url: SITE.url,
  description: SITE.description,
  inLanguage: 'en-IN',
  publisher: { '@id': `${SITE.url}/#organization` },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts are @imported in globals.css, which chains css -> googleapis -> gstatic.
            Preconnecting shaves the handshake off that critical path. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-CTGHFB9Y82" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CTGHFB9Y82');`}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        {children}
      </body>
    </html>
  )
}
