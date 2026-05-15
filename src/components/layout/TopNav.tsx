import { Bell, Search, X, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Sun, Moon } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export const TopNav = () => {
  const { theme, toggleTheme } = useTheme()
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside)
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showNotifications])

  // Generate notifications from metrics data
  const notifications = [
    {
      id: 1,
      type: 'success' as const,
      title: 'Revenue Milestone Achieved',
      message: 'ISI Sunrise Q1 Campaign reached $99.2 revenue on Feb 13',
      date: '2026-02-13',
      metric: 'revenue',
      value: '$99.2'
    },
    {
      id: 2,
      type: 'warning' as const,
      title: 'VCR Below Target',
      message: 'Static Banner Healthcare VCR dropped to 36.8% on Feb 13',
      date: '2026-02-13',
      metric: 'vcr',
      value: '36.8%'
    },
    {
      id: 3,
      type: 'info' as const,
      title: 'High Impressions',
      message: 'Homepage Hero Banner achieved 3,634 impressions',
      date: '2026-02-13',
      metric: 'impressions',
      value: '3,634'
    },
    {
      id: 4,
      type: 'success' as const,
      title: 'Click Performance Up',
      message: 'Video Ad 30s Spring got 74 clicks - 15% increase',
      date: '2026-02-13',
      metric: 'clicks',
      value: '74'
    },
    {
      id: 5,
      type: 'info' as const,
      title: 'QR Engagement Rising',
      message: '18 QR clicks detected for ISI Sunrise Campaign',
      date: '2026-02-13',
      metric: 'qr_clicks',
      value: '18'
    },
    {
      id: 6,
      type: 'warning' as const,
      title: 'Time Spent Alert',
      message: 'Animated Leaderboard avg time: 141s (below target)',
      date: '2026-02-13',
      metric: 'time_spent',
      value: '141s'
    }
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} className="text-green-500" />
      case 'warning':
        return <AlertCircle size={18} className="text-yellow-500" />
      case 'info':
      default:
        return <TrendingUp size={18} className="text-blue-500" />
    }
  }

  const unreadCount = notifications.length

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-6">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 w-64">
        <Search size={15} className="text-text-secondary" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm text-text-primary placeholder:text-text-secondary outline-none w-full"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary hover:bg-hover hover:text-text-primary transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => { setShowNotifications(!showNotifications); }}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary hover:bg-hover hover:text-text-primary transition-colors"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Panel */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-96 rounded-lg border border-border bg-surface shadow-lg z-50">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
                <button
                  onClick={() => { setShowNotifications(false); }}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="max-h-100 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex gap-3 border-b border-border last:border-b-0 px-4 py-3 hover:bg-hover transition-colors cursor-pointer"
                  >
                    <div className="shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-text-primary truncate">
                        {notification.title}
                      </h4>
                      <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-text-tertiary">
                          {new Date(notification.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className="text-[10px] font-medium text-brand bg-brand/10 px-1.5 py-0.5 rounded">
                          {notification.value}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border px-4 py-2 text-center">
                <button className="text-xs text-brand hover:text-brand/80 font-medium transition-colors">
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-white text-sm font-semibold">
          <img src="/logo.svg" alt="Logo" className="h-full w-full object-contain" />
        </div>
      </div>
    </header>
  )
}