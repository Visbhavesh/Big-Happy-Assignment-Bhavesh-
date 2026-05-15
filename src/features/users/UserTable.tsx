import { motion } from 'framer-motion'
import { Avatar, UserRoleBadge, UserStatusBadge, TableSortHeader } from './UserPrimitives'
import { UserActionMenu } from './UserActionMenu'
import { useUserStore } from '@/store/userStore'
import { cn } from '@/utils'
import type { AppUser, UserSortKey } from '@/types'

type UserTableProps = {
  users: AppUser[]
  onDeactivate: (id: string) => void
  onDelete: (id: string) => void
}

const relativeDate = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export const UserTable = ({ users, onDeactivate, onDelete }: UserTableProps) => {
  const { filters, setSort, openModal } = useUserStore()

  const handleSort = (key: UserSortKey) => {
    const newDir = filters.sortKey === key && filters.sortDir === 'asc' ? 'desc' : 'asc'
    setSort(key, newDir)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm" role="grid" aria-label="Users table">
          <thead>
            <tr className="border-b border-border bg-background">
              {[
                { label: 'User', key: 'name' as UserSortKey, className: 'pl-5 w-64' },
                { label: 'Role', key: 'role' as UserSortKey, className: 'w-36' },
                { label: 'Status', key: 'status' as UserSortKey, className: 'w-28' },
                { label: 'Department', key: null, className: 'w-40' },
                { label: 'Last Active', key: 'lastActive' as UserSortKey, className: 'w-32' },
                { label: 'Campaigns', key: null, className: 'w-24' },
              ].map((col) => (
                <th key={col.label} className={cn('py-3 pr-4 text-left', col.className)}>
                  {col.key ? (
                    <TableSortHeader
                      label={col.label}
                      sortKey={col.key}
                      currentKey={filters.sortKey}
                      currentDir={filters.sortDir}
                      onSort={handleSort}
                    />
                  ) : (
                    <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                      {col.label}
                    </span>
                  )}
                </th>
              ))}
              <th className="py-3 pr-5 text-right">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user, i) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
                className={cn(
                  'group transition-colors hover:bg-hover/50',
                  user.status === 'suspended' && 'opacity-60',
                )}
                role="row"
              >
                {/* User cell */}
                <td className="py-3.5 pl-5 pr-4">
                  <div className="flex items-center gap-3">
                    <Avatar initials={user.avatarInitials} color={user.avatarColor} size="md" />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-text-primary">{user.name}</p>
                      <p className="truncate text-xs text-text-secondary">{user.email}</p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="py-3.5 pr-4">
                  <UserRoleBadge role={user.role} />
                </td>

                {/* Status */}
                <td className="py-3.5 pr-4">
                  <UserStatusBadge status={user.status} />
                </td>

                {/* Department */}
                <td className="py-3.5 pr-4">
                  <div>
                    <p className="text-xs font-medium text-text-primary">{user.department}</p>
                    <p className="text-xs text-text-secondary">{user.jobTitle}</p>
                  </div>
                </td>

                {/* Last active */}
                <td className="py-3.5 pr-4">
                  <span className="text-xs text-text-secondary">{relativeDate(user.lastActive)}</span>
                </td>

                {/* Campaigns */}
                <td className="py-3.5 pr-4">
                  <span className="text-xs font-medium text-text-primary">
                    {user.assignedCampaigns.length}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3.5 pr-5 text-right">
                  <UserActionMenu
                    user={user}
                    onEdit={(u) => openModal('edit', u)}
                    onDeactivate={onDeactivate}
                    onDelete={onDelete}
                    onResendInvite={(id) => console.log('Resend invite', id)}
                  />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
