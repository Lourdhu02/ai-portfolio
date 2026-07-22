'use client'

import { motion } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import { pageVariants, staggerContainer } from '@/lib/motion'

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/lourdhu' },
  { label: 'GitHub', href: 'https://github.com/Lourdhu02' },
  { label: 'Kaggle', href: 'https://kaggle.com/blourdhuraju' },
]

export default function Contact() {
  return (
    <div className="bg-bg">
      <motion.section
        className="w-full px-8 md:px-16 lg:px-24 pt-28 pb-16 md:pt-36 md:pb-20"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-3xl">
          <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-4">
            Contact
          </p>
          <h1 className="font-unica text-heading-1 font-semibold tracking-tight text-text mb-6">
            Get in touch
          </h1>
          <p className="text-text-secondary leading-relaxed max-w-2xl text-lg">
            Interested in collaborating on an ML engineering project, have a research question, or
            just want to connect? I typically respond within 24 hours.
          </p>
        </div>
      </motion.section>

      <section className="border-t border-border bg-bg-alt/30">
        <div className="w-full px-8 md:px-16 lg:px-24 py-16 md:py-20">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <motion.a
              href="mailto:b.lourdhuraju1234@gmail.com"
              className="font-mono text-lg text-accent hover:opacity-80 transition-opacity duration-150"
              whileHover={{ y: -1 }}
            >
              b.lourdhuraju1234@gmail.com
            </motion.a>
            <span className="font-mono text-xs text-text-tertiary">/</span>
            <motion.a
              href="tel:+919959594460"
              className="font-mono text-base text-text-secondary hover:text-text transition-colors duration-150"
              whileHover={{ y: -1 }}
            >
              +91 99595 94460
            </motion.a>
            <span className="font-mono text-xs text-text-tertiary">/</span>
            <span className="font-mono text-base text-text-tertiary">Bengaluru, India</span>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="w-full px-8 md:px-16 lg:px-24 py-16 md:py-20">
          <motion.div
            className="grid gap-4 lg:grid-cols-[1fr_auto]"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="border border-border bg-bg p-6">
              <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-4">
                Social
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.985 }}
                    className="border border-border bg-bg-alt/50 p-4 inline-flex items-center justify-between gap-3 text-sm text-text-secondary hover:text-text"
                    aria-label={`${social.label} (opens in a new tab)`}
                  >
                    <span>{social.label}</span>
                    <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-bg-alt/30 p-6 flex items-center"
            >
              <div>
                <p className="font-unica text-lg font-semibold tracking-tight text-text">
                  Available for conversations
                </p>
                <p className="text-sm text-text-secondary mt-1">
                  If you want to build something thoughtful, we should talk.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
