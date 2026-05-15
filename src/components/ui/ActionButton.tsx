import { cn } from '@/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md'

type ActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: React.ReactNode
  loading?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand/90 focus-visible:ring-brand/40',
  secondary:
    'border border-border bg-surface text-text-primary hover:bg-hover focus-visible:ring-brand/30',
  ghost:
    'text-text-secondary hover:bg-hover hover:text-text-primary focus-visible:ring-brand/30',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400/40',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
}

export const ActionButton = ({
  variant = 'secondary',
  size = 'md',
  icon,
  loading = false,
  children,
  className,
  disabled,
  ...props
}: ActionButtonProps) => (
  <button
    {...props}
    disabled={disabled ?? loading}
    className={cn(
      'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2',
      'disabled:pointer-events-none disabled:opacity-50',
      variantClasses[variant],
      sizeClasses[size],
      className,
    )}
  >
    {loading ? (
      <span
        className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
        aria-hidden="true"
      />
    ) : (
      icon
    )}
    {children}
  </button>
)
