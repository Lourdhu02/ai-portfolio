'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { projectList } from '@/data/projects'
import { pressTap, staggerContainer, sectionVariants } from '@/lib/motion'
import { loadGSAP } from '@/lib/dynamic-gsap'

const MotionLink = motion.create(Link)

const highlights = [
  { value: '2+', label: 'years shipping ML systems' },
  { value: '97.04%', label: 'OCR exact-match accuracy' },
  { value: '70%', label: 'adaptive assessment time reduction' },
]

export default function Landing() {
  const reduceMotion = useReducedMotion() ?? false
  const heroRef = useRef<HTMLDivElement>(null)
  const workSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: gsap.Context | undefined

    async function init() {
      const { gsap, ScrollTrigger } = await loadGSAP()

      ctx = gsap.context(() => {
        // Work section scroll reveals
        const workBlocks = workSectionRef.current?.querySelectorAll('[data-work-block]')
        if (workBlocks?.length) {
          workBlocks.forEach((block) => {
            const rule = block.querySelector('[data-work-rule]')
            const content = block.querySelector('[data-work-content]')
            const indexEl = block.querySelector('[data-work-index]')
            if (!rule || !content) return

            ScrollTrigger.create({
              trigger: block as HTMLElement,
              start: 'top 85%',
              onEnter: () => {
                if (rule) gsap.fromTo(rule, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power3.inOut' })
                if (content) gsap.fromTo(content, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.15 })
                if (indexEl) {
                  const target = parseInt(indexEl.getAttribute('data-target') || '0', 10)
                  const obj = { val: 0 }
                  gsap.to(obj, {
                    val: target,
                    duration: 0.5,
                    ease: 'power2.out',
                    onUpdate: () => { indexEl.textContent = String(Math.round(obj.val)).padStart(2, '0') },
                  })
                }
              },
              once: true,
            })
          })
        }
      }, heroRef)
    }

    init()
    return () => ctx?.revert()
  }, [reduceMotion])

  return (
    <div className="bg-bg" ref={heroRef}>
      {/* Hero */}
      <section className="w-full px-8 md:px-16 lg:px-24 pt-40 md:pt-48 pb-24 md:pb-32">
        <div className="max-w-[90%]">
          <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-6">
            Machine Learning Engineer
          </p>
          <h1 className="font-cinzel text-hero font-black tracking-[-0.04em] leading-[0.95] text-text">
            Lourdu Raju
          </h1>
          <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-xl">
            ML Engineer currently architecting Transformer-based OCR pipelines at Sujanix.
            Previously founded SpaceDrift. Kaggle Expert.
          </p>
          <div className="mt-8 w-16 h-px bg-border origin-left" />
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <MotionLink
              href="/work"
              whileHover={{ y: -2 }}
              whileTap={pressTap}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-accent text-white text-sm font-medium"
            >
              View work
            </MotionLink>
            <MotionLink
              href="/about"
              whileHover={{ y: -2 }}
              whileTap={pressTap}
              className="inline-flex items-center justify-center px-2 py-2.5 text-sm font-medium text-text-secondary hover:text-text"
            >
              About →
            </MotionLink>
          </div>
          <div className="mt-12 flex items-center gap-2">
            <span className="w-6 h-px bg-text-tertiary" />
            <span className="font-mono text-xs text-text-tertiary tracking-wider uppercase">Scroll</span>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-t border-border bg-bg-alt/30">
        <div className="w-full px-8 md:px-16 lg:px-24 py-16 md:py-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            {highlights.map((item) => (
              <motion.div
                key={item.label}
                variants={sectionVariants}
              >
                <p className="font-mono text-2xl md:text-3xl text-accent tabular-nums">{item.value}</p>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Work – full-bleed blocks */}
      <section ref={workSectionRef} className="border-t border-border">
        <div className="w-full px-8 md:px-16 lg:px-24 py-16 md:py-20">
          <div className="mb-12">
            <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-3">
              02 — Selected Work
            </p>
            <h2 className="font-unica text-display font-semibold tracking-tight text-text">
              Projects
            </h2>
          </div>

          <div className="flex flex-col">
            {projectList.map((project, i) => (
              <MotionLink
                key={project.slug}
                href={`/projects/${project.slug}`}
                layoutId={`project-title-${project.slug}`}
                data-work-block
                whileTap={pressTap}
                className="group block py-8 border-t border-border first:border-t-0"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-6 min-w-0">
                    <span
                      data-work-index
                      data-target={i + 1}
                      className="font-mono text-xs text-text-tertiary tabular-nums pt-1 group-hover:text-accent transition-colors duration-150 shrink-0"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="font-unica text-title font-semibold tracking-tight text-text relative">
                          {project.title}
                          <motion.span
                            className="absolute inset-x-0 -bottom-0.5 h-px bg-accent origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                          />
                        </h3>
                        <span className="font-mono text-xs text-text-tertiary">{project.year}</span>
                      </div>
                      <div data-work-rule className="w-full h-px bg-border mb-4" />
                      <div data-work-content className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[11px] text-text-tertiary border border-border px-2.5 py-1 bg-bg-alt/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed sm:text-right max-w-md">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionLink>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="border-t border-border">
        <div className="w-full px-8 md:px-16 lg:px-24 py-16 md:py-20">
          <motion.div
            className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div>
              <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-4">
                03 — About
              </p>
              <p className="text-text-secondary leading-relaxed text-lg max-w-2xl">
                Machine Learning Engineer with production experience across GenAI, NLP, and
                Computer Vision systems. I like systems that feel calm in use but serious under the
                hood.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <MotionLink
                  href="/about"
                  whileHover={{ y: -2 }}
                  whileTap={pressTap}
                  className="inline-flex items-center justify-center px-4 py-2 border border-border text-sm text-text hover:border-accent hover:text-accent"
                >
                  Read more
                </MotionLink>
                <MotionLink
                  href="/contact"
                  whileHover={{ y: -2 }}
                  whileTap={pressTap}
                  className="inline-flex items-center justify-center px-4 py-2 bg-accent text-white text-sm"
                >
                  Get in touch
                </MotionLink>
              </div>
            </motion.div>

            <motion.div className="grid gap-4">
              <div>
                <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-2">
                  Focus
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Shipping useful ML systems with careful interfaces, fast inference, and clear
                  operational boundaries.
                </p>
              </div>
              <div>
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
