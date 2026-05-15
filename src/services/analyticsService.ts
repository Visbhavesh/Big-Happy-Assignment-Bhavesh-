import { mockDashboardData } from '@/lib/mockData'
import type { DashboardData } from '@/types'

const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms))

export const fetchDashboardData = async (): Promise<DashboardData> => {
  await delay(600)
  return mockDashboardData
}
