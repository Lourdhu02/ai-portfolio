import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '../Footer'

describe('Footer', () => {
  it('renders the tagline', () => {
    render(<Footer />)
    expect(screen.getByText('Built with precision, deployed to production.')).toBeInTheDocument()
  })

  it('renders the location', () => {
    render(<Footer />)
    expect(screen.getByText('Bengaluru, India')).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<Footer />)
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('Kaggle')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders the closing line', () => {
    render(<Footer />)
    expect(screen.getByText(/Making systems that don't need explaining/)).toBeInTheDocument()
  })

  it('GitHub link opens in new tab', () => {
    render(<Footer />)
    const link = screen.getByText('GitHub').closest('a')
    expect(link).toHaveAttribute('href', 'https://github.com/Lourdhu02')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
