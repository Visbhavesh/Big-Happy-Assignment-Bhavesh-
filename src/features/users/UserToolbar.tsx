import { useRef } from 'react'
import { Search, X, RotateCcw, UserPlus, Mail } from 'lucide-react'
import { useUserStore } from '@/store/userStore'
import { ActionButton, Dropdown } from '@/components/ui'
import { cn } from '@/utils'

const ROLE_OPTIONS = [
  { value: 'all', label: 'All Roles' },
  { value: 'admin', label: 'Admin' },
  { value: 'analyst', label: 'Analyst' },
  { value: 'campaign_manager', label: 'Campaign Manager' },
  { value: 'viewer', label: 'Viewer' },
]

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'invited', label: 'Invited' },
  { value: 'suspended', label: 'Suspended' },
]

type UserToolbarProps = { total: number }

export const UserToolbar = ({ total }: UserToolbarProps) => {
  const { filters, setSearch, setRole, setStatus, resetFilters, openModal } = useUserStore()
  const searchRef = useRef<HTMLInputElement>(null)

  const activeFilterCount = [filters.role !== 'all', filters.status !== 'all'].filter(Boolean).length

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-text-primary">Users</h1>
          <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand">{total}</span>
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <ActionButton variant="ghost" size="sm" icon={<RotateCcw size={13} />} onClick={resetFilters}>
              Clear
              <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] text-white font-bold">
                {activeFilterCount}
              </span>
            </ActionButton>
          )}
          <ActionButton variant="secondary" size="sm" icon={<Mail size={13} />} onClick={() => openModal('invite')}>
            Invite
          </ActionButton>
          <ActionButton variant="primary" size="sm" icon={<UserPlus size={13} />} onClick={() => openModal('add')}>
            Add User
          </ActionButton>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex items-center">
          <Search size={14} className="absolute left-3 text-text-secondary pointer-events-none" aria-hidden="true" />
          <input
            ref={searchRef}
            type="search"
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users…"
            aria-label="Search users"
            className={cn(
              'h-9 w-56 rounded-lg border border-border bg-surface pl-8 pr-8 text-sm text-text-primary',
              'placeholder:text-text-secondary outline-none transition-colors',
              'focus:border-brand focus:ring-2 focus:ring-brand/20',
            )}
          />
          {filters.search && (
            <button onClick={() => setSearch('')} aria-label="Clear search" className="absolute right-2.5 text-text-secondary hover:text-text-primary">
              <X size={13} />
            </button>
          )}
        </div>
        <Dropdown options={ROLE_OPTIONS} value={filters.role} onChange={(v) => setRole(v as typeof filters.role)} />
        <Dropdown options={STATUS_OPTIONS} value={filters.status} onChange={(v) => setStatus(v as typeof filters.status)} />
      </div>
    </div>
  )
}
