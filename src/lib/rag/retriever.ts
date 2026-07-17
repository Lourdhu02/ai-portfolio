interface RetrievedChunk {
  content: string
  metadata: {
    sourceType: string
    sourceId: string
    section?: string
    tokenCount: number
  }
  score: number
}

const FALLBACK_CHUNKS: RetrievedChunk[] = [
  { content: 'Built AI-native portfolio platform with Next.js 16, React 19, Vercel AI SDK, and pgvector for semantic search.', metadata: { sourceType: 'project', sourceId: 'project-alpha', tokenCount: 20 }, score: 0.92 },
  { content: 'Expert in React 19, Next.js 16, TypeScript, and modern frontend architecture with Server Components and streaming SSR.', metadata: { sourceType: 'profile', sourceId: 'profile', tokenCount: 18 }, score: 0.88 },
  { content: 'Deep experience with LLM orchestration, prompt engineering, and multi-agent systems using Vercel AI SDK.', metadata: { sourceType: 'profile', sourceId: 'profile', tokenCount: 15 }, score: 0.85 },
]

export async function retrieve(options: {
  query: string
  topK?: number
  sourceTypes?: string[]
}): Promise<RetrievedChunk[]> {
  const { query, topK = 5, sourceTypes } = options
  const queryLower = query.toLowerCase()

  const results = FALLBACK_CHUNKS
    .filter(c => c.content.toLowerCase().includes(queryLower) || queryLower.split(' ').some(w => c.content.toLowerCase().includes(w)))
    .map(c => ({ ...c, score: c.score * (sourceTypes?.includes(c.metadata.sourceType) ? 1.2 : 1) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)

  return results.length > 0 ? results : FALLBACK_CHUNKS.slice(0, topK)
}
