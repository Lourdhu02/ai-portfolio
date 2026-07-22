'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { pageEase } from '@/lib/motion'

export function LoadSequence({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const [exiting, setExiting] = useState(false)
  const onCompleteRef = useRef(onComplete)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (reduceMotion) {
      onCompleteRef.current()
      return
    }

    let rafId = 0
    let exitTimer = 0
    let completeTimer = 0
    let finished = false
    const start = performance.now()
    const duration = 800

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      setCount(Math.round(progress * 100))

      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
        return
      }

      if (finished) return
      finished = true
      exitTimer = window.setTimeout(() => setExiting(true), 200)
      completeTimer = window.setTimeout(() => onCompleteRef.current(), 500)
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafId)
      window.clearTimeout(exitTimer)
      window.clearTimeout(completeTimer)
    }
  }, [reduceMotion])

  if (reduceMotion) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-bg flex flex-col items-start justify-center px-8 md:px-16 lg:px-24"
      initial={{ opacity: 0 }}
      animate={{
        opacity: exiting ? 0 : 1,
        y: exiting ? -10 : 0,
      }}
      transition={{
        duration: 0.35,
        ease: pageEase,
      }}
    >
      <motion.p
        className="font-mono text-[clamp(4rem,12vw,10rem)] font-medium text-text tabular-nums leading-none"
        initial={{ opacity: 0, y: 8 }}
        animate={exiting ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: pageEase }}
      >
        {count}%
      </motion.p>
      <motion.div
        className="mt-4 w-32 h-[2px] bg-border relative overflow-hidden origin-bottom"
        initial={{ scaleY: 1 }}
        animate={exiting ? { scaleY: 0, opacity: 0 } : { scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: pageEase }}
      >
        <motion.div
          className="absolute inset-0 bg-accent origin-left"
          animate={{ scaleX: count / 100 }}
          transition={{ duration: 0.1, ease: pageEase }}
        />
      </motion.div>
    </motion.div>
  )
}
