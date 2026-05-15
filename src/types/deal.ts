export type DealStatus = 'active' | 'paused' | 'completed' | 'pacing_alert' | 'pending'
export type DealPriority = 'high' | 'medium' | 'low'
export type DealType = 'Programmatic Guaranteed' | 'Private Marketplace' | 'Preferred Deal' | 'Open Auction'
export type PacingStatus = 'on_track' | 'ahead' | 'slightly_behind' | 'behind' | 'critical'
export type DeliveryStatus = 'on_track' | 'ahead' | 'behind' | 'critical'
export type CreativeStatus = 'active' | 'paused' | 'rejected'

export type DealKpis = {
  impressionsBooked: number
  impressionsDelivered: number
  clicksDelivered: number
  conversions: number
  viewabilityRate: number
  completionRate: number
  ctr: number
  cpm: number
  ecpm: number
  vcr: number
}

export type DealBudget = {
  totalBudget: number
  spentToDate: number
  remainingBudget: number
  dailyBudget: number
  projectedSpend: number
  pacingStatus: PacingStatus
  pacingPercent: number
}

export type DealDelivery = {
  deliveryPercent: number
  daysElapsed: number
  totalDays: number
  daysRemaining: number
  expectedDeliveryPercent: number
  deliveryStatus: DeliveryStatus
}

export type WeeklyTrendPoint = {
  week: string
  impressions: number
  spend: number
  ctr: number
}

export type Creative = {
  id: string
  name: string
  impressions: number
  ctr: number
  status: CreativeStatus
}

export type Deal = {
  id: string
  name: string
  advertiser: string
  agency: string
  status: DealStatus
  priority: DealPriority
  flightStart: string
  flightEnd: string
  salesRep: string
  accountManager: string
  dealType: DealType
  vertical: string
  kpis: DealKpis
  budget: DealBudget
  delivery: DealDelivery
  weeklyTrend: WeeklyTrendPoint[]
  topCreatives: Creative[]
}

export type DealSummary = {
  totalDeals: number
  activeDeals: number
  pacingAlerts: number
  totalBudget: number
  totalSpent: number
  totalImpressions: number
  totalDelivered: number
  avgViewability: number
  avgCtr: number
}

export type DealDashboardData = {
  deals: Deal[]
  summary: DealSummary
}
