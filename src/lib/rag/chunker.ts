interface Chunk {
  content: string
  metadata: {
    sourceType: 'profile' | 'project' | 'blog' | 'skill'
    sourceId: string
    section?: string
    tokenCount: number
  }
}

export function semanticChunker(
  content: string,
  sourceType: 'profile' | 'project' | 'blog' | 'skill',
  sourceId: string,
  maxTokens = 512
): Chunk[] {
  const sections = content.split(/(?=^## )/m)
  return sections.map((section) => {
    const lines = section.trim().split('\n')
    const heading = lines[0]?.replace(/^#+\s*/, '').trim()
    const body = lines.slice(1).join('\n').trim()
    const text = heading ? `${heading}: ${body}` : body
    return {
      content: text || section.trim(),
      metadata: {
        sourceType,
        sourceId,
        section: heading || undefined,
        tokenCount: Math.ceil(text.split(/\s+/).length * 1.3),
      },
    }
  }).filter(c => c.content.length > 0)
}
