import { useState, useMemo } from 'react'
import { useDealDashboard } from '@/hooks/useDealDashboard'
import { SummaryKpiStrip } from './SummaryKpiStrip'
import { DealCard } from './DealCard'
import { DealToolbar } from './DealToolbar'
import { DealGridSkeleton } from './DealGridSkeleton'
import { Skeleton } from '@/components/ui'
import type { Deal, DealStatus, DealPriority } from '@/types'

type DealFilters = {
  status: DealStatus | 'all'
  priority: DealPriority | 'all'
  sortBy: 'name' | 'budget' | 'delivery' | 'pacing'
}

const DEFAULT_FILTERS: DealFilters = {
  status: 'all',
  priority: 'all',
  sortBy: 'name',
}

const sortFns: Record<DealFilters['sortBy'], (a: Deal, b: Deal) => number> = {
  name:     (a, b) => a.name.localeCompare(b.name),
  budget:   (a, b) => b.budget.totalBudget - a.budget.totalBudget,
  delivery: (a, b) => b.delivery.deliveryPercent - a.delivery.deliveryPercent,
  pacing:   (a, b) => b.budget.pacingPercent - a.budget.pacingPercent,
}

export const DealsPage = () => {
  const { data, isLoading, isError, isFetching, refetch } = useDealDashboard()
  const [filters, setFilters] = useState<DealFilters>(DEFAULT_FILTERS)

  const filteredDeals = useMemo(() => {
    if (!data) return []
    return data.deals
      .filter((d) => filters.status === 'all' || d.status === filters.status)
      .filter((d) => filters.priority === 'all' || d.priority === filters.priority)
      .sort(sortFns[filters.sortBy])
  }, [data, filters])

  if (isError) {
    return (
      <div
        role="alert"
        className="flex h-64 flex-col items-center justify-center gap-2 text-sm text-red-500"
      >
        <span>Failed to load deal data.</span>
        <button
          onClick={() => void refetch()}
          className="text-xs underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      {isLoading ? (
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      ) : (
        <DealToolbar
          filters={filters}
          onFiltersChange={setFilters}
          onRefresh={() => void refetch()}
          isRefreshing={isFetching}
          dealCount={filteredDeals.length}
        />
      )}

      {/* Summary KPIs */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      ) : (
        data && <SummaryKpiStrip summary={data.summary} />
      )}

      {/* Deal grid */}
      {isLoading ? (
        <DealGridSkeleton />
      ) : filteredDeals.length === 0 ? (
        <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-border text-sm text-text-secondary">
          No deals match the current filters.
        </div>
      ) : (
        <section
          aria-label="Deal cards"
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredDeals.map((deal, i) => (
            <DealCard key={deal.id} deal={deal} index={i} />
          ))}
        </section>
      )}
    </div>
  )
}
