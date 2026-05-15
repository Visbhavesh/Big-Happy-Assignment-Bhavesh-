import { StatCard, TrendBadge } from '@/components/ui'
import { DollarSign, Target, AlertTriangle, Eye } from 'lucide-react'
import { formatCurrency, formatNumber } from '@/utils'
import type { DealSummary } from '@/types'

type SummaryKpiStripProps = {
  summary: DealSummary
}

const ACCENT_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#3b82f6']

export const SummaryKpiStrip = ({ summary }: SummaryKpiStripProps) => {
  const deliveryPct = (summary.totalDelivered / summary.totalImpressions) * 100
  const spendPct = (summary.totalSpent / summary.totalBudget) * 100

  const cards = [
    {
      label: 'Total Budget',
      value: formatCurrency(summary.totalBudget),
      subvalue: `${formatCurrency(summary.totalSpent)} spent · ${spendPct.toFixed(1)}% paced`,
      icon: <DollarSign size={18} />,
      trend: <TrendBadge value={spendPct - 50} unit="% paced" />,
      accentColor: ACCENT_COLORS[0],
    },
    {
      label: 'Impressions Delivered',
      value: formatNumber(summary.totalDelivered),
      subvalue: `of ${formatNumber(summary.totalImpressions)} booked`,
      icon: <Target size={18} />,
      trend: <TrendBadge value={deliveryPct - 50} unit="% delivered" />,
      accentColor: ACCENT_COLORS[1],
    },
    {
      label: 'Pacing Alerts',
      value: String(summary.pacingAlerts),
      subvalue: `${summary.activeDeals} active deals`,
      icon: <AlertTriangle size={18} />,
      trend: summary.pacingAlerts > 0
        ? <TrendBadge value={-summary.pacingAlerts} unit=" alerts" direction="down" />
        : <TrendBadge value={0} unit=" alerts" direction="neutral" />,
      accentColor: summary.pacingAlerts > 0 ? '#f59e0b' : ACCENT_COLORS[1],
    },
    {
      label: 'Avg Viewability',
      value: `${summary.avgViewability.toFixed(1)}%`,
      subvalue: `Avg CTR ${summary.avgCtr.toFixed(3)}%`,
      icon: <Eye size={18} />,
      trend: <TrendBadge value={summary.avgViewability - 70} unit="% vs 70% bench" />,
      accentColor: ACCENT_COLORS[3],
    },
  ]

  return (
    <section aria-label="Portfolio KPI summary">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, i) => (
          <StatCard key={card.label} {...card} index={i} />
        ))}
      </div>
    </section>
  )
}
