'use client'

interface ActivityPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function ActivityPanel({ isOpen, onClose }: ActivityPanelProps) {
  if (!isOpen) return null

  return (
    <div className="w-80 border-l border-glass-border bg-glass-tint p-4 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Activity</h3>
        <button
          onClick={onClose}
          className="text-xs text-text-secondary hover:text-text-primary"
        >
          Close
        </button>
      </div>
      <p className="text-xs text-text-secondary/50">
        Agent activity will appear here as tools are called.
      </p>
    </div>
  )
}
