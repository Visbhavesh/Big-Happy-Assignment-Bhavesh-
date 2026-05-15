import {
  Grid, LineChart, Briefcase, BarChart2, Users,
  Settings, Bell, HelpCircle, ChevronLeft, ChevronRight,
  Menu, X, LogOut, User,
} from 'lucide-react'

export const ICON_MAP: Record<string, React.ReactNode> = {
  grid:         <Grid size={17} />,
  'line-chart': <LineChart size={17} />,
  briefcase:    <Briefcase size={17} />,
  'bar-chart':  <BarChart2 size={17} />,
  users:        <Users size={17} />,
  settings:     <Settings size={17} />,
  bell:         <Bell size={17} />,
  help:         <HelpCircle size={17} />,
  logout:       <LogOut size={17} />,
  user:         <User size={17} />,
}

export { ChevronLeft, ChevronRight, Menu, X }
