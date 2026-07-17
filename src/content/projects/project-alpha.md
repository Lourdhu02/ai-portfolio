# AI-Native Interactive Portfolio Platform

## Architecture
A multi-agent RAG-powered portfolio platform built with Next.js 16, React 19, and the Vercel AI SDK. Features a three-agent architecture (Router, Tech Lead, Contact) with pgvector-powered semantic search over personal knowledge base.

## Tech Stack
- Next.js 16 with Turbopack
- React 19 Server Components
- Vercel AI SDK v6 (streamText, useChat, tool calling)
- Claude Haiku 4.5 (Router Agent) + Sonnet 4.6 (Tech Lead Agent)
- pgvector HNSW on Supabase
- Voyage AI voyage-3 embeddings (1024-dim)
- GSAP + Lenis + Framer Motion animation tier
- Resend for email

## Implementation
The RAG pipeline uses semantic chunking to split profile data, project READMEs, and skill descriptions into atomic units. Each chunk is embedded via Voyage AI voyage-3 and stored in pgvector with an HNSW index. At query time, the Tech Lead Agent retrieves the top-5 most relevant chunks using cosine similarity, re-ranks them via a cross-encoder, and synthesizes a streaming response with citations.

## Key Features
- Multi-agent orchestration with intent routing
- Streaming RAG with source citations
- Agent-driven UI (A2UI pattern)
- Cinematic scroll narrative with GSAP + Lenis
- PAHF personalization loop (pre-action clarification → memory-grounded action → post-action feedback)
- MCP protocol for tool discovery
