import { motion } from 'motion/react'

export function Footer() {
  return (
    <motion.footer
      className="border-t border-border bg-bg-alt/20"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35 }}
    >
      <div className="w-full px-8 md:px-16 lg:px-24 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-display text-sm font-medium text-text">
            Built with precision, deployed to production.
          </p>
          <p className="text-sm text-text-tertiary mt-1">
            © {new Date().getFullYear()} Lourdu Raju — Bengaluru, India
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm text-text-tertiary">
          <motion.a
            href="https://github.com/Lourdhu02"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -1 }}
            className="hover:text-text transition-colors duration-150"
          >
            GitHub
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/lourdhu"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -1 }}
            className="hover:text-text transition-colors duration-150"
          >
            LinkedIn
          </motion.a>
          <motion.a
            href="https://kaggle.com/blourdhuraju"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -1 }}
            className="hover:text-text transition-colors duration-150"
          >
            Kaggle
          </motion.a>
          <motion.a
            href="mailto:b.lourdhuraju1234@gmail.com"
            whileHover={{ y: -1 }}
            className="hover:text-text transition-colors duration-150"
          >
            Email
          </motion.a>
        </div>
      </div>
    </motion.footer>
  )
}
