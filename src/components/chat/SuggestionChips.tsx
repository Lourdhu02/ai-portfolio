'use client'

interface SuggestionChipsProps {
  suggestions: string[]
  onSelect: (suggestion: string) => void
}

export function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 p-2">
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="rounded-full border border-glass-border px-3 py-1 text-xs text-text-secondary transition-all duration-150 ease-out hover:border-accent/50 hover:text-accent"
        >
          {s}
        </button>
      ))}
    </div>
  )
}
