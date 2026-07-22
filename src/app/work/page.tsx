'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { projectList } from '@/data/projects'
import { pressTap } from '@/lib/motion'
import { loadGSAP } from '@/lib/dynamic-gsap'

const MotionLink = motion.create(Link)

export default function Work() {
  const reduceMotion = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: gsap.Context | undefined

    async function init() {
      const { gsap, ScrollTrigger } = await loadGSAP()

      ctx = gsap.context(() => {
        if (reduceMotion) return

        const blocks = sectionRef.current?.querySelectorAll('[data-work-block]')
        if (!blocks?.length) return

        blocks.forEach((block) => {
          const rule = block.querySelector('[data-work-rule]')
          const content = block.querySelector('[data-work-content]')
          const indexEl = block.querySelector('[data-work-index]')
          if (!rule || !content) return

          ScrollTrigger.create({
            trigger: block as HTMLElement,
            start: 'top 85%',
            onEnter: () => {
              if (rule) gsap.fromTo(rule, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power3.inOut' })
              if (content) gsap.fromTo(content, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
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
      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [reduceMotion])

  return (
    <div className="bg-bg">
      <section className="w-full px-8 md:px-16 lg:px-24 pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="max-w-3xl">
          <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-4">
            Portfolio
          </p>
          <h1 className="font-unica text-display font-semibold tracking-tight text-text mb-4">
            Selected work
          </h1>
          <p className="text-text-secondary leading-relaxed max-w-xl text-lg">
            Production systems built at the intersection of research rigor and engineering
            discipline. Each case study below documents a shipped system, not just a project.
          </p>
        </div>
      </section>

      <section ref={sectionRef} className="border-t border-border bg-bg-alt/30">
        <div className="w-full px-8 md:px-16 lg:px-24 py-16 md:py-24">
          <div className="flex flex-col">
            {projectList.map((project, i) => (
              <MotionLink
                key={project.slug}
                href={`/projects/${project.slug}`}
                data-work-block
                layoutId={`project-title-${project.slug}`}
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
                        <h2 className="font-unica text-title font-semibold tracking-tight text-text relative">
                          {project.title}
                          <motion.span
                            className="absolute inset-x-0 -bottom-0.5 h-px bg-accent origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                          />
                        </h2>
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
    </div>
  )
}
