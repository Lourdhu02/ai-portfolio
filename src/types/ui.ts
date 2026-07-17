export interface AgentComponentSpec {
  type: string
  id: string
  props: Record<string, unknown>
  actions?: AgentActionDefinition[]
}

export interface AgentActionDefinition {
  label: string
  action: string
  payload: Record<string, unknown>
}

export interface ComponentRegistry {
  [key: string]: {
    component: React.ComponentType<any>
    schema: { safeParse: (data: unknown) => { success: boolean; data?: unknown; error?: unknown } }
  }
}
