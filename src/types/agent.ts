export type Intent = 'greeting' | 'tech_question' | 'contact' | 'project_deepdive' | 'skill_inquiry' | 'casual_chat'

export type AgentRole = 'router' | 'tech_lead' | 'contact'

export interface AgentAction {
  type: string
  payload: Record<string, unknown>
}

export interface ToolResult {
  component?: string
  props?: Record<string, unknown>
  chunks?: Array<{ content: string; sourceType: string; sourceId: string; score: number }>
  projects?: Array<{ projectId: string; relevance: number }>
  sent?: boolean
  valid?: boolean
  formatValid?: boolean
  isDisposable?: boolean
  scrolled?: boolean
  section?: string
}
