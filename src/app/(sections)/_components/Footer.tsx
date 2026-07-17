export function Footer() {
  return (
    <footer className="border-t border-glass-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-sm text-text-secondary">
          © {new Date().getFullYear()} Spacedrift. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/spacedrift"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/spacedrift"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
          >
            LinkedIn
          </a>
          <span className="glass-subtle rounded-full px-3 py-1 text-xs text-text-secondary">
            MCP Enabled
          </span>
        </div>
      </div>
    </footer>
  )
}
