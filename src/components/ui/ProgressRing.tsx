import { motion } from 'framer-motion'
import { cn } from '@/utils'

type ProgressRingProps = {
  percent: number
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
  label?: string
  sublabel?: string
  className?: string
}

export const ProgressRing = ({
  percent,
  size = 120,
  strokeWidth = 10,
  color = 'var(--color-brand)',
  trackColor = 'var(--color-border)',
  label,
  sublabel,
  className,
}: ProgressRingProps) => {
  const r = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * r
  const clampedPercent = Math.min(100, Math.max(0, percent))
  const offset = circumference - (clampedPercent / 100) * circumference

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label ?? 'Progress'}: ${clampedPercent.toFixed(1)}%`}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-lg font-bold text-text-primary leading-none">
          {clampedPercent.toFixed(0)}%
        </span>
        {sublabel && (
          <span className="mt-0.5 text-[10px] text-text-secondary leading-tight">{sublabel}</span>
        )}
      </div>
    </div>
  )
}
