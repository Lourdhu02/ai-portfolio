import { z } from 'zod'

interface MCPTool {
  name: string
  description: string
  inputSchema: Record<string, unknown>
}

interface MCPResource {
  uri: string
  name: string
  description: string
}

const MCP_TOOLS: MCPTool[] = [
  { name: 'get_project', description: 'Get project details by ID', inputSchema: { type: 'object', properties: { projectId: { type: 'string' } } } },
  { name: 'list_projects', description: 'List all portfolio projects', inputSchema: { type: 'object', properties: {} } },
  { name: 'get_skills', description: 'Get skills by category', inputSchema: { type: 'object', properties: { category: { type: 'string' } } } },
  { name: 'get_experience', description: 'Get work experience', inputSchema: { type: 'object', properties: { type: { type: 'string' } } } },
]

const MCP_RESOURCES: MCPResource[] = [
  { uri: 'portfolio://profile', name: 'Profile', description: 'Portfolio owner profile' },
  { uri: 'portfolio://projects', name: 'Projects', description: 'List of all projects' },
  { uri: 'portfolio://skills', name: 'Skills', description: 'Skill inventory' },
]

const PROJECTS = [
  { id: 'project-alpha', title: 'AI-Native Portfolio Platform', tags: ['Next.js', 'AI SDK', 'pgvector'] },
  { id: 'project-beta', title: 'Liquid Glass Design System', tags: ['Design System', 'CSS', 'Tailwind'] },
  { id: 'project-gamma', title: 'MCP Financial Agent', tags: ['MCP', 'AI Agent', 'Financial'] },
]

export function handleMCPRequest(body: { method: string; params?: any }) {
  switch (body.method) {
    case 'tools/list':
      return { tools: MCP_TOOLS }

    case 'tools/call': {
      const { name, arguments: args } = body.params || {}
      switch (name) {
        case 'get_project':
          return { content: [{ type: 'text', text: JSON.stringify(PROJECTS.find(p => p.id === args?.projectId)) }] }
        case 'list_projects':
          return { content: [{ type: 'text', text: JSON.stringify(PROJECTS) }] }
        case 'get_skills':
          return { content: [{ type: 'text', text: JSON.stringify(['React', 'Next.js', 'TypeScript', 'GSAP', 'AI SDK', 'pgvector']) }] }
        case 'get_experience':
          return { content: [{ type: 'text', text: JSON.stringify([{ role: 'Senior AI Engineer', company: 'Tech Corp', period: '2024—Present' }]) }] }
        default:
          throw new Error(`Unknown tool: ${name}`)
      }
    }

    case 'resources/list':
      return { resources: MCP_RESOURCES }

    case 'resources/read': {
      const { uri } = body.params || {}
      switch (uri) {
        case 'portfolio://profile':
          return { contents: [{ uri, text: JSON.stringify({ name: 'Spacedrift', title: 'Full-Stack Engineer' }) }] }
        case 'portfolio://projects':
          return { contents: [{ uri, text: JSON.stringify(PROJECTS) }] }
        case 'portfolio://skills':
          return { contents: [{ uri, text: JSON.stringify(['React', 'Next.js', 'TypeScript', 'GSAP', 'AI SDK']) }] }
        default:
          throw new Error(`Unknown resource: ${uri}`)
      }
    }

    default:
      throw new Error(`Method not found: ${body.method}`)
  }
}
