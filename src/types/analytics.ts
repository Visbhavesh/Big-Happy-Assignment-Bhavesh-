export type MetricCard = {
  id: string
  label: string
  value: number
  unit: string
  change: number
  changeType: 'increase' | 'decrease'
}

export type TimeSeriesPoint = {
  date: string
  value: number
}

export type TimeSeries = {
  id: string
  label: string
  data: TimeSeriesPoint[]
}

export type TrafficSource = {
  source: string
  visits: number
  percentage: number
}

export type RecentActivity = {
  id: string
  user: string
  action: string
  timestamp: string
  status: 'success' | 'warning' | 'error'
}

export type DashboardData = {
  metrics: MetricCard[]
  revenueTimeSeries: TimeSeries
  userTimeSeries: TimeSeries
  trafficSources: TrafficSource[]
  recentActivity: RecentActivity[]
}
