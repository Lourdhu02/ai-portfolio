import type { Variants } from 'motion/react'

export const pageEase = [0.22, 1, 0.36, 1] as const

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: pageEase },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
}

export const sectionVariants: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: pageEase },
  },
}

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
}

export const cardVariants: Variants = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: pageEase },
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
  boxShadow: '0 18px 50px rgba(10, 10, 14, 0.08)',
  borderColor: 'rgba(255, 59, 48, 0.18)',
}
