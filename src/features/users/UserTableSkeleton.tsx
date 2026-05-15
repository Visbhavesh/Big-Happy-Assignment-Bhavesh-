import { Skeleton } from '@/components/ui'

const RowSkeleton = () => (
  <tr className="border-b border-border">
    <td className="py-3.5 pl-5 pr-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9 rounded-full shrink-0" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-3 w-44" />
        </div>
      </div>
    </td>
    <td className="py-3.5 pr-4"><Skeleton className="h-5 w-24 rounded-md" /></td>
    <td className="py-3.5 pr-4"><Skeleton className="h-5 w-20 rounded-full" /></td>
    <td className="py-3.5 pr-4">
      <div className="space-y-1.5">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="h-3 w-36" />
      </div>
    </td>
    <td className="py-3.5 pr-4"><Skeleton className="h-3 w-16" /></td>
    <td className="py-3.5 pr-4"><Skeleton className="h-3 w-6" /></td>
    <td className="py-3.5 pr-5 text-right"><Skeleton className="h-7 w-7 rounded-md ml-auto" /></td>
  </tr>
)

export const UserTableSkeleton = ({ rows = 8 }: { rows?: number }) => (
  <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px]">
        <thead>
          <tr className="border-b border-border bg-background">
            {['User', 'Role', 'Status', 'Department', 'Last Active', 'Campaigns', ''].map((h) => (
              <th key={h} className="py-3 pl-5 pr-4 text-left">
                <Skeleton className="h-3 w-16" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => <RowSkeleton key={i} />)}
        </tbody>
      </table>
    </div>
  </div>
)
