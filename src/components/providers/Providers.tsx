'use client'

import { ThemeProvider } from './ThemeProvider'
import { LenisProvider } from './LenisProvider'
import { ChatProvider } from './ChatProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LenisProvider>
        <ChatProvider>
          {children}
        </ChatProvider>
      </LenisProvider>
    </ThemeProvider>
  )
}
