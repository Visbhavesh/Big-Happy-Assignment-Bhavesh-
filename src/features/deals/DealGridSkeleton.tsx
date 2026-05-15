import { Skeleton } from '@/components/ui'

const DealCardSkeleton = () => (
  <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
    <div className="flex gap-2">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-5 w-12" />
    </div>
    <Skeleton className="h-4 w-3/4" />
    <div className="flex items-center gap-5">
      <Skeleton className="h-24 w-24 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-2.5 w-full" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
    <Skeleton className="h-10 w-full" />
    <div className="grid grid-cols-3 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-8" />
      ))}
    </div>
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  </div>
)

export const DealGridSkeleton = () => (
  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <DealCardSkeleton key={i} />
    ))}
  </div>
)
