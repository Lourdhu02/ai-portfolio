import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ECHOME — Lourdu Raju',
  description: 'Autonomous agentic AI system with three-tier memory architecture and adaptive psychometric assessment.',
}

export default function Echome() {
  return (
    <article className="pt-24 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/" className="text-sm text-text-tertiary hover:text-text transition-colors duration-150 mb-12 inline-block">
          ← Back
        </Link>
        
        <header className="mb-16">
          <p className="mb-4 text-sm tracking-wide text-text-tertiary uppercase">Case Study</p>
          <h1 className="text-4xl font-semibold tracking-tight leading-tight md:text-5xl mb-4">
            ECHOME
          </h1>
          <p className="text-lg text-text-secondary">
            Cognitive Mirror Engine — an autonomous agentic AI with three-tier memory for long-horizon reasoning.
          </p>
        </header>

        <div className="prose text-text-secondary">
          <h2>Vision</h2>
          <p>
            ECHOME is an autonomous agentic AI system designed to mirror human cognitive processes. 
            Built on LangGraph, it maintains a three-tier memory architecture that enables long-horizon 
            reasoning and adaptive assessment — moving beyond simple chat interactions to genuine understanding.
          </p>

          <h2>Architecture</h2>
          
          <h3>Three-Tier Memory</h3>
          <ul>
            <li><strong>Episodic Memory:</strong> Stores specific interaction sequences and outcomes for pattern recognition</li>
            <li><strong>Semantic Memory:</strong> Maintains structured knowledge graphs for conceptual understanding</li>
            <li><strong>Procedural Memory:</strong> Encodes learned workflows and decision trees for autonomous execution</li>
          </ul>

          <h3>Adaptive Assessment</h3>
          <p>
            Integrated CAT (Computerized Adaptive Testing) and IRT (Item Response Theory) psychometric models 
            with Fisher Information maximization. The system dynamically adjusts assessment difficulty based on 
            real-time performance signals, reducing assessment time from 30 minutes to 9 minutes — a 70% improvement.
          </p>

          <h2>Key Features</h2>
          <ul>
            <li>Autonomous multi-step reasoning with tool use</li>
            <li>Real-time adaptive difficulty calibration</li>
            <li>Privacy-first local deployment (no cloud dependency)</li>
            <li>XTTSv2 zero-shot voice cloning for natural interaction</li>
            <li>Long-horizon task execution across sessions</li>
          </ul>

          <h2>Tech Stack</h2>
          <ul>
            <li><strong>Framework:</strong> LangGraph, LangChain</li>
            <li><strong>Psychometrics:</strong> Custom CAT/IRT implementation, Fisher Information</li>
            <li><strong>Voice:</strong> XTTSv2 zero-shot cloning</li>
            <li><strong>Deployment:</strong> Local-first architecture, Ollama for inference</li>
          </ul>

          <h2>Impact</h2>
          <p>
            Demonstrated that agentic AI systems can perform genuine cognitive tasks — not just pattern matching, 
            but adaptive reasoning that responds to individual user patterns. The 70% reduction in assessment time 
            validates the psychometric integration approach for production adaptive systems.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <a
            href="https://github.com/Lourdhu02/echome"
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
