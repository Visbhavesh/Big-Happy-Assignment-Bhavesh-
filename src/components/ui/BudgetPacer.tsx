import { motion } from 'framer-motion'
import { cn } from '@/utils'
import { formatCurrency } from '@/utils'
import type { PacingStatus } from '@/types'

type BudgetPacerProps = {
  label: string
  spent: number
  total: number
  projected: number
  pacingStatus: PacingStatus
  pacingPercent: number
  className?: string
}

const statusConfig: Record<PacingStatus, { label: string; barColor: string; textColor: string }> = {
  on_track:       { label: 'On Track',        barColor: 'bg-emerald-500', textColor: 'text-emerald-600 dark:text-emerald-400' },
  ahead:          { label: 'Ahead of Pace',   barColor: 'bg-blue-500',    textColor: 'text-blue-600 dark:text-blue-400' },
  slightly_behind:{ label: 'Slightly Behind', barColor: 'bg-amber-500',   textColor: 'text-amber-600 dark:text-amber-400' },
  behind:         { label: 'Behind Pace',     barColor: 'bg-orange-500',  textColor: 'text-orange-600 dark:text-orange-400' },
  critical:       { label: 'Critical',        barColor: 'bg-red-500',     textColor: 'text-red-600 dark:text-red-400' },
}

export const BudgetPacer = ({
  label,
  spent,
  total,
  projected,
  pacingStatus,
  pacingPercent,
  className,
}: BudgetPacerProps) => {
  const config = statusConfig[pacingStatus]
  const spentPct = Math.min(100, (spent / total) * 100)
  const projectedPct = Math.min(100, (projected / total) * 100)

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-secondary">{label}</span>
        <span className={cn('text-xs font-semibold', config.textColor)}>{config.label}</span>
      </div>

      {/* stacked bar */}
      <div
        className="relative h-2.5 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={pacingPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} pacing: ${pacingPercent.toFixed(1)}%`}
      >
        {/* projected ghost */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-border-200 opacity-40"
          style={{ width: `${projectedPct}%` }}
          aria-hidden="true"
        />
        {/* actual spend */}
        <motion.div
          className={cn('absolute inset-y-0 left-0 rounded-full', config.barColor)}
          initial={{ width: 0 }}
          animate={{ width: `${spentPct}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          aria-hidden="true"
        />
      </div>

      <div className="flex items-center justify-between text-xs text-text-secondary">
        <span>{formatCurrency(spent)} spent</span>
        <span className="font-medium text-text-primary">{pacingPercent.toFixed(1)}%</span>
        <span>{formatCurrency(total)} total</span>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-text-secondary">Projected</span>
        <span className="font-medium text-text-primary">{formatCurrency(projected)}</span>
      </div>
    </div>
  )
}
