import { clsx } from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'glass' | 'glass-strong' | 'glass-subtle'
}

export function Card({ children, className, variant = 'glass' }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl border',
        {
          'glass': variant === 'glass',
          'glass-strong': variant === 'glass-strong',
          'glass-subtle': variant === 'glass-subtle',
        },
        className
      )}
    >
      {children}
    </div>
  )
}
