import { motion } from 'framer-motion'
import { useChartStore } from '@/store/chartStore'
import { METRIC_CONFIG, ALL_METRIC_KEYS } from '@/lib/metricConfig'
import { cn } from '@/utils'

export const MetricToggleLegend = () => {
  const { activeMetrics, toggleMetric } = useChartStore()

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Toggle chart metrics"
    >
      {ALL_METRIC_KEYS.map((key) => {
        const cfg = METRIC_CONFIG[key]
        const isActive = activeMetrics.includes(key)

        return (
          <motion.button
            key={key}
            onClick={() => toggleMetric(key)}
            whileTap={{ scale: 0.94 }}
            aria-pressed={isActive}
            aria-label={`${isActive ? 'Hide' : 'Show'} ${cfg.label}`}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
              'transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
              isActive
                ? 'border-transparent text-white shadow-sm'
                : 'border-border bg-surface text-text-secondary hover:border-brand/40 hover:text-text-primary',
            )}
            style={isActive ? { backgroundColor: cfg.color, borderColor: cfg.color } : {}}
          >
            {/* swatch */}
            <span
              className={cn(
                'h-2 w-2 rounded-full shrink-0 transition-colors',
                isActive ? 'bg-white/70' : 'bg-current',
              )}
              style={isActive ? {} : { backgroundColor: cfg.color }}
              aria-hidden="true"
            />
            {cfg.shortLabel}
            {/* chart type badge */}
            <span
              className={cn(
                'rounded px-1 text-[9px] font-semibold uppercase tracking-wide',
                isActive ? 'bg-white/20 text-white' : 'bg-border text-text-secondary',
              )}
            >
              {cfg.chartType === 'bar' ? 'BAR' : 'LINE'}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
