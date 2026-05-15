import { useQuery } from '@tanstack/react-query'
import { fetchDashboardData } from '@/services/analyticsService'
import { QUERY_KEYS } from '@/lib/constants'
import type { DashboardData } from '@/types'

export const useDashboardData = () =>
  useQuery<DashboardData>({
    queryKey: QUERY_KEYS.dashboard,
    queryFn: fetchDashboardData,
    staleTime: 5 * 60 * 1000,
  })
