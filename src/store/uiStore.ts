import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme } from '@/types'

type UIState = {
  theme: Theme
  sidebarCollapsed: boolean
  mobileDrawerOpen: boolean
  toggleTheme: () => void
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  openMobileDrawer: () => void
  closeMobileDrawer: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      sidebarCollapsed: false,
      mobileDrawerOpen: false,
      toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      openMobileDrawer: () => set({ mobileDrawerOpen: true }),
      closeMobileDrawer: () => set({ mobileDrawerOpen: false }),
    }),
    { name: 'ui-store' },
  ),
)
