'use client'

import { useState } from 'react'

interface ReasoningBlockProps {
  text: string
}

export function ReasoningBlock({ text }: ReasoningBlockProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-xl border border-glass-border bg-glass-tint p-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2 text-xs text-text-secondary"
      >
        <span className="i-ico-cog animate-spin">⟳</span>
        <span>Agent thinking</span>
        <span className="ml-auto">{expanded ? '▲' : '▼'}</span>
      </button>
      {expanded && (
        <p className="mt-2 text-xs leading-relaxed text-text-secondary/75">{text}</p>
      )}
    </div>
  )
}
