import type { DashboardData } from '@/types'

const generateDates = (count: number): string[] => {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (count - 1 - i))
    return d.toISOString().split('T')[0]
  })
}

const dates = generateDates(30)

export const mockDashboardData: DashboardData = {
  metrics: [
    { id: 'revenue', label: 'Total Revenue', value: 482_390, unit: '$', change: 12.5, changeType: 'increase' },
    { id: 'users', label: 'Active Users', value: 24_831, unit: '', change: 8.2, changeType: 'increase' },
    { id: 'sessions', label: 'Sessions', value: 91_204, unit: '', change: 3.1, changeType: 'decrease' },
    { id: 'conversion', label: 'Conversion Rate', value: 4.73, unit: '%', change: 0.6, changeType: 'increase' },
  ],
  revenueTimeSeries: {
    id: 'revenue',
    label: 'Revenue',
    data: dates.map((date, i) => ({
      date,
      value: 10_000 + Math.round(Math.sin(i / 3) * 3000 + i * 200 + Math.random() * 1000),
    })),
  },
  userTimeSeries: {
    id: 'users',
    label: 'Active Users',
    data: dates.map((date, i) => ({
      date,
      value: 600 + Math.round(Math.cos(i / 4) * 150 + i * 10 + Math.random() * 80),
    })),
  },
  trafficSources: [
    { source: 'Organic Search', visits: 38_400, percentage: 42 },
    { source: 'Direct', visits: 21_900, percentage: 24 },
    { source: 'Referral', visits: 14_600, percentage: 16 },
    { source: 'Social Media', visits: 10_950, percentage: 12 },
    { source: 'Email', visits: 5_480, percentage: 6 },
  ],
  recentActivity: [
    { id: '1', user: 'Alice Martin', action: 'Exported Q2 report', timestamp: '2 min ago', status: 'success' },
    { id: '2', user: 'Bob Chen', action: 'Updated dashboard filters', timestamp: '14 min ago', status: 'success' },
    { id: '3', user: 'Carol Davis', action: 'Failed login attempt', timestamp: '1 hr ago', status: 'error' },
    { id: '4', user: 'Dan Lee', action: 'Invited new team member', timestamp: '3 hr ago', status: 'warning' },
    { id: '5', user: 'Eva Rossi', action: 'Created new segment', timestamp: '5 hr ago', status: 'success' },
  ],
}
