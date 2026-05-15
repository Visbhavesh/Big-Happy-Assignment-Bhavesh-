import { motion } from 'framer-motion'
import { Card, CardHeader, ProgressRing, BudgetPacer, MetaTable, Badge, TrendBadge, SparkLine } from '@/components/ui'
import { formatNumber } from '@/utils'
import type { Deal, DealStatus } from '@/types'

type DealCardProps = {
  deal: Deal
  index: number
}

const statusVariant: Record<DealStatus, 'success' | 'warning' | 'error' | 'info'> = {
  active: 'success',
  paused: 'info',
  completed: 'info',
  pacing_alert: 'warning',
  pending: 'info',
}

const statusLabel: Record<DealStatus, string> = {
  active: 'Active',
  paused: 'Paused',
  completed: 'Completed',
  pacing_alert: 'Pacing Alert',
  pending: 'Pending',
}

const deliveryRingColor: Record<string, string> = {
  ahead: '#10b981',
  on_track: '#6366f1',
  behind: '#f59e0b',
  critical: '#ef4444',
}

export const DealCard = ({ deal, index }: DealCardProps) => {
  const ringColor = deliveryRingColor[deal.delivery.deliveryStatus] ?? 'var(--color-brand)'

  const sparkData = deal.weeklyTrend.map((w) => ({
    value: w.impressions,
    label: w.week,
  }))

  const kpiRows = [
    { label: 'Impressions Delivered', value: formatNumber(deal.kpis.impressionsDelivered) },
    { label: 'Clicks', value: formatNumber(deal.kpis.clicksDelivered) },
    { label: 'CTR', value: `${deal.kpis.ctr.toFixed(3)}%` },
    { label: 'Viewability', value: `${deal.kpis.viewabilityRate.toFixed(1)}%` },
    { label: 'VCR', value: `${deal.kpis.vcr.toFixed(1)}%` },
    { label: 'eCPM', value: `$${deal.kpis.ecpm.toFixed(2)}` },
  ]

  const metaRows = [
    { label: 'Advertiser', value: deal.advertiser },
    { label: 'Agency', value: deal.agency },
    { label: 'Deal Type', value: deal.dealType },
    { label: 'Vertical', value: deal.vertical },
    { label: 'Sales Rep', value: deal.salesRep },
    { label: 'AM', value: deal.accountManager },
    { label: 'Flight', value: `${deal.flightStart} → ${deal.flightEnd}` },
    { label: 'Days Remaining', value: `${deal.delivery.daysRemaining}d` },
  ]

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      aria-label={`Deal: ${deal.name}`}
    >
      <Card className="flex flex-col gap-5">
        {/* ── Header ── */}
        <CardHeader className="mb-0">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                label={statusLabel[deal.status]}
                variant={statusVariant[deal.status]}
              />
              <Badge
                label={deal.priority.toUpperCase()}
                variant={deal.priority === 'high' ? 'error' : deal.priority === 'medium' ? 'warning' : 'info'}
              />
            </div>
            <h2 className="mt-1.5 text-sm font-semibold text-text-primary leading-snug line-clamp-2">
              {deal.name}
            </h2>
          </div>
        </CardHeader>

        {/* ── Delivery gauge + budget ── */}
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-center gap-1">
            <ProgressRing
              percent={deal.delivery.deliveryPercent}
              size={100}
              strokeWidth={9}
              color={ringColor}
              sublabel="Delivered"
            />
            <span className="text-[10px] text-text-secondary">
              {deal.delivery.daysElapsed}d / {deal.delivery.totalDays}d
            </span>
          </div>

          <div className="flex-1 space-y-1">
            <BudgetPacer
              label="Budget Pacing"
              spent={deal.budget.spentToDate}
              total={deal.budget.totalBudget}
              projected={deal.budget.projectedSpend}
              pacingStatus={deal.budget.pacingStatus}
              pacingPercent={deal.budget.pacingPercent}
            />
          </div>
        </div>

        {/* ── Sparkline ── */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-text-secondary">Weekly Impressions</span>
            <TrendBadge
              value={
                sparkData.length >= 2
                  ? ((sparkData[sparkData.length - 1].value - sparkData[sparkData.length - 2].value) /
                      sparkData[sparkData.length - 2].value) *
                    100
                  : 0
              }
              unit="%"
            />
          </div>
          <SparkLine data={sparkData} color={ringColor} tooltipLabel="Impressions" />
        </div>

        {/* ── KPI grid ── */}
        <section aria-label="KPI metrics">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
            KPIs
          </p>
          <div className="grid grid-cols-3 gap-x-4 gap-y-2">
            {kpiRows.map((row) => (
              <div key={row.label}>
                <p className="text-[10px] text-text-secondary leading-none">{row.label}</p>
                <p className="mt-0.5 text-xs font-semibold text-text-primary">{row.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Meta info ── */}
        <section aria-label="Deal metadata">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-text-secondary">
            Deal Info
          </p>
          <MetaTable rows={metaRows} />
        </section>
      </Card>
    </motion.article>
  )
}
