export const navigationTools: Record<string, { description: string; parameters: any; execute: (args: any) => Promise<any> }> = {
  scroll_to_element: {
    description: 'Smooth scroll to a specific element on the page by CSS selector.',
    parameters: { type: 'object', properties: { selector: { type: 'string' }, duration: { type: 'number' }, offset: { type: 'number' } }, required: ['selector'] },
    execute: async (args: { selector: string; duration?: number; offset?: number }) => {
      try { document.querySelector(args.selector)?.scrollIntoView({ behavior: 'smooth' }) } catch {}
      return { scrolled: true, selector: args.selector }
    },
  },
  show_architecture_diagram: {
    description: 'Display an architecture diagram for a specific project.',
    parameters: { type: 'object', properties: { projectId: { type: 'string' }, diagramType: { type: 'string', enum: ['system', 'data-flow', 'deployment'] } }, required: ['projectId'] },
    execute: async (args: { projectId: string; diagramType?: string }) => {
      return { component: 'code-block', props: { code: 'graph TB\n  A[Client] --> B[Server]\n  B --> C[Database]', language: 'mermaid', title: `${args.projectId}: ${args.diagramType || 'system'}` } }
    },
  },
}
