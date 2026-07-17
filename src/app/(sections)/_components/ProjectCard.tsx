'use client'

import { motion } from 'framer-motion'
import type { Project } from '@/types/portfolio'

interface ProjectCardProps {
  project: Project
  index?: number
  onClick?: () => void
}

export function ProjectCard({ project, index = 0, onClick }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0, 0, 0.2, 1],
      }}
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-glass-border bg-glass-tint backdrop-blur-sm transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-xl"
    >
      <div className="gradient-accent flex h-48 items-center justify-center">
        <span className="font-display text-4xl text-white/30">
          {project.title.charAt(0)}
        </span>
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-center gap-2">
          {project.featured && (
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
              Featured
            </span>
          )}
          <span className="text-xs text-text-secondary">{project.category}</span>
        </div>
        <h3 className="font-display text-xl font-semibold text-text-primary">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-glass-border px-2.5 py-0.5 text-xs text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
