'use client'

import { ProjectCardAgent } from './ProjectCardAgent'
import { SkillChartAgent } from './SkillChartAgent'
import { TimelineAgent } from './TimelineAgent'
import { ComparisonTable } from './ComparisonTable'
import { CodeBlockAgent } from './CodeBlockAgent'
import { ContactFormPreview } from './ContactFormPreview'
import type { AgentComponentSpec } from '@/types/ui'

const REGISTRY: Record<string, React.ComponentType<any>> = {
  'project-card': ProjectCardAgent,
  'skill-chart': SkillChartAgent,
  'timeline': TimelineAgent,
  'comparison-table': ComparisonTable,
  'code-block': CodeBlockAgent,
  'contact-form-preview': ContactFormPreview,
}

interface AgentDrivenUIProps {
  components: AgentComponentSpec[]
}

export function AgentDrivenUI({ components }: AgentDrivenUIProps) {
  if (!components.length) return null

  return (
    <div className="space-y-4">
      {components.map((spec) => {
        const Component = REGISTRY[spec.type]
        if (!Component) return null
        return <Component key={spec.id} {...spec.props} />
      })}
    </div>
  )
}
