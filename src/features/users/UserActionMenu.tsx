import { useRef, useState, useEffect } from 'react'
import { MoreVertical, Edit2, UserX, Trash2, Mail, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils'
import type { AppUser } from '@/types'

type UserActionMenuProps = {
  user: AppUser
  onEdit: (user: AppUser) => void
  onDeactivate: (id: string) => void
  onDelete: (id: string) => void
  onResendInvite: (id: string) => void
}

export const UserActionMenu = ({ user, onEdit, onDeactivate, onDelete, onResendInvite }: UserActionMenuProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const keyHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', keyHandler)
    }
  }, [open])

  const items = [
    { label: 'Edit user', icon: <Edit2 size={13} />, action: () => { onEdit(user); setOpen(false) }, show: true },
    { label: 'Resend invite', icon: <Mail size={13} />, action: () => { onResendInvite(user.id); setOpen(false) }, show: user.status === 'invited' },
    { label: 'Manage permissions', icon: <ShieldCheck size={13} />, action: () => { onEdit(user); setOpen(false) }, show: true },
    { label: user.status === 'inactive' ? 'Reactivate' : 'Deactivate', icon: <UserX size={13} />, action: () => { onDeactivate(user.id); setOpen(false) }, show: user.status !== 'suspended', danger: false },
    { label: 'Delete user', icon: <Trash2 size={13} />, action: () => { onDelete(user.id); setOpen(false) }, show: true, danger: true },
  ].filter((i) => i.show)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={`Actions for ${user.name}`}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-7 w-7 items-center justify-center rounded-md text-text-secondary hover:bg-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 transition-colors"
      >
        <MoreVertical size={15} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-8 z-20 min-w-[168px] rounded-xl border border-border bg-surface py-1 shadow-xl"
          >
            {items.map((item) => (
              <button
                key={item.label}
                role="menuitem"
                onClick={item.action}
                className={cn(
                  'flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:bg-hover',
                  item.danger
                    ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                    : 'text-text-secondary hover:bg-hover hover:text-text-primary',
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
