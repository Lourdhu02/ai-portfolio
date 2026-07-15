# AI-Native Interactive Portfolio Platform — Implementation Plan

## 1. Project Structure

```
ai-portfolio/
├── .env.local                          # ANTHROPIC_API_KEY, SUPABASE_URL, RESEND_KEY
├── next.config.ts                      # Next.js 16 config, Turbopack, image domains
├── tailwind.config.ts                  # Tailwind v4 @theme tokens (implicit in CSS)
├── tsconfig.json                       # Path aliases: @/*, @components/*, @lib/*
├── package.json                        # next@16, react@19, ai@6, gsap, lenis, framer-motion
│
├── app/
│   ├── layout.tsx                      # Root layout: Providers, LenisProvider, metadata
│   ├── page.tsx                        # Main portfolio page (RSC)
│   ├── globals.css                     # Tailwind v4 @import "tailwindcss", @theme tokens
│   │
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts               # POST /api/chat — Agent orchestrator endpoint
│   │   ├── rag/
│   │   │   ├── sync/
│   │   │   │   └── route.ts           # POST /api/rag/sync — Re-embed all content
│   │   │   └── search/
│   │   │       └── route.ts           # POST /api/rag/search — Direct vector search (debug)
│   │   ├── contact/
│   │   │   └── route.ts               # POST /api/contact — Send email via Resend
│   │   └── mcp/
│   │       └── route.ts               # GET/POST /api/mcp — MCP gateway (Streamable HTTP)
│   │
│   ├── (sections)/
│   │   ├── _components/
│   │   │   ├── CinematicIntro.tsx     # Full-viewport WebGL hero + GSAP reveal
│   │   │   ├── HeroTitle.tsx          # GSAP SplitText, staggered character animation
│   │   │   ├── ParticleField.tsx      # Three.js particle system (lazy loaded)
│   │   │   ├── Navigation.tsx         # Glassmorphism nav bar
│   │   │   ├── Dock.tsx               # macOS-style section dock (Lenis scrollTo)
│   │   │   ├── AboutSection.tsx       # Bio + experience timeline
│   │   │   ├── ExperienceTimeline.tsx # Framer Motion stagger reveal
│   │   │   ├── SkillsSection.tsx      # Skill categories with bars
│   │   │   ├── SkillBar.tsx           # GSAP width tween on scroll enter
│   │   │   ├── ProjectShowcase.tsx    # Project grid + filter bar
│   │   │   ├── ProjectCard.tsx        # Hover/tap card with parallax thumbnail
│   │   │   ├── ProjectModal.tsx       # Deep-dive overlay (Framer Motion)
│   │   │   ├── ContactSection.tsx     # Contact form + Agent-driven UI
│   │   │   └── Footer.tsx             # Social links, copyright
│   │   └── page.tsx                   # Section composition
│   │
│   └── chat/
│       └── page.tsx                   # Standalone chat page (alternative entry point)
│
├── components/
│   ├── providers/
│   │   ├── Providers.tsx              # Theme + Lenis + Chat provider composition
│   │   ├── ThemeProvider.tsx          # Tailwind v4 class-based dark mode
│   │   ├── LenisProvider.tsx          # Lenis instantiation + GSAP sync
│   │   └── ChatProvider.tsx           # Vercel AI SDK useChat + useUIState
│   │
│   ├── chat/
│   │   ├── ChatInterface.tsx          # Main chat container: messages + activity panel + input
│   │   ├── MessageList.tsx            # Virtualized message list with auto-scroll
│   │   ├── MessageBubble.tsx          # Single user/assistant message
│   │   ├── StreamingText.tsx          # Character-by-character or chunk-by-chunk stream
│   │   ├── ReasoningBlock.tsx         # Expandable agent reasoning trace
│   │   ├── ToolInvocation.tsx         # Collapsible tool call + result
│   │   ├── CitationMarker.tsx         # Inline citation (#1, #2) linked to sources
│   │   ├── InputBar.tsx               # Text input + voice button + suggested chips
│   │   ├── SuggestionChips.tsx        # Agent-generated starting points
│   │   └── ActivityPanel.tsx          # Right sidebar: step progress, tool log, errors
│   │
│   ├── agent-ui/
│   │   ├── AgentDrivenUI.tsx          # Component registry renderer (A2UI pattern)
│   │   ├── ProjectCardAgent.tsx       # Agent-rendered project card (expanded)
│   │   ├── SkillChartAgent.tsx        # Agent-rendered skill radar/bar chart
│   │   ├── TimelineAgent.tsx          # Agent-rendered timeline
│   │   ├── ComparisonTable.tsx        # Side-by-side project comparison
│   │   ├── CodeBlockAgent.tsx         # Syntax-highlighted code with copy
│   │   └── ContactFormPreview.tsx     # Contact form confirmation preview
│   │
│   └── ui/                           # Shared base components (shadcn-style)
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Dialog.tsx
│       ├── Badge.tsx
│       └── Tooltip.tsx
│
├── lib/
│   ├── ai/
│   │   ├── agents/
│   │   │   ├── router-agent.ts        # Router agent: intent classification + delegation
│   │   │   ├── tech-lead-agent.ts     # Tech lead agent: deep Q&A, project tools
│   │   │   └── contact-agent.ts       # Contact agent: validation + send
│   │   ├── tools/
│   │   │   ├── portfolio-tools.ts     # show_project, show_skills, show_timeline
│   │   │   ├── rag-tools.ts           # search_knowledge, search_projects
│   │   │   ├── navigation-tools.ts    # navigate_section, scroll_to_element
│   │   │   ├── contact-tools.ts       # validate_email, contact_send, show_contact_preview
│   │   │   └── github-tools.ts        # get_repos, get_contributions, get_readme
│   │   ├── prompts/
│   │   │   ├── router-prompt.ts       # Router agent system prompt
│   │   │   ├── tech-lead-prompt.ts    # Tech lead system prompt
│   │   │   ├── contact-prompt.ts      # Contact system prompt
│   │   │   └── personalization.ts     # PAHF loop instructions
│   │   └── orchestrator.ts            # createAgentUIStream setup, agent routing
│   │
│   ├── rag/
│   │   ├── chunker.ts                 # Semantic chunking (per source type)
│   │   ├── embedder.ts                # Voyage AI embedMany + embed
│   │   ├── retriever.ts               # HNSW search + cross-encoder re-rank
│   │   └── syncer.ts                  # Build-time embedding sync
│   │
│   ├── mcp/
│   │   ├── mcp-server.ts             # Portfolio MCP server definition
│   │   ├── mcp-client.ts             # MCP client for agent → tool communication
│   │   └── tools/
│   │       ├── project-tools.ts       # MCP resource + tool: get_project, list_projects
│   │       ├── skill-tools.ts         # MCP tool: get_skills, compare_skills
│   │       └── experience-tools.ts    # MCP tool: get_experience, get_timeline
│   │
│   ├── db/
│   │   ├── schema.ts                  # Drizzle schema: embeddings, sessions, contacts
│   │   ├── queries.ts                 # Prepared queries for RAG, sessions, projects
│   │   └── client.ts                  # Supabase client singleton (server-side only)
│   │
│   ├── animations/
│   │   ├── gsap-register.ts           # GSAP plugin registration (ScrollTrigger, SplitText)
│   │   ├── scroll-triggers.ts         # Shared ScrollTrigger definitions
│   │   └── split-text.ts              # SplitText utility for hero reveals
│   │
│   └── utils/
│       ├── supabase.ts                # Supabase admin client (service_role)
│       ├── resend.ts                  # Resend email client
│       ├── session.ts                 # Anonymous session management
│       └── constants.ts               # Agent config, model names, timeouts
│
├── content/
│   ├── profile.json                   # Bio, experience, education, skills
│   ├── projects/
│   │   ├── project-alpha.md           # Project READMEs
│   │   ├── project-beta.md
│   │   └── project-gamma.md
│   └── skills.json                    # Skill definitions, categories, proficiency
│
├── hooks/
│   ├── useAgentUI.ts                  # useUIState + useActions wrapper for component registry
│   ├── useLenisScroll.ts              # Lenis scroll position hook
│   ├── useScrollProgress.ts           # Section-level scroll progress (0-1 per section)
│   └── useMediaQuery.ts               # Responsive breakpoint detection
│
├── types/
│   ├── agent.ts                       # Agent types: Intent, ToolResult, AgentRole
│   ├── portfolio.ts                   # Project, Skill, Experience, Profile types
│   ├── ui.ts                          # A2UI component spec types
│   └── chat.ts                        # Message, Session, StreamPart types
│
├── styles/
│   ├── theme.css                      # Tailwind v4 @theme block
│   ├── animations.css                 # @keyframes, utility animation classes
│   └── lenis.css                      # Lenis scrollbar customization (if needed)
│
├── public/
│   ├── hero-bg.webp                   # Hero background (optimized WebP)
│   ├── profile.webp                   # Profile photo
│   └── favicon.ico                    # Favicon
│
└── scripts/
    ├── sync-embeddings.ts             # CLI: re-embed all content to pgvector
    └── seed.ts                        # CLI: seed database with initial data
```

