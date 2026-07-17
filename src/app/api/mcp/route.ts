import { handleMCPRequest } from '@/lib/mcp/mcp-server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = handleMCPRequest(body)
    return Response.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: message }, { status: 404 })
  }
}

export async function GET() {
  return Response.json({
    protocol: '2026-07-28',
    version: '1.0',
    transport: 'streamable-http',
  })
}
