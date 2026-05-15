/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart2, Briefcase, Grid, Users, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/utils'

const ICON_MAP: Record<string, React.ReactNode> = {
  grid: <Grid size={18} />,
  briefcase: <Briefcase size={18} />,
  'bar-chart': <BarChart2 size={18} />,
  users: <Users size={18} />,
  settings: <Settings size={18} />,
}

export const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar } = useUIStore()

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 64 : 220 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="relative flex h-screen flex-col border-r border-border bg-surface"
    >
      {/* Logo */}
 <div className="flex h-16 items-center gap-3 px-4 border-b border-border overflow-hidden">
  <div className="flex shrink-0 items-center justify-center">
    <img src="/logo.svg" alt="Logo" className="h-full w-full object-contain" />
  </div>
  <AnimatePresence>
    {!sidebarCollapsed && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center border-l border-border pl-3 h-8"
      >
        <img src="/PARK.png" alt="Park" className="h-full object-contain" />
      </motion.div>
    )}
  </AnimatePresence>
</div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand/10 text-brand'
                  : 'text-text-secondary hover:bg-hover hover:text-text-primary',
              )
            }
          >
            <span className="shrink-0">{ICON_MAP[item.icon]}</span>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface text-text-secondary shadow-sm hover:text-text-primary"
      >
        {sidebarCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </motion.aside>
  )
}
