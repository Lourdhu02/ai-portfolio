import type { Variants } from 'motion/react'

export const pageEase = [0.22, 1, 0.36, 1] as const

export const pageVariants: Variants = {
  initial: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
  },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: { duration: 0.4, ease: pageEase },
  },
  exit: {
    clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
}

export const sectionVariants: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: pageEase },
  },
}

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
}

export const pressTap = {
  scale: 0.985,
}

export const hoverLift = {
  y: -4,
  scale: 1.01,
}

export const hoverGlow = {
  boxShadow: '0 0 0 1px rgba(255, 59, 48, 0.35), 0 18px 50px rgba(10, 10, 14, 0.08)',
}
