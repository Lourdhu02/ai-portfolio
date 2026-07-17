'use client'

import { useState, useCallback } from 'react'
import type { AgentComponentSpec } from '@/types/ui'

export function useAgentUI() {
  const [components, setComponents] = useState<AgentComponentSpec[]>([])

  const addComponent = useCallback((spec: AgentComponentSpec) => {
    setComponents((prev) => [...prev, spec])
  }, [])

  const removeComponent = useCallback((id: string) => {
    setComponents((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const clearComponents = useCallback(() => {
    setComponents([])
  }, [])

  return { components, addComponent, removeComponent, clearComponents }
}
