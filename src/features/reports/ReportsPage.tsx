import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useReports } from '@/hooks/useReports'
import { ReportToolbar } from './ReportToolbar'
import { ReportCard } from './ReportCard'
import { ReportGridSkeleton } from './ReportGridSkeleton'
import { ReportPagination } from './ReportPagination'
import { ReportEmptySearch, ReportEmptyState, ReportErrorState } from './ReportStates'
import { useReportStore } from '@/store/reportStore'

export const ReportsPage = () => {
  const [isLoading] = useState(false)
  const [isError] = useState(false)
  const { filters } = useReportStore()
  const { reports, total, totalPages, toggleFavorite } = useReports()

  const hasActiveFilters =
    filters.search !== '' ||
    filters.category !== 'all' ||
    filters.status !== 'all' ||
    filters.exportType !== 'all' ||
    filters.favoritesOnly

  const handleCreateReport = useCallback(() => {
    alert('Create Report — wire to modal/drawer in production')
  }, [])

  const handleDuplicate = useCallback((id: string) => {
    console.log('Duplicate', id)
  }, [])

  const handleDelete = useCallback((id: string) => {
    console.log('Delete', id)
  }, [])

  const handleExport = useCallback((id: string) => {
    console.log('Export', id)
  }, [])

  if (isError) {
    return (
      <div className="space-y-6">
        <ReportToolbar total={0} onCreateReport={handleCreateReport} />
        <ReportErrorState onRetry={() => window.location.reload()} />
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <ReportToolbar total={total} onCreateReport={handleCreateReport} />

      {isLoading ? (
        <ReportGridSkeleton count={6} />
      ) : reports.length === 0 ? (
        hasActiveFilters ? (
          <ReportEmptySearch />
        ) : (
          <ReportEmptyState onCreateReport={handleCreateReport} />
        )
      ) : (
        <>
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {reports.map((report, i) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  index={i}
                  onFavorite={toggleFavorite}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDelete}
                  onExport={handleExport}
                />
              ))}
            </div>
          </AnimatePresence>
          <ReportPagination totalPages={totalPages} total={total} />
        </>
      )}
    </div>
  )
}
