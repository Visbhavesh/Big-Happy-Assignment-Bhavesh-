import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { TrafficSource } from '@/types'

type TrafficPieChartProps = {
  data: TrafficSource[]
}

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']

export const TrafficPieChart = ({ data }: TrafficPieChartProps) => (
  <ResponsiveContainer width="100%" height={220}>
    <PieChart>
      <Pie
        data={data}
        dataKey="visits"
        nameKey="source"
        cx="50%"
        cy="50%"
        innerRadius={55}
        outerRadius={85}
        paddingAngle={3}
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 8,
          fontSize: 12,
        }}
      />
      <Legend
        iconType="circle"
        iconSize={8}
        formatter={(value: string) => (
          <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{value}</span>
        )}
      />
    </PieChart>
  </ResponsiveContainer>
)
