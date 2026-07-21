'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { projectList } from '@/data/projects'
import {
  cardVariants,
  hoverGlow,
  hoverLift,
  pressTap,
  sectionVariants,
  staggerContainer,
  textFadeVariants,
} from '@/lib/motion'

const MotionLink = motion.create(Link)

const headingWords = "Building production systems that observe, reason, and respond at the intersection of GenAI, Computer Vision, and low-latency ML serving.".split(' ')

const highlights = [
  {
    value: '2+',
    label: 'years shipping ML systems',
  },
  {
    value: '97.04%',
    label: 'OCR exact-match accuracy',
  },
  {
    value: '70%',
    label: 'adaptive assessment time reduction',
  },
]

export default function Landing() {
  const [reveal, setReveal] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const timer = setTimeout(() => setReveal(true), 300)
    return () => clearTimeout(timer)
  }, [pathname])

  const wordAnims = reveal
    ? headingWords.map(() => ({
        x: Math.round((Math.random() - 0.5) * 500 * 10) / 10,
        y: Math.round((Math.random() - 0.5) * 500 * 10) / 10,
      }))
    : []

  return (
    <div className="bg-bg">
      <section className="w-full px-8 md:px-16 lg:px-24 pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="max-w-[90%]">
          {reveal ? (
            <>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-4"
              >
                Machine Learning Engineer
              </motion.p>
              <motion.h1 className="font-display text-[232px] font-semibold tracking-tighter leading-[0.85] text-text">
                {headingWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ x: wordAnims[i].x, y: wordAnims[i].y, opacity: 0 }}
                    animate={{ x: 0, y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 2 + i * 0.3 }}
                    className="inline-block"
                  >
                    {word}{i < headingWords.length - 1 ? '\u00A0' : ''}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                className="mt-6 text-lg text-text-secondary leading-relaxed max-w-xl"
              >
                ML Engineer currently architecting Transformer-based OCR pipelines at Sujanix.
                Previously founded SpaceDrift. Kaggle Expert.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
                className="flex flex-wrap items-center gap-4 mt-8"
              >
                <MotionLink
                  href="/work"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  className="inline-flex items-center justify-center rounded-none px-5 py-2.5 bg-accent text-white text-sm font-medium"
                >
                  View work
                </MotionLink>
                <MotionLink
                  href="/about"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  className="inline-flex items-center justify-center rounded-none px-2 py-2.5 text-sm font-medium text-text-secondary hover:text-text"
                >
                  About →
                </MotionLink>
              </motion.div>
            </>
          ) : (
            <>
              <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-4">
                Machine Learning Engineer
              </p>
              <h1 className="font-display text-[232px] font-semibold tracking-tighter leading-[0.85] text-text">
                {headingWords.join(' ')}
              </h1>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-xl">
                ML Engineer currently architecting Transformer-based OCR pipelines at Sujanix.
                Previously founded SpaceDrift. Kaggle Expert.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center rounded-none px-5 py-2.5 bg-accent text-white text-sm font-medium"
                >
                  View work
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-none px-2 py-2.5 text-sm font-medium text-text-secondary hover:text-text"
                >
                  About →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="border-t border-border bg-bg-alt/30">
        <div className="w-full px-8 md:px-16 lg:px-24 py-16 md:py-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            {highlights.map((item) => (
              <motion.div
                key={item.label}
                variants={cardVariants}
                className="border border-border bg-bg p-6"
              >
                <p className="font-mono text-2xl md:text-3xl text-accent tabular-nums">{item.value}</p>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex items-end justify-between gap-6 mb-8"
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div>
              <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-3">
                02 - Selected Work
              </p>
              <h2 className="font-display text-heading-1 font-semibold tracking-tight text-text">
                Projects
              </h2>
            </div>
            <MotionLink
              href="/work"
              whileHover={{ x: 2 }}
              className="hidden md:inline-flex font-mono text-xs text-text-tertiary hover:text-text tracking-wider uppercase"
            >
              All projects
            </MotionLink>
          </motion.div>

          <motion.div
            className="grid gap-4 lg:grid-cols-2"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.15 }}
          >
            {projectList.map((project, i) => (
              <MotionLink
                key={project.slug}
                href={`/projects/${project.slug}`}
                variants={cardVariants}
                whileHover={{ ...hoverLift, ...hoverGlow }}
                whileTap={pressTap}
                className="group relative overflow-hidden border border-border bg-bg p-6 md:p-7 text-left transition-colors duration-150"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <span className="font-mono text-xs text-text-tertiary tabular-nums w-6 shrink-0 pt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="max-w-xl">
                      <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-text-tertiary">
                        {project.year}
                      </p>
                      <h3 className="mt-2 font-display text-2xl md:text-3xl font-semibold tracking-tight text-text group-hover:text-accent transition-colors duration-150">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                        {project.subtitle}
                      </p>
                      <p className="mt-4 text-sm text-text-secondary leading-relaxed max-w-2xl">
                        {project.hook}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[11px] text-text-tertiary border border-border px-2.5 py-1 bg-bg-alt/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0 pt-1">
                    Open case study
                  </span>
                </div>
              </MotionLink>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 md:hidden"
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            <MotionLink
              href="/work"
              whileHover={{ x: 2 }}
              className="font-mono text-xs text-text-tertiary hover:text-text tracking-wider uppercase"
            >
              All projects
            </MotionLink>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="w-full px-8 md:px-16 lg:px-24 py-16 md:py-20">
          <motion.div
            className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={cardVariants} className="border border-border bg-bg p-6 md:p-8">
              <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-4">
                03 - About
              </p>
              <p className="text-text-secondary leading-relaxed text-lg max-w-2xl">
                Machine Learning Engineer with production experience across GenAI, NLP, and
                Computer Vision systems. I like systems that feel calm in use but serious under the
                hood.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <MotionLink
                  href="/about"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.985 }}
                  className="inline-flex items-center justify-center rounded-none px-4 py-2 border border-border text-sm text-text hover:border-accent hover:text-accent"
                >
                  Read more
                </MotionLink>
                <MotionLink
                  href="/contact"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.985 }}
                  className="inline-flex items-center justify-center rounded-none px-4 py-2 bg-accent text-white text-sm"
                >
                  Get in touch
                </MotionLink>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className="grid gap-4">
              <div className="border border-border bg-bg p-6">
                <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-2">
                  Focus
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Shipping useful ML systems with careful interfaces, fast inference, and clear
                  operational boundaries.
                </p>
              </div>
              <div className="border border-border bg-bg p-6">
                <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-2">
                  Approach
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  One motion language, one visual rhythm, and a layout that reads like a gallery
                  instead of a stack of sections.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
