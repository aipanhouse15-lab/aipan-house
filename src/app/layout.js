import './globals.css'
import { SITE } from '@/lib/site'

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Aipan House — Kumaoni Art, Festivals & Heritage', template: '%s · Aipan House' },
  description: SITE.description,
  openGraph: { type: 'website', siteName: SITE.name, locale: 'en_IN', url: SITE.url, title: 'Aipan House — Kumaoni Art, Festivals & Heritage', description: SITE.description },
  twitter: { card: 'summary_large_image', title: 'Aipan House', description: SITE.description },
  alternates: { canonical: SITE.url },
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
