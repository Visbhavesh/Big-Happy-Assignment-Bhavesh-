import { Dropdown, ActionButton } from '@/components/ui'
import { RefreshCw, Download, Plus } from 'lucide-react'
import type { DealStatus, DealPriority } from '@/types'

type DealFilters = {
  status: DealStatus | 'all'
  priority: DealPriority | 'all'
  sortBy: 'name' | 'budget' | 'delivery' | 'pacing'
}

type DealToolbarProps = {
  filters: DealFilters
  onFiltersChange: (filters: DealFilters) => void
  onRefresh: () => void
  isRefreshing: boolean
  dealCount: number
}

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'pacing_alert', label: 'Pacing Alert' },
  { value: 'paused', label: 'Paused' },
  { value: 'completed', label: 'Completed' },
]

const PRIORITY_OPTIONS = [
  { value: 'all', label: 'All Priorities' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

const SORT_OPTIONS = [
  { value: 'name', label: 'Sort: Name' },
  { value: 'budget', label: 'Sort: Budget' },
  { value: 'delivery', label: 'Sort: Delivery %' },
  { value: 'pacing', label: 'Sort: Pacing %' },
]

export const DealToolbar = ({
  filters,
  onFiltersChange,
  onRefresh,
  isRefreshing,
  dealCount,
}: DealToolbarProps) => (
  <div className="flex flex-wrap items-center justify-between gap-3">
    <div className="flex items-center gap-2">
      <h1 className="text-xl font-bold text-text-primary">Deal Dashboard</h1>
      <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand">
        {dealCount}
      </span>
    </div>

    <div className="flex flex-wrap items-center gap-2">
      <Dropdown
        options={STATUS_OPTIONS}
        value={filters.status}
        onChange={(v) => onFiltersChange({ ...filters, status: v as DealFilters['status'] })}
        aria-label="Filter by status"
      />
      <Dropdown
        options={PRIORITY_OPTIONS}
        value={filters.priority}
        onChange={(v) => onFiltersChange({ ...filters, priority: v as DealFilters['priority'] })}
        aria-label="Filter by priority"
      />
      <Dropdown
        options={SORT_OPTIONS}
        value={filters.sortBy}
        onChange={(v) => onFiltersChange({ ...filters, sortBy: v as DealFilters['sortBy'] })}
        aria-label="Sort deals"
      />

      <div className="flex items-center gap-1.5">
        <ActionButton
          variant="ghost"
          size="sm"
          icon={<RefreshCw size={14} />}
          loading={isRefreshing}
          onClick={onRefresh}
          aria-label="Refresh data"
        >
          Refresh
        </ActionButton>
        <ActionButton variant="ghost" size="sm" icon={<Download size={14} />} aria-label="Export">
          Export
        </ActionButton>
        <ActionButton variant="primary" size="sm" icon={<Plus size={14} />} aria-label="New deal">
          New Deal
        </ActionButton>
      </div>
    </div>
  </div>
)
