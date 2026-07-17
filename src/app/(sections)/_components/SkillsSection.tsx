'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import skillsData from '@/content/skills.json'

gsap.registerPlugin(ScrollTrigger)

interface SkillItem {
  name: string
  proficiency: number
  category: string
  keywords: string[]
}

const CATEGORIES = [
  { id: 'frontend', label: 'Frontend', color: '#2F6FED' },
  { id: 'ai', label: 'AI/ML', color: '#7C5CFF' },
  { id: 'cloud', label: 'Cloud', color: '#059669' },
  { id: 'systems', label: 'Systems', color: '#D97706' },
  { id: 'design', label: 'Design', color: '#DB2777' },
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const bars = sectionRef.current?.querySelectorAll('.skill-bar-fill')
    if (!bars) return

    gsap.fromTo(
      bars,
      { width: '0%' },
      {
        width: '100%',
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '#section-skills',
          start: 'top 75%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <section
      id="section-skills"
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-4 py-32"
    >
      <div className="mb-16">
        <span className="mb-4 block text-sm font-medium text-accent">SKILLS</span>
        <h2 className="font-display text-4xl font-bold md:text-5xl">
          Technologies & expertise
        </h2>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        {CATEGORIES.map((cat) => {
          const skills = (skillsData as SkillItem[]).filter((s) => s.category === cat.id)
          return (
            <div key={cat.id}>
              <div className="mb-4 flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <h3 className="font-display text-lg font-semibold">{cat.label}</h3>
              </div>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-text-primary">
                        {skill.name}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-glass-border">
                      <div
                        className="skill-bar-fill h-full rounded-full"
                        style={{
                          width: '0%',
                          backgroundColor: cat.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
