import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen">
      <Navigation />
      {children}
      <Footer />
    </main>
  )
}
