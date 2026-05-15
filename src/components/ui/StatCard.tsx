import { motion } from 'framer-motion'
import { cn } from '@/utils'

type StatCardProps = {
  label: string
  value: string
  subvalue?: string
  icon?: React.ReactNode
  accentColor?: string
  trend?: React.ReactNode
  index?: number
  className?: string
}

export const StatCard = ({
  label,
  value,
  subvalue,
  icon,
  accentColor = 'var(--color-brand)',
  trend,
  index = 0,
  className,
}: StatCardProps) => (
  <motion.article
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.07, duration: 0.35 }}
    className={cn(
      'relative overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-sm',
      className,
    )}
    aria-label={`${label}: ${value}`}
  >
    {/* accent bar */}
    <div
      className="absolute left-0 top-0 h-full w-1 rounded-l-xl"
      style={{ background: accentColor }}
      aria-hidden="true"
    />

    <div className="flex items-start justify-between gap-3 pl-2">
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium uppercase tracking-wide text-text-secondary">
          {label}
        </p>
        <p className="mt-1.5 text-2xl font-bold text-text-primary leading-none">{value}</p>
        {subvalue && (
          <p className="mt-1 text-xs text-text-secondary">{subvalue}</p>
        )}
        {trend && <div className="mt-2">{trend}</div>}
      </div>
      {icon && (
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ background: `color-mix(in srgb, ${accentColor} 12%, transparent)`, color: accentColor }}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
    </div>
  </motion.article>
)