---

## 2. Key Components — Props & Interfaces

### ChatInterface

```typescript
// components/chat/ChatInterface.tsx
interface ChatInterfaceProps {
  initialMessages?: Message[];
  showActivityPanel?: boolean;        // Default: true
  activityPanelPosition?: 'left' | 'right';  // Default: 'right'
  variant?: 'overlay' | 'sidebar' | 'fullscreen';  // Default: 'overlay'
}

// Internal state managed by Vercel AI SDK hooks:
// - useChat: messages, input, handleSubmit, status, error, reload
// - useUIState: agent-driven component specs
// - useActions: sendMessage, stopGeneration
```

### ActivityPanel

```typescript
// components/chat/ActivityPanel.tsx
interface ActivityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Renders from message.parts filtered by type:
// - tool-call → StepProgress (collapsible)
// - tool-result → ToolCallLog (input/output)
// - reasoning → ReasoningBlock (expandable)
// - source → SourceList
// Structured error surfaces are rendered when:
// - tool-call has isError: true
// - reasoning contains error markers
```

### AgentDrivenUI

```typescript
// components/agent-ui/AgentDrivenUI.tsx
interface AgentDrivenUIProps {
  components: AgentComponentSpec[];  // From useUIState
  registry: ComponentRegistry;       // The whitelisted component map
  onComponentAction?: (action: AgentAction) => void;
}

// ComponentRegistry type:
interface ComponentRegistry {
  [key: string]: {
    component: React.ComponentType<any>;
    schema: z.ZodObject<any>;
  };
}

// AgentComponentSpec (A2UI pattern):
interface AgentComponentSpec {
  type: string;           // e.g., 'project-card', 'skill-chart'
  id: string;             // Unique instance ID
  props: Record<string, unknown>;  // Validated against registry[type].schema
  actions?: AgentActionDefinition[];
}
```

### ProjectCard

