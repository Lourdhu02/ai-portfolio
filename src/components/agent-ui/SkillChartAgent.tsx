'use client'

import { motion } from 'framer-motion'

interface Skill {
  name: string
  proficiency: number
  category: string
}

interface SkillChartAgentProps {
  skills: Skill[]
  chartType?: string
  highlight?: string
}

export function SkillChartAgent({ skills, chartType, highlight }: SkillChartAgentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
      className="rounded-2xl border border-glass-border bg-glass-tint p-6 backdrop-blur-sm"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-text-primary">
          Skills {chartType && `(${chartType})`}
        </h3>
      </div>
      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="mb-1 flex items-center justify-between">
              <span className={`text-sm font-medium ${highlight === skill.name ? 'text-accent' : 'text-text-primary'}`}>
                {skill.name}
              </span>
              <span className="text-xs text-text-secondary">{skill.proficiency}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-glass-border">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.proficiency}%` }}
                transition={{ duration: 0.8, ease: [0, 0, 0.2, 1], delay: skills.indexOf(skill) * 0.05 }}
                className="h-full rounded-full gradient-accent"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
