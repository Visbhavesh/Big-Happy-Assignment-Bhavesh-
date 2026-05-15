import { Skeleton } from '@/components/ui'

const CardSkeleton = () => (
  <div className="rounded-xl border border-border bg-surface p-5 space-y-3">
    <div className="flex items-start justify-between">
      <div className="space-y-2 flex-1">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <Skeleton className="h-6 w-6 rounded-md ml-3 shrink-0" />
    </div>
    <div className="flex gap-1.5">
      <Skeleton className="h-5 w-10 rounded-full" />
      <Skeleton className="h-5 w-9 rounded-full" />
      <Skeleton className="h-5 w-11 rounded-full" />
      <Skeleton className="h-5 w-9 rounded-full" />
    </div>
    <div className="border-t border-border pt-3 grid grid-cols-2 gap-2">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-3 w-32 col-span-2" />
    </div>
    <div className="border-t border-border pt-3 flex justify-between">
      <Skeleton className="h-3 w-24" />
      <div className="flex gap-1">
        <Skeleton className="h-7 w-7 rounded-md" />
        <Skeleton className="h-7 w-7 rounded-md" />
        <Skeleton className="h-7 w-7 rounded-md" />
      </div>
    </div>
  </div>
)

export const ReportGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
  </div>
)