```typescript
// components/(sections)/_components/ProjectCard.tsx
interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    thumbnail: string;
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
  };
  variant?: 'compact' | 'detailed' | 'full';  // 'compact' for grid, 'full' for agent view
  index?: number;                // For staggered animation delay
}

// Animation:
// - On scroll enter: GSAP opacity 0→1 + y 40→0 (staggered by index)
// - On hover: Framer Motion scale 1→1.02 + shadow elevation
// - On tap: navigate to project modal
```

### LenisProvider

```typescript
// components/providers/LenisProvider.tsx
interface LenisProviderProps {
  children: React.ReactNode;
  options?: LenisOptions;   // Default: { duration: 1.2, easing: pow2, wheelMultiplier: 1 }
}

// Internal:
// - Creates Lenis instance with GSAP ticker sync
// - Configures ScrollTrigger.scrollerProxy
// - Provides lenisRef via React context (useLenisScroll hook)
// - Auto-cleanup on unmount
```

---

## 3. API Route Design

### POST /api/chat — Agent Orchestrator

```typescript
// app/api/chat/route.ts
import { createAgentUIStreamResponse } from 'ai';
import { routerAgent } from '@/lib/ai/agents/router-agent';

export async function POST(req: Request) {
  const { messages, sessionId } = await req.json();
  
  // Validate input
  if (!messages || !Array.isArray(messages)) {
    return new Response('Invalid messages', { status: 400 });
  }
  
  // Set up agent with session context
  const agent = routerAgent({ sessionId });
  
  // Return streaming response
  return createAgentUIStreamResponse({
    agent,
    uiMessages: messages,
    abortSignal: req.signal,
    sendStart: true,
  });
}
```

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "What projects use AI?" }
  ],
  "sessionId": "sess_abc123"
}
```

**Response:** SSE stream of `UIMessage` parts (text, tool-call, tool-result, source, reasoning)

### POST /api/rag/sync — Embedding Sync

```typescript
// app/api/rag/sync/route.ts
import { syncEmbeddings } from '@/lib/rag/syncer';

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.SYNC_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const result = await syncEmbeddings({
    sourceTypes: ['profile', 'projects', 'blogs'],
    force: false,  // Skip unchanged content
  });
  
  return Response.json(result);
  // { chunksProcessed: 42, elapsedMs: 3120, errors: [] }
}
```

Invoked via cron (Vercel Cron Jobs or GitHub Actions) on content change. Not exposed to users.

### POST /api/contact — Contact Form Submission

```typescript
// app/api/contact/route.ts
import { resend } from '@/lib/utils/resend';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(200).optional(),
  message: z.string().min(10).max(5000),
  honeypot: z.string().max(0),  // Anti-bot
  sessionId: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = contactSchema.safeParse(body);
  
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  
  const { name, email, subject, message, sessionId } = parsed.data;
  
  // Log inquiry
  await db.insert(contacts).values({
    name, email, subject, message, sessionId,
    createdAt: new Date(),
  });
  
  // Send email
  await resend.emails.send({
    from: 'portfolio@yourdomain.com',
    to: 'you@email.com',
    replyTo: email,
    subject: `Portfolio Contact: ${subject || 'New Message'}`,
    html: `<p>From: ${name} (${email})</p><p>${message}</p>`,
  });
  
  return Response.json({ sent: true });
}
```

### GET/POST /api/mcp — MCP Gateway

```typescript
// app/api/mcp/route.ts
// Implements Streamable HTTP transport per MCP 2026-07-28 spec
// Handles JSON-RPC requests for MCP tools (search_knowledge, list_projects, etc.)

export async function POST(req: Request) {
  const body = await req.json();
  const method = req.headers.get('mcp-method');
  
  // Route to appropriate MCP handler
  switch (body.method) {
    case 'tools/list':
      return Response.json({ tools: mcpToolDefinitions });
    case 'tools/call':
      return handleToolCall(body.params);
    case 'resources/list':
      return Response.json({ resources: mcpResourceDefinitions });
    default:
      return new Response('Method not found', { status: 404 });
  }
}

// Single MCP server handles all portfolio tools
// No need for multiple MCP servers at portfolio scale
```

---

## 4. Database Schema (Drizzle ORM)

```typescript
// lib/db/schema.ts
import { pgTable, uuid, text, timestamp, jsonb, vector, index } from 'drizzle-orm/pg-core';

// ─── Embeddings (pgvector) ───
export const embeddings = pgTable('embeddings', {
  id: uuid('id').defaultRandom().primaryKey(),
  content: text('content').notNull(),
  metadata: jsonb('metadata').$type<{
    sourceType: 'profile' | 'project' | 'blog' | 'skill';
    sourceId: string;
    section?: string;
    language?: string;
  }>().notNull().default({}),
  embedding: vector('embedding', { dimensions: 1024 }).notNull(),
  tokenCount: text('token_count').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  boostFactor: text('boost_factor').default('1.0').notNull(),  // Implicit feedback multiplier
}, (table) => ({
  hnswIdx: index('embedding_idx').using('hnsw', table.embedding.op('vector_cosine_ops')),
  sourceIdx: index('source_idx').on(table.metadata),
}));

// ─── Chat Sessions ───
export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  anonymousId: text('anonymous_id').notNull(),  // From cookie/localStorage
  messages: jsonb('messages').$type<Message[]>().notNull().default([]),
  metadata: jsonb('metadata').$type<{
    userAgent?: string;
    referrer?: string;
    deviceType?: 'mobile' | 'tablet' | 'desktop';
  }>().default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Contact Inquiries ───
