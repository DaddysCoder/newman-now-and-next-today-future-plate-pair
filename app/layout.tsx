import type { Metadata, Viewport } from 'next'
import { Manrope, Spectral } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-spectral',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Newman: Now and Next',
    template: '%s — Newman: Now and Next',
  },
  description:
    'Explore future proposals being considered for Newman by the Shire of East Pilbara.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#140c06',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-AU"
      className={`${manrope.variable} ${spectral.variable} bg-background`}
    >
      <body className="font-sans">{children}</body>
    </html>
  )
}
