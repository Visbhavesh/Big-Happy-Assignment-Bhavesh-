// ── Raw JSON shape ────────────────────────────────────────────────────────────

export type RawMetricPoint = {
  date: string
  impressions: number
  clicks: number
  qr_clicks: number
  vcr: number
  time_spent: number
  ssp_spend: number
  ssp_impressions: number
  revenue: number
}

export type RawPackageMetric = {
  package_id: number
  package_name: string
  metrics: RawMetricPoint[]
}

export type RawPlacementMetric = {
  placement_id: number
  placement_name: string
  dsp_provider: string
  deal_id: number
  deal_name: string
  metrics: RawMetricPoint[]
}

export type RawAnalyticsData = {
  status: string
  message: string
  data: {
    package_metrics: RawPackageMetric[]
    placement_metrics: RawPlacementMetric[]
  }
}

// ── Normalized chart types ────────────────────────────────────────────────────

export type MetricKey =
  | 'impressions'
  | 'clicks'
  | 'qr_clicks'
  | 'ctr'
  | 'vcr'
  | 'time_spent'
  | 'ssp_spend'
  | 'ssp_impressions'
  | 'revenue'

export type ChartType = 'bar' | 'line' | 'area'
export type YAxisId = 'left' | 'right'

export type MetricConfig = {
  key: MetricKey
  label: string
  shortLabel: string
  color: string
  chartType: ChartType
  yAxisId: YAxisId
  formatter: (v: number) => string
  domain?: [number | 'auto', number | 'auto']
}

// One row in the normalized dataset fed to Recharts
export type ChartDataPoint = {
  date: string
  dateLabel: string
  impressions: number
  clicks: number
  qr_clicks: number
  ctr: number
  vcr: number
  time_spent: number
  ssp_spend: number
  ssp_impressions: number
  revenue: number
}

export type ZoomDomain = {
  startIndex: number
  endIndex: number
}

export type DataSourceType = 'package' | 'placement'

export type DataSourceOption = {
  id: string
  label: string
  type: DataSourceType
}

export type ChartGranularity = 'daily' | 'weekly'

export type ChartState = {
  activeMetrics: MetricKey[]
  zoomDomain: ZoomDomain | null
  selectedSourceId: string
  granularity: ChartGranularity
  syncTooltipIndex: number | null
}
