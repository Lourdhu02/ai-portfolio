import type { Variants } from 'motion/react'

export const pageEase = [0.22, 1, 0.36, 1] as const
export const softEase = [0.25, 0.1, 0.25, 1] as const

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: pageEase,
      when: 'beforeChildren',
      staggerChildren: 0.05,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.28,
      ease: pageEase,
    },
  },
}

export const sectionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: pageEase,
    },
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
  initial: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.42,
      ease: pageEase,
    },
  },
}

export const textFadeVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: pageEase,
    },
  },
}

export const revealFromTop: Variants = {
  initial: {
    y: -48,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: pageEase,
    },
  },
}

export const hoverLift = {
  y: -4,
  scale: 1.01,
}

export const hoverGlow = {
  boxShadow: '0 18px 50px rgba(10, 10, 14, 0.08)',
  borderColor: 'rgba(255, 59, 48, 0.18)',
}

export const pressTap = {
  scale: 0.985,
}
