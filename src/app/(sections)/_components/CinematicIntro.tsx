'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useRef } from 'react'

gsap.registerPlugin(SplitText)

export function CinematicIntro() {
  const heroRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!heroRef.current) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo('#particle-canvas', { opacity: 0 }, { opacity: 1, duration: 1 })

    const nameSplit = new SplitText('#hero-name', { type: 'chars' })
    tl.fromTo(
      nameSplit.chars,
      { opacity: 0, y: 80, rotateX: -90 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.03 },
      '+=0.5'
    )

    const subtitleSplit = new SplitText('#hero-subtitle', { type: 'lines' })
    tl.fromTo(
      subtitleSplit.lines,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
      '-=0.5'
    )

    tl.fromTo(
      '#hero-cta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
    )

    tl.fromTo('#scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 0.4 })
  }, [])

  return (
    <section
      id="section-hero"
      ref={heroRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <div
        id="particle-canvas"
        className="absolute inset-0 bg-gradient-to-br from-accent/10 via-surface-base to-accent-2/10"
      />

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <div id="hero-name-wrapper" className="mb-4">
          <h1
            id="hero-name"
            className="font-display text-6xl font-bold tracking-tight md:text-8xl"
          >
            Spacedrift
          </h1>
        </div>
        <p
          id="hero-subtitle"
          className="max-w-2xl text-lg text-text-secondary md:text-xl"
        >
          Full-Stack Engineer · AI Systems Architect · Creative Technologist
        </p>
        <div id="hero-cta" className="mt-10 flex gap-4">
          <button
            onClick={() => document.getElementById('section-projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="gradient-accent rounded-xl px-6 py-3 text-sm font-medium text-white transition-all duration-150 ease-out hover:scale-105"
          >
            View Projects
          </button>
          <button
            onClick={() => document.getElementById('section-contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="glass rounded-xl px-6 py-3 text-sm font-medium text-text-primary transition-all duration-150 ease-out hover:scale-105"
          >
            Get in Touch
          </button>
        </div>
      </div>

      <div
        id="scroll-indicator"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-12 w-6 items-start justify-center rounded-full border-2 border-text-secondary/30">
          <div className="mt-2 h-3 w-1 animate-scroll-bounce rounded-full bg-text-primary" />
        </div>
      </div>
    </section>
  )
}
