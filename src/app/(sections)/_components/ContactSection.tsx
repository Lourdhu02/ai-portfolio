'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function ContactSection() {
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const data = {
      name: form.get('name'),
      email: form.get('email'),
      message: form.get('message'),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) setSent(true)
    } catch {
      // silent fail
    }
  }

  return (
    <section
      id="section-contact"
      className="relative mx-auto max-w-6xl px-4 py-32"
    >
      <div className="mb-16">
        <span className="mb-4 block text-sm font-medium text-accent">CONTACT</span>
        <h2 className="font-display text-4xl font-bold md:text-5xl">
          Let&apos;s work together
        </h2>
      </div>

      <div className="mx-auto max-w-xl">
        {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8 text-center"
          >
            <div className="mb-4 text-4xl">✓</div>
            <h3 className="font-display text-xl font-semibold">
              Message sent!
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              I&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text-primary">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                minLength={2}
                className="glass w-full rounded-xl px-4 py-3 text-sm text-text-primary outline-none transition-all duration-150 placeholder:text-text-secondary/50 focus:ring-2 focus:ring-accent/50"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-primary">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="glass w-full rounded-xl px-4 py-3 text-sm text-text-primary outline-none transition-all duration-150 placeholder:text-text-secondary/50 focus:ring-2 focus:ring-accent/50"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text-primary">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                rows={5}
                className="glass w-full resize-none rounded-xl px-4 py-3 text-sm text-text-primary outline-none transition-all duration-150 placeholder:text-text-secondary/50 focus:ring-2 focus:ring-accent/50"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="gradient-accent w-full rounded-xl px-6 py-3 text-sm font-medium text-white transition-all duration-150 ease-out hover:scale-[1.02]"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
