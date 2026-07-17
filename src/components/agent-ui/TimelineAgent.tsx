'use client'

import { motion } from 'framer-motion'

interface TimelineItem {
  id: string
  role: string
  company: string
  period: string
  type: string
}

interface TimelineAgentProps {
  items: TimelineItem[]
}

export function TimelineAgent({ items }: TimelineAgentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
      className="rounded-2xl border border-glass-border bg-glass-tint p-6 backdrop-blur-sm"
    >
      <h3 className="mb-4 font-display text-lg font-semibold text-text-primary">Experience</h3>
      <div className="relative pl-6">
        <div className="absolute left-2 top-1 h-full w-px bg-glass-border" />
        <div className="space-y-6">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-5 top-1.5 h-2 w-2 rounded-full border border-accent bg-surface-base" />
              <span className="text-xs text-accent">{item.period}</span>
              <p className="text-sm font-medium text-text-primary">{item.role}</p>
              <p className="text-xs text-text-secondary">{item.company}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
