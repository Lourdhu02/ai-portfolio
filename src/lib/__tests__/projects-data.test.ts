import { describe, it, expect } from 'vitest'
import { projectList, projects } from '@/data/projects'

describe('projects data', () => {
  it('projectList has entries', () => {
    expect(projectList.length).toBeGreaterThan(0)
  })

  it('every project in projectList has a valid slug entry in projects', () => {
    projectList.forEach((p) => {
      expect(projects).toHaveProperty(p.slug)
    })
  })

  it('every project has required fields', () => {
    projectList.forEach((p) => {
      expect(p).toHaveProperty('title')
      expect(p).toHaveProperty('slug')
      expect(p).toHaveProperty('year')
      expect(p).toHaveProperty('subtitle')
      expect(p).toHaveProperty('tags')
      expect(p.tags.length).toBeGreaterThan(0)
    })
  })

  it('every project data entry has sections and metrics', () => {
    Object.values(projects).forEach((p) => {
      expect(p).toHaveProperty('sections')
      expect(p.sections.length).toBeGreaterThan(0)
      expect(p).toHaveProperty('metrics')
      expect(p.metrics.length).toBeGreaterThan(0)
    })
  })

  it('all slugs are URL-safe', () => {
    projectList.forEach((p) => {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/)
    })
  })
})
