import { useDashboardData } from '@/hooks/useDashboardData'
import { Card, CardHeader, CardTitle, Skeleton } from '@/components/ui'
import { RevenueChart, TrafficPieChart } from '@/components/charts'
import { MetricCard } from './MetricCard'
import { ActivityFeed } from './ActivityFeed'

const MetricsSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <Skeleton key={i} className="h-28" />
    ))}
  </div>
)

export const DashboardPage = () => {
  const { data, isLoading, isError } = useDashboardData()

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-red-500">
        Failed to load dashboard data.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-sm text-text-secondary">Welcome back — here's what's happening.</p>
      </div>

      {isLoading || !data ? (
        <MetricsSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {data.metrics.map((metric, i) => (
              <MetricCard key={metric.id} metric={metric} index={i} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
              </CardHeader>
              <RevenueChart data={data.revenueTimeSeries} />
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <TrafficPieChart data={data.trafficSources} />
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <ActivityFeed activities={data.recentActivity} />
          </Card>
        </>
      )}
    </div>
  )
}
