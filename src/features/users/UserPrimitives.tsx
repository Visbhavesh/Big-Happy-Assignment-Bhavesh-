import { cn } from '@/utils'
import type { UserRole, UserStatus } from '@/types'

// ── Avatar ────────────────────────────────────────────────────────────────────

type AvatarProps = {
  initials: string
  color: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const avatarSize = { sm: 'h-7 w-7 text-[10px]', md: 'h-9 w-9 text-xs', lg: 'h-11 w-11 text-sm' }

export const Avatar = ({ initials, color, size = 'md', className }: AvatarProps) => (
  <div
    className={cn('flex shrink-0 items-center justify-center rounded-full font-semibold text-white select-none', avatarSize[size], className)}
    style={{ backgroundColor: color }}
    aria-hidden="true"
  >
    {initials}
  </div>
)

// ── Role badge ────────────────────────────────────────────────────────────────

const ROLE_CONFIG: Record<UserRole, { label: string; className: string }> = {
  admin:            { label: 'Admin',            className: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400' },
  analyst:          { label: 'Analyst',          className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' },
  campaign_manager: { label: 'Campaign Mgr',     className: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400' },
  viewer:           { label: 'Viewer',           className: 'bg-gray-100 text-gray-600 dark:bg-gray-800/60 dark:text-gray-400' },
}

type RoleBadgeProps = { role: UserRole; className?: string }

export const UserRoleBadge = ({ role, className }: RoleBadgeProps) => {
  const cfg = ROLE_CONFIG[role]
  return (
    <span className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium', cfg.className, className)}>
      {cfg.label}
    </span>
  )
}

// ── Status badge ──────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<UserStatus, { label: string; dot: string; className: string }> = {
  active:    { label: 'Active',    dot: 'bg-emerald-500',              className: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  inactive:  { label: 'Inactive',  dot: 'bg-gray-400',                 className: 'bg-gray-100 text-gray-600 dark:bg-gray-800/60 dark:text-gray-400' },
  invited:   { label: 'Invited',   dot: 'bg-amber-400 animate-pulse',  className: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  suspended: { label: 'Suspended', dot: 'bg-red-500',                  className: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
}

type StatusBadgeProps = { status: UserStatus; className?: string }

export const UserStatusBadge = ({ status, className }: StatusBadgeProps) => {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', cfg.className, className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', cfg.dot)} aria-hidden="true" />
      {cfg.label}
    </span>
  )
}

// ── Sort header ───────────────────────────────────────────────────────────────

import { ChevronUp, ChevronDown } from 'lucide-react'
import type { UserSortKey } from '@/types'

type TableSortHeaderProps = {
  label: string
  sortKey: UserSortKey
  currentKey: UserSortKey
  currentDir: 'asc' | 'desc'
  onSort: (key: UserSortKey) => void
  className?: string
}

export const TableSortHeader = ({ label, sortKey, currentKey, currentDir, onSort, className }: TableSortHeaderProps) => {
  const isActive = currentKey === sortKey
  return (
    <button
      onClick={() => onSort(sortKey)}
      className={cn(
        'flex items-center gap-1 text-xs font-semibold uppercase tracking-wide transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded',
        isActive ? 'text-brand' : 'text-text-secondary hover:text-text-primary',
        className,
      )}
      aria-sort={isActive ? (currentDir === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      {label}
      <span className="flex flex-col" aria-hidden="true">
        <ChevronUp size={9} className={cn(isActive && currentDir === 'asc' ? 'text-brand' : 'text-border')} />
        <ChevronDown size={9} className={cn(isActive && currentDir === 'desc' ? 'text-brand' : 'text-border')} />
      </span>
    </button>
  )
}
