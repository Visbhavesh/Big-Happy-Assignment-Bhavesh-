import type {
  RawMetricPoint,
  ChartDataPoint,
  ChartGranularity,
  DataSourceOption,
  RawAnalyticsData,
} from '@/types'

const formatDateLabel = (dateStr: string): string => {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const computeCtr = (clicks: number, impressions: number): number =>
  impressions > 0 ? (clicks / impressions) * 100 : 0

const normalizePoint = (p: RawMetricPoint): ChartDataPoint => ({
  date: p.date,
  dateLabel: formatDateLabel(p.date),
  impressions: p.impressions,
  clicks: p.clicks,
  qr_clicks: p.qr_clicks,
  ctr: computeCtr(p.clicks, p.impressions),
  vcr: p.vcr,
  time_spent: p.time_spent,
  ssp_spend: p.ssp_spend,
  ssp_impressions: p.ssp_impressions,
  revenue: p.revenue,
})

const aggregateWeekly = (points: ChartDataPoint[]): ChartDataPoint[] => {
  const weeks: Map<string, ChartDataPoint[]> = new Map()

  points.forEach((p) => {
    const d = new Date(p.date + 'T00:00:00')
    // ISO week key: year-week
    const jan1 = new Date(d.getFullYear(), 0, 1)
    const weekNum = Math.ceil(((d.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7)
    const key = `${d.getFullYear()}-W${String(weekNum).padStart(2, '0')}`
    const bucket = weeks.get(key) ?? []
    bucket.push(p)
    weeks.set(key, bucket)
  })

  return Array.from(weeks.entries()).map(([key, pts]) => {
    const totalImpressions = pts.reduce((s, p) => s + p.impressions, 0)
    const totalClicks = pts.reduce((s, p) => s + p.clicks, 0)
    return {
      date: pts[0].date,
      dateLabel: key,
      impressions: totalImpressions,
      clicks: totalClicks,
      qr_clicks: pts.reduce((s, p) => s + p.qr_clicks, 0),
      ctr: computeCtr(totalClicks, totalImpressions),
      vcr: pts.reduce((s, p) => s + p.vcr, 0) / pts.length,
      time_spent: pts.reduce((s, p) => s + p.time_spent, 0),
      ssp_spend: pts.reduce((s, p) => s + p.ssp_spend, 0),
      ssp_impressions: pts.reduce((s, p) => s + p.ssp_impressions, 0),
      revenue: pts.reduce((s, p) => s + p.revenue, 0),
    }
  })
}

export const adaptChartData = (
  raw: RawAnalyticsData,
  sourceId: string,
  granularity: ChartGranularity,
): ChartDataPoint[] => {
  const allSources = [
    ...raw.data.package_metrics.map((p) => ({ id: `pkg-${p.package_id}`, metrics: p.metrics })),
    ...raw.data.placement_metrics.map((p) => ({ id: `plc-${p.placement_id}`, metrics: p.metrics })),
  ]

  const source = allSources.find((s) => s.id === sourceId)
  if (!source) return []

  const normalized = source.metrics.map(normalizePoint)
  return granularity === 'weekly' ? aggregateWeekly(normalized) : normalized
}

export const buildDataSourceOptions = (raw: RawAnalyticsData): DataSourceOption[] => [
  ...raw.data.package_metrics.map((p) => ({
    id: `pkg-${p.package_id}`,
    label: p.package_name,
    type: 'package' as const,
  })),
  ...raw.data.placement_metrics.map((p) => ({
    id: `plc-${p.placement_id}`,
    label: `${p.placement_name} (${p.dsp_provider})`,
    type: 'placement' as const,
  })),
]
