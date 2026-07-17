'use client'

import { motion } from 'framer-motion'
import { useScrollProgress } from '@/hooks/useScrollProgress'

const EXPERIENCES = [
  {
    id: '1',
    role: 'Senior AI Engineer',
    company: 'Tech Corp',
    period: '2024 — Present',
    description: 'Leading AI systems architecture and RAG pipeline design.',
  },
  {
    id: '2',
    role: 'Full-Stack Developer',
    company: 'StartupXYZ',
    period: '2022 — 2024',
    description: 'Built interactive web platforms with React, Next.js, and AI integration.',
  },
  {
    id: '3',
    role: 'Frontend Engineer',
    company: 'Digital Agency',
    period: '2020 — 2022',
    description: 'Developed cinematic web experiences with GSAP and Framer Motion.',
  },
  {
    id: '4',
    role: 'BSc Computer Science',
    company: 'University',
    period: '2016 — 2020',
    description: 'Focus on AI, distributed systems, and human-computer interaction.',
  },
]

export function ExperienceTimeline() {
  const progress = useScrollProgress('section-about')

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-px bg-glass-border" />
      <div
        className="absolute left-4 top-0 w-px gradient-accent transition-all duration-300"
        style={{ height: `${Math.min(100, progress * 100)}%` }}
      />
      <div className="space-y-12">
        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: [0, 0, 0.2, 1] }}
            className="relative pl-12"
          >
            <div className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-surface-base" />
            <span className="text-xs font-medium text-accent">{exp.period}</span>
            <h3 className="mt-1 font-display text-lg font-semibold">
              {exp.role}
            </h3>
            <p className="text-sm text-text-secondary">{exp.company}</p>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
