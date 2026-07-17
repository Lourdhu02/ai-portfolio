'use client'

import { useChatContext } from '@/components/providers/ChatProvider'

export function InputBar() {
  const { input, handleInputChange, handleSubmit, isLoading, stop } = useChatContext()

  return (
    <form onSubmit={handleSubmit} className="border-t border-glass-border p-4">
      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
          className="glass flex-1 rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none transition-all duration-150 placeholder:text-text-secondary/50 focus:ring-2 focus:ring-accent/50"
          disabled={isLoading}
        />
        {isLoading ? (
          <button
            type="button"
            onClick={stop}
            className="rounded-xl bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-500 transition-all duration-150 hover:bg-red-500/20"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="gradient-accent rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-all duration-150 ease-out hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            Send
          </button>
        )}
      </div>
    </form>
  )
}
