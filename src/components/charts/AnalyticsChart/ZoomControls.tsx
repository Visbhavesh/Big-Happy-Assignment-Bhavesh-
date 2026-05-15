import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import { ActionButton } from '@/components/ui'
import { useChartStore } from '@/store/chartStore'

type ZoomControlsProps = {
  totalPoints: number
}

export const ZoomControls = ({ totalPoints }: ZoomControlsProps) => {
  const { zoomDomain, zoomIn, zoomOut, resetZoom } = useChartStore()

  const currentSpan = zoomDomain
    ? zoomDomain.endIndex - zoomDomain.startIndex + 1
    : totalPoints

  const canZoomIn = currentSpan > 4
  const canZoomOut = zoomDomain !== null

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Zoom controls">
      <ActionButton
        variant="ghost"
        size="sm"
        icon={<ZoomIn size={14} />}
        onClick={() => zoomIn(totalPoints)}
        disabled={!canZoomIn}
        aria-label="Zoom in"
        title="Zoom in"
      />
      <ActionButton
        variant="ghost"
        size="sm"
        icon={<ZoomOut size={14} />}
        onClick={() => zoomOut(totalPoints)}
        disabled={!canZoomOut}
        aria-label="Zoom out"
        title="Zoom out"
      />
      <ActionButton
        variant="ghost"
        size="sm"
        icon={<Maximize2 size={14} />}
        onClick={resetZoom}
        disabled={!canZoomOut}
        aria-label="Reset zoom"
        title="Reset zoom"
      >
        {zoomDomain ? `${currentSpan}d` : 'All'}
      </ActionButton>
    </div>
  )
}
