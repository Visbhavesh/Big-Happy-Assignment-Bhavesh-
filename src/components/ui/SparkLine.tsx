import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

type SparkPoint = { value: number; label?: string }

type SparkLineProps = {
  data: SparkPoint[]
  color?: string
  height?: number
  tooltipLabel?: string
}

export const SparkLine = ({
  data,
  color = 'var(--color-brand)',
  height = 40,
  tooltipLabel = 'Value',
}: SparkLineProps) => (
  <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
      <Tooltip
        contentStyle={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 6,
          fontSize: 11,
          padding: '4px 8px',
        }}
        formatter={(v) => {
          const num = typeof v === 'number' ? v : Number(v ?? 0)
          return [num.toLocaleString(), tooltipLabel] as [string, string]
        }}
        labelFormatter={() => ''}
      />
      <Line
        type="monotone"
        dataKey="value"
        stroke={color}
        strokeWidth={2}
        dot={false}
        activeDot={{ r: 3, fill: color }}
      />
    </LineChart>
  </ResponsiveContainer>
)
