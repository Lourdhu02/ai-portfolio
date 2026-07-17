import { streamText } from 'ai'
import { portfolioTools } from '@/lib/ai/tools/portfolio-tools'
import { ragTools } from '@/lib/ai/tools/rag-tools'
import { contactTools } from '@/lib/ai/tools/contact-tools'
import { navigationTools } from '@/lib/ai/tools/navigation-tools'
import { ROUTER_SYSTEM_PROMPT } from '@/lib/ai/prompts/router-prompt'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages', { status: 400 })
    }

    const result = streamText({
      model: 'openai/gpt-4o-mini',
      system: ROUTER_SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      tools: {
        ...portfolioTools,
        ...ragTools,
        ...navigationTools,
        ...contactTools,
      } as any,
      maxSteps: 5,
      abortSignal: req.signal,
    } as any)

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
