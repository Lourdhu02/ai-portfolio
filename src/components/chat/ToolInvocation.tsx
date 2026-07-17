'use client'

import { useState } from 'react'

interface ToolInvocationProps {
  toolName: string
  args?: Record<string, unknown>
  result?: Record<string, unknown>
  isError?: boolean
}

export function ToolInvocation({ toolName, args, result, isError }: ToolInvocationProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`rounded-xl border p-3 text-xs ${
      isError
        ? 'border-red-500/20 bg-red-500/5'
        : 'border-glass-border bg-glass-tint'
    }`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between"
      >
        <span className="font-medium text-text-secondary">
          {isError ? '⚠ ' : '🔧 '}
          {toolName}
        </span>
        <span className="text-text-secondary/50">{expanded ? '▲' : '▼'}</span>
      </button>
      {expanded && (
        <div className="mt-2 space-y-2">
          {args && (
            <div>
              <span className="text-text-secondary/50">Input:</span>
              <pre className="mt-1 overflow-x-auto rounded-lg bg-text-primary/5 p-2 text-text-secondary">
                {JSON.stringify(args, null, 2)}
              </pre>
            </div>
          )}
          {result && (
            <div>
              <span className="text-text-secondary/50">Result:</span>
              <pre className="mt-1 overflow-x-auto rounded-lg bg-text-primary/5 p-2 text-text-secondary">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
