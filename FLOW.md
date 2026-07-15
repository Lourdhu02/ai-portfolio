# AI-Native Interactive Portfolio Platform — Flow Diagrams

## 1. User Session Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Landing: User visits portfolio URL
    
    state Landing {
        [*] --> CinematicIntro: 4s GSAP timeline plays
        CinematicIntro --> ScrollNarrative: Scroll down
        CinematicIntro --> OpenChat: Click "Ask AI" CTA
        ScrollNarrative --> SectionView: ScrollTrigger fires
        SectionView --> OpenChat: Clicks chat button
        SectionView --> ScrollNarrative: Continues scrolling
    }
    
    Landing --> ActiveSession: Opens chat OR Lenis scroll interaction
    
    state ActiveSession {
        [*] --> Browsing: Passive scroll exploration
        
        Browsing --> Chatting: Clicks chat / asks question
        Browsing --> ContactInit: Clicks contact CTA
        
        state Chatting {
            [*] --> AwaitingInput: Chat panel open
            AwaitingInput --> AgentProcessing: User sends message
            AgentProcessing --> AgentResponding: streamText active
            AgentResponding --> AgentUIUpdate: Agent calls show_project
            AgentResponding --> AgentTextResponse: Agent returns text
            AgentUIUpdate --> AwaitingInput: Component rendered
            AgentTextResponse --> AwaitingInput: Text stream complete
        }
        
        Chatting --> Browsing: Closes chat / continues scroll
        Chatting --> ContactInit: Expresses contact intent
        
        state ContactInit {
            [*] --> CollectInfo: Agent asks for name/email/message
            CollectInfo --> ValidateEmail: Agent calls validate_email
            ValidateEmail --> ShowPreview: Email valid
            ValidateEmail --> CollectInfo: Email invalid → retry
            ShowPreview --> UserApproves: show_contact_preview rendered
            ShowPreview --> CollectInfo: User requests changes
            UserApproves --> ContactSent: Agent calls contact_send (needsApproval)
        }
        
        ContactInit --> Browsing: Message sent
        ContactInit --> Chatting: User changes mind
    }
    
    ActiveSession --> Idle: 5 min no interaction
    Idle --> ActiveSession: User interacts again
    Idle --> SessionEnd: 30 min timeout
    ActiveSession --> SessionEnd: User navigates away
    
    SessionEnd --> [*]: Session persisted to Supabase
