'use client'

import { motion } from 'framer-motion'

interface ProjectCardAgentProps {
  title: string
  description: string
  tags?: string[]
  tech?: string[]
  variant?: string
  highlighted?: boolean
  featured?: boolean
}

export function ProjectCardAgent({ title, description, tags, tech, variant, highlighted, featured }: ProjectCardAgentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
      className={`rounded-2xl border p-6 ${
        highlighted
          ? 'border-accent/50 bg-accent/5 shadow-lg shadow-accent/10'
          : 'border-glass-border bg-glass-tint backdrop-blur-sm'
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        {featured && (
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
            Featured
          </span>
        )}
        <span className="text-xs text-text-secondary capitalize">{variant}</span>
      </div>
      <h3 className="font-display text-lg font-semibold text-text-primary">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{description}</p>
      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-glass-border px-2.5 py-0.5 text-xs text-text-secondary">
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}
