import { cn } from '@/utils'

type MetaRowProps = {
  label: string
  value: React.ReactNode
  className?: string
}

export const MetaRow = ({ label, value, className }: MetaRowProps) => (
  <div className={cn('flex items-center justify-between gap-4 py-2', className)}>
    <span className="text-xs text-text-secondary shrink-0">{label}</span>
    <span className="text-xs font-medium text-text-primary text-right">{value}</span>
  </div>
)

type MetaTableProps = {
  rows: { label: string; value: React.ReactNode }[]
  className?: string
}

export const MetaTable = ({ rows, className }: MetaTableProps) => (
  <dl className={cn('divide-y divide-border', className)}>
    {rows.map((row) => (
      <MetaRow key={row.label} label={row.label} value={row.value} />
    ))}
  </dl>
)
