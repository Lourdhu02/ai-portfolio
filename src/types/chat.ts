export interface Session {
  id: string
  anonymousId: string
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
  metadata: {
    userAgent?: string
    referrer?: string
    deviceType?: 'mobile' | 'tablet' | 'desktop'
  }
  createdAt: Date
  updatedAt: Date
}

export type StreamPartType = 'text' | 'tool-call' | 'tool-result' | 'source' | 'reasoning' | 'error' | 'step-start' | 'step-end'
