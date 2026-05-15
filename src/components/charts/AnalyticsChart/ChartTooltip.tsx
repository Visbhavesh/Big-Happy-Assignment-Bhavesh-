import type { TooltipProps } from 'recharts'
import type { MetricConfig, MetricKey } from '@/types'
import { cn } from '@/utils'

type Entry = {
  dataKey?: string | number
  value?: number
}

type ChartTooltipProps = Omit<TooltipProps<number, string>, 'content'> & {
  activeConfigs: MetricConfig[]
  active?: boolean
  payload?: Entry[]
  label?: string | number
}

export const ChartTooltip = ({ active, payload, label, activeConfigs }: ChartTooltipProps) => {
  if (!active || !payload?.length) return null

  const configMap = new Map<MetricKey, MetricConfig>(
    activeConfigs.map((c) => [c.key, c]),
  )

  return (
    <div
      className={cn('min-w-[180px] rounded-xl border border-border bg-surface shadow-xl p-3 text-xs')}
      role="tooltip"
    >
      <p className="mb-2 border-b border-border pb-1.5 font-semibold text-text-primary">
        {String(label ?? '')}
      </p>
      <div className="space-y-1.5">
        {payload.map((entry, i) => {
          const key = String(entry.dataKey ?? '') as MetricKey
          const cfg = configMap.get(key)
          if (!cfg) return null
          return (
            <div key={i} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: cfg.color }}
                  aria-hidden="true"
                />
                <span className="text-text-secondary">{cfg.label}</span>
              </div>
              <span className="font-semibold tabular-nums text-text-primary">
                {cfg.formatter(entry.value ?? 0)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
