import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import rawData from '@/lib/sample-data.json'
import { adaptChartData, buildDataSourceOptions } from '@/lib/chartDataAdapter'
import { useChartStore } from '@/store/chartStore'
import type { RawAnalyticsData, ChartDataPoint, DataSourceOption } from '@/types'

// The pinned sample-data.json from the project root (package + placement metrics)
const ANALYTICS_RAW = rawData as unknown as RawAnalyticsData

const fetchAnalytics = async (): Promise<RawAnalyticsData> => {
  await new Promise((r) => setTimeout(r, 400))
  return ANALYTICS_RAW
}

export const useChartData = (): {
  data: ChartDataPoint[]
  visibleData: ChartDataPoint[]
  sourceOptions: DataSourceOption[]
  isLoading: boolean
  isError: boolean
} => {
  const { selectedSourceId, granularity, zoomDomain } = useChartStore()

  const { data: raw, isLoading, isError } = useQuery<RawAnalyticsData>({
    queryKey: ['analytics-raw'],
    queryFn: fetchAnalytics,
    staleTime: Infinity,
  })

  const sourceOptions = useMemo<DataSourceOption[]>(
    () => (raw ? buildDataSourceOptions(raw) : []),
    [raw],
  )

  const data = useMemo<ChartDataPoint[]>(
    () => (raw ? adaptChartData(raw, selectedSourceId, granularity) : []),
    [raw, selectedSourceId, granularity],
  )

  const visibleData = useMemo<ChartDataPoint[]>(() => {
    if (!zoomDomain) return data
    return data.slice(zoomDomain.startIndex, zoomDomain.endIndex + 1)
  }, [data, zoomDomain])

  return { data, visibleData, sourceOptions, isLoading, isError }
}
