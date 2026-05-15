import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useUserStore } from '@/store/userStore'
import { cn } from '@/utils'

type UserPaginationProps = { totalPages: number; total: number }

export const UserPagination = ({ totalPages, total }: UserPaginationProps) => {
  const { filters, setPage } = useUserStore()
  const { page, pageSize } = filters
  if (totalPages <= 1) return null

  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const btnBase = cn(
    'flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
    'disabled:pointer-events-none disabled:opacity-40',
  )

  return (
    <div className="flex items-center justify-between border-t border-border pt-4">
      <span className="text-xs text-text-secondary">
        Showing {start}–{end} of {total} users
      </span>
      <nav className="flex items-center gap-1" aria-label="Pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} aria-label="Previous page"
          className={cn(btnBase, 'border border-border text-text-secondary hover:bg-hover hover:text-text-primary')}>
          <ChevronLeft size={14} />
        </button>
        {pages.map((p) => (
          <button key={p} onClick={() => setPage(p)} aria-label={`Page ${p}`} aria-current={p === page ? 'page' : undefined}
            className={cn(btnBase, p === page ? 'bg-brand text-white' : 'border border-border text-text-secondary hover:bg-hover hover:text-text-primary')}>
            {p}
          </button>
        ))}
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages} aria-label="Next page"
          className={cn(btnBase, 'border border-border text-text-secondary hover:bg-hover hover:text-text-primary')}>
          <ChevronRight size={14} />
        </button>
      </nav>
    </div>
  )
}
