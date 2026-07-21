'use client'

import { createContext, useCallback, useContext, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface TransitionContextValue {
  navigate: (href: string) => void
  registerViewTransitionName: (slug: string | null) => void
  transitionSlug: React.MutableRefObject<string | null>
}

const TransitionContext = createContext<TransitionContextValue | null>(null)

export function usePageTransition() {
  const ctx = useContext(TransitionContext)
  if (!ctx) throw new Error('usePageTransition must be used within TransitionProvider')
  return ctx
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const transitionSlug = useRef<string | null>(null)

  const navigate = useCallback((href: string) => {
    router.push(href)
  }, [router])

  const registerViewTransitionName = useCallback((slug: string | null) => {
    transitionSlug.current = slug
  }, [])

  return (
    <TransitionContext.Provider value={{ navigate, registerViewTransitionName, transitionSlug }}>
      {children}
    </TransitionContext.Provider>
  )
}
