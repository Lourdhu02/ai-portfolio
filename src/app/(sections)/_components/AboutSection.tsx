import { ExperienceTimeline } from './ExperienceTimeline'
import profile from '@/content/profile.json'

export function AboutSection() {
  return (
    <section
      id="section-about"
      className="relative mx-auto max-w-6xl px-4 py-32"
    >
      <div className="mb-20">
        <span className="mb-4 block text-sm font-medium text-accent">ABOUT</span>
        <h2 className="font-display text-4xl font-bold md:text-5xl">
          Building at the intersection
          <br />
          <span className="text-text-secondary">of AI and experience</span>
        </h2>
      </div>

      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <p className="text-lg leading-relaxed text-text-secondary">
            {profile.bio}
          </p>
          <div className="mt-8 flex gap-4">
            {profile.social.github && (
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
              >
                GitHub →
              </a>
            )}
            {profile.social.linkedin && (
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
              >
                LinkedIn →
              </a>
            )}
          </div>
        </div>
        <ExperienceTimeline />
      </div>
    </section>
  )
}
