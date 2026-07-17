'use client'

import { useEffect, useState } from 'react'

export function useLenisScroll() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const docEl = document.documentElement
      const scrollTop = window.scrollY || docEl.scrollTop
      const scrollHeight = docEl.scrollHeight - window.innerHeight
      setScrollY(scrollTop)
      setScrollProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollProgress, scrollY }
}
