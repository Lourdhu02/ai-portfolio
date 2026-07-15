# Vercel AI SDK RAG Agent Guide

**URL:** https://ai-sdk.dev/cookbook/guides/rag-chatbot

A guide to building a RAG agent with Next.js 14 + AI SDK + Drizzle ORM + Postgres/pgvector.

## Architecture
- Embeddings: `openai/text-embedding-ada-002` via `embedMany()`
- Chunking: sentence-based splitting
- Retrieval: cosine similarity with HNSW index
- Generation: `streamText()` with tool calls
- Tools: `addResource` (create + embed) and `getInformation` (retrieve)

## Stack
Next.js 14, AI SDK, Vercel AI Gateway, Drizzle ORM, Postgres + pgvector, shadcn-ui, TailwindCSS
