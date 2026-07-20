export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-8 flex items-center justify-between">
        <p className="text-sm text-text-tertiary">
          © {new Date().getFullYear()} Lourdu Raju
        </p>
        <div className="flex items-center gap-4 text-sm text-text-tertiary">
          <a href="https://github.com/Lourdhu02" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors duration-150">
            GitHub
          </a>
          <a href="https://linkedin.com/in/lourdhu" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors duration-150">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
