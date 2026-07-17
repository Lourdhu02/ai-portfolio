'use client'

import { motion } from 'framer-motion'

interface StreamingTextProps {
  text: string
}

export function StreamingText({ text }: StreamingTextProps) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-sm leading-relaxed"
    >
      {text}
    </motion.p>
  )
}
