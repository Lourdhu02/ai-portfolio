'use client'

interface CitationMarkerProps {
  number: number
  label?: string
  href?: string
}

export function CitationMarker({ number, label, href }: CitationMarkerProps) {
  const content = (
    <sup className="inline-flex h-4 w-4 items-center justify-center rounded bg-accent/10 text-[10px] font-medium text-accent cursor-help transition-colors hover:bg-accent/20">
      {number}
    </sup>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" title={label}>
        {content}
      </a>
    )
  }

  return <span title={label}>{content}</span>
}
