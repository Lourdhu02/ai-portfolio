const KNOWLEDGE_BASE = [
  { content: 'Built AI-native portfolio platform with Next.js 16, React 19, Vercel AI SDK, and pgvector for semantic search.', sourceType: 'project', sourceId: 'project-alpha' },
  { content: 'Designed three-agent architecture: Router (Claude Haiku 4.5), Tech Lead (Claude Sonnet 4.6), Contact (Claude Haiku 4.5) with PAHF personalization loop.', sourceType: 'project', sourceId: 'project-alpha' },
  { content: 'Implemented RAG pipeline with Voyage AI voyage-3 embeddings (1024-dim) stored in pgvector HNSW index for fast cosine similarity search.', sourceType: 'project', sourceId: 'project-alpha' },
  { content: 'Created Liquid Glass Design System with CSS custom properties, semantic color tokens, and backdrop-filter glassmorphism patterns.', sourceType: 'project', sourceId: 'project-beta' },
  { content: 'Built MCP-enabled financial analysis agent with dynamic tool discovery via JSON-RPC over Streamable HTTP.', sourceType: 'project', sourceId: 'project-gamma' },
  { content: 'Expert in React 19, Next.js 16, TypeScript, and modern frontend architecture with Server Components and streaming SSR.', sourceType: 'profile', sourceId: 'profile' },
  { content: 'Deep experience with LLM orchestration, prompt engineering, and multi-agent systems using Vercel AI SDK.', sourceType: 'profile', sourceId: 'profile' },
  { content: 'Proficient in GSAP, Lenis, Framer Motion for cinematic web animations and scroll-driven narratives.', sourceType: 'profile', sourceId: 'profile' },
  { content: 'Skilled in PostgreSQL, Supabase, pgvector, and cloud deployment on Vercel with Turborepo monorepos.', sourceType: 'profile', sourceId: 'profile' },
]

export const ragTools: Record<string, { description: string; parameters: any; execute: (args: any) => Promise<any> }> = {
  search_knowledge: {
    description: 'Search portfolio knowledge base using semantic search.',
    parameters: { type: 'object', properties: { query: { type: 'string', minLength: 3, maxLength: 500 }, topK: { type: 'number' }, sourceTypes: { type: 'array', items: { type: 'string', enum: ['profile', 'project', 'blog', 'skill'] } } }, required: ['query'] },
    execute: async (args: { query: string; topK?: number; sourceTypes?: string[] }) => {
      const query = args.query
      const topK = args.topK || 5
      const sourceTypes = args.sourceTypes
      let results = KNOWLEDGE_BASE
      if (sourceTypes) results = results.filter(r => sourceTypes.includes(r.sourceType))
      const queryLower = query.toLowerCase()
      const scored = results.map(r => ({ ...r, score: r.content.toLowerCase().includes(queryLower) ? 0.9 : 0.3 }))
      const sorted = scored.sort((a, b) => b.score - a.score).slice(0, topK)
      return { chunks: sorted.map(r => ({ content: r.content, sourceType: r.sourceType, sourceId: r.sourceId, score: r.score })) }
    },
  },
  search_projects: {
    description: 'Search for projects by technology, topic, or keyword.',
    parameters: { type: 'object', properties: { query: { type: 'string', minLength: 2 } }, required: ['query'] },
    execute: async (args: { query: string }) => {
      const queryLower = args.query.toLowerCase()
      const results = KNOWLEDGE_BASE.filter(r => r.sourceType === 'project' && r.content.toLowerCase().includes(queryLower)).map(r => ({ projectId: r.sourceId, relevance: 0.9 }))
      return { projects: results }
    },
  },
}
