'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { projectList } from '@/data/projects'
import { cardVariants, hoverGlow, hoverLift, pageVariants, pressTap, staggerContainer } from '@/lib/motion'

const MotionLink = motion.create(Link)

export default function Work() {
  return (
    <div className="bg-bg">
      <motion.section
        className="w-full px-8 md:px-16 lg:px-24 pt-28 pb-12 md:pt-36 md:pb-16"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-3xl">
          <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-4">
            Portfolio
          </p>
          <h1 className="font-display text-heading-1 font-semibold tracking-tight text-text mb-4">
            Selected work
          </h1>
          <p className="text-text-secondary leading-relaxed max-w-xl text-lg">
            Production systems built at the intersection of research rigor and engineering
            discipline. Each card below is a case study, not just a project tile.
          </p>
        </div>
      </motion.section>

      <section className="border-t border-border bg-bg-alt/30">
        <div className="w-full px-8 md:px-16 lg:px-24 py-16 md:py-24">
          <motion.div
            className="grid gap-4 lg:grid-cols-2"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {projectList.map((project, i) => (
              <MotionLink
                key={project.slug}
                href={`/projects/${project.slug}`}
                variants={cardVariants}
                whileHover={{ ...hoverLift, ...hoverGlow }}
                whileTap={pressTap}
                className="group relative overflow-hidden border border-border bg-bg p-6 md:p-7 text-left"
              >
                <div className="flex items-start justify-between gap-6 mb-6">
                  <div>
                    <p className="font-mono text-xs text-text-tertiary tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-text-tertiary mt-2">
                      {project.year}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    Open case study
                  </span>
                </div>

                <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-text group-hover:text-accent transition-colors duration-150">
                  {project.title}
                </h2>
                <p className="text-sm text-text-secondary mt-2 max-w-2xl">
                  {project.subtitle}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed mt-4 max-w-2xl">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] text-text-tertiary border border-border px-2.5 py-1 bg-bg-alt/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="border border-border bg-bg-alt/60 p-3">
                      <p className="font-mono text-[11px] text-text-tertiary uppercase tracking-wider">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-sm text-text font-medium">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </MotionLink>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
