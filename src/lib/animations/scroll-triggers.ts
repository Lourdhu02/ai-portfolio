'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollAnimation {
  trigger: string | Element
  target: string | Element
  animation: gsap.TweenVars
  options?: Omit<ScrollTrigger.StaticVars, 'trigger' | 'scrub'> & {
    scrub?: boolean | number
  }
}

export const SCROLL_ANIMATIONS: ScrollAnimation[] = [
  {
    trigger: '#section-about',
    target: '#hero-name',
    animation: { opacity: 0, scale: 0.95, filter: 'blur(4px)' },
    options: { start: 'top 80%', end: 'top 40%', scrub: 1 },
  },
  {
    trigger: '#section-skills',
    target: '.skill-bar-fill',
    animation: { width: '100%', duration: 1.5, ease: 'power2.out' },
    options: { start: 'top 75%', end: 'top 40%', toggleActions: 'play none none reverse' },
  },
  {
    trigger: '#section-projects',
    target: '.project-card',
    animation: { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
    options: { start: 'top 80%', end: 'top 40%', toggleActions: 'play none none none' },
  },
  {
    trigger: '[data-animate="fade-in"]',
    target: '[data-animate="fade-in"]',
    animation: { opacity: 1, y: 0, duration: 0.8 },
    options: { start: 'top 85%', end: 'top 50%', toggleActions: 'play none none reverse' },
  },
]

export function registerScrollAnimations() {
  SCROLL_ANIMATIONS.forEach(({ trigger, target, animation, options }) => {
    gsap.fromTo(
      target,
      { opacity: 0, y: 40 },
      {
        ...animation,
        scrollTrigger: {
          trigger,
          ...options,
        },
      }
    )
  })
}
