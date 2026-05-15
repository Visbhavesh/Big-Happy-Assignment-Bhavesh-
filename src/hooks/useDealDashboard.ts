import { useQuery } from '@tanstack/react-query'
import { fetchDealDashboard } from '@/services/dealService'
import type { DealDashboardData } from '@/types'

export const useDealDashboard = () =>
  useQuery<DealDashboardData>({
    queryKey: ['deal-dashboard'],
    queryFn: fetchDealDashboard,
    staleTime: 5 * 60 * 1000,
  })
