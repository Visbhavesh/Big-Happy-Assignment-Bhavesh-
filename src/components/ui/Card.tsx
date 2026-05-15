import { cn } from '@/utils'

type CardProps = {
  children: React.ReactNode
  className?: string
}

export const Card = ({ children, className }: CardProps) => (
  <div className={cn('rounded-xl border border-border bg-surface p-5 shadow-sm', className)}>
    {children}
  </div>
)

export const CardHeader = ({ children, className }: CardProps) => (
  <div className={cn('mb-4 flex items-center justify-between', className)}>{children}</div>
)

export const CardTitle = ({ children, className }: CardProps) => (
  <h3 className={cn('text-sm font-semibold text-text-secondary', className)}>{children}</h3>
)
