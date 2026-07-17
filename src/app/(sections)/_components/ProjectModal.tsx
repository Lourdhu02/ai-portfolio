'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/types/portfolio'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-8"
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold">
                  {project.title}
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  {project.category}
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors duration-150 hover:bg-glass-border hover:text-text-primary"
              >
                ✕
              </button>
            </div>

            <div className="gradient-accent mb-6 flex h-48 items-center justify-center rounded-xl">
              <span className="font-display text-5xl text-white/20">
                {project.title.charAt(0)}
              </span>
            </div>

            <p className="leading-relaxed text-text-secondary">
              {project.longDescription || project.description}
            </p>

            <div className="mt-6">
              <h4 className="mb-2 text-sm font-semibold text-text-primary">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-150 ease-out hover:scale-105"
                >
                  View Source →
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gradient-accent rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-all duration-150 ease-out hover:scale-105"
                >
                  Live Demo →
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
