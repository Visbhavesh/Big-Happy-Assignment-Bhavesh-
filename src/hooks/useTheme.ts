import { useEffect } from 'react'
import { useUIStore } from '@/store/uiStore'

export const useTheme = () => {
  const { theme, toggleTheme } = useUIStore()

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return { theme, toggleTheme }
}
