import { cn } from '@/utils'

type SkeletonProps = { className?: string }

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={cn('animate-pulse rounded-lg bg-border', className)} />
)
