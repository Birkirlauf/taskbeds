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
} from 'lucide-react';
import { auth } from '@/lib/auth';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await auth.logout();
    router.push('/auth/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Rooms', href: '/rooms', icon: BedDouble },
    { name: 'Tasks', href: '/tasks', icon: ClipboardList },
    { name: 'Staff', href: '/staff', icon: Users },
    { name: 'Issues', href: '/issues', icon: AlertCircle },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen flex-col justify-between bg-white border-r border-gray-200">
      <div className="flex flex-col flex-grow">
        <div className="flex h-16 shrink-0 items-center px-6">
          <img
            className="h-8 w-auto"
            src="/logo.png"
            alt="Hotel Manager"
          />
          <span className="ml-2 text-lg font-semibold text-gray-900">
            Hotel Manager
          </span>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-blue-600' : 'text-gray-400'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="shrink-0 p-4 border-t border-gray-200">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center px-2 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign out
        </button>
      </div>
    </div>
  );
} 