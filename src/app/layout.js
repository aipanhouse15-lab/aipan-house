import './globals.css'

export const metadata = {
  metadataBase: new URL('https://aipanhouse.com'),
  title: { default: 'Aipan House — Kumaoni Art, Festivals & Heritage', template: '%s · Aipan House' },
  description:
    'The home of Kumaoni art, festivals and heritage — the folk art of Aipan, the festivals of Uttarakhand, and the living traditions of the Kumaon Himalaya.',
  openGraph: { type: 'website', siteName: 'Aipan House', locale: 'en_IN' },
  robots: { index: false, follow: false }, // flip at launch
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