```

---

## 2. Chat Message Flow — Input → Routing → Tool Call → Stream → Render

```mermaid
sequenceDiagram
    participant U as User
    participant C as ChatInterface (Client)
    participant API as /api/chat (Next.js Route Handler)
    participant RA as Router Agent (Claude Haiku 4.5)
    participant PAHF as Personalization Layer
    participant TLA as Tech Lead Agent (Claude Sonnet 4.6)
    participant MCP as Portfolio MCP Server
    participant RAG as RAG Pipeline (pgvector + Voyage AI)
    participant UI as AgentDrivenUI (Component Registry)

    U->>C: Types "What projects use AI and GraphQL?"
    C->>API: POST /api/chat { messages, sessionId }
    
    Note over API: createAgentUIStreamResponse(agent, uiMessages)
    
    API->>RA: streamText({ model: "anthropic/claude-haiku-4.5" })
    
    RA->>RA: Classifies intent: "tech_question"
    RA-->>API: { type: "reasoning", text: "User asking about AI + GraphQL projects" }
    API-->>C: SSE: reasoning chunk
    C->>U: Shows "Thinking..." with reasoning indicator
    
    RA->>RA: Calls routeIntent("tech_lead", confidence: 0.95)
    RA-->>API: { type: "tool-call", toolName: "routeIntent", args: {...} }
    API-->>C: SSE: tool-call chunk
    C->>C: Renders ToolInvocation in ActivityPanel
    
    Note over API: Delegation happens — new agent takes over
    
    API->>TLA: Delegates to Tech Lead Agent
    
    TLA->>PAHF: Check session memory
    PAHF-->>TLA: User previously asked about "React" and "TypeScript"
    
    TLA-->>API: { type: "reasoning", text: "User wants AI+GraphQL... they mentioned React earlier" }
    API-->>C: SSE: reasoning chunk
    C->>U: Updates reasoning display
    
    TLA->>MCP: search_knowledge("AI and GraphQL projects using React")
    MCP->>RAG: embed("AI and GraphQL projects using React") → 1024-dim vector
    RAG->>RAG: HNSW cosine similarity search (top_k=5)
    RAG-->>MCP: [{ chunk: "...", score: 0.91, projectId: "project-alpha" }, ...]
    MCP-->>TLA: Retrieved chunks with metadata
    
    TLA-->>API: { type: "tool-call", toolName: "search_knowledge", args, result }
    API-->>C: SSE: tool-call + tool-result
    C->>C: ActivityPanel updates: search_knowledge completed
    
    TLA->>MCP: show_project("project-alpha", { variant: "detailed" })
    MCP-->>TLA: { component: "project-card", props: { title: "Project Alpha", ... } }
    
    TLA-->>API: { type: "tool-call", toolName: "show_project", args, result }
    API-->>C: SSE: tool-call + tool-result
    C->>C: ActivityPanel: show_project completed
    
    TLA->>MCP: show_project("project-beta", { variant: "detailed" })
    MCP-->>TLA: { component: "project-card", props: { title: "Project Beta", ... } }
    
    TLA-->>API: { type: "tool-call", toolName: "show_project", args, result }
    API-->>C: SSE: tool-call + tool-result
    C->>C: ActivityPanel: second show_project completed
    
    TLA-->>API: { type: "text", text: "I have two projects combining AI and GraphQL..." }
    API-->>C: SSE: text chunk (streaming)
    C->>U: Streaming text in MessageBubble
    
    Note over TLA: stopWhen: stepCountIs(6) — turn complete
    
    C->>UI: Renders ProjectCardAgent ×2 from tool results
    UI-->>U: Two project cards displayed below chat
    
    C->>C: Post-action feedback generation
    C->>U: SuggestionChips: "Compare both projects", "Tell me about the RAG pipeline"
    
    U->>C: Clicks "Compare both projects"
    C->>API: POST /api/chat { messages: [...prev, "Compare both projects"] }
    
    Note over API: Second turn — faster because session context is warm
    
    API->>TLA: Continues session
    TLA->>MCP: compare_projects(["project-alpha", "project-beta"], ["tech", "complexity", "impact"])
    MCP-->>TLA: { component: "comparison-table", props: {...} }
    TLA-->>API: Streaming response + tool call
    API-->>C: SSE stream
    C->>UI: Renders ComparisonTable
    UI-->>U: Side-by-side comparison table visible
