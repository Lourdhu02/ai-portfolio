'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="bg-bg min-h-screen flex items-center justify-center">
      <div className="w-full px-8 md:px-16 lg:px-24">
        <div className="max-w-xl mx-auto">
          <div className="border border-border bg-bg p-8 md:p-10 text-center">
            <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-4">
              Error
            </p>
            <h1 className="font-sans text-heading-1 font-semibold tracking-tight text-text mb-4">
              Something went wrong
            </h1>
            <p className="text-text-secondary leading-relaxed mb-8 max-w-sm mx-auto">
              An unexpected error occurred. Please try again.
            </p>
            <button
              onClick={reset}
              className="inline-flex items-center justify-center rounded-none px-5 py-2.5 bg-accent text-white text-sm font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
