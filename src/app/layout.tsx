import type { Metadata } from 'next'
import { Fraunces, Outfit } from 'next/font/google'
import './globals.css'

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  axes: ['SOFT', 'WONK', 'opsz'],
})

const body = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://codemakerclub.ro'),
  applicationName: 'Code Maker Club',
  title: {
    default: 'Code Maker Club Focșani — cursuri de programare pentru copii',
    template: '%s · Code Maker Club',
  },
  description:
    'Atelier de coding în Focșani: Scratch, Python, C++, HTML/CSS/JS, Arduino și robotică. Copiii învață prin proiecte, acasă și în clasă.',
  icons: {
    icon: [
      { url: '/logo-icon.png', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  appleWebApp: {
    capable: true,
    title: 'Code Maker Club',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    siteName: 'Code Maker Club',
    title: 'Code Maker Club Focșani',
    description: 'Cursuri de programare pentru copii — Focșani',
    images: [{ url: '/logo-icon.png', width: 618, height: 618, alt: 'Code Maker Club' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
