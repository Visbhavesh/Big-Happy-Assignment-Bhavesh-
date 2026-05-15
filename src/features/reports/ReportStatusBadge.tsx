import { cn } from '@/utils'
import type { ReportStatus } from '@/types'

const STATUS_CONFIG: Record<ReportStatus, { label: string; dot: string; text: string; bg: string }> = {
  ready:     { label: 'Ready',     dot: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
  running:   { label: 'Running',   dot: 'bg-blue-500 animate-pulse', text: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30' },
  scheduled: { label: 'Scheduled', dot: 'bg-violet-500', text: 'text-violet-700 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-900/30' },
  failed:    { label: 'Failed',    dot: 'bg-red-500',    text: 'text-red-700 dark:text-red-400',    bg: 'bg-red-50 dark:bg-red-900/30' },
  draft:     { label: 'Draft',     dot: 'bg-gray-400',   text: 'text-gray-600 dark:text-gray-400',  bg: 'bg-gray-100 dark:bg-gray-800/40' },
}

type ReportStatusBadgeProps = { status: ReportStatus; className?: string }

export const ReportStatusBadge = ({ status, className }: ReportStatusBadgeProps) => {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', cfg.bg, cfg.text, className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', cfg.dot)} aria-hidden="true" />
      {cfg.label}
    </span>
  )
}
