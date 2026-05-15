import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '@/components/ui'
import { formatCurrency, formatNumber, formatPercent } from '@/utils'
import type { MetricCard as MetricCardType } from '@/types'

type MetricCardProps = {
  metric: MetricCardType
  index: number
}

const formatValue = (value: number, unit: string): string => {
  if (unit === '$') return formatCurrency(value)
  if (unit === '%') return `${value}%`
  return formatNumber(value)
}

export const MetricCard = ({ metric, index }: MetricCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
  >
    <Card>
      <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">{metric.label}</p>
      <p className="mt-2 text-2xl font-bold text-text-primary">
        {formatValue(metric.value, metric.unit)}
      </p>
      <div className="mt-2 flex items-center gap-1">
        {metric.changeType === 'increase' ? (
          <TrendingUp size={14} className="text-emerald-500" />
        ) : (
          <TrendingDown size={14} className="text-red-500" />
        )}
        <span
          className={`text-xs font-medium ${
            metric.changeType === 'increase' ? 'text-emerald-500' : 'text-red-500'
          }`}
        >
          {formatPercent(metric.change)}
        </span>
        <span className="text-xs text-text-secondary">vs last month</span>
      </div>
    </Card>
  </motion.div>
)
