import type { Metadata } from 'next'
import { Inter, DM_Mono } from 'next/font/google'
import { LayoutClient } from '@/components/layout-client'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://lourdhu.vercel.app'),
  title: 'Lourdu Raju — Machine Learning Engineer',
  description:
    'ML Engineer specializing in GenAI, Computer Vision, and Production ML systems. Building systems that observe, reason, and respond at scale.',
  openGraph: {
    title: 'Lourdu Raju — Machine Learning Engineer',
    description:
      'ML Engineer specializing in GenAI, Computer Vision, and Production ML systems. Building systems that observe, reason, and respond at scale.',
    url: 'https://lourdhu.vercel.app',
    siteName: 'Lourdu Raju',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lourdu Raju — Machine Learning Engineer',
    description:
      'ML Engineer specializing in GenAI, Computer Vision, and Production ML systems.',
  },
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmMono.variable}`}>
      <body className="antialiased">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
