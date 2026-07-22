'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'motion/react'
import { projects } from '@/data/projects'
import { cardVariants, hoverGlow, hoverLift, pageVariants, pressTap, staggerContainer } from '@/lib/motion'

const MotionLink = motion.create(Link)

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as keyof typeof projects
  const project = projects[slug]

  if (!project) {
    return (
      <div className="w-full px-8 md:px-16 lg:px-24 pt-28">
        <div className="max-w-xl border border-border bg-bg p-6">
          <p className="text-text-tertiary">Project not found.</p>
          <Link href="/work" className="inline-block mt-4 text-accent">
            Back to work
          </Link>
        </div>
      </div>
    )
  }

  const impactSection = project.sections.find((section) => section.heading.toLowerCase() === 'impact')
  const sections = project.sections.filter((section) => section.heading.toLowerCase() !== 'impact')

  return (
    <div className="bg-bg">
      <motion.section
        className="w-full px-8 md:px-16 lg:px-24 pt-28 pb-12 md:pt-36 md:pb-16"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-6xl">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              href="/work"
              className="font-mono text-xs text-text-tertiary hover:text-text tracking-wider uppercase transition-colors duration-150"
            >
              Back to work
            </Link>
            <span className="font-mono text-xs text-text-tertiary">Case study</span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="border border-border bg-bg p-6 md:p-8">
              <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-4">
                {project.year}
              </p>
              <h1 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] font-semibold tracking-tight leading-[1.05] text-text">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mt-4 max-w-3xl">
                {project.subtitle}
              </p>
              <p className="text-text-secondary leading-relaxed mt-6 max-w-3xl">
                {project.hook}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-text-tertiary border border-border px-2.5 py-1 bg-bg-alt/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              className="grid gap-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {project.metrics.map((metric) => (
                <motion.div
                  key={metric.label}
                  variants={cardVariants}
                  whileHover={{ ...hoverLift, ...hoverGlow }}
                  className="border border-border bg-bg p-6"
                >
                  <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase">
                    {metric.label}
                  </p>
                  <p className="mt-3 font-display text-3xl md:text-[2.5rem] font-semibold tracking-tight text-accent tabular-nums">
                    {metric.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="border-t border-border bg-bg-alt/30">
        <div className="w-full px-8 md:px-16 lg:px-24 py-16 md:py-20">
          <motion.div
            className="grid gap-4 lg:grid-cols-2"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.12 }}
          >
            {sections.map((section) => (
              <motion.article
                key={section.heading}
                variants={cardVariants}
                whileHover={{ ...hoverLift, ...hoverGlow }}
                className="border border-border bg-bg p-6 md:p-7"
              >
                <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-4">
                  {section.heading}
                </p>
                <p className="text-text-secondary leading-relaxed">{section.content}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {impactSection && (
        <section className="border-t border-border">
          <div className="w-full px-8 md:px-16 lg:px-24 py-16 md:py-20">
            <motion.div
              className="border border-border bg-accent/5 p-6 md:p-8"
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-4">
                Key takeaway
              </p>
              <p className="font-display text-heading-1 font-semibold tracking-tight text-text leading-snug max-w-4xl">
                {impactSection.content}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      <section className="border-t border-border">
        <div className="w-full px-8 md:px-16 lg:px-24 py-10 md:py-14">
          <motion.div
            className="flex flex-wrap items-center justify-between gap-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <MotionLink
              href="/work"
              whileHover={{ x: -2 }}
              whileTap={pressTap}
              className="font-mono text-xs text-text-tertiary hover:text-text tracking-wider uppercase transition-colors duration-150"
            >
              All projects
            </MotionLink>
            <MotionLink
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 2 }}
              whileTap={pressTap}
              className="font-mono text-xs text-accent hover:opacity-80 tracking-wider uppercase transition-opacity duration-150"
              aria-label={`View on GitHub (opens in a new tab)`}
            >
              View on GitHub
            </MotionLink>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
