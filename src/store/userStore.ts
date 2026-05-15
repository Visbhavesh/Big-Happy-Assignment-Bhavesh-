import { create } from 'zustand'
import type { UserFilters, UserModalMode, AppUser, UserRole, UserStatus, UserSortKey } from '@/types'

type UserStoreState = {
  filters: UserFilters
  modalMode: UserModalMode
  editingUser: AppUser | null

  setSearch: (q: string) => void
  setRole: (r: UserRole | 'all') => void
  setStatus: (s: UserStatus | 'all') => void
  setSort: (key: UserSortKey, dir: 'asc' | 'desc') => void
  setPage: (p: number) => void
  resetFilters: () => void
  openModal: (mode: UserModalMode, user?: AppUser) => void
  closeModal: () => void
}


const DEFAULT_FILTERS: UserFilters = {
  search: '',
  role: 'all',
  status: 'all',
  sortKey: 'name',
  sortDir: 'asc',
  page: 1,
  pageSize: 8,
}

export const useUserStore = create<UserStoreState>((set) => ({
  filters: DEFAULT_FILTERS,
  modalMode: null,
  editingUser: null,

  setSearch: (search) => set((s) => ({ filters: { ...s.filters, search, page: 1 } })),
  setRole: (role) => set((s) => ({ filters: { ...s.filters, role, page: 1 } })),
  setStatus: (status) => set((s) => ({ filters: { ...s.filters, status, page: 1 } })),
  setSort: (sortKey, sortDir) => set((s) => ({ filters: { ...s.filters, sortKey, sortDir } })),
  setPage: (page) => set((s) => ({ filters: { ...s.filters, page } })),
  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
  openModal: (mode, user) => set({ modalMode: mode, editingUser: user ?? null }),
  closeModal: () => set({ modalMode: null, editingUser: null }),
}))
