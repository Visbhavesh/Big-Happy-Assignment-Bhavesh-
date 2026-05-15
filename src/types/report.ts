import type { MetricKey } from './chart'

export type ReportStatus = 'ready' | 'running' | 'scheduled' | 'failed' | 'draft'
export type ReportExportType = 'csv' | 'json' | 'pdf' | 'png'
export type ReportScheduleFrequency = 'daily' | 'weekly' | 'monthly' | 'none'
export type ReportCategory = 'campaign' | 'budget' | 'creative' | 'revenue' | 'audience'
export type SortDirection = 'asc' | 'desc'

export type ReportMetricSummary = {
  key: MetricKey
  value: number
  change: number
}

export type ReportSchedule = {
  frequency: ReportScheduleFrequency
  nextRun: string | null
  lastRun: string | null
  recipients: string[]
}

export type Report = {
  id: string
  title: string
  description: string
  category: ReportCategory
  status: ReportStatus
  createdBy: string
  createdAt: string
  updatedAt: string
  metrics: MetricKey[]
  exportType: ReportExportType
  schedule: ReportSchedule
  isFavorite: boolean
  tags: string[]
  rowCount: number
  fileSizeKb: number
  packageIds: number[]
  placementIds: number[]
  dateRange: { from: string; to: string }
}

export type ReportSortKey = 'title' | 'createdAt' | 'updatedAt' | 'status' | 'category'

export type ReportFilters = {
  search: string
  category: ReportCategory | 'all'
  status: ReportStatus | 'all'
  exportType: ReportExportType | 'all'
  favoritesOnly: boolean
  sortKey: ReportSortKey
  sortDir: SortDirection
  page: number
  pageSize: number
}
