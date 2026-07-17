'use client'

import { useTheme } from '@/components/providers/ThemeProvider'

const SECTIONS = [
  { id: 'section-hero', label: 'Home' },
  { id: 'section-about', label: 'About' },
  { id: 'section-skills', label: 'Skills' },
  { id: 'section-projects', label: 'Projects' },
  { id: 'section-contact', label: 'Contact' },
]

export function Navigation() {
  const { theme, toggle } = useTheme()

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="glass fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-2xl px-6 py-3">
      <div className="flex items-center gap-6">
        <button
          onClick={() => scrollTo('section-hero')}
          className="text-sm font-semibold text-text-primary"
        >
          SD
        </button>
        <div className="flex items-center gap-4">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="text-sm text-text-secondary transition-all duration-150 ease-out hover:text-text-primary"
            >
              {s.label}
            </button>
          ))}
        </div>
        <button
          onClick={toggle}
          className="rounded-lg px-3 py-1.5 text-sm text-text-secondary transition-all duration-150 ease-out hover:bg-glass-border hover:text-text-primary"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  )
}
