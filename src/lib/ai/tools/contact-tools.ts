const DISPOSABLE_DOMAINS = ['tempmail.com', 'throwaway.com', 'mailinator.com', 'guerrillamail.com']

export const contactTools: Record<string, { description: string; parameters: any; execute: (args: any) => Promise<any> }> = {
  validate_email: {
    description: 'Validate an email address format and check if it is disposable.',
    parameters: { type: 'object', properties: { email: { type: 'string', format: 'email' } }, required: ['email'] },
    execute: async (args: { email: string }) => {
      const domain = args.email.split('@')[1]?.toLowerCase()
      const isDisposable = domain ? DISPOSABLE_DOMAINS.includes(domain) : false
      return { valid: !isDisposable, formatValid: true, isDisposable }
    },
  },
  show_contact_preview: {
    description: 'Display a preview of the contact form before sending.',
    parameters: { type: 'object', properties: { name: { type: 'string' }, email: { type: 'string', format: 'email' }, subject: { type: 'string' }, message: { type: 'string' } }, required: ['name', 'email', 'message'] },
    execute: async (args: { name: string; email: string; subject?: string; message: string }) => {
      return { component: 'contact-form-preview', props: args }
    },
  },
  contact_send: {
    description: 'Send the contact message.',
    parameters: { type: 'object', properties: { name: { type: 'string' }, email: { type: 'string', format: 'email' }, subject: { type: 'string' }, message: { type: 'string' } }, required: ['name', 'email', 'message'] },
    execute: async (args: { name: string; email: string; subject?: string; message: string }) => {
      try {
        await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(args) })
        return { sent: true }
      } catch { return { sent: false } }
    },
  },
}
