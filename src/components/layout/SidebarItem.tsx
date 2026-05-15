import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SidebarTooltip } from './SidebarTooltip'
import { ICON_MAP } from './navIcons'
import { cn } from '@/utils'
import type { NavItem } from '@/types'

type NavBadgeVariant = 'brand' | 'danger' | 'warning'

const badgeColors: Record<NavBadgeVariant, string> = {
  brand:   'bg-brand text-white',
  danger:  'bg-red-500 text-white',
  warning: 'bg-amber-500 text-white',
}

type SidebarItemProps = {
  item: NavItem
  collapsed: boolean
  onNavigate?: () => void
}

export const SidebarItem = ({ item, collapsed, onNavigate }: SidebarItemProps) => (
  <SidebarTooltip label={item.label} disabled={!collapsed}>
    <NavLink
      to={item.path}
      end={item.end ?? false}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
          'transition-colors duration-150 outline-none',
          'focus-visible:ring-2 focus-visible:ring-brand/40',
          isActive
            ? 'bg-brand/10 text-brand'
            : 'text-text-secondary hover:bg-hover hover:text-text-primary',
        )
      }
      aria-label={collapsed ? item.label : undefined}
    >
      {({ isActive }) => (
        <>
          {/* Active left indicator bar */}
          {isActive && (
            <motion.span
              layoutId="sidebar-active-bar"
              className="absolute -left-2 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-brand"
              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              aria-hidden="true"
            />
          )}

          {/* Icon */}
          <span className="shrink-0">{ICON_MAP[item.icon]}</span>

          {/* Label */}
          {!collapsed && (
            <span className="flex-1 truncate">{item.label}</span>
          )}

          {/* Badge */}
          {!collapsed && item.badge && item.badge.count > 0 && (
            <span
              className={cn(
                'flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold',
                badgeColors[item.badge.variant],
              )}
              aria-label={`${item.badge.count} notifications`}
            >
              {item.badge.count > 99 ? '99+' : item.badge.count}
            </span>
          )}

          {/* Collapsed badge dot */}
          {collapsed && item.badge && item.badge.count > 0 && (
            <span
              className={cn(
                'absolute right-1.5 top-1.5 h-2 w-2 rounded-full',
                item.badge.variant === 'danger' ? 'bg-red-500' :
                item.badge.variant === 'warning' ? 'bg-amber-500' : 'bg-brand',
              )}
              aria-hidden="true"
            />
          )}
        </>
      )}
    </NavLink>
  </SidebarTooltip>
)
