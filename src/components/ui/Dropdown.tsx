import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils'

type DropdownOption = {
  value: string
  label: string
}

type DropdownProps = {
  label?: string
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export const Dropdown = ({ label, options, value, onChange, className }: DropdownProps) => {
  const id = useId()

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-text-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full appearance-none rounded-lg border border-border bg-surface',
            'py-2 pl-3 pr-8 text-sm text-text-primary',
            'focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand',
            'hover:border-brand/50 transition-colors cursor-pointer',
          )}
          aria-label={label}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text-secondary"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
