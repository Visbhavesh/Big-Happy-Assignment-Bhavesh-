import { cn } from '@/utils'
import type { ReportCategory } from '@/types'

const CATEGORY_CONFIG: Record<ReportCategory, { label: string; color: string }> = {
  campaign: { label: 'Campaign',  color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400' },
  budget:   { label: 'Budget',    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' },
  creative: { label: 'Creative',  color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400' },
  revenue:  { label: 'Revenue',   color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400' },
  audience: { label: 'Audience',  color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400' },
}

type ReportCategoryBadgeProps = { category: ReportCategory; className?: string }

export const ReportCategoryBadge = ({ category, className }: ReportCategoryBadgeProps) => {
  const cfg = CATEGORY_CONFIG[category]
  return (
    <span className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium', cfg.color, className)}>
      {cfg.label}
    </span>
  )
}
