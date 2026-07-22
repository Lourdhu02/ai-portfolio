'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'motion/react'
import { projects } from '@/data/projects'
import { pageVariants, pressTap, staggerContainer, pageEase } from '@/lib/motion'

const MotionLink = motion.create(Link)

function LiquidGlassCard({ children, className = '', index = 0 }: { children: React.ReactNode; className?: string; index?: number }) {
  const tilt = index % 2 === 0 ? 'rotateX(0.5deg)' : 'rotateX(-0.5deg)'
  return (
    <motion.div
      className={`relative bg-white/[0.04] backdrop-blur-xl border border-white/10 overflow-hidden group ${className}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease: pageEase, delay: index * 0.1 }}
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{
        y: -6,
        boxShadow: '0 32px 80px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.15)',
        transition: { duration: 0.4, ease: 'easeOut' },
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: tilt, transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),transparent_35%,transparent_65%,rgba(255,255,255,0.04))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.08),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_75%,rgba(255,255,255,0.05),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(255,255,255,0.03)_100%)]" />
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      <div className="relative" style={{ transform: tilt }}>
        {children}
      </div>
    </motion.div>
  )
}

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as keyof typeof projects
  const project = projects[slug]

  if (!project) {
    return (
      <div className="w-full px-8 md:px-16 lg:px-24 pt-28">
        <div className="max-w-xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-8">
          <p className="text-text-tertiary">Project not found.</p>
          <Link href="/work" className="inline-block mt-4 text-accent">
            Back to work
          </Link>
        </div>
      </div>
    )
  }

  const impactSection = project.sections.find((section) => section.heading.toLowerCase() === 'impact')
  const contentSections = project.sections.filter((section) => section.heading.toLowerCase() !== 'impact')

  return (
    <div className="bg-bg">
      <motion.section
        className="w-full px-8 md:px-16 lg:px-24 pt-28 pb-16 md:pt-36 md:pb-20"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center gap-4 w-full max-w-6xl mb-4">
            <Link
              href="/work"
              className="font-mono text-xs text-text-tertiary hover:text-text tracking-wider uppercase transition-colors duration-150"
            >
              Back to work
            </Link>
            <span className="font-mono text-xs text-text-tertiary">—</span>
            <span className="font-mono text-xs text-text-tertiary">{project.year}</span>
          </div>

          <LiquidGlassCard className="w-full max-w-6xl p-10 md:p-14" index={0}>
            <h1 className="font-cinzel text-[clamp(2.5rem,6vw,5rem)] font-black tracking-tight leading-[1.0] text-text">
              {project.title}
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-text-secondary leading-relaxed max-w-4xl font-medium">
              {project.subtitle}
            </p>
            <p className="mt-6 text-base md:text-lg text-text-secondary leading-[1.72] max-w-4xl">
              {project.hook}
            </p>
            <div className="flex flex-wrap gap-2 mt-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-text-tertiary border border-white/10 px-3 py-1.5 bg-white/[0.03]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="w-full max-w-4xl ml-auto p-8 md:p-10" index={1}>
            <div className="flex flex-wrap items-stretch">
              {project.metrics.map((metric, i) => (
                <div
                  key={metric.label}
                  className={`flex-1 min-w-[140px] py-6 ${i < project.metrics.length - 1 ? 'border-r border-white/10' : ''} px-6 first:pl-0 last:pr-0`}
                >
                  <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-3">
                    {metric.label}
                  </p>
                  <p className="text-3xl md:text-4xl font-black tracking-tight text-accent font-mono tabular-nums leading-none">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </LiquidGlassCard>
        </div>
      </motion.section>

      <section className="border-t border-white/5">
        <div className="w-full px-8 md:px-16 lg:px-24 py-16 md:py-24">
          <motion.div
            className="flex flex-col items-center gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.12 }}
          >
            <LiquidGlassCard className="w-full max-w-6xl p-10 md:p-14" index={2}>
              <div className="flex flex-col gap-10">
                {contentSections.map((section, i) => {
                  const paragraphs = section.content.split('\n\n').filter(Boolean)
                  return (
                    <div key={section.heading}>
                      <p className="font-unica text-[clamp(1.3rem,3vw,2.2rem)] font-bold tracking-tight text-text leading-[1.05] mb-4">
                        {section.heading}
                      </p>
                      <div className="text-text-secondary leading-[1.72] text-base md:text-lg max-w-5xl space-y-4">
                        {paragraphs.length > 1 ? (
                          paragraphs.map((paragraph, pi) => (
                            <p key={pi}>{paragraph}</p>
                          ))
                        ) : (
                          <p>{section.content}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </LiquidGlassCard>
          </motion.div>
        </div>
      </section>

      {impactSection && (
        <section className="border-t border-white/5">
          <div className="w-full px-8 md:px-16 lg:px-24 py-16 md:py-20">
            <motion.div
              className="relative bg-white/[0.06] backdrop-blur-xl border border-accent/15 p-10 md:p-14 overflow-hidden max-w-4xl mr-auto"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: pageEase }}
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{
                y: -6,
                boxShadow: '0 32px 80px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,59,48,0.2)',
                transition: { duration: 0.4, ease: 'easeOut' },
              }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,59,48,0.08),transparent_30%,transparent_70%,rgba(255,59,48,0.04))] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,59,48,0.1),transparent_50%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(255,59,48,0.06),transparent_40%)] pointer-events-none" />
              <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
              <div className="relative">
                <p className="font-mono text-xs text-accent tracking-wider uppercase mb-5">
                  Key takeaway
                </p>
                <p className="font-unica text-[clamp(1.5rem,3.5vw,2.75rem)] font-bold tracking-tight text-text leading-snug max-w-5xl">
                  {impactSection.content}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="border-t border-white/5">
        <div className="w-full px-8 md:px-16 lg:px-24 py-10 md:py-14">
          <motion.div
            className="flex flex-wrap items-center justify-between gap-4 max-w-6xl mx-auto"
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
