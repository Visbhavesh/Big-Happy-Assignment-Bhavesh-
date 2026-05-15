import { create } from 'zustand'
import type { ReportFilters, ReportSortKey, SortDirection, ReportStatus, ReportCategory, ReportExportType } from '@/types'

type ReportStoreState = {
  filters: ReportFilters
  selectedIds: Set<string>

  setSearch: (q: string) => void
  setCategory: (c: ReportCategory | 'all') => void
  setStatus: (s: ReportStatus | 'all') => void
  setExportType: (e: ReportExportType | 'all') => void
  setFavoritesOnly: (v: boolean) => void
  setSort: (key: ReportSortKey, dir: SortDirection) => void
  setPage: (p: number) => void
  resetFilters: () => void
  toggleSelect: (id: string) => void
  clearSelection: () => void
}

const DEFAULT_FILTERS: ReportFilters = {
  search: '',
  category: 'all',
  status: 'all',
  exportType: 'all',
  favoritesOnly: false,
  sortKey: 'updatedAt',
  sortDir: 'desc',
  page: 1,
  pageSize: 6,
}

export const useReportStore = create<ReportStoreState>((set) => ({
  filters: DEFAULT_FILTERS,
  selectedIds: new Set(),

  setSearch: (search) => set((s) => ({ filters: { ...s.filters, search, page: 1 } })),
  setCategory: (category) => set((s) => ({ filters: { ...s.filters, category, page: 1 } })),
  setStatus: (status) => set((s) => ({ filters: { ...s.filters, status, page: 1 } })),
  setExportType: (exportType) => set((s) => ({ filters: { ...s.filters, exportType, page: 1 } })),
  setFavoritesOnly: (favoritesOnly) => set((s) => ({ filters: { ...s.filters, favoritesOnly, page: 1 } })),
  setSort: (sortKey, sortDir) => set((s) => ({ filters: { ...s.filters, sortKey, sortDir } })),
  setPage: (page) => set((s) => ({ filters: { ...s.filters, page } })),
  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
  toggleSelect: (id) =>
    set((s) => {
      const next = new Set(s.selectedIds)
      next.has(id) ? next.delete(id) : next.add(id)
      return { selectedIds: next }
    }),
  clearSelection: () => set({ selectedIds: new Set() }),
}))
