import { describe, it, expect } from 'vitest'
import { pageEase, pageVariants, sectionVariants, staggerContainer, pressTap, hoverLift, hoverGlow } from '../motion'

describe('motion', () => {
  it('pageEase is a cubic bezier with 4 values', () => {
    expect(pageEase).toHaveLength(4)
    expect(pageEase[0]).toBe(0.22)
    expect(pageEase[2]).toBe(0.36)
  })

  it('pageVariants has initial, animate, and exit states', () => {
    expect(pageVariants).toHaveProperty('initial')
    expect(pageVariants).toHaveProperty('animate')
    expect(pageVariants).toHaveProperty('exit')
    expect(pageVariants.animate).toHaveProperty('clipPath')
    expect(pageVariants.animate).toHaveProperty('transition')
    expect(pageVariants.exit).toHaveProperty('transition')
  })

  it('sectionVariants starts with opacity 0 and y offset', () => {
    const initial = sectionVariants.initial as Record<string, unknown>
    const animate = sectionVariants.animate as Record<string, unknown>
    expect(initial).toEqual({ opacity: 0, y: 24 })
    expect(animate.opacity).toBe(1)
    expect(animate.y).toBe(0)
  })

  it('staggerContainer has staggerChildren and delayChildren', () => {
    const animate = staggerContainer.animate as Record<string, unknown>
    const transition = animate.transition as Record<string, unknown>
    expect(transition.staggerChildren).toBe(0.06)
    expect(transition.delayChildren).toBe(0)
  })

  it('pressTap applies scale reduction', () => {
    expect(pressTap).toEqual({ scale: 0.985 })
  })

  it('hoverLift applies lift transform', () => {
    expect(hoverLift).toHaveProperty('y', -4)
    expect(hoverLift).toHaveProperty('scale', 1.01)
  })

  it('hoverGlow applies boxShadow', () => {
    expect(hoverGlow).toHaveProperty('boxShadow')
    expect(hoverGlow.boxShadow).toContain('rgba')
  })
})