```

### Stream Part Types (Vercel AI SDK v6 `UIMessage`)

```mermaid
graph LR
    subgraph "SSE Stream from createAgentUIStreamResponse"
        A[text delta] --> B{Message part type}
        C[tool-call] --> B
        D[tool-result] --> B
        E[source] --> B
        F[reasoning] --> B
        G[error] --> B
        H[step-start] --> B
        I[step-end] --> B
    end
    
    subgraph "Client Rendering (useChat → message.parts)"
        B --> J[StreamingText<br/>char-by-char]
        B --> K[ToolInvocation<br/>Collapsible card]
        B --> L[CitationMarker<br/>Superscript #1]
        B --> M[ReasoningBlock<br/>Expandable trace]
        B --> N[ErrorSurface<br/>What/Why/Next]
        B --> O[StepIndicator<br/>Progress bar]
    end
    
    subgraph "AgentDrivenUI (from tool-result with component)"
        K --> P[ComponentRegistry.lookup(type)]
        P --> Q[ProjectCardAgent]
        P --> R[SkillChartAgent]
        P --> S[ComparisonTable]
    end
```

---

## 3. RAG Retrieval Pipeline

```mermaid
flowchart TB
    subgraph "INGESTION (build-time + on-demand)"
        A1[profile.json] --> C[Semantic Chunker]
        A2[project READMEs] --> C
        A3[blog posts] --> C
        A4[skills.json] --> C
        
        C -->|source_type: profile| CH1[Chunk: Bio<br/>~200 tokens]
        C -->|source_type: profile| CH2[Chunk: Experience<br/>~300 tokens]
        C -->|source_type: project| CH3[Chunk: Project Alpha Arch<br/>~512 tokens]
        C -->|source_type: project| CH4[Chunk: Project Alpha Tech<br/>~512 tokens]
        C -->|source_type: skill| CH5[Chunk: React<br/>~128 tokens]
        
        CH1 --> EMB[Voyage AI voyage-3<br/>embedMany()]
        CH2 --> EMB
        CH3 --> EMB
        CH4 --> EMB
        CH5 --> EMB
        
        EMB -->|1024-dim vectors| PG[(pgvector HNSW<br/>m=16, ef_construction=200)]
        PG -->|metadata| PG
    end
    
    subgraph "QUERY TIME"
        Q[User Query: "Tell me about your RAG experience"] --> QE[Voyage AI embed<br/>input_type: "query"]
        QE --> VQ[1024-dim query vector]
        VQ --> HNSW[HNSW Search<br/>cosine similarity<br/>top_k=5]
        HNSW --> PG
        PG --> RAW[5 raw results<br/>scores: 0.92, 0.87, 0.81, 0.74, 0.65]
        
        RAW --> CONF{confidence<br/>check}
        CONF -->|min score > 0.7| RERANK[Cross-encoder<br/>re-ranker]
        CONF -->|min score < 0.7| EXPAND[Expand query<br/>+2 keyword synonyms]
        EXPAND --> QE2[Re-embed]
        QE2 --> HNSW2[HNSW Search<br/>top_k=5]
        HNSW2 --> RAW2[10 total results]
        RAW2 --> RERANK
        
        RERANK --> TOP3[Top 3 chunks<br/>re-ranked]
        TOP3 --> CTX[Context Window Assembly<br/>max 4000 tokens]
        
        CTX --> SYNTH[Synthesis: Claude Sonnet 4.6]
        
        subgraph "Context Window"
            CW1["Chunk: 'Built RAG pipeline with pgvector...'<br/>source: project-alpha<br/>score: 0.94"]
            CW2["Chunk: 'Experience with vector databases...'<br/>source: profile<br/>score: 0.89"]
            CW3["Chunk: 'Used Voyage AI for multilingual embeddings...'<br/>source: project-beta<br/>score: 0.85"]
        end
        
        CTX --> CW1
        CTX --> CW2
        CTX --> CW3
        
        SYNTH -->|streamText| RESP[Streaming Response<br/>+ Citations]
    end
    
    subgraph "FEEDBACK LOOP"
        RESP --> F{User feedback}
        F -->|thumbs up| LOG[Query Log: positive]
        F -->|thumbs down| LOG2[Query Log: negative]
        LOG --> ADJ[Adjust boost_factor<br/>for low-performing chunks]
        LOG2 --> ADJ
        ADJ --> PG
    end
```

### Chunking Detail

```mermaid
flowchart LR
    subgraph "Source: Project README"
        README["# Project Alpha
## Architecture
Built with Next.js...
## Tech Stack
- React 19
- pgvector
- Voyage AI

## Implementation
The RAG pipeline uses..."]

        S1[Semantic Splitter]
        README --> S1
        
        S1 --> SC1["Chunk 1: # Project Alpha
## Architecture
Built with Next.js..."]
        S1 --> SC2["Chunk 2: ## Tech Stack
- React 19
- pgvector
- Voyage AI"]
        S1 --> SC3["Chunk 3: ## Implementation
The RAG pipeline uses..."]
    end
    
    subgraph "Chunk Metadata"
        SC1 --> M1["metadata: {
  sourceType: 'project',
  sourceId: 'project-alpha',
  section: 'architecture',
  tokenCount: 48
}"]
        SC2 --> M2["metadata: {
  sourceType: 'project',
  sourceId: 'project-alpha',
  section: 'tech-stack',
  tokenCount: 24
}"]
        SC3 --> M3["metadata: {
  sourceType: 'project', 
  sourceId: 'project-alpha',
  section: 'implementation',
  tokenCount: 156
}"]
    end
    
    subgraph "Code Block Preservation"
        CODE["```typescript
const result = await retrieve({
  query: '...',
  topK: 5
});
```"]
        S1 --> CODE
        CODE --> CB["Chunk: code block
(tokenCount: 32)
Preserved as atomic unit
— never split mid-function"]
    end
```

---

## 4. Project Showcase Interaction Flow

```mermaid
stateDiagram-v2
    [*] --> GridView: User scrolls to projects section
    
    state GridView {
        [*] --> AllProjects: Default view
        AllProjects --> FilteredView: Clicks filter pill (e.g., "AI", "React")
        FilteredView --> AllProjects: Clicks "All"
        FilteredView --> FilteredView: Changes filter
    }
    
    GridView --> HoverState: Mouse enters project card
    HoverState --> GridView: Mouse leaves
    
    HoverState --> ModalView: Clicks project card
    HoverState --> ChatView: Clicks "Ask AI about this"
    
    state ModalView {
        [*] --> ProjectDetail: Modal opens (Framer Motion AnimatePresence)
        ProjectDetail --> TechDeepDive: Clicks "Architecture" tab
        ProjectDetail --> CodeView: Clicks "Code" tab
        ProjectDetail --> LinksView: Clicks "Links" tab
        TechDeepDive --> ProjectDetail: Switches tab
        CodeView --> ProjectDetail: Switches tab
        LinksView --> ProjectDetail: Switches tab
    end
    
    ModalView --> GridView: Closes modal
    
    ChatView --> AgentResponse: Sends "Tell me about {project}" to /api/chat
    
    AgentResponse --> GridView: Agent shows project card in chat
    AgentResponse --> ModalView: Agent calls show_project with variant: "full"
    AgentResponse --> GridView: User continues browsing
    
    state AgentResponse {
        [*] --> SearchingRAG: Agent searches for project context
        SearchingRAG --> CallingShowProject: Agent calls show_project tool
        CallingShowProject --> RenderingCard: project-card component spec returned
        RenderingCard --> StreamingText: Agent describes project
        StreamingText --> [*]: Response complete
    }
```

### Section Navigation via Agent

```mermaid
sequenceDiagram
    participant U as User
    participant C as Chat
    participant A as AI Agent
    participant L as Lenis (Smooth Scroll)
    participant G as GSAP (Animation Engine)
    participant S as Section Component

    U->>C: "Show me your skills"
    C->>A: POST /api/chat
    
    A->>A: Identifies intent: skill_inquiry
    A->>A: Calls navigate_section("skills", duration: 1.5)
    A-->>C: { type: "tool-call", toolName: "navigate_section", args: { sectionId: "skills" } }
    
    C->>L: lenis.scrollTo("#section-skills", { duration: 1.5 })
    L->>L: Smooth scroll animation (1.5s)
    
    Note over L,G: Lenis emits scroll events → ScrollTrigger.update()
    G->>G: ScrollTrigger recalculates positions
    G->>S: Skill section enters viewport
    
    S->>S: SkillBar GSAP tweens trigger (width: 0% → 90%)
    S->>S: Section fade-in completes
    
    A->>A: Calls show_skills({ category: "all", chartType: "radar" })
    A-->>C: { type: "tool-result", component: "skill-chart", props: {...} }
    C->>C: Renders SkillChartAgent in AgentDrivenUI
    
    U->>U: Sees skill chart below chat + skills section scrolled into view
    
    A-->>C: Streams text: "Here are my skills across domains..."
    C->>U: Text appears in message bubble
```

---

## 5. Contact Form Submission Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Chat / ContactSection
    participant A as Contact Agent (Claude Haiku 4.5)
    participant V as Email Validator
    participant DB as Supabase
    participant R as Resend API
    participant O as Owner (email)

    U->>C: "I'd like to hire you for a project"
    
    Note over A: PAHF Step 1: Pre-action clarification
    
    A-->>C: "Great! I'd love to help. Could you share your name, email, and a brief description of what you're looking for?"
    C->>U: Displays message + contact form fields
    
    U->>C: "Sure, I'm Alice, alice@example.com, need help with AI system design"
    
    Note over A: PAHF Step 2: Memory-grounded action
    
    A->>V: validate_email("alice@example.com")
    V-->>A: { valid: true, formatValid: true, isDisposable: false }
    
    A->>A: Calls show_contact_preview({ name: "Alice", email: "alice@example.com", message: "need help with AI system design" })
    Note over A: needsApproval: true — execution PAUSES
    
    A-->>C: { type: "tool-call", toolName: "show_contact_preview", args: {...} }
    C->>C: Renders ContactFormPreview component
    C->>U: Shows preview card: "Does this look correct?"
    
    alt User wants changes
        U->>C: "Actually, my message is more detailed..."
        C->>A: Updates form fields
        A->>A: Calls show_contact_preview again with updated data
        A-->>C: Updated preview
        C->>U: Updated preview card
    end
    
    U->>C: "Looks good, send it"
    
    Note over A: PAHF Step 3: Post-action feedback → action
    
    A->>A: Calls contact_send({ name: "Alice", email: "alice@example.com", message: "..." })
    Note over A: needsApproval: true — but user already approved preview
    
    A->>DB: INSERT INTO contacts (name, email, message, ...)
    A->>R: POST /emails (to: owner@email.com, from: alice@example.com)
    R-->>A: { sent: true }
    
    A-->>C: "Your message has been sent! I'll get back to you within 24 hours."
    C->>U: Success confirmation
    
    R->>O: Email: "Portfolio Contact: Alice (alice@example.com)"
    
    Note over A: Stores session info for context in future interactions
    
    alt Validation fails
        U->>C: "alice@temp.com"
        A->>V: validate_email("alice@temp.com")
        V-->>A: { valid: false, isDisposable: true }
        A-->>C: "That email appears to be temporary. Could you use a different one?"
        C->>U: Validation error message
    end
```

### Contact Agent State Machine

```mermaid
stateDiagram-v2
    [*] --> Idle: Contact intent detected
    
    Idle --> CollectingName: "What's your name?"
    CollectingName --> CollectingEmail: Name received
    CollectingEmail --> ValidatingEmail: Email received
    ValidatingEmail --> CollectingEmail: Invalid → "Please try again"
    ValidatingEmail --> CollectingMessage: Valid email
    CollectingMessage --> ShowingPreview: Message received
    
    ShowingPreview --> EditingInfo: "Actually, change X"
    EditingInfo --> ShowingPreview: Updated preview
    
    ShowingPreview --> AwaitingApproval: Preview rendered
    AwaitingApproval --> ShowingPreview: "Make changes"
    
    AwaitingApproval --> Sending: "Looks good, send it"
    Sending --> Sent: contact_send success
    Sending --> Failed: contact_send error
    
    Failed --> ShowingPreview: "Let me try again"
    Failed --> [*]: "Please use the contact form"
    
    Sent --> [*]: "Message sent! I'll respond within 24 hours."
    
    state Idle {
        [*] --> Clarify: "What would you like to discuss?"
        Clarify --> [*]: User describes need
    }
```

---

## 6. Deployment Pipeline

```mermaid
flowchart LR
    subgraph "Development"
        DEV[Developer] --> GH[GitHub: main branch]
        GH --> CI[GitHub Actions CI]
    end
    
    subgraph "CI Pipeline (GitHub Actions)"
        CI --> LINT[Lint: ESLint + Prettier]
        CI --> TYPE[Type Check: tsc --noEmit]
        CI --> UNIT[Unit Tests: Vitest]
        CI --> BUILD[Build: next build --turbo]
        
        UNIT --> INT[Integration Tests: Vitest]
        INT --> E2E[E2E Tests: Playwright<br/>Chromium + Firefox + WebKit]
        
        BUILD --> DEPLOY_CHECK{Branch check}
        E2E --> DEPLOY_CHECK
    end
    
    subgraph "Preview Deployments"
        DEPLOY_CHECK -->|feature/*| PREVIEW[Vercel Preview<br/>per-branch URL]
        PREVIEW --> LIGHTHOUSE[Lighthouse CI<br/>performance budget check]
    end
    
    subgraph "Production Deployments"
        DEPLOY_CHECK -->|main| PROD_BUILD[Vercel Production<br/>next build --turbo]
        
        PROD_BUILD --> STATIC[Static Content<br/>RSC + ISR]
        PROD_BUILD --> API[API Routes<br/>Vercel Serverless Functions]
        
        STATIC --> EDGE[Vercel Edge Cache<br/>global CDN]
        API --> EDGE
        
        PROD_BUILD --> CRON[Vercel Cron Jobs<br/>Daily RAG sync]
    end
    
    subgraph "Post-Deploy"
        EDGE --> LIVE[Live Portfolio]
        LIVE --> MONITOR[Monitoring Stack]
        
        MONITOR --> VERCEL_ANALYTICS[Vercel Analytics<br/>page views, speed, AI usage]
        MONITOR --> SENTRY[Sentry<br/>error tracking, performance traces]
        MONITOR --> AI_DEVTOOLS[AI DevTools<br/>LLM call traces, token usage]
        
        CRON --> RAG_SYNC[RAG Embedding Sync<br/>POST /api/rag/sync]
        RAG_SYNC --> PG[(Supabase pgvector)]
    end
    
    subgraph "Deployment Config"
        ENV["Environment Variables:
ANTHROPIC_API_KEY
SUPABASE_URL
SUPABASE_SERVICE_KEY
VOYAGE_API_KEY
RESEND_API_KEY
SYNC_SECRET
AI_GATEWAY_API_KEY"]
    end
    
    PROD_BUILD --> ENV
```

### Build-Time vs Runtime Data Flow

```mermaid
flowchart TB
    subgraph "Build Time (next build)"
        CONTENT[content/*.json, *.md] --> BUNDLE[Bundled into RSC]
        CONTENT --> SYNC[scripts/sync-embeddings.ts]
        SYNC --> CHUNK[Semantic Chunker]
        CHUNK --> EMBED[Voyage AI embedMany]
        EMBED --> PG[(pgvector HNSW)]
        
        PG --> RSC[Server Components<br/>read from PG at build]
        RSC --> HTML[Static HTML + RSC Payload]
    end
    
    subgraph "Runtime"
        USER[User Request] --> CDN[Vercel Edge Cache]
        CDN --> SSR[Server-Side Render<br/>or serve static]
        SSR --> CLIENT[Client Hydration]
        
        CLIENT --> CHAT[/api/chat<br/>Agent Orchestrator]
        CHAT --> MCP[MCP Server<br/>tools/list, tools/call]
        MCP --> RAG_QUERY[pgvector<br/>similarity search]
        
        CHAT --> CLAUDE[Anthropic API<br/>Haiku + Sonnet]
    end
    
    subgraph "On-Demand (ISR + Cron)"
        UPDATE[Content Update] --> WEBHOOK[GitHub Webhook]
        WEBHOOK --> ISR[Incremental Static Regeneration]
        WEBHOOK --> CRON_JOB[Vercel Cron Job]
        CRON_JOB --> RESYNC[Re-embed changed content]
        RESYNC --> PG
    end
```

### Async Task Lifecycle (for long-running operations)

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant GH as GitHub
    participant CI as GitHub Actions
    participant V as Vercel
    participant P as PostgreSQL
    participant R as RAG Pipeline

    Dev->>GH: Pushes content update to content/projects/
    GH->>CI: Triggers CI workflow
    CI->>CI: Runs lint, typecheck, tests
    CI->>V: Deploys to Vercel
    
    Note over V,R: Post-deploy RAG sync
    
    V->>V: Triggers Vercel Cron Job (daily)
    V->>R: POST /api/rag/sync (with SYNC_SECRET)
    
    R->>R: Reads content files, checks hashes
    R->>R: Detects changed file: project-alpha.md
    R->>P: SELECT hash FROM embeddings WHERE source_id = 'project-alpha'
    
    alt Content changed
        R->>R: Semantic chunking of new content
        R->>R: Voyage AI embedMany (1024-dim)
        R->>P: DELETE embeddings WHERE source_id = 'project-alpha'
        R->>P: INSERT new embeddings with updated metadata
        R-->>V: { chunksProcessed: 8, elapsedMs: 2400 }
    else Content unchanged
        R-->>V: { chunksProcessed: 0, elapsedMs: 120 }
    end
    
    V-->>Dev: Deployment + sync complete
```

---

## Key Flow Metrics

| Flow Step | Target Latency | Monitoring |
|---|---|---|
| User types → first token displayed | < 500ms | Vercel Analytics, AI DevTools |
| RAG query → results returned | < 200ms | Custom logging in retriever |
| Tool call → UI component rendered | < 300ms | Performance Observer |
| GSAP intro completes | < 4000ms | Lighthouse metric |
| Lenis scroll → GSAP animation sync | < 16ms (60fps) | RequestAnimationFrame timing |
| Contact form → email delivered | < 2000ms | Resend webhooks |
| Build time (full) | < 30s | GitHub Actions timing |
| RAG sync (50 chunks) | < 5s | Cron job metrics |
