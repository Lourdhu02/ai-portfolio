let sessionCounter = 0

export function createAnonymousSession(): { sessionId: string } {
  sessionCounter++
  const sessionId = `sess_${Date.now()}_${sessionCounter}`
  return { sessionId }
}

export function getSessionId(): string {
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem('session_id')
    if (stored) return stored
    const { sessionId } = createAnonymousSession()
    sessionStorage.setItem('session_id', sessionId)
    return sessionId
  }
  return createAnonymousSession().sessionId
}
