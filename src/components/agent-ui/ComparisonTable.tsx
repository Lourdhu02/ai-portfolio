'use client'

import { motion } from 'framer-motion'

interface ComparisonTableProps {
  projects: Array<{ id: string; title: string; tech?: string[]; description?: string }>
  dimensions?: string[]
}

export function ComparisonTable({ projects, dimensions }: ComparisonTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
      className="overflow-hidden rounded-2xl border border-glass-border bg-glass-tint backdrop-blur-sm"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-glass-border">
              <th className="p-4 font-medium text-text-secondary">Feature</th>
              {projects.map((p) => (
                <th key={p.id} className="p-4 font-display font-semibold text-text-primary">
                  {p.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-glass-border">
              <td className="p-4 text-text-secondary">Description</td>
              {projects.map((p) => (
                <td key={p.id} className="p-4 text-text-primary">
                  {p.description}
                </td>
              ))}
            </tr>
            {projects[0]?.tech && (
              <tr>
                <td className="p-4 text-text-secondary">Tech Stack</td>
                {projects.map((p) => (
                  <td key={p.id} className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {p.tech?.map((t) => (
                        <span key={t} className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
