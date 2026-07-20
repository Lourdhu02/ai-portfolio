import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FinSentinelAI — Lourdu Raju',
  description: 'Privacy-first enterprise RAG platform with local LLMs, hybrid retrieval, and multi-tenant isolation.',
}

export default function FinSentinelAI() {
  return (
    <article className="pt-24 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/" className="text-sm text-text-tertiary hover:text-text transition-colors duration-150 mb-12 inline-block">
          ← Back
        </Link>
        
        <header className="mb-16">
          <p className="mb-4 text-sm tracking-wide text-text-tertiary uppercase">Case Study</p>
          <h1 className="text-4xl font-semibold tracking-tight leading-tight md:text-5xl mb-4">
            FinSentinelAI
          </h1>
          <p className="text-lg text-text-secondary">
            Privacy-first enterprise RAG platform for regulated finance with strict data sovereignty requirements.
          </p>
        </header>

        <div className="prose text-text-secondary">
          <h2>Problem</h2>
          <p>
            Financial institutions need intelligent document analysis but cannot send sensitive data to cloud APIs. 
            Regulatory constraints demand complete data sovereignty — every byte must stay on-premise. 
            Existing RAG solutions assume cloud-hosted models, creating a fundamental tension between capability and compliance.
          </p>

          <h2>Approach</h2>
          <p>
            Built a production-grade RAG platform that runs entirely locally using Ollama for LLM inference. 
            The system processes PDFs and bank statements through local Vision-Language Models, 
            extracting structured data without any data leaving the network boundary.
          </p>

          <h3>Hybrid Retrieval</h3>
          <p>
            Combined dense embeddings with sparse retrieval for robust document search. 
            Added a faithfulness verification layer that validates generated responses against source documents, 
            preventing hallucination in high-stakes financial contexts.
          </p>

          <h3>Multi-Tenant Isolation</h3>
          <p>
            Implemented JWT-based session isolation ensuring complete separation between tenants. 
            Each client&apos;s documents, embeddings, and conversation history are cryptographically isolated — 
            a requirement for regulated finance environments.
          </p>

          <h2>Key Features</h2>
          <ul>
            <li>Local LLM inference via Ollama (no cloud dependency)</li>
            <li>Multi-modal extraction from PDFs and bank statements</li>
            <li>Hybrid retrieval with dense + sparse search</li>
            <li>Faithfulness verification layer</li>
            <li>JWT-based multi-tenant session isolation</li>
            <li>ChromaDB for vector storage</li>
          </ul>

          <h2>Tech Stack</h2>
          <ul>
            <li><strong>LLM:</strong> Ollama (local inference)</li>
            <li><strong>VLMs:</strong> Local Vision-Language Models for document parsing</li>
            <li><strong>Vector DB:</strong> ChromaDB</li>
            <li><strong>Retrieval:</strong> sentence-transformers, hybrid search</li>
            <li><strong>Auth:</strong> JWT multi-tenant isolation</li>
            <li><strong>Framework:</strong> LangChain, FastAPI</li>
          </ul>

          <h2>Impact</h2>
          <p>
            Built for regulated finance customers with strict on-premise / data-residency constraints. 
            The platform demonstrates that enterprise-grade RAG capabilities don&apos;t require cloud dependency — 
            achieving comparable accuracy while maintaining complete data sovereignty.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <a
            href="https://github.com/Lourdhu02/fin-sentinal.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-text transition-colors duration-150"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </article>
  )
}
