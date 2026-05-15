import { FileX, Search, AlertTriangle, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import { ActionButton } from '@/components/ui'
import { useReportStore } from '@/store/reportStore'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface py-16 text-center"
  >
    {children}
  </motion.div>
)

export const ReportEmptySearch = () => {
  const { setSearch, resetFilters } = useReportStore()
  return (
    <Wrapper>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-hover">
        <Search size={22} className="text-text-secondary" />
      </div>
      <div>
        <p className="text-sm font-semibold text-text-primary">No reports found</p>
        <p className="mt-1 text-xs text-text-secondary">Try adjusting your search or filters</p>
      </div>
      <div className="flex gap-2">
        <ActionButton variant="ghost" size="sm" onClick={() => setSearch('')}>Clear search</ActionButton>
        <ActionButton variant="secondary" size="sm" onClick={resetFilters}>Reset all filters</ActionButton>
      </div>
    </Wrapper>
  )
}

export const ReportEmptyState = ({ onCreateReport }: { onCreateReport: () => void }) => (
  <Wrapper>
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
      <FileX size={22} className="text-brand" />
    </div>
    <div>
      <p className="text-sm font-semibold text-text-primary">No reports yet</p>
      <p className="mt-1 text-xs text-text-secondary">Create your first report to get started</p>
    </div>
    <ActionButton variant="primary" size="sm" onClick={onCreateReport}>Create Report</ActionButton>
  </Wrapper>
)

export const ReportErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <Wrapper>
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/30">
      <AlertTriangle size={22} className="text-red-500" />
    </div>
    <div>
      <p className="text-sm font-semibold text-text-primary">Failed to load reports</p>
      <p className="mt-1 text-xs text-text-secondary">An error occurred while fetching report data</p>
    </div>
    <ActionButton variant="secondary" size="sm" icon={<RefreshCw size={13} />} onClick={onRetry}>
      Try again
    </ActionButton>
  </Wrapper>
)
