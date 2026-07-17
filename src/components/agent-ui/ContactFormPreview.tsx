'use client'

import { motion } from 'framer-motion'

interface ContactFormPreviewProps {
  name: string
  email: string
  message: string
  subject?: string
}

export function ContactFormPreview({ name, email, message, subject }: ContactFormPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
      className="rounded-2xl border border-accent/50 bg-accent/5 p-6 shadow-lg shadow-accent/5"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
          Preview
        </span>
        <span className="text-xs text-text-secondary">Review before sending</span>
      </div>
      <div className="space-y-3">
        <div>
          <span className="text-xs text-text-secondary">Name</span>
          <p className="text-sm font-medium text-text-primary">{name}</p>
        </div>
        <div>
          <span className="text-xs text-text-secondary">Email</span>
          <p className="text-sm text-text-primary">{email}</p>
        </div>
        {subject && (
          <div>
            <span className="text-xs text-text-secondary">Subject</span>
            <p className="text-sm text-text-primary">{subject}</p>
          </div>
        )}
        <div>
          <span className="text-xs text-text-secondary">Message</span>
          <p className="text-sm leading-relaxed text-text-primary">{message}</p>
        </div>
      </div>
    </motion.div>
  )
}
