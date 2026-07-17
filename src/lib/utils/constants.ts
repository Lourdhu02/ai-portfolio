export const AGENT_CONFIG = {
  router: {
    model: 'anthropic/claude-haiku-4.5',
    maxTokens: 4096,
    temperature: 0.3,
  },
  techLead: {
    model: 'anthropic/claude-sonnet-4.6',
    maxTokens: 4096,
    temperature: 0.5,
    maxSteps: 8,
  },
  contact: {
    model: 'anthropic/claude-haiku-4.5',
    maxTokens: 2048,
    temperature: 0.3,
  },
} as const

export const RAG_CONFIG = {
  topK: 5,
  minConfidence: 0.75,
  maxContextTokens: 4000,
  chunkSize: 512,
  chunkOverlap: 64,
  embeddingDimensions: 1024,
} as const

export const ANIMATION_CONFIG = {
  hoverDuration: 0.15,
  microDuration: 0.25,
  modalDuration: 0.35,
  pageTransitionDuration: 0.5,
  scrollRevealDuration: 0.6,
  staggerDelay: 0.08,
} as const

export const CONTACT_CONFIG = {
  minNameLength: 2,
  maxNameLength: 100,
  minMessageLength: 10,
  maxMessageLength: 5000,
  maxSubjectLength: 200,
} as const
