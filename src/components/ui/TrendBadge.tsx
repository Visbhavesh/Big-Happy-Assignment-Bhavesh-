import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/utils'

type TrendDirection = 'up' | 'down' | 'neutral'

type TrendBadgeProps = {
  value: number
  unit?: string
  direction?: TrendDirection
  inverse?: boolean
  className?: string
}

const resolveDirection = (value: number, inverse: boolean): TrendDirection => {
  if (value === 0) return 'neutral'
  const isPositive = value > 0
  return (isPositive ? !inverse : inverse) ? 'up' : 'down'
}

export const TrendBadge = ({ value, unit = '%', direction, inverse = false, className }: TrendBadgeProps) => {
  const dir = direction ?? resolveDirection(value, inverse)

  const colorClass =
    dir === 'up'
      ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30'
      : dir === 'down'
        ? 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30'
        : 'text-text-secondary bg-hover'

  const Icon = dir === 'up' ? TrendingUp : dir === 'down' ? TrendingDown : Minus

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
        colorClass,
        className,
      )}
    >
      <Icon size={11} aria-hidden="true" />
      {Math.abs(value).toFixed(1)}{unit}
    </span>
  )
}
