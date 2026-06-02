import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  metadataBase: new URL('https://aipanhouse.com'),
  title: {
    default: 'Aipan House — Kumaoni Art, Culture & Heritage',
    template: '%s · Aipan House',
  },
  description:
    'The digital home of Kumaoni art, culture and heritage. The definitive English-language resource on Aipan folk art, the festivals of Uttarakhand, and the living traditions of the Kumaon Himalaya.',
  keywords: ['Aipan', 'Kumaoni art', 'Uttarakhand festivals', 'Kumaon', 'folk art', 'Aipan designs'],
  openGraph: {
    type: 'website',
    siteName: 'Aipan House',
    locale: 'en_IN',
  },
  robots: { index: false, follow: false }, // flip to true at launch
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="grain">
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
