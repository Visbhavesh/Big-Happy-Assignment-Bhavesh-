import { Badge } from '@/components/ui'
import type { RecentActivity } from '@/types'

type ActivityFeedProps = {
  activities: RecentActivity[]
}

export const ActivityFeed = ({ activities }: ActivityFeedProps) => (
  <ul className="space-y-3">
    {activities.map((item) => (
      <li key={item.id} className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand text-xs font-semibold">
            {item.user.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">{item.user}</p>
            <p className="text-xs text-text-secondary">{item.action}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <Badge label={item.status} variant={item.status} />
          <span className="text-xs text-text-secondary">{item.timestamp}</span>
        </div>
      </li>
    ))}
  </ul>
)
