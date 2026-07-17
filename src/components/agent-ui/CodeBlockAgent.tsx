'use client'

import { motion } from 'framer-motion'

interface CodeBlockAgentProps {
  code: string
  language: string
  title?: string
  highlightLines?: number[]
}

export function CodeBlockAgent({ code, language, title }: CodeBlockAgentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
      className="overflow-hidden rounded-2xl border border-glass-border"
    >
      {title && (
        <div className="flex items-center justify-between border-b border-glass-border bg-glass-tint px-4 py-2">
          <span className="text-xs font-medium text-text-secondary">{title}</span>
          <span className="text-xs text-text-secondary/50">{language}</span>
        </div>
      )}
      <pre className="overflow-x-auto bg-text-primary/5 p-4">
        <code className="text-sm leading-relaxed text-text-primary">{code}</code>
      </pre>
    </motion.div>
  )
}
