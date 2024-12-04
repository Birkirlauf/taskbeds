'use client';

import React from 'react';

const stats = [
  {
    label: 'Rooms Cleaned Today',
    value: '45',
    change: '+12%',
    changeType: 'positive'
  },
  {
    label: 'Average Clean Time',
    value: '35 min',
    change: '-5 min',
    changeType: 'positive'
  },
  {
    label: 'Issues Reported',
    value: '8',
    change: '+2',
    changeType: 'negative'
  },
  {
    label: 'Staff Efficiency',
    value: '92%',
    change: '+3%',
    changeType: 'positive'
  }
];

const recentActivity = [
  {
    time: '10:30 AM',
    action: 'Room 305 cleaned',
    staff: 'John Doe',
    duration: '28 minutes'
  },
  {
    time: '10:15 AM',
    action: 'Issue reported in Room 402',
    staff: 'Jane Smith',
    duration: '-'
  },
  {
    time: '9:45 AM',
    action: 'Room 201 cleaned',
    staff: 'John Doe',
    duration: '32 minutes'
  },
  {
    time: '9:30 AM',
    action: 'Room 104 cleaned',
    staff: 'Jane Smith',
    duration: '25 minutes'
  }
];

export default function ReportsPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Performance metrics and housekeeping statistics</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <h3 className="text-gray-600 mb-2">{stat.label}</h3>
            <p className="text-2xl font-bold mb-2">{stat.value}</p>
            <p className={`text-sm ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change} from yesterday
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <section className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity, index) => (
            <div key={index} className="py-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{activity.time}</p>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-600">Staff: {activity.staff}</p>
              </div>
              {activity.duration !== '-' && (
                <div className="text-sm text-gray-600">
                  Duration: {activity.duration}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Export Options */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-medium mb-4">Export Report</h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Download PDF
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Export to Excel
          </button>
        </div>
      </section>
    </div>
  );
} 