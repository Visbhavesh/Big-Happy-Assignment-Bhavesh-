export type UserRole = 'admin' | 'analyst' | 'campaign_manager' | 'viewer'
export type UserStatus = 'active' | 'inactive' | 'invited' | 'suspended'
export type UserSortKey = 'name' | 'email' | 'role' | 'status' | 'lastActive' | 'createdAt'

export type UserPermission =
  | 'view_reports'
  | 'create_reports'
  | 'export_data'
  | 'manage_campaigns'
  | 'manage_users'
  | 'manage_settings'
  | 'view_billing'

export type AppUser = {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  avatarInitials: string
  avatarColor: string
  lastActive: string
  createdAt: string
  assignedCampaigns: string[]
  permissions: UserPermission[]
  department: string
  jobTitle: string
  phone?: string
}

export type UserFilters = {
  search: string
  role: UserRole | 'all'
  status: UserStatus | 'all'
  sortKey: UserSortKey
  sortDir: 'asc' | 'desc'
  page: number
  pageSize: number
}

export type UserModalMode = 'add' | 'edit' | 'invite' | null

export type UserFormValues = {
  name: string
  email: string
  role: UserRole
  department: string
  jobTitle: string
  phone: string
  permissions: UserPermission[]
}
