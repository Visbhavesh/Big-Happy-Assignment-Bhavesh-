import { useMemo } from 'react'
import { useChartStore } from '@/store/chartStore'
import { METRIC_CONFIG } from '@/lib/metricConfig'
import type { ChartDataPoint, MetricConfig, MetricKey } from '@/types'

type UseChartStateReturn = {
  activeConfigs: MetricConfig[]
  leftAxisMetrics: MetricKey[]
  rightAxisMetrics: MetricKey[]
  hasLeftAxis: boolean
  hasRightAxis: boolean
  leftDomain: [number, number]
  rightDomain: [number, number]
}

const computeDomain = (data: ChartDataPoint[], keys: MetricKey[]): [number, number] => {
  if (!data.length || !keys.length) return [0, 1]
  let min = Infinity
  let max = -Infinity
  for (const point of data) {
    for (const key of keys) {
      const v = point[key] as number
      if (v < min) min = v
      if (v > max) max = v
    }
  }
  const padding = (max - min) * 0.1
  return [Math.max(0, Math.floor(min - padding)), Math.ceil(max + padding)]
}

export const useChartState = (visibleData: ChartDataPoint[]): UseChartStateReturn => {
  const { activeMetrics } = useChartStore()

  const activeConfigs = useMemo(
    () => activeMetrics.map((k) => METRIC_CONFIG[k]),
    [activeMetrics],
  )

  const leftAxisMetrics = useMemo(
    () => activeMetrics.filter((k) => METRIC_CONFIG[k].yAxisId === 'left'),
    [activeMetrics],
  )

  const rightAxisMetrics = useMemo(
    () => activeMetrics.filter((k) => METRIC_CONFIG[k].yAxisId === 'right'),
    [activeMetrics],
  )

  const leftDomain = useMemo(
    () => computeDomain(visibleData, leftAxisMetrics),
    [visibleData, leftAxisMetrics],
  )

  const rightDomain = useMemo(
    () => computeDomain(visibleData, rightAxisMetrics),
    [visibleData, rightAxisMetrics],
  )

  return {
    activeConfigs,
    leftAxisMetrics,
    rightAxisMetrics,
    hasLeftAxis: leftAxisMetrics.length > 0,
    hasRightAxis: rightAxisMetrics.length > 0,
    leftDomain,
    rightDomain,
  }
}
