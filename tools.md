# Tools & Libraries

- **Next.js 16** — React framework with App Router, RSC, Turbopack, streaming SSR. Core platform for all portfolio projects.
- **React 19** — Concurrent rendering, Server Actions, `use()` hook, improved hydration. UI layer foundation.
- **Tailwind CSS v4** — CSS-first utility framework with `@theme` tokens, no config file needed. Styling for all referenced portfolios.
- **Framer Motion / motion** — Declarative React animation library with layout animations, AnimatePresence, spring physics. Used by rollacode, emredogan, psjprajna.
- **Vercel AI SDK** — `streamText`, `useChat`, tool calling, multi-step agents. Backend for chat in YiWang24, emredogan, and psjprajna portfolios.
- **Claude API (Anthropic)** — Haiku 4.5 / Sonnet 4.6 for low-latency streaming RAG synthesis. Used by emredogan (Lumina) and psjprajna.
- **Gemini 2.5 Flash (Google)** — Fast reasoning + native tool use. Used by enriquekalven (A2UI) and rollacode (Grok-compatible).
- **pgvector / Supabase** — PostgreSQL vector extension for HNSW/IVFFlat similarity search. Embedding store in YiWang24 and psjprajna.
- **Voyage AI** — Multilingual embedding models (voyage-3, 1024-dim). Used by psjprajna for cross-lingual RAG.
- **Resend** — Transactional email API for contact forms. Used by emredogan and YiWang24.
- **GSAP** — GreenSock Animation Platform for scroll-triggered timelines, SplitText. Used in cinematic portfolios for scroll-synced narratives.
- **Lenis** — Smooth scroll library with velocity-based parallax. Paired with Framer Motion/GSAP in premium portfolios.
- **Turborepo** — Monorepo orchestration for sharing core packages. Used by rollacode/ai-portfolio monorepo.
- **Cloudflare Workers** — Edge runtime via OpenNext. Deployment target for psjprajna portfolio.
- **next-intl** — Internationalization with RTL support. Used by psjprajna for EN/AR bilingual portfolio.
