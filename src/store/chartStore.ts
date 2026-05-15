import { create } from 'zustand'
import { DEFAULT_ACTIVE_METRICS } from '@/lib/metricConfig'
import type { MetricKey, ZoomDomain, ChartGranularity } from '@/types'

type ChartStoreState = {
  activeMetrics: MetricKey[]
  zoomDomain: ZoomDomain | null
  selectedSourceId: string
  granularity: ChartGranularity
  tooltipIndex: number | null

  toggleMetric: (key: MetricKey) => void
  setActiveMetrics: (keys: MetricKey[]) => void
  setZoomDomain: (domain: ZoomDomain | null) => void
  zoomIn: (totalPoints: number) => void
  zoomOut: (totalPoints: number) => void
  resetZoom: () => void
  setSelectedSourceId: (id: string) => void
  setGranularity: (g: ChartGranularity) => void
  setTooltipIndex: (i: number | null) => void
}

export const useChartStore = create<ChartStoreState>((set, get) => ({
  activeMetrics: DEFAULT_ACTIVE_METRICS,
  zoomDomain: null,
  selectedSourceId: 'pkg-101',
  granularity: 'daily',
  tooltipIndex: null,

  toggleMetric: (key) =>
    set((s) => ({
      activeMetrics: s.activeMetrics.includes(key)
        ? s.activeMetrics.filter((k) => k !== key)
        : [...s.activeMetrics, key],
    })),

  setActiveMetrics: (keys) => set({ activeMetrics: keys }),

  setZoomDomain: (domain) => set({ zoomDomain: domain }),

  zoomIn: (totalPoints) => {
    const { zoomDomain } = get()
    const start = zoomDomain?.startIndex ?? 0
    const end = zoomDomain?.endIndex ?? totalPoints - 1
    const span = end - start
    if (span <= 4) return
    const quarter = Math.max(1, Math.floor(span * 0.25))
    set({ zoomDomain: { startIndex: start + quarter, endIndex: end - quarter } })
  },

  zoomOut: (totalPoints) => {
    const { zoomDomain } = get()
    if (!zoomDomain) return
    const span = zoomDomain.endIndex - zoomDomain.startIndex
    const quarter = Math.max(1, Math.floor(span * 0.33))
    set({
      zoomDomain: {
        startIndex: Math.max(0, zoomDomain.startIndex - quarter),
        endIndex: Math.min(totalPoints - 1, zoomDomain.endIndex + quarter),
      },
    })
  },

  resetZoom: () => set({ zoomDomain: null }),

  setSelectedSourceId: (id) => set({ selectedSourceId: id, zoomDomain: null }),

  setGranularity: (g) => set({ granularity: g, zoomDomain: null }),

  setTooltipIndex: (i) => set({ tooltipIndex: i }),
}))
