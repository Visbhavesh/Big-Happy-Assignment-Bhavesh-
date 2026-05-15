import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/layout'
import { Skeleton } from '@/components/ui'

const DashboardPage = lazy(() =>
  import('@/features/dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)
const ReportsPage = lazy(() =>
  import('@/features/reports/ReportsPage').then((m) => ({ default: m.ReportsPage })),
)
const UsersPage = lazy(() =>
  import('@/features/users/UsersPage').then((m) => ({ default: m.UsersPage })),
)
const SettingsPage = lazy(() =>
  import('@/features/settings/SettingsPage').then((m) => ({ default: m.SettingsPage })),
)
const DealsPage = lazy(() =>
  import('@/features/deals/DealsPage').then((m) => ({ default: m.DealsPage })),
)

const PageLoader = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-48" />
    <div className="grid grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28" />)}
    </div>
    <Skeleton className="h-64" />
  </div>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><DashboardPage /></Suspense> },
      { path: 'deals', element: <Suspense fallback={<PageLoader />}><DealsPage /></Suspense> },
      { path: 'reports', element: <Suspense fallback={<PageLoader />}><ReportsPage /></Suspense> },
      { path: 'users', element: <Suspense fallback={<PageLoader />}><UsersPage /></Suspense> },
      { path: 'settings', element: <Suspense fallback={<PageLoader />}><SettingsPage /></Suspense> },
    ],
  },
])
