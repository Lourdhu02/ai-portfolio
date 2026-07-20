import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lourdu Raju — Machine Learning Engineer',
  description: 'ML Engineer specializing in GenAI, Computer Vision, and Production ML systems. Building intelligent systems at scale.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
