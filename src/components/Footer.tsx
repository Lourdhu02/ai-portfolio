import { motion } from 'motion/react'

export function Footer() {
  return (
    <motion.footer
      className="border-t border-border bg-bg-alt/20"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full px-8 md:px-16 lg:px-24 pt-12 pb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-unica text-sm font-medium text-text">
              Built with precision, deployed to production.
            </p>
            <p className="text-sm text-text-tertiary mt-1">
              Bengaluru, India
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-text-tertiary">
            <motion.a
              href="https://github.com/Lourdhu02"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              whileHover={{ y: -1 }}
            >
              GitHub
              <span className="absolute inset-x-0 -bottom-0.5 h-px bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              <span className="sr-only"> (opens in a new tab)</span>
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/lourdhu"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              whileHover={{ y: -1 }}
            >
              LinkedIn
              <span className="absolute inset-x-0 -bottom-0.5 h-px bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              <span className="sr-only"> (opens in a new tab)</span>
            </motion.a>
            <motion.a
              href="https://kaggle.com/blourdhuraju"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              whileHover={{ y: -1 }}
            >
              Kaggle
              <span className="absolute inset-x-0 -bottom-0.5 h-px bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              <span className="sr-only"> (opens in a new tab)</span>
            </motion.a>
            <motion.a
              href="mailto:b.lourdhuraju1234@gmail.com"
              className="relative group"
              whileHover={{ y: -1 }}
            >
              Email
              <span className="absolute inset-x-0 -bottom-0.5 h-px bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </motion.a>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6">
          <p className="font-mono text-xs text-text-tertiary tracking-wider text-right">
            Making systems that don&apos;t need explaining.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
