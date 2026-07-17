'use client'

import { useEffect, useState } from 'react'

export function useScrollProgress(sectionId: string) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const el = document.getElementById(sectionId)
      if (!el) return
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const total = rect.height + windowHeight
      const scrolled = windowHeight - rect.top
      setProgress(Math.max(0, Math.min(1, scrolled / total)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionId])

  return progress
}
