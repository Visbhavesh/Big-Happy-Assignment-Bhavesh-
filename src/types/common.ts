export type Theme = 'light' | 'dark'

export type NavBadge = {
  count: number
  variant: 'brand' | 'danger' | 'warning'
}

export type NavItem = {
  label: string
  path: string
  icon: string
  badge?: NavBadge
  end?: boolean
}

export type NavSection = {
  id: string
  label?: string
  items: NavItem[]
}

export type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'analyst' | 'viewer'
  avatarUrl?: string
}
