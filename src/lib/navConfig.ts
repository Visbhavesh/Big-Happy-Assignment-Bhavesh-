import type { NavSection } from '@/types'

export const NAV_SECTIONS: NavSection[] = [
  {
    id: 'main',
    items: [
      { label: 'Dashboard',  path: '/',         icon: 'grid',       end: true },
      // { label: 'Analytics',  path: '/analytics', icon: 'line-chart' },
      { label: 'Deals',      path: '/deals',     icon: 'briefcase',  badge: { count: 1, variant: 'warning' } },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    items: [
      { label: 'Reports',    path: '/reports',   icon: 'bar-chart',  badge: { count: 3, variant: 'brand' } },
      { label: 'Users',      path: '/users',     icon: 'users' },
    ],
  },
  {
    id: 'system',
    label: 'System',
    items: [
      { label: 'Settings',   path: '/settings',  icon: 'settings' },
    ],
  },
]

// Flat list kept for legacy consumers
// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const NAV_ITEMS = NAV_SECTIONS.flatMap((s: NavSection) => s.items)