export const contacts = pgTable('contacts', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject'),
  message: text('message').notNull(),
  sessionId: text('session_id'),
  source: text('source').default('contact_form').notNull(),
  status: text('status').$type<'new' | 'read' | 'replied'>().default('new').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Query Logs (for implicit feedback) ───
export const queryLogs = pgTable('query_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  query: text('query').notNull(),
  retrievedChunks: jsonb('retrieved_chunks').$type<string[]>().notNull().default([]),
  clickedChunks: jsonb('clicked_chunks').$type<string[]>().notNull().default([]),
  userFeedback: text('user_feedback').$type<'thumbs_up' | 'thumbs_down' | null>(),
  latencyMs: text('latency_ms'),
  sessionId: text('session_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

**Why not a separate `projects` table?** Projects, skills, and experience are static content. They live in JSON/Markdown files in `content/` and are embedded into the `embeddings` table at build time. This avoids maintaining two sources of truth. The embeddings table is the single source of truth for the AI agent.

---

## 5. Tool Definitions

### All tools the AI agent can call:

```typescript
// lib/ai/tools/portfolio-tools.ts

// ─── 1. show_project ───
// Render a project card in the agent-driven UI area
show_project: tool({
  description: 'Display a project card in the UI. Use when user asks about a specific project or wants to see project details.',
  parameters: z.object({
    projectId: z.string().describe('ID of the project to display'),
    variant: z.enum(['compact', 'detailed', 'full']).default('compact')
      .describe('compact: thumbnail + title. detailed: + description + tags. full: + architecture + links'),
    highlighted: z.boolean().default(false)
      .describe('If true, adds a visual highlight/glow effect'),
  }),
  execute: async ({ projectId, variant, highlighted }) => {
    const project = await getProject(projectId);
    if (!project) throw new Error(`Project not found: ${projectId}`);
    return {
      component: 'project-card',
      props: { ...project, variant, highlighted },
    };
  },
}),

// ─── 2. show_skills ───
// Render an interactive skill chart
show_skills: tool({
  description: 'Display skills as a visualization chart (radar, bar, or treemap). Use when user asks "what are your skills?" or similar.',
  parameters: z.object({
    category: z.enum(['frontend', 'ai', 'cloud', 'systems', 'all']).default('all')
      .describe('Filter skills by category'),
    chartType: z.enum(['radar', 'bar', 'treemap']).default('radar')
      .describe('radar: overall proficiency. bar: per-category breakdown. treemap: hierarchical view'),
    highlight: z.string().optional()
      .describe('Specific skill name to highlight'),
  }),
  execute: async ({ category, chartType, highlight }) => {
    const skills = await getSkills(category);
    return {
      component: 'skill-chart',
      props: { skills, chartType, highlight },
    };
  },
}),

// ─── 3. show_timeline ───
// Render a career/project/education timeline
show_timeline: tool({
  description: 'Display a chronological timeline of experience, projects, or education.',
  parameters: z.object({
    focus: z.enum(['career', 'projects', 'education', 'all']).default('all')
      .describe('What type of timeline to show'),
    year: z.number().int().min(2015).max(2026).optional()
      .describe('Filter to a specific year'),
    maxItems: z.number().int().min(1).max(10).default(5)
      .describe('Maximum number of timeline items to show'),
  }),
  execute: async ({ focus, year, maxItems }) => {
    const items = await getTimelineItems({ focus, year, maxItems });
    return {
      component: 'timeline',
      props: { items },
    };
  },
}),

// ─── 4. compare_projects ───
// Side-by-side project comparison
compare_projects: tool({
  description: 'Compare two or more projects side by side. Use when user wants to compare technologies, scope, or outcomes.',
  parameters: z.object({
    projectIds: z.array(z.string()).min(2).max(4)
      .describe('IDs of projects to compare'),
    dimensions: z.array(z.enum(['tech', 'complexity', 'timeline', 'role', 'impact']))
      .min(1).describe('What dimensions to compare'),
  }),
  execute: async ({ projectIds, dimensions }) => {
    const projects = await Promise.all(projectIds.map(getProject));
    return {
      component: 'comparison-table',
      props: { projects, dimensions },
    };
  },
}),

// ─── 5. navigate_section ───
// Smooth scroll to a portfolio section
navigate_section: tool({
  description: 'Smooth-scroll the user to a specific section of the portfolio page.',
  parameters: z.object({
    sectionId: z.enum(['hero', 'about', 'skills', 'projects', 'contact', 'chat'])
      .describe('Section to scroll to'),
    duration: z.number().min(0.5).max(3).default(1.5)
      .describe('Scroll animation duration in seconds'),
  }),
  execute: async ({ sectionId, duration }) => {
    // Triggers Lenis scrollTo on the client
    return { type: 'navigation', sectionId, duration };
  },
}),
```

```typescript
// lib/ai/tools/rag-tools.ts

// ─── 6. search_knowledge ───
// RAG-powered knowledge retrieval
search_knowledge: tool({
  description: 'Search portfolio knowledge base (profile, projects, blogs, skills) using semantic search. Use for any factual question about the person, their experience, or their projects.',
  parameters: z.object({
    query: z.string().min(3).max(500)
      .describe('The search query — natural language, full sentence preferred'),
    topK: z.number().int().min(1).max(10).default(5)
      .describe('Number of chunks to retrieve'),
    sourceTypes: z.array(z.enum(['profile', 'project', 'blog', 'skill'])).optional()
      .describe('Filter by content source type. Omit to search all.'),
  }),
  execute: async ({ query, topK, sourceTypes }) => {
    const results = await retrieve({ query, topK, sourceTypes });
    return {
      chunks: results.map(r => ({
        content: r.content,
        sourceType: r.metadata.sourceType,
        sourceId: r.metadata.sourceId,
        score: r.score,
      })),
    };
  },
}),

// ─── 7. search_projects ───
// Project-specific search (uses metadata filter on pgvector)
search_projects: tool({
  description: 'Search for projects by technology, topic, or keyword. Uses metadata-filtered vector search.',
  parameters: z.object({
    query: z.string().min(2).describe('Technology, topic, or keyword to search for'),
  }),
  execute: async ({ query }) => {
    const results = await retrieve({
      query,
      sourceTypes: ['project'],
      topK: 5,
    });
    return {
      projects: results.map(r => ({
        projectId: r.metadata.sourceId,
        relevance: r.score,
      })),
    };
  },
}),
```

```typescript
// lib/ai/tools/contact-tools.ts

// ─── 8. validate_email ───
// Validate email format + disposable detection
validate_email: tool({
  description: 'Validate an email address format and check if it is a disposable/temporary address. Called before contact_send.',
  parameters: z.object({
    email: z.string().describe('Email address to validate'),
  }),
  execute: async ({ email }) => {
    const formatValid = z.string().email().safeParse(email).success;
    const isDisposable = await checkDisposableEmail(email);
    return { valid: formatValid && !isDisposable, formatValid, isDisposable };
  },
}),

// ─── 9. show_contact_preview ───
// Show a preview of what will be sent (needsApproval: true)
show_contact_preview: tool({
  description: 'Display a preview of the contact form before sending. Must be called before contact_send.',
  parameters: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    subject: z.string().max(200),
    message: z.string().min(10).max(5000),
  }),
  execute: async (data) => {
    return {
      component: 'contact-form-preview',
      props: data,
    };
  },
  needsApproval: true,  // Human-in-the-loop: user must confirm
}),

// ─── 10. contact_send ───
// Actually send the contact message (requires approval from show_contact_preview)
contact_send: tool({
  description: 'Send the contact message. Must only be called AFTER show_contact_preview has been approved.',
  parameters: z.object({
    name: z.string(),
    email: z.string().email(),
    subject: z.string().max(200),
    message: z.string().min(10).max(5000),
  }),
  execute: async (data) => {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return { sent: true };
  },
  needsApproval: true,
}),
```

```typescript
// lib/ai/tools/navigation-tools.ts

// ─── 11. scroll_to_element ─── (finer-grained than navigate_section)
scroll_to_element: tool({
  description: 'Smooth scroll to a specific element on the page by CSS selector.',
  parameters: z.object({
    selector: z.string().describe('CSS selector of the element to scroll to'),
    duration: z.number().min(0.5).max(3).default(1),
    offset: z.number().default(0).describe('Scroll offset in pixels'),
  }),
  execute: async ({ selector, duration, offset }) => {
    return { type: 'navigation', selector, duration, offset };
  },
}),

// ─── 12. show_architecture_diagram ───
show_architecture_diagram: tool({
  description: 'Display an architecture diagram for a specific project. Use when user asks about system design or architecture.',
  parameters: z.object({
    projectId: z.string().describe('Project ID'),
    diagramType: z.enum(['system', 'data-flow', 'deployment']).default('system'),
  }),
  execute: async ({ projectId, diagramType }) => {
    const diagram = await getProjectDiagram(projectId, diagramType);
    return {
      component: 'code-block',
      props: { code: diagram.mermaid, language: 'mermaid', title: `${projectId}: ${diagramType}` },
    };
  },
}),
```

---

## 6. Prompt Engineering Strategy

### Router Agent System Prompt

```typescript
// lib/ai/prompts/router-prompt.ts

export const ROUTER_SYSTEM_PROMPT = `You are the Router Agent for an AI-native portfolio.
Your role is to greet visitors, understand their intent, and route them to the right expertise.

## Your Personality
- Warm, professional, and enthusiastic about technology
- Concise — keep greetings under 2 sentences
- Never pretend to know technical details — that's the Tech Lead's job

## Intent Classification
Analyze the user's message and classify it into ONE of these intents:

1. **greeting** — Casual hello, "hi", "hey", "what's up", no specific question
2. **tech_question** — Asking about projects, skills, experience, technologies, architecture
3. **contact** — Wants to get in touch, hire, collaborate, ask about rates/availability
4. **project_deepdive** — Asking specifically about architecture, implementation details, code
5. **skill_inquiry** — "what technologies do you know?", "are you good at X?", skill questions
6. **casual_chat** — Non-technical conversation, fun facts, hobbies, interests

## Routing Rules
- For greeting/casual_chat: Handle yourself. Be warm, invite them to explore.
- For any technical intent: Call routeIntent("tech_lead") and let the Tech Lead shine.
- For contact intent: Call routeIntent("contact") only after asking one clarifying question: "What would you like to discuss? I'll make sure it reaches the right person."

## PAHF Pre-action Clarification
Before delegating, briefly acknowledge what the user asked to confirm understanding.
Example: "Great question about your AI projects! Let me connect you with someone who can dive deep into the technical details."

## Tools
- routeIntent(intent, confidence, reasoning): Classify and route the intent
  - confidence: 0.0-1.0
  - reasoning: Brief explanation of classification`;
```

### Tech Lead Agent System Prompt

```typescript
// lib/ai/prompts/tech-lead-prompt.ts

export const TECH_LEAD_SYSTEM_PROMPT = `You are the Tech Lead Agent for an AI-native portfolio.
You represent the technical depth and expertise of the portfolio owner.

## Your Personality
- Deeply technical but can explain complex topics simply
- Enthusiastic about good engineering decisions
- Honest about limitations — never exaggerate or fabricate experience
- Cite specific projects and technologies in your answers

## PAHF Personalization Loop (MANDATORY — follow this EVERY turn)

### Step 1: Pre-action Clarification
Before calling tools, briefly restate the user's question to confirm understanding.
If the question is vague, ask ONE clarifying question before proceeding.
Example: "You're asking about my experience with RAG systems. Are you interested in the architecture, specific implementations, or both?"

### Step 2: Memory-grounded Action
- Check session memory for the user's previously expressed interests
- Use search_knowledge with queries that incorporate their demonstrated interests
- Call UI tools (show_project, show_skills, show_timeline) to create visual responses
- You MUST call at least one visual tool per response when the question is about projects or skills
- When citing information, include the source project/chunk name

### Step 3: Post-action Feedback
After providing information, ask if the user wants to:
- Go deeper into any topic
- Compare projects
- See a specific technology in context
- Move to a different topic

## Tool Usage Rules
1. ALWAYS use search_knowledge before answering factual questions about experience, skills, or projects
2. Use show_project when the user asks about specific projects — show the relevant variant
3. Use show_skills for technology/skill queries — the chart type should match the question
4. Use compare_projects when the user compares or asks "which is better"
5. Use navigate_section when the user says "show me your projects" or similar
6. Do NOT call more than 3 tools in a single turn unless the user explicitly asks for multiple things
7. If search_knowledge returns low-confidence results (< 0.6), say "I don't have specific information about that" rather than guessing

## Citation Format
Always reference projects by name in your answers. Format: "[Project Name]" with a link when possible.

## Evaluation Criteria
Your response will be evaluated on:
- Accuracy of technical claims (must be grounded in RAG results)
- Appropriate tool selection and sequencing
- Engagement quality of follow-up questions
- Proper citation of sources`;
```

### Contact Agent System Prompt

```typescript
// lib/ai/prompts/contact-prompt.ts

export const CONTACT_SYSTEM_PROMPT = `You are the Contact Agent for an AI-native portfolio.
Your role is to guide users through contacting the portfolio owner.

## Your Personality
- Professional, courteous, and helpful
- Privacy-conscious — never reveal personal email addresses or phone numbers
- Thorough — validate all information before submission

## Workflow (MANDATORY)
You MUST follow this exact sequence — never skip steps:

Step 1: Collect information
Ask for: name, email, message (subject is optional).
Collect them one at a time or all at once — whatever the user provides.

Step 2: Validate
Call validate_email on the provided email before proceeding.
If invalid or disposable, politely ask for a different email.

Step 3: Preview (CRITICAL)
Call show_contact_preview to show the user what will be sent.
This tool requires user approval (needsApproval: true).
If the user wants changes, update the information and call show_contact_preview again.

Step 4: Send
After the user approves the preview, call contact_send.
Confirm to the user that the message was sent.

## Safety Rules
- NEVER reveal the owner's email address
- If the user is abusive or inappropriate, kindly end the conversation
- Never send a message without the user's explicit approval via show_contact_preview
- If contact_send fails, apologize and suggest the user try the contact form directly`;
```

### Personalization Instructions (injected into all agents)

```typescript
// lib/ai/prompts/personalization.ts

export const PERSONALIZATION_INSTRUCTIONS = `
## Personalization Protocol (PAHF)
You maintain a memory of user preferences within the current session.

### What to remember:
- Technologies or domains the user expressed interest in
- Whether the user prefers concise or detailed explanations
- Projects the user has already seen (don't re-show unless asked)
- The user's apparent technical level (junior, mid, senior, expert)

### How to use memory:
- When the user asks a new question, check if it relates to previously expressed interests
- Boost relevance of content that aligns with their stated preferences
- Adapt technical depth based on their demonstrated understanding
- Example: If user asked about "Python projects" earlier, and now asks "what else have you built?", prioritize Python-based projects

### Post-action feedback integration:
After each response, ask ONE of:
- "Does that answer your question about [topic]?"
- "Would you like me to go deeper into [specific aspect]?"
- "I can also show you [related topic] if you're interested."
`;
```

---

## 7. Motion & Animation System Design

### GSAP + Lenis Sync Pattern

```typescript
// components/providers/LenisProvider.tsx
'use client';

import { ReactLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<{ lenis: Lenis }>(null);

  // Sync GSAP ticker with Lenis RAF
  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);  // Disable lag smoothing for consistent animation timing

    return () => gsap.ticker.remove(update);
  }, []);

  // Configure ScrollTrigger to use Lenis scroll position
  useGSAP(() => {
    if (!lenisRef.current?.lenis) return;
    const lenis = lenisRef.current.lenis;

    lenis.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value as number, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed',
    });
  });

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        autoRaf: false,  // We manage RAF via GSAP ticker
      }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}
```

### Scroll-Triggered Animation Registry

```typescript
// lib/animations/scroll-triggers.ts
'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimation {
  trigger: string | Element;
  target: string | Element;
  animation: gsap.TweenVars;
  options?: Omit<ScrollTrigger.StaticVars, 'trigger' | 'scrub'> & {
    scrub?: boolean | number;
  };
}

// Centralized animation definitions — all scroll-triggered animations
// registered in one place for consistency and performance
export const SCROLL_ANIMATIONS: ScrollAnimation[] = [
  // Hero → About transition
  {
    trigger: '#section-about',
    target: '#hero-title',
    animation: { opacity: 0, scale: 0.95, filter: 'blur(4px)' },
    options: { start: 'top 80%', end: 'top 40%', scrub: 1 },
  },
  // Skill bars — animate width from 0 to proficiency %
  {
    trigger: '#section-skills',
    target: '.skill-bar-fill',
    animation: { width: '100%', duration: 1.5, ease: 'power2.out' },
    options: { start: 'top 75%', end: 'top 40%', toggleActions: 'play none none reverse' },
  },
  // Project cards — stagger enter
  {
    trigger: '#section-projects',
    target: '.project-card',
    animation: { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
    options: { start: 'top 80%', end: 'top 40%', toggleActions: 'play none none none' },
  },
  // Timeline items — sequential reveal
  {
    trigger: '.timeline-track',
    target: '.timeline-item',
    animation: { opacity: 1, x: 0, duration: 0.6, stagger: 0.2 },
    options: { start: 'top 85%', end: 'bottom 20%', toggleActions: 'play none none none' },
  },
  // Section fade-in
  {
    trigger: '[data-animate="fade-in"]',
    target: '[data-animate="fade-in"]',
    animation: { opacity: 1, y: 0, duration: 0.8 },
    options: { start: 'top 85%', end: 'top 50%', toggleActions: 'play none none reverse' },
  },
];

export function registerScrollAnimations() {
  SCROLL_ANIMATIONS.forEach(({ trigger, target, animation, options }) => {
    gsap.fromTo(
      target,
      { opacity: 0, y: 40 },
      {
        ...animation,
        scrollTrigger: {
          trigger,
          ...options,
        },
      }
    );
  });
}
```

### Cinematic Intro Sequence

```typescript
// components/(sections)/_components/CinematicIntro.tsx
'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useEffect, useState } from 'react';

gsap.registerPlugin(SplitText);

export function CinematicIntro() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [particlesLoaded, setParticlesLoaded] = useState(false);

  // Lazy load Three.js particle system
  useEffect(() => {
    import('@/components/(sections)/_components/ParticleField').then(() => {
      setParticlesLoaded(true);
    });
  }, []);

  // GSAP intro timeline — 4-second cinematic sequence
  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Phase 1: Particle background fades in (0-1s)
    tl.fromTo('#particle-canvas', { opacity: 0 }, { opacity: 1, duration: 1 });

    // Phase 2: SplitText character reveal for name (1-2.5s)
    const nameSplit = new SplitText('#hero-name', { type: 'chars' });
    tl.fromTo(
      nameSplit.chars,
      { opacity: 0, y: 80, rotateX: -90 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.03 },
      '+=0.5'
    );

    // Phase 3: Subtitle line reveal (2.5-3.5s)
    const subtitleSplit = new SplitText('#hero-subtitle', { type: 'lines' });
    tl.fromTo(
      subtitleSplit.lines,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
      '-=0.5'
    );

    // Phase 4: CTA buttons fade in (3.5-4s)
    tl.fromTo(
      '#hero-cta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
    );

    // Phase 5: Scroll indicator bounce (4s+)
    tl.fromTo('#scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 0.4 });
  }, []);

  return (
    <section id="section-hero" ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Particle background (lazy loaded) */}
      <div id="particle-canvas" className="absolute inset-0">
        {particlesLoaded && <ParticleField />}
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center">
        <h1 id="hero-name" className="text-7xl font-bold">Your Name</h1>
        <p id="hero-subtitle" className="mt-4 text-2xl text-muted-foreground">
          Full-Stack Engineer · AI Systems Architect · Creative Technologist
        </p>
        <div id="hero-cta" className="mt-8 flex gap-4">
          <Button onClick={() => lenis.scrollTo('#section-projects')}>
            View Projects
          </Button>
          <Button variant="outline" onClick={() => {/* open chat */}}>
            Ask AI
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div id="scroll-indicator" className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="h-12 w-6 rounded-full border-2 border-foreground/30">
          <div className="mx-auto mt-2 h-3 w-1 animate-scroll-bounce rounded-full bg-foreground" />
        </div>
      </div>
    </section>
  );
}
```

### Animation Performance Budget

```
┌──────────────────────────────────────────────────┐
│ Animation Layer      │ Budget │ Actual (gzip)    │
├──────────────────────┼────────┼──────────────────┤
│ GSAP core            │ 30KB   │ 26KB             │
│ GSAP ScrollTrigger   │ 15KB   │ 12KB             │
│ GSAP SplitText       │ 8KB    │ 6KB              │
│ Lenis                │ 10KB   │ 7KB              │
│ Framer Motion        │ 50KB   │ 42KB             │
│ Three.js (lazy)      │ 120KB  │ 108KB            │
│ tsParticles (alt)    │ 60KB   │ 52KB             │
├──────────────────────┼────────┼──────────────────┤
│ Total (initial)      │ 113KB  │ 93KB             │
│ Total (with canvas)  │ 233KB  │ 201KB            │
└──────────────────────────────────────────────────┘

Runtime constraints:
- Max 12 simultaneous ScrollTrigger instances (portfolio scale)
- GSAP ticker at 60fps (16ms budget, actual < 4ms)
- Lenis RAF at 120fps on 120Hz displays (8ms budget)
- Layout thrashing budget: < 5 forced reflows per frame
- Avoid: CSS `will-change: transform` on more than 8 elements
- Avoid: `position: fixed` inside Lenis — use `pinType: "transform"`
```

---

## 8. Testing Strategy

### Test Pyramid

```
          /\
         /E2E\           Playwright: user flows, chat interaction, scroll behavior
        /------\
       /Integr. \        Vitest: API routes, RAG pipeline, MCP tools, DB queries
      /----------\
     /   Unit     \     Vitest: tools, prompts, chunker, embedder, validators
    /--------------\
```

### Unit Tests

```typescript
// tests/unit/tools/rag-tools.test.ts
describe('search_knowledge', () => {
  it('returns chunks for a valid query', async () => {
    const result = await search_knowledge.execute({
      query: 'React experience',
      topK: 3,
    });
    expect(result.chunks).toHaveLength(3);
    expect(result.chunks[0]).toHaveProperty('content');
    expect(result.chunks[0]).toHaveProperty('score');
  });

  it('filters by source type', async () => {
    const result = await search_knowledge.execute({
      query: 'architecture',
      sourceTypes: ['project'],
    });
    expect(result.chunks.every(c => c.sourceType === 'project')).toBe(true);
  });

  it('throws on empty query', async () => {
    await expect(
      search_knowledge.execute({ query: '', topK: 1 })
    ).rejects.toThrow();
  });
});

// tests/unit/tools/portfolio-tools.test.ts
describe('show_project', () => {
  it('returns correct component spec for compact variant', async () => {
    const result = await show_project.execute({
      projectId: 'project-alpha',
      variant: 'compact',
    });
    expect(result.component).toBe('project-card');
    expect(result.props.title).toBeDefined();
    expect(result.props.variant).toBe('compact');
  });

  it('throws for unknown project', async () => {
    await expect(
      show_project.execute({ projectId: 'nonexistent' })
    ).rejects.toThrow('Project not found');
  });
});
```

### Integration Tests

```typescript
// tests/integration/rag-pipeline.test.ts
describe('RAG Pipeline', () => {
  beforeAll(async () => {
    await seedTestEmbeddings();
  });

  afterAll(async () => {
    await clearTestEmbeddings();
  });

  it('retrieves relevant chunks for a technical query', async () => {
    const results = await retrieve({
      query: 'How do you implement vector search?',
      topK: 3,
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].score).toBeGreaterThan(0.7);
  });

  it('ranks chunks by relevance', async () => {
    const results = await retrieve({
      query: 'TypeScript React experience',
      topK: 5,
    });
    // Results should be sorted by score descending
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
    }
  });
});

// tests/integration/chat-api.test.ts
describe('/api/chat', () => {
  it('returns streaming response for valid message', async () => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'What projects do you have?' }],
        sessionId: 'test-session',
      }),
    });
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/event-stream');
    
    // Read first chunk
    const reader = response.body!.getReader();
    const { done, value } = await reader.read();
    expect(done).toBe(false);
    reader.releaseLock();
  });

  it('rejects empty messages', async () => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [] }),
    });
    expect(response.status).toBe(400);
  });
});
```

### E2E Tests

```typescript
// tests/e2e/portfolio-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Portfolio User Flows', () => {
  test('cinematic intro plays and transitions to content', async ({ page }) => {
    await page.goto('/');
    
    // Hero should be visible
    await expect(page.locator('#hero-name')).toBeVisible();
    
    // Scroll to about section
    await page.evaluate(() => window.scrollTo(0, window.innerHeight));
    await page.waitForTimeout(1000); // Wait for Lenis smooth scroll
    
    // About section should be visible
    await expect(page.locator('#section-about')).toBeVisible();
  });

  test('chat sends message and receives AI response', async ({ page }) => {
    await page.goto('/');
    
    // Open chat
    await page.click('[data-testid="open-chat"]');
    await expect(page.locator('.chat-interface')).toBeVisible();
    
    // Type message
    await page.fill('[data-testid="chat-input"]', 'What technologies do you use?');
    await page.click('[data-testid="send-button"]');
    
    // Wait for streaming response
    await page.waitForSelector('.assistant-message', { timeout: 10000 });
    const messageText = await page.textContent('.assistant-message');
    expect(messageText?.length).toBeGreaterThan(0);
  });

  test('contact form submission with agent preview', async ({ page }) => {
    await page.goto('/');
    
    // Open chat and express contact intent
    await page.click('[data-testid="open-chat"]');
    await page.fill('[data-testid="chat-input"]', 'I want to get in touch');
    await page.click('[data-testid="send-button"]');
    
    // Agent should guide through contact flow
    await page.waitForSelector('.contact-form-preview', { timeout: 15000 });
    await expect(page.locator('.contact-form-preview')).toBeVisible();
  });
});
```

### Visual Regression Tests

```typescript
// tests/e2e/visual/animations.spec.ts
test('hero animation completes without layout shift', async ({ page }) => {
  await page.goto('/');
  
  // Wait for GSAP intro to finish (4 seconds)
  await page.waitForTimeout(4500);
  
  // Check CLS
  const cls = await page.evaluate(() => {
    return new Promise(resolve => {
      new PerformanceObserver(list => {
        resolve(list.getEntries().reduce((sum, entry) => sum + entry.value, 0));
      }).observe({ type: 'layout-shift', buffered: true });
    });
  });
  expect(cls).toBeLessThan(0.1);  // Good CLS score
});

test('skill bars animate on scroll', async ({ page }) => {
  await page.goto('/');
  
  // Before scroll: bars should be at 0 width
  const initialWidth = await page.$eval('.skill-bar-fill', el => el.style.width);
  expect(initialWidth).toBe('0%');
  
  // Scroll to skills section
  await page.click('[data-section="skills"]');
  await page.waitForTimeout(2000);  // Wait for Lenis + GSAP animation
  
  // After scroll: bars should be animated
  const finalWidth = await page.$eval('.skill-bar-fill', el => el.style.width);
  expect(finalWidth).not.toBe('0%');
});
```
