import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-3xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          LR
        </Link>
        <div className="flex items-center gap-6">
          <a href="#work" className="text-sm text-text-secondary hover:text-text transition-colors duration-150">
            Work
          </a>
          <a href="#about" className="text-sm text-text-secondary hover:text-text transition-colors duration-150">
            About
          </a>
          <a href="#skills" className="text-sm text-text-secondary hover:text-text transition-colors duration-150">
            Skills
          </a>
          <a href="#contact" className="text-sm text-text-secondary hover:text-text transition-colors duration-150">
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}
