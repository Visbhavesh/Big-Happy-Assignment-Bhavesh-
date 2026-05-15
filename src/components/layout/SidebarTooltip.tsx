import { useRef, useState } from 'react'
import { cn } from '@/utils'

type SidebarTooltipProps = {
  label: string
  children: React.ReactNode
  disabled?: boolean
}

export const SidebarTooltip = ({ label, children, disabled = false }: SidebarTooltipProps) => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  if (disabled) return <>{children}</>

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            'pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2',
            'whitespace-nowrap rounded-lg border border-border bg-surface px-2.5 py-1.5',
            'text-xs font-medium text-text-primary shadow-lg',
            'animate-in fade-in-0 zoom-in-95 duration-100',
          )}
        >
          {label}
          {/* Arrow */}
          <span
            className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-border"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  )
}
