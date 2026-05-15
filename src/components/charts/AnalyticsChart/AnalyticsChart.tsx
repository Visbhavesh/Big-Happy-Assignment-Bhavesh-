import { useCallback, useRef, useState } from 'react'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceArea, Cell,
} from 'recharts'
import type { MouseHandlerDataParam } from 'recharts/types/synchronisation/types'
import { motion, AnimatePresence } from 'framer-motion'
import { useChartStore } from '@/store/chartStore'
import { useChartState } from '@/hooks/useChartState'
import { ChartTooltip } from './ChartTooltip'
import type { ChartDataPoint } from '@/types'

type AnalyticsChartProps = {
  data: ChartDataPoint[]
  visibleData: ChartDataPoint[]
  height?: number
}

const leftTickFmt = (v: number) =>
  new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(v)

const rightTickFmt = (v: number) => {
  if (v >= 1000) return `$${(v / 1000).toFixed(0)}k`
  if (v < 10) return v.toFixed(1)
  return String(Math.round(v))
}

const TICK_STYLE = { fontSize: 11, fill: 'var(--color-text-secondary)' }
const GRID_STROKE = 'var(--color-border)'

export const AnalyticsChart = ({ data, visibleData, height = 380 }: AnalyticsChartProps) => {
  const { activeMetrics, setZoomDomain } = useChartStore()
  const { activeConfigs, hasLeftAxis, hasRightAxis, leftDomain, rightDomain } =
    useChartState(visibleData)

  const brushStart = useRef<string | null>(null)
  const isDragging = useRef(false)
  const [brushEnd, setBrushEnd] = useState<string | null>(null)

  const getLabel = (e: MouseHandlerDataParam): string | null => {
    const l = e.activeLabel
    return typeof l === 'string' ? l : null
  }

  const handleMouseDown = useCallback((e: MouseHandlerDataParam) => {
    const label = getLabel(e)
    if (!label) return
    brushStart.current = label
    isDragging.current = true
    setBrushEnd(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMouseMove = useCallback((e: MouseHandlerDataParam) => {
    if (!isDragging.current) return
    const label = getLabel(e)
    if (label) setBrushEnd(label)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current || !brushStart.current || !brushEnd) {
      isDragging.current = false
      setBrushEnd(null)
      return
    }
    isDragging.current = false

    const startIdx = data.findIndex((d) => d.dateLabel === brushStart.current)
    const endIdx = data.findIndex((d) => d.dateLabel === brushEnd)

    if (startIdx !== -1 && endIdx !== -1 && Math.abs(endIdx - startIdx) >= 2) {
      setZoomDomain({
        startIndex: Math.min(startIdx, endIdx),
        endIndex: Math.max(startIdx, endIdx),
      })
    }

    brushStart.current = null
    setBrushEnd(null)
  }, [data, brushEnd, setZoomDomain])

  if (!activeMetrics.length) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-text-secondary">
        Select at least one metric to display the chart.
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeMetrics.join('-')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart
            data={visibleData}
            margin={{ top: 8, right: hasRightAxis ? 60 : 16, left: hasLeftAxis ? 8 : 16, bottom: 0 }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />

            <XAxis
              dataKey="dateLabel"
              tick={TICK_STYLE}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={40}
            />

            {hasLeftAxis && (
              <YAxis
                yAxisId="left"
                orientation="left"
                domain={leftDomain}
                tickFormatter={leftTickFmt}
                tick={TICK_STYLE}
                axisLine={false}
                tickLine={false}
                width={56}
              />
            )}

            {hasRightAxis && (
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={rightDomain}
                tickFormatter={rightTickFmt}
                tick={TICK_STYLE}
                axisLine={false}
                tickLine={false}
                width={56}
              />
            )}

            <Tooltip
              content={<ChartTooltip activeConfigs={activeConfigs} />}
              cursor={{ stroke: 'var(--color-brand)', strokeWidth: 1, strokeDasharray: '4 2' }}
              isAnimationActive={false}
            />

            {brushStart.current && brushEnd && (
              <ReferenceArea
                yAxisId={hasLeftAxis ? 'left' : 'right'}
                x1={brushStart.current}
                x2={brushEnd}
                fill="var(--color-brand)"
                fillOpacity={0.08}
                stroke="var(--color-brand)"
                strokeOpacity={0.3}
              />
            )}

            {activeConfigs.map((cfg) => {
              if (cfg.chartType === 'bar') {
                return (
                  <Bar
                    key={cfg.key}
                    dataKey={cfg.key}
                    yAxisId={cfg.yAxisId}
                    name={cfg.label}
                    fill={cfg.color}
                    radius={[3, 3, 0, 0]}
                    maxBarSize={28}
                    isAnimationActive
                    animationDuration={600}
                    animationEasing="ease-out"
                  >
                    {visibleData.map((_, index) => (
                      <Cell key={index} fill={cfg.color} fillOpacity={0.85} />
                    ))}
                  </Bar>
                )
              }
              return (
                <Line
                  key={cfg.key}
                  dataKey={cfg.key}
                  yAxisId={cfg.yAxisId}
                  name={cfg.label}
                  stroke={cfg.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: cfg.color, stroke: 'var(--color-surface)', strokeWidth: 2 }}
                  isAnimationActive
                  animationDuration={700}
                  animationEasing="ease-out"
                  connectNulls
                />
              )
            })}
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>
    </AnimatePresence>
  )
}
