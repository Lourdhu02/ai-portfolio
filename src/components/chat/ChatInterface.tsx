'use client'

import { useChatContext } from '@/components/providers/ChatProvider'
import { MessageList } from './MessageList'
import { InputBar } from './InputBar'
import { useState } from 'react'
import type { AgentComponentSpec } from '@/types/ui'

interface ChatInterfaceProps {
  showActivityPanel?: boolean
  variant?: 'overlay' | 'sidebar' | 'fullscreen'
}

export function ChatInterface({ variant = 'overlay' }: ChatInterfaceProps) {
  const { messages, isLoading } = useChatContext()
  const [agentComponents] = useState<AgentComponentSpec[]>([])

  return (
    <div className={`flex ${variant === 'fullscreen' ? 'h-full' : 'h-[600px]'} overflow-hidden rounded-2xl border border-glass-border bg-glass-tint backdrop-blur-sm`}>
      <div className="flex flex-1 flex-col">
        <MessageList messages={messages} />
        {agentComponents.length > 0 && (
          <div className="space-y-4 p-4">
            {agentComponents.map((spec) => (
              <div key={spec.id} className="text-sm text-text-secondary">
                [{spec.type}] rendered
              </div>
            ))}
          </div>
        )}
        <InputBar />
      </div>
    </div>
  )
}
