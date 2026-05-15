import { motion } from 'framer-motion'
import { Star, Copy, Trash2, Download, Clock, FileText, Calendar } from 'lucide-react'
import { Card } from '@/components/ui'
import { METRIC_CONFIG } from '@/lib/metricConfig'
import { cn } from '@/utils'
import { ReportStatusBadge } from './ReportStatusBadge'
import { ReportCategoryBadge } from './ReportCategoryBadge'
import type { Report } from '@/types'

type ReportCardProps = {
  report: Report
  index: number
  onFavorite: (id: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
  onExport: (id: string) => void
}

const EXPORT_ICON: Record<string, string> = { csv: 'CSV', json: 'JSON', pdf: 'PDF', png: 'PNG' }

const relativeDate = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export const ReportCard = ({ report, index, onFavorite, onDuplicate, onDelete, onExport }: ReportCardProps) => (
  <motion.article
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, duration: 0.3 }}
    aria-label={`Report: ${report.title}`}
  >
    <Card className="group flex flex-col gap-4 hover:border-brand/40 transition-colors duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <ReportStatusBadge status={report.status} />
            <ReportCategoryBadge category={report.category} />
          </div>
          <h3 className="text-sm font-semibold text-text-primary leading-snug line-clamp-2">
            {report.title}
          </h3>
          <p className="mt-1 text-xs text-text-secondary line-clamp-2">{report.description}</p>
        </div>
        <button
          onClick={() => onFavorite(report.id)}
          aria-label={report.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="shrink-0 rounded-md p-1 text-text-secondary hover:text-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 transition-colors"
        >
          <Star
            size={16}
            className={cn('transition-colors', report.isFavorite ? 'fill-amber-400 text-amber-400' : '')}
          />
        </button>
      </div>

      {/* Metrics */}
      <div className="flex flex-wrap gap-1.5">
        {report.metrics.map((key) => {
          const cfg = METRIC_CONFIG[key]
          return (
            <span
              key={key}
              className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-text-secondary"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cfg.color }} aria-hidden="true" />
              {cfg.shortLabel}
            </span>
          )
        })}
      </div>

      {/* Meta row */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-text-secondary border-t border-border pt-3">
        <div className="flex items-center gap-1.5">
          <FileText size={11} aria-hidden="true" />
          <span className="font-medium text-text-primary">{EXPORT_ICON[report.exportType]}</span>
          {report.rowCount > 0 && <span>· {report.rowCount.toLocaleString()} rows</span>}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={11} aria-hidden="true" />
          <span>{relativeDate(report.updatedAt)}</span>
        </div>
        <div className="flex items-center gap-1.5 col-span-2">
          <Calendar size={11} aria-hidden="true" />
          <span>{report.dateRange.from} → {report.dateRange.to}</span>
        </div>
        {report.schedule.frequency !== 'none' && (
          <div className="flex items-center gap-1.5 col-span-2">
            <span className="rounded bg-brand/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand uppercase">
              {report.schedule.frequency}
            </span>
            {report.schedule.nextRun && (
              <span>Next: {relativeDate(report.schedule.nextRun)}</span>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="text-xs text-text-secondary">by {report.createdBy}</span>
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <ActionIconBtn label="Export" onClick={() => onExport(report.id)} disabled={report.status === 'running' || report.status === 'draft'}>
            <Download size={13} />
          </ActionIconBtn>
          <ActionIconBtn label="Duplicate" onClick={() => onDuplicate(report.id)}>
            <Copy size={13} />
          </ActionIconBtn>
          <ActionIconBtn label="Delete" onClick={() => onDelete(report.id)} danger>
            <Trash2 size={13} />
          </ActionIconBtn>
        </div>
      </div>
    </Card>
  </motion.article>
)

type ActionIconBtnProps = {
  label: string
  onClick: () => void
  children: React.ReactNode
  danger?: boolean
  disabled?: boolean
}

const ActionIconBtn = ({ label, onClick, children, danger, disabled }: ActionIconBtnProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    title={label}
    className={cn(
      'flex h-7 w-7 items-center justify-center rounded-md transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
      'disabled:pointer-events-none disabled:opacity-40',
      danger
        ? 'text-text-secondary hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30'
        : 'text-text-secondary hover:bg-hover hover:text-text-primary',
    )}
  >
    {children}
  </button>
)
