import { semanticChunker } from './chunker'
import { embedMany } from './embedder'

interface SyncResult {
  chunksProcessed: number
  elapsedMs: number
  errors: string[]
}

export async function syncEmbeddings(options: {
  sourceTypes?: string[]
  force?: boolean
}): Promise<SyncResult> {
  const start = Date.now()
  const errors: string[] = []
  let chunksProcessed = 0

  try {
    const sources = [
      { type: 'profile' as const, id: 'profile', content: JSON.stringify({ name: 'Spacedrift', title: 'Full-Stack Engineer', bio: 'AI systems architect' }) },
      { type: 'project' as const, id: 'project-alpha', content: '# AI-Native Portfolio Platform\n## Architecture\nMulti-agent RAG system with Next.js and pgvector.' },
      { type: 'project' as const, id: 'project-beta', content: '# Liquid Glass Design System\n## Design Tokens\nSemantic color tokens and glassmorphism patterns.' },
    ]

    for (const source of sources) {
      if (options.sourceTypes && !options.sourceTypes.includes(source.type)) continue
      const chunks = semanticChunker(source.content, source.type, source.id)
      chunksProcessed += chunks.length
    }
  } catch (err) {
    errors.push(String(err))
  }

  return { chunksProcessed, elapsedMs: Date.now() - start, errors }
}
