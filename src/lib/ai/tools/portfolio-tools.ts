const PROJECTS = [
  { id: 'project-alpha', title: 'AI-Native Portfolio Platform', description: 'Multi-agent RAG portfolio with pgvector, Claude, and cinematic GSAP animations.', tags: ['Next.js', 'AI SDK', 'pgvector', 'Claude'], category: 'Full-Stack', tech: ['Next.js 16', 'React 19', 'Vercel AI SDK', 'pgvector', 'Voyage AI', 'GSAP', 'Lenis'], featured: true },
  { id: 'project-beta', title: 'Liquid Glass Design System', description: 'Design system for the 2026 liquid glass aesthetic with motion tokens and glassmorphism.', tags: ['Design System', 'CSS', 'Tailwind', 'GSAP'], category: 'Design', tech: ['Tailwind CSS v4', 'GSAP', 'CSS Custom Properties'] },
  { id: 'project-gamma', title: 'MCP Financial Agent', description: 'Financial analysis agent using MCP protocol for dynamic tool discovery.', tags: ['MCP', 'AI Agent', 'Financial', 'TypeScript'], category: 'AI/ML', tech: ['MCP Protocol', 'Claude', 'Express.js', 'PostgreSQL'], featured: true },
]

const SKILLS = [
  { name: 'React', proficiency: 95, category: 'frontend' },
  { name: 'Next.js', proficiency: 92, category: 'frontend' },
  { name: 'TypeScript', proficiency: 93, category: 'frontend' },
  { name: 'Tailwind CSS', proficiency: 90, category: 'frontend' },
  { name: 'GSAP', proficiency: 85, category: 'frontend' },
  { name: 'LLM Orchestration', proficiency: 90, category: 'ai' },
  { name: 'RAG Systems', proficiency: 88, category: 'ai' },
  { name: 'Vercel AI SDK', proficiency: 87, category: 'ai' },
  { name: 'pgvector', proficiency: 78, category: 'ai' },
  { name: 'Supabase', proficiency: 82, category: 'cloud' },
  { name: 'PostgreSQL', proficiency: 80, category: 'cloud' },
  { name: 'System Design', proficiency: 85, category: 'systems' },
]

export const portfolioTools: Record<string, { description: string; parameters: any; execute: (args: any) => Promise<any> }> = {
  show_project: {
    description: 'Display a project card in the UI.',
    parameters: { type: 'object', properties: { projectId: { type: 'string' }, variant: { type: 'string', enum: ['compact', 'detailed', 'full'] }, highlighted: { type: 'boolean' } }, required: ['projectId'] },
    execute: async (args: { projectId: string }) => {
      const project = PROJECTS.find(p => p.id === args.projectId)
      if (!project) throw new Error(`Project not found: ${args.projectId}`)
      return { component: 'project-card', props: { ...project } }
    },
  },
  show_skills: {
    description: 'Display skills as a visualization chart.',
    parameters: { type: 'object', properties: { category: { type: 'string', enum: ['frontend', 'ai', 'cloud', 'systems', 'all'] }, chartType: { type: 'string', enum: ['radar', 'bar', 'treemap'] }, highlight: { type: 'string' } } },
    execute: async (args: { category: string }) => {
      const category = args.category || 'all'
      const skills = category === 'all' ? SKILLS : SKILLS.filter(s => s.category === category)
      return { component: 'skill-chart', props: { skills } }
    },
  },
  show_timeline: {
    description: 'Display a chronological timeline of experience.',
    parameters: { type: 'object', properties: { focus: { type: 'string', enum: ['career', 'projects', 'education', 'all'] }, maxItems: { type: 'number' } } },
    execute: async (args: { focus: string; maxItems: number }) => {
      const focus = args.focus || 'all'
      const maxItems = args.maxItems || 5
      const items = [
        { id: '1', role: 'Senior AI Engineer', company: 'Tech Corp', period: '2024 — Present', type: 'career' },
        { id: '2', role: 'Full-Stack Developer', company: 'StartupXYZ', period: '2022 — 2024', type: 'career' },
        { id: '3', role: 'Frontend Engineer', company: 'Digital Agency', period: '2020 — 2022', type: 'career' },
        { id: '4', role: 'BSc Computer Science', company: 'University', period: '2016 — 2020', type: 'education' },
      ]
      const filtered = focus === 'all' ? items : items.filter(i => i.type === focus)
      return { component: 'timeline', props: { items: filtered.slice(0, maxItems) } }
    },
  },
  compare_projects: {
    description: 'Compare two or more projects side by side.',
    parameters: { type: 'object', properties: { projectIds: { type: 'array', items: { type: 'string' }, minItems: 2, maxItems: 4 }, dimensions: { type: 'array', items: { type: 'string', enum: ['tech', 'complexity', 'timeline', 'role', 'impact'] } } }, required: ['projectIds', 'dimensions'] },
    execute: async (args: { projectIds: string[]; dimensions: string[] }) => {
      const projects = PROJECTS.filter(p => args.projectIds.includes(p.id))
      return { component: 'comparison-table', props: { projects, dimensions: args.dimensions } }
    },
  },
  navigate_section: {
    description: 'Smooth-scroll the user to a specific section of the portfolio page.',
    parameters: { type: 'object', properties: { sectionId: { type: 'string', enum: ['hero', 'about', 'skills', 'projects', 'contact', 'chat'] }, duration: { type: 'number' } }, required: ['sectionId'] },
    execute: async (args: { sectionId: string; duration: number }) => {
      try { document.getElementById(`section-${args.sectionId}`)?.scrollIntoView({ behavior: 'smooth' }) } catch {}
      return { scrolled: true, section: args.sectionId }
    },
  },
}
