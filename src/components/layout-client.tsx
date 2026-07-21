'use client'

import { useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { TransitionProvider } from '@/components/transition-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { LoadSequence } from '@/components/load-sequence'
import { useSmoothScroll } from '@/lib/smooth-scroll'
import { pageVariants } from '@/lib/motion'

export function LayoutClient({ children }: { children: React.ReactNode }) {
  useSmoothScroll()
  const pathname = usePathname()
  const [loaded, setLoaded] = useState(false)

  const handleLoadComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <>
        {!loaded && <LoadSequence onComplete={handleLoadComplete} />}
        <TransitionProvider>
          <Navigation />
          <main className="min-h-screen pt-14">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="min-h-[calc(100vh-3.5rem)]"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
          <Footer />
        </TransitionProvider>
      </>
    </MotionConfig>
  )
}
