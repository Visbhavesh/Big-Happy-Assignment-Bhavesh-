import sampleData from '@/lib/sample-data.json'
import type { DealDashboardData } from '@/types'

const delay = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms))

export const fetchDealDashboard = async (): Promise<DealDashboardData> => {
  await delay(700)
  return sampleData as DealDashboardData
}
