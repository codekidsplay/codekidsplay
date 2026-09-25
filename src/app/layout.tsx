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
  title: 'Code Kids Play Focșani — cursuri de programare pentru copii',
  description:
    'Atelier de coding în Focșani: Scratch, Python, C++, HTML/CSS/JS, Arduino și robotică. Copiii învață prin proiecte, acasă și în clasă.',
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
