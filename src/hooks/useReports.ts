import { useMemo, useState, useCallback } from 'react'
import { MOCK_REPORTS } from '@/lib/mockReports'
import { useReportStore } from '@/store/reportStore'
import type { Report } from '@/types'

const collator = new Intl.Collator('en')

const sortReports = (reports: Report[], key: string, dir: string): Report[] => {
  return [...reports].sort((a, b) => {
    let cmp = 0
    if (key === 'title') cmp = collator.compare(a.title, b.title)
    else if (key === 'createdAt') cmp = a.createdAt.localeCompare(b.createdAt)
    else if (key === 'updatedAt') cmp = a.updatedAt.localeCompare(b.updatedAt)
    else if (key === 'status') cmp = collator.compare(a.status, b.status)
    else if (key === 'category') cmp = collator.compare(a.category, b.category)
    return dir === 'asc' ? cmp : -cmp
  })
}

export const useReports = () => {
  const { filters } = useReportStore()
  const [favorites, setFavorites] = useState<Set<string>>(
    () => new Set(MOCK_REPORTS.filter((r) => r.isFavorite).map((r) => r.id)),
  )

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const filtered = useMemo(() => {
    let result = MOCK_REPORTS.map((r) => ({ ...r, isFavorite: favorites.has(r.id) }))

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)) ||
          r.createdBy.toLowerCase().includes(q),
      )
    }
    if (filters.category !== 'all') result = result.filter((r) => r.category === filters.category)
    if (filters.status !== 'all') result = result.filter((r) => r.status === filters.status)
    if (filters.exportType !== 'all') result = result.filter((r) => r.exportType === filters.exportType)
    if (filters.favoritesOnly) result = result.filter((r) => favorites.has(r.id))

    return sortReports(result, filters.sortKey, filters.sortDir)
  }, [filters, favorites])

  const totalPages = Math.max(1, Math.ceil(filtered.length / filters.pageSize))
  const paginated = useMemo(() => {
    const start = (filters.page - 1) * filters.pageSize
    return filtered.slice(start, start + filters.pageSize)
  }, [filtered, filters.page, filters.pageSize])

  return { reports: paginated, total: filtered.length, totalPages, toggleFavorite, favorites }
}
