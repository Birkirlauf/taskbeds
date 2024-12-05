import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home,
  BedDouble,
  ClipboardList,
  Users,
  Calendar,
  Settings,
  Bell,
  LogOut,
  Menu,
  ChevronRight,
  Building2,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mainNavItems = [
  { 
    name: 'Dashboard',
    href: '/',
    icon: Home
  },
  {
    name: 'Rooms',
    href: '/rooms',
    icon: BedDouble
  },
  {
    name: 'Cleaning',
    href: '/cleaning',
    icon: Sparkles,
    badge: '5'
  },
  {
    name: 'Tasks',
    href: '/tasks',
    icon: ClipboardList,
    badge: '12'
  },
  {
    name: 'Staff',
    href: '/staff',
    icon: Users
  },
  {
    name: 'Schedule',
    href: '/schedule',
    icon: Calendar
  }
];

const bottomNavItems = [
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings
  }
];

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn(
      "flex flex-col h-screen border-r border-gray-200 bg-white transition-all duration-300",
      isCollapsed ? "w-[70px]" : "w-[240px]"
    )}>
      {/* Header */}
      <div className="h-[60px] flex items-center gap-2 px-4 border-b border-gray-200">
        {!isCollapsed && (
          <>
            <Building2 className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-gray-900">Taskbeds</span>
          </>
        )}
        <button 
          onClick={onToggle}
          className={cn(
            "ml-auto p-1.5 rounded-lg hover:bg-gray-100 text-gray-500",
            isCollapsed && "ml-2"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Main navigation */}
      <div className="flex-1 py-4 flex flex-col gap-1">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
                isCollapsed ? "justify-center" : "",
                isActive 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <Icon className={cn(
                "h-5 w-5",
                isActive ? "text-blue-600" : "text-gray-400"
              )} />
              {!isCollapsed && (
                <span>{item.name}</span>
              )}
              {!isCollapsed && item.badge && (
                <span className="ml-auto bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-200 py-4 flex flex-col gap-1">
        {/* Notifications */}
        <button 
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors",
            isCollapsed ? "justify-center" : ""
          )}
        >
          <Bell className="h-5 w-5 text-gray-400" />
          {!isCollapsed && (
            <>
              <span>Notifications</span>
              <span className="ml-auto bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full text-xs">
                3
              </span>
            </>
          )}
        </button>

        {/* Settings */}
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
                isCollapsed ? "justify-center" : "",
                isActive 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <Icon className={cn(
                "h-5 w-5",
                isActive ? "text-blue-600" : "text-gray-400"
              )} />
              {!isCollapsed && (
                <span>{item.name}</span>
              )}
            </Link>
          );
        })}

        {/* User section */}
        <div className={cn(
          "mt-4 mx-3 flex items-center gap-3 rounded-lg bg-gray-50 p-3",
          isCollapsed ? "justify-center" : ""
        )}>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <Users className="h-4 w-4 text-gray-500" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">Manager</p>
            </div>
          )}
          {!isCollapsed && (
            <button className="p-1 rounded-md hover:bg-gray-200 text-gray-400 hover:text-gray-600">
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 