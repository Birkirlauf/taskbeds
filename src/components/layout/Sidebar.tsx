'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BedDouble,
  ClipboardList,
  Users,
  Settings,
  AlertCircle,
  LogOut,
  Building2,
  Calendar,
  BarChart3,
  X,
} from 'lucide-react';
import { auth } from '@/lib/auth';

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await auth.logout();
    router.push('/auth/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Rooms', href: '/rooms', icon: BedDouble },
    { name: 'Tasks', href: '/tasks', icon: ClipboardList },
    { name: 'Staff', href: '/staff', icon: Users },
    { name: 'Issues', href: '/issues', icon: AlertCircle },
  ];

  const secondaryNavigation = [
    { name: 'Schedule', href: '/staff/schedule', icon: Calendar },
    { name: 'Performance', href: '/staff/performance', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-64">
      {/* Logo and close button */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-semibold text-gray-900">
            TaskBeds
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 -mr-2 hover:bg-gray-50 rounded-md"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon
                  className={`h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-blue-600' : 'text-gray-400'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Management
          </h3>
          <div className="mt-2 space-y-1">
            {secondaryNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Sign Out Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Sign out
        </button>
      </div>
    </div>
  );
} 