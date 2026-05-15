import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { NAV_SECTIONS } from '@/lib/navConfig'
import { SidebarItem } from './SidebarItem'

export const MobileDrawer = () => {
  const { mobileDrawerOpen, closeMobileDrawer } = useUIStore()

  useEffect(() => {
    if (!mobileDrawerOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMobileDrawer() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [mobileDrawerOpen, closeMobileDrawer])

  return createPortal(
    <AnimatePresence>
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMobileDrawer}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            className="absolute left-0 top-0 h-full w-72 border-r border-border bg-surface shadow-2xl flex flex-col"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          >
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-white font-bold text-sm">
                  A
                </div>
                <span className="text-sm font-semibold text-text-primary">Analytics</span>
              </div>
              <button
                onClick={closeMobileDrawer}
                aria-label="Close navigation"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5" aria-label="Mobile navigation">
              {NAV_SECTIONS.map((section) => (
                <div key={section.id}>
                  {section.label && (
                    <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-text-secondary">
                      {section.label}
                    </p>
                  )}
                  <div className="space-y-0.5">
                    {section.items.map((item) => (
                      <SidebarItem
                        key={item.path}
                        item={item}
                        collapsed={false}
                        onNavigate={closeMobileDrawer}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            {/* Footer */}
            <div className="border-t border-border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-white text-xs font-semibold">
                  JE
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-text-primary">Jordan Ellis</p>
                  <p className="truncate text-[10px] text-text-secondary">Admin</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
