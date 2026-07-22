'use client'

import { motion } from 'motion/react'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import { pageVariants, cardVariants, staggerContainer, hoverLift, hoverGlow, pressTap } from '@/lib/motion'

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
          <h1 className="font-display text-heading-1 font-semibold tracking-tight text-text mb-6">
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
          <motion.div
            className="grid gap-4 lg:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.a
              href="mailto:b.lourdhuraju1234@gmail.com"
              variants={cardVariants}
              whileHover={{ ...hoverLift, ...hoverGlow }}
              whileTap={pressTap}
              className="border border-border bg-bg p-6 block"
            >
              <Mail className="w-5 h-5 text-text-tertiary" strokeWidth={1.5} />
              <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mt-4 mb-2">
                Email
              </p>
              <p className="text-lg font-medium text-text leading-snug break-words">
                b.lourdhuraju1234@gmail.com
              </p>
            </motion.a>

            <motion.a
              href="tel:+919959594460"
              variants={cardVariants}
              whileHover={{ ...hoverLift, ...hoverGlow }}
              whileTap={pressTap}
              className="border border-border bg-bg p-6 block"
            >
              <Phone className="w-5 h-5 text-text-tertiary" strokeWidth={1.5} />
              <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mt-4 mb-2">
                Phone
              </p>
              <p className="text-lg font-medium text-text">+91 99595 94460</p>
            </motion.a>

            <motion.div
              variants={cardVariants}
              className="border border-border bg-bg p-6"
            >
              <MapPin className="w-5 h-5 text-text-tertiary" strokeWidth={1.5} />
              <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mt-4 mb-2">
                Location
              </p>
              <p className="text-lg font-medium text-text">Bengaluru, India</p>
            </motion.div>
          </motion.div>
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
            <motion.div variants={cardVariants} className="border border-border bg-bg p-6">
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
              variants={cardVariants}
              whileHover={{ ...hoverLift, ...hoverGlow }}
              className="border border-border bg-accent/5 p-6 flex items-center"
            >
              <div>
                <p className="font-display text-lg font-semibold tracking-tight text-text">
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
