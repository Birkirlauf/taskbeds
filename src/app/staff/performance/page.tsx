'use client';

import React, { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Star, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Calendar,
  Filter,
  Download,
  Users
} from 'lucide-react';

interface StaffPerformance {
  id: string;
  name: string;
  role: string;
  metrics: {
    tasksCompleted: number;
    averageRating: number;
    issuesResolved: number;
    responseTime: number;
    efficiency: number;
  };
  recentActivity: {
    date: string;
    type: 'task' | 'issue' | 'feedback';
    description: string;
  }[];
  monthlyStats: {
    month: string;
    tasksCompleted: number;
    rating: number;
  }[];
  skills: {
    name: string;
    level: number;
  }[];
}

const mockPerformanceData: StaffPerformance[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Housekeeping',
    metrics: {
      tasksCompleted: 127,
      averageRating: 4.8,
      issuesResolved: 23,
      responseTime: 12,
      efficiency: 94
    },
    recentActivity: [
      {
        date: '2024-01-08T10:30:00',
        type: 'task',
        description: 'Completed room cleaning for 305'
      },
      {
        date: '2024-01-08T09:15:00',
        type: 'feedback',
        description: 'Received 5-star rating from guest'
      }
    ],
    monthlyStats: [
      { month: 'Jan', tasksCompleted: 127, rating: 4.8 },
      { month: 'Dec', tasksCompleted: 115, rating: 4.7 },
      { month: 'Nov', tasksCompleted: 132, rating: 4.9 }
    ],
    skills: [
      { name: 'Room Cleaning', level: 95 },
      { name: 'Guest Service', level: 90 },
      { name: 'Time Management', level: 85 }
    ]
  },
  {
    id: '2',
    name: 'Mike Johnson',
    role: 'Maintenance',
    metrics: {
      tasksCompleted: 89,
      averageRating: 4.9,
      issuesResolved: 45,
      responseTime: 15,
      efficiency: 92
    },
    recentActivity: [
      {
        date: '2024-01-08T11:00:00',
        type: 'issue',
        description: 'Fixed AC unit in Room 402'
      }
    ],
    monthlyStats: [
      { month: 'Jan', tasksCompleted: 89, rating: 4.9 },
      { month: 'Dec', tasksCompleted: 92, rating: 4.8 },
      { month: 'Nov', tasksCompleted: 85, rating: 4.7 }
    ],
    skills: [
      { name: 'HVAC Repair', level: 95 },
      { name: 'Plumbing', level: 90 },
      { name: 'Electrical', level: 85 }
    ]
  }
];

export default function StaffPerformance() {
  const [selectedStaff, setSelectedStaff] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('month');

  const StaffMetricsCard = ({ staff }: { staff: StaffPerformance }) => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{staff.name}</h3>
              <p className="text-gray-600">{staff.role}</p>
            </div>
            <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full">
              <Star size={14} />
              <span>{staff.metrics.averageRating}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">
                {staff.metrics.tasksCompleted}
              </div>
              <div className="text-xs text-gray-600">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">
                {staff.metrics.issuesResolved}
              </div>
              <div className="text-xs text-gray-600">Issues Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">
                {staff.metrics.efficiency}%
              </div>
              <div className="text-xs text-gray-600">Efficiency</div>
            </div>
          </div>

          <div className="space-y-4">
            {staff.skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{skill.name}</span>
                  <span className="text-gray-900">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h4>
            <div className="space-y-3">
              {staff.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`
                    mt-1 w-2 h-2 rounded-full
                    ${activity.type === 'task' ? 'bg-blue-500' : 
                      activity.type === 'issue' ? 'bg-yellow-500' : 
                      'bg-green-500'}
                  `} />
                  <div>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(activity.date).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Staff Performance</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span>Total Staff: {mockPerformanceData.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={14} />
                <span>Average Rating: 4.8</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp size={14} />
                <span>Performance Trend: +5%</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Calendar size={16} />
              This Month
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              <option value="all">All Staff</option>
              {mockPerformanceData.map(staff => (
                <option key={staff.id} value={staff.id}>{staff.name}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockPerformanceData
          .filter(staff => selectedStaff === 'all' || staff.id === selectedStaff)
          .map(staff => (
            <StaffMetricsCard key={staff.id} staff={staff} />
          ))
        }
      </div>
    </div>
  );
} 