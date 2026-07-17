'use client'

import { createContext, useContext, ReactNode, useState, useCallback, useRef } from 'react'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface ChatContextType {
  messages: ChatMessage[]
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  error?: Error
  reload: () => void
  stop: () => void
}

const ChatContext = createContext<ChatContextType | null>(null)

export function useChatContext() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider')
  return ctx
}

function generateId() {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | undefined>()
  const abortRef = useRef<AbortController | null>(null)

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInput(e.target.value)
    },
    []
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!input.trim() || isLoading) return

      const userMsg: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: input,
      }

      setMessages((prev) => [...prev, userMsg])
      const currentInput = input
      setInput('')
      setIsLoading(true)
      setError(undefined)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages.map(m => ({ role: m.role, content: m.content })), { role: 'user', content: currentInput }],
            sessionId: 'default',
          }),
          signal: controller.signal,
        })

        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const text = await res.text()
        const assistantMsg: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          content: text,
        }
        setMessages((prev) => [...prev, assistantMsg])
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err)
        }
      } finally {
        setIsLoading(false)
        abortRef.current = null
      }
    },
    [input, isLoading, messages]
  )

  const stop = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  const reload = useCallback(() => {
    // no-op
  }, [])

  return (
    <ChatContext.Provider value={{ messages, input, handleInputChange, handleSubmit, isLoading, error, reload, stop }}>
      {children}
    </ChatContext.Provider>
  )
}
