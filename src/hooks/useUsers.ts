import { useMemo, useState, useCallback } from 'react'
import { MOCK_USERS } from '@/lib/mockUsers'
import { useUserStore } from '@/store/userStore'
import type { AppUser } from '@/types'

const collator = new Intl.Collator('en')

export const useUsers = () => {
  const { filters } = useUserStore()
  const [users, setUsers] = useState<AppUser[]>(MOCK_USERS)

  const deactivateUser = useCallback((id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: 'inactive' as const } : u)),
    )
  }, [])

  const deleteUser = useCallback((id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }, [])

  const addUser = useCallback((user: AppUser) => {
    setUsers((prev) => [user, ...prev])
  }, [])

  const updateUser = useCallback((updated: AppUser) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
  }, [])

  const filtered = useMemo(() => {
    let result = [...users]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.department.toLowerCase().includes(q) ||
          u.jobTitle.toLowerCase().includes(q),
      )
    }
    if (filters.role !== 'all') result = result.filter((u) => u.role === filters.role)
    if (filters.status !== 'all') result = result.filter((u) => u.status === filters.status)

    result.sort((a, b) => {
      let cmp = 0
      const k = filters.sortKey
      if (k === 'name') cmp = collator.compare(a.name, b.name)
      else if (k === 'email') cmp = collator.compare(a.email, b.email)
      else if (k === 'role') cmp = collator.compare(a.role, b.role)
      else if (k === 'status') cmp = collator.compare(a.status, b.status)
      else if (k === 'lastActive') cmp = a.lastActive.localeCompare(b.lastActive)
      else if (k === 'createdAt') cmp = a.createdAt.localeCompare(b.createdAt)
      return filters.sortDir === 'asc' ? cmp : -cmp
    })

    return result
  }, [users, filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / filters.pageSize))
  const paginated = useMemo(() => {
    const start = (filters.page - 1) * filters.pageSize
    return filtered.slice(start, start + filters.pageSize)
  }, [filtered, filters.page, filters.pageSize])

  return { users: paginated, total: filtered.length, totalPages, deactivateUser, deleteUser, addUser, updateUser }
}
