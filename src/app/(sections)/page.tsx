import { CinematicIntro } from './_components/CinematicIntro'
import { Navigation } from './_components/Navigation'
import { AboutSection } from './_components/AboutSection'
import { SkillsSection } from './_components/SkillsSection'
import { ProjectShowcase } from './_components/ProjectShowcase'
import { ContactSection } from './_components/ContactSection'
import { Footer } from './_components/Footer'

export default function SectionsPage() {
  return (
    <main>
      <Navigation />
      <CinematicIntro />
      <AboutSection />
      <SkillsSection />
      <ProjectShowcase />
      <ContactSection />
      <Footer />
    </main>
  )
}
