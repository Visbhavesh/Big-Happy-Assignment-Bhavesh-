import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { TimeSeries } from '@/types'
import { formatNumber } from '@/utils'

type RevenueChartProps = {
  data: TimeSeries
}

export const RevenueChart = ({ data }: RevenueChartProps) => (
  <ResponsiveContainer width="100%" height={220}>
    <AreaChart data={data.data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
      <defs>
        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="var(--color-brand)" stopOpacity={0.2} />
          <stop offset="95%" stopColor="var(--color-brand)" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
      <XAxis
        dataKey="date"
        tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }}
        tickFormatter={(v: string) => v.slice(5)}
        interval={6}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }}
        tickFormatter={(v: number) => formatNumber(v)}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip
        contentStyle={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 8,
          fontSize: 12,
        }}
        formatter={(v) => {
          const num = typeof v === 'number' ? v : Number(v ?? 0)
          return [`$${formatNumber(num)}`, 'Revenue'] as [string, string]
        }}
      />
      <Area
        type="monotone"
        dataKey="value"
        stroke="var(--color-brand)"
        strokeWidth={2}
        fill="url(#revenueGradient)"
      />
    </AreaChart>
  </ResponsiveContainer>
)
