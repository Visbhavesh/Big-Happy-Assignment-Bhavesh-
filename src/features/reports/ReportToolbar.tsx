import { useRef, useEffect } from 'react'
import { Search, X, SlidersHorizontal, Star, RotateCcw } from 'lucide-react'
import { useReportStore } from '@/store/reportStore'
import { ActionButton, Dropdown } from '@/components/ui'
import { cn } from '@/utils'

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All Categories' },
  { value: 'campaign', label: 'Campaign' },
  { value: 'budget', label: 'Budget' },
  { value: 'creative', label: 'Creative' },
  { value: 'revenue', label: 'Revenue' },
  { value: 'audience', label: 'Audience' },
]

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'ready', label: 'Ready' },
  { value: 'running', label: 'Running' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'failed', label: 'Failed' },
  { value: 'draft', label: 'Draft' },
]

const EXPORT_OPTIONS = [
  { value: 'all', label: 'All Formats' },
  { value: 'csv', label: 'CSV' },
  { value: 'json', label: 'JSON' },
  { value: 'pdf', label: 'PDF' },
  { value: 'png', label: 'PNG' },
]

const SORT_OPTIONS = [
  { value: 'updatedAt:desc', label: 'Last Updated' },
  { value: 'createdAt:desc', label: 'Newest First' },
  { value: 'createdAt:asc', label: 'Oldest First' },
  { value: 'title:asc', label: 'Title A–Z' },
  { value: 'title:desc', label: 'Title Z–A' },
  { value: 'status:asc', label: 'Status' },
  { value: 'category:asc', label: 'Category' },
]

type ReportToolbarProps = {
  total: number
  onCreateReport: () => void
}

export const ReportToolbar = ({ total, onCreateReport }: ReportToolbarProps) => {
  const {
    filters,
    setSearch, setCategory, setStatus, setExportType,
    setFavoritesOnly, setSort, resetFilters,
  } = useReportStore()

  const searchRef = useRef<HTMLInputElement>(null)

  const activeFilterCount = [
    filters.category !== 'all',
    filters.status !== 'all',
    filters.exportType !== 'all',
    filters.favoritesOnly,
  ].filter(Boolean).length

  const sortValue = `${filters.sortKey}:${filters.sortDir}`

  const handleSortChange = (v: string) => {
    const [key, dir] = v.split(':')
    setSort(key as Parameters<typeof setSort>[0], dir as Parameters<typeof setSort>[1])
  }

  // clear search with Escape
  useEffect(() => {
    const el = searchRef.current
    if (!el) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && filters.search) setSearch('')
    }
    el.addEventListener('keydown', handler)
    return () => el.removeEventListener('keydown', handler)
  }, [filters.search, setSearch])

  return (
    <div className="space-y-3">
      {/* Top row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-text-primary">Reports</h1>
          <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand">
            {total}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <ActionButton variant="ghost" size="sm" icon={<RotateCcw size={13} />} onClick={resetFilters}>
              Clear filters
              <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] text-white font-bold">
                {activeFilterCount}
              </span>
            </ActionButton>
          )}
          <ActionButton
            variant="primary"
            size="sm"
            icon={<SlidersHorizontal size={13} />}
            onClick={onCreateReport}
          >
            New Report
          </ActionButton>
        </div>
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative flex items-center">
          <Search size={14} className="absolute left-3 text-text-secondary pointer-events-none" aria-hidden="true" />
          <input
            ref={searchRef}
            type="search"
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reports…"
            aria-label="Search reports"
            className={cn(
              'h-9 w-56 rounded-lg border border-border bg-surface pl-8 pr-8 text-sm text-text-primary',
              'placeholder:text-text-secondary outline-none transition-colors',
              'focus:border-brand focus:ring-2 focus:ring-brand/20',
            )}
          />
          {filters.search && (
            <button
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="absolute right-2.5 text-text-secondary hover:text-text-primary"
            >
              <X size={13} />
            </button>
          )}
        </div>

        <Dropdown options={CATEGORY_OPTIONS} value={filters.category} onChange={(v) => setCategory(v as typeof filters.category)} />
        <Dropdown options={STATUS_OPTIONS} value={filters.status} onChange={(v) => setStatus(v as typeof filters.status)} />
        <Dropdown options={EXPORT_OPTIONS} value={filters.exportType} onChange={(v) => setExportType(v as typeof filters.exportType)} />
        <Dropdown options={SORT_OPTIONS} value={sortValue} onChange={handleSortChange} />

        <button
          onClick={() => setFavoritesOnly(!filters.favoritesOnly)}
          aria-pressed={filters.favoritesOnly}
          aria-label="Show favorites only"
          className={cn(
            'flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
            filters.favoritesOnly
              ? 'border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
              : 'border-border bg-surface text-text-secondary hover:border-brand/40 hover:text-text-primary',
          )}
        >
          <Star size={13} className={cn(filters.favoritesOnly ? 'fill-amber-400 text-amber-400' : '')} aria-hidden="true" />
          Favorites
        </button>
      </div>
    </div>
  )
}
