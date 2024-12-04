'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Bed,
  Users,
  ClipboardList,
  ArrowRight,
  Building2,
  Clock,
} from 'lucide-react';

interface DashboardStats {
  rooms: {
    total: number;
    occupied: number;
    cleaning: number;
    available: number;
  };
  staff: {
    total: number;
    active: number;
  };
  tasks: {
    total: number;
    completed: number;
    pending: number;
  };
}

const mockStats: DashboardStats = {
  rooms: {
    total: 100,
    occupied: 75,
    cleaning: 12,
    available: 13
  },
  staff: {
    total: 25,
    active: 18
  },
  tasks: {
    total: 45,
    completed: 28,
    pending: 17
  }
};

export default function Dashboard() {
  const StatCard = ({ 
    title, 
    value, 
    icon: Icon,
    subtitle
  }: { 
    title: string;
    value: string | number;
    icon: any;
    subtitle?: string;
  }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-50 p-2 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-gray-600 text-sm">{title}</h3>
      </div>
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );

  const QuickAction = ({ 
    icon: Icon, 
    label, 
    href 
  }: { 
    icon: any;
    label: string;
    href: string;
  }) => (
    <Link
      href={href}
      className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
    >
      <Icon className="w-5 h-5 text-blue-600" />
      <span className="font-medium text-gray-700">{label}</span>
      <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
    </Link>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          <div className="flex items-center gap-1">
            <Building2 size={14} />
            <span>Hotel Overview</span>
          </div>
        </div>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Rooms"
          value={mockStats.rooms.total}
          icon={Bed}
          subtitle={`${mockStats.rooms.available} rooms available`}
        />
        <StatCard
          title="Staff"
          value={mockStats.staff.active}
          icon={Users}
          subtitle={`${mockStats.staff.total} total staff`}
        />
        <StatCard
          title="Tasks"
          value={mockStats.tasks.pending}
          icon={ClipboardList}
          subtitle="pending tasks"
        />
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickAction
          icon={Bed}
          label="Manage Rooms"
          href="/rooms"
        />
        <QuickAction
          icon={ClipboardList}
          label="View Tasks"
          href="/tasks"
        />
        <QuickAction
          icon={Users}
          label="Staff"
          href="/staff"
        />
      </div>
    </div>
  );
} 