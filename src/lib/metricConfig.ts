import type { MetricConfig, MetricKey } from '@/types'

const fmt = {
  compact: (v: number) =>
    new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(v),
  currency: (v: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v),
  percent: (v: number) => `${v.toFixed(2)}%`,
  seconds: (v: number) => `${v}s`,
  number: (v: number) =>
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(v),
}

export const METRIC_CONFIG: Record<MetricKey, MetricConfig> = {
  impressions: {
    key: 'impressions',
    label: 'Impressions',
    shortLabel: 'Impr.',
    color: '#6366f1',
    chartType: 'bar',
    yAxisId: 'left',
    formatter: fmt.compact,
  },
  clicks: {
    key: 'clicks',
    label: 'Clicks',
    shortLabel: 'Clicks',
    color: '#10b981',
    chartType: 'bar',
    yAxisId: 'left',
    formatter: fmt.number,
  },
  qr_clicks: {
    key: 'qr_clicks',
    label: 'QR Clicks',
    shortLabel: 'QR',
    color: '#f59e0b',
    chartType: 'bar',
    yAxisId: 'left',
    formatter: fmt.number,
  },
  ctr: {
    key: 'ctr',
    label: 'CTR',
    shortLabel: 'CTR',
    color: '#ec4899',
    chartType: 'line',
    yAxisId: 'right',
    formatter: fmt.percent,
    domain: [0, 'auto'],
  },
  vcr: {
    key: 'vcr',
    label: 'Video Completion Rate',
    shortLabel: 'VCR',
    color: '#8b5cf6',
    chartType: 'line',
    yAxisId: 'right',
    formatter: fmt.percent,
    domain: [0, 100],
  },
  time_spent: {
    key: 'time_spent',
    label: 'Time Spent',
    shortLabel: 'Time',
    color: '#06b6d4',
    chartType: 'line',
    yAxisId: 'right',
    formatter: fmt.seconds,
  },
  ssp_spend: {
    key: 'ssp_spend',
    label: 'SSP Spend',
    shortLabel: 'SSP $',
    color: '#f97316',
    chartType: 'bar',
    yAxisId: 'left',
    formatter: fmt.currency,
  },
  ssp_impressions: {
    key: 'ssp_impressions',
    label: 'SSP Impressions',
    shortLabel: 'SSP Impr.',
    color: '#64748b',
    chartType: 'bar',
    yAxisId: 'left',
    formatter: fmt.compact,
  },
  revenue: {
    key: 'revenue',
    label: 'Revenue',
    shortLabel: 'Rev.',
    color: '#14b8a6',
    chartType: 'line',
    yAxisId: 'right',
    formatter: fmt.currency,
  },
}

export const DEFAULT_ACTIVE_METRICS: MetricKey[] = ['impressions', 'clicks', 'revenue', 'ctr']

export const ALL_METRIC_KEYS = Object.keys(METRIC_CONFIG) as MetricKey[]

// Metrics that live on the right Y-axis (rate / currency lines)
export const RIGHT_AXIS_METRICS: MetricKey[] = ALL_METRIC_KEYS.filter(
  (k) => METRIC_CONFIG[k].yAxisId === 'right',
)

// Metrics that live on the left Y-axis (volume bars)
export const LEFT_AXIS_METRICS: MetricKey[] = ALL_METRIC_KEYS.filter(
  (k) => METRIC_CONFIG[k].yAxisId === 'left',
)
