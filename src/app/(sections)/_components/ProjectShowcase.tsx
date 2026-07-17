'use client'

import { useState } from 'react'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import type { Project } from '@/types/portfolio'

const PROJECTS: Project[] = [
  {
    id: 'project-alpha',
    title: 'AI-Native Portfolio Platform',
    description: 'Multi-agent RAG portfolio with pgvector, Claude, and cinematic GSAP animations.',
    longDescription: 'A comprehensive AI-native portfolio platform featuring a three-agent architecture (Router, Tech Lead, Contact) with pgvector-powered semantic search. Built with Next.js 16, React 19, and the Vercel AI SDK.',
    tags: ['Next.js', 'AI SDK', 'pgvector', 'Claude'],
    tech: ['Next.js 16', 'React 19', 'Vercel AI SDK', 'pgvector', 'Voyage AI', 'GSAP', 'Lenis'],
    thumbnail: '',
    githubUrl: '#',
    liveUrl: '#',
    featured: true,
    category: 'Full-Stack',
  },
  {
    id: 'project-beta',
    title: 'Liquid Glass Design System',
    description: 'Design system for the 2026 liquid glass aesthetic with motion tokens and glassmorphism.',
    longDescription: 'A comprehensive design system combining Apple\'s Liquid Glass visual language with practical glassmorphism patterns. Features semantic color tokens, typography hierarchy, and motion timing tables.',
    tags: ['Design System', 'CSS', 'Tailwind', 'GSAP'],
    tech: ['Tailwind CSS v4', 'GSAP', 'CSS Custom Properties'],
    thumbnail: '',
    githubUrl: '#',
    category: 'Design',
  },
  {
    id: 'project-gamma',
    title: 'MCP Financial Agent',
    description: 'Financial analysis agent using MCP protocol for dynamic tool discovery and multi-step workflows.',
    longDescription: 'A financial analysis agent using the Model Context Protocol (MCP) to connect LLMs with market data APIs via JSON-RPC over Streamable HTTP.',
    tags: ['MCP', 'AI Agent', 'Financial', 'TypeScript'],
    tech: ['MCP Protocol', 'Claude', 'Express.js', 'PostgreSQL'],
    thumbnail: '',
    githubUrl: '#',
    category: 'AI/ML',
    featured: true,
  },
]

const FILTERS = ['All', 'Full-Stack', 'AI/ML', 'Design']

export function ProjectShowcase() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter)

  return (
    <section
      id="section-projects"
      className="relative mx-auto max-w-6xl px-4 py-32"
    >
      <div className="mb-12">
        <span className="mb-4 block text-sm font-medium text-accent">PROJECTS</span>
        <h2 className="font-display text-4xl font-bold md:text-5xl">
          Selected work
        </h2>
      </div>

      <div className="mb-10 flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150 ease-out ${
              activeFilter === f
                ? 'gradient-accent text-white'
                : 'glass text-text-secondary hover:text-text-primary'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
