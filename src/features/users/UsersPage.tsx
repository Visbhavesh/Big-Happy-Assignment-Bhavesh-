import { useUsers } from '@/hooks/useUsers'
import { useUserStore } from '@/store/userStore'
import { UserToolbar } from './UserToolbar'
import { UserTable } from './UserTable'
import { UserTableSkeleton } from './UserTableSkeleton'
import { UserPagination } from './UserPagination'
import { UserFormModal } from './UserFormModal'
import { InviteModal } from './InviteModal'
import { UserEmptySearch, UserEmptyState } from './UserStates'

export const UsersPage = () => {
  const { filters } = useUserStore()
  const { users, total, totalPages, deactivateUser, deleteUser, addUser, updateUser } = useUsers()

  const hasActiveFilters =
    filters.search !== '' || filters.role !== 'all' || filters.status !== 'all'

  const isLoading = false

  return (
    <div className="space-y-5">
      <UserToolbar total={total} />

      {isLoading ? (
        <UserTableSkeleton rows={8} />
      ) : users.length === 0 ? (
        hasActiveFilters ? <UserEmptySearch /> : <UserEmptyState />
      ) : (
        <>
          <UserTable users={users} onDeactivate={deactivateUser} onDelete={deleteUser} />
          <UserPagination totalPages={totalPages} total={total} />
        </>
      )}

      <UserFormModal onAdd={addUser} onUpdate={updateUser} />
      <InviteModal />
    </div>
  )
}
