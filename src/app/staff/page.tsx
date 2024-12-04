'use client';

import React, { useState } from 'react';
import { 
  User,
  Clock,
  Calendar,
  Star,
  CheckCircle,
  AlertTriangle,
  Mail,
  Phone,
  Building2,
  Search,
  Filter,
  Plus,
  BarChart2
} from 'lucide-react';
import Link from 'next/link';

interface StaffMember {
  id: string;
  name: string;
  role: 'Housekeeping' | 'Maintenance' | 'Security' | 'Front Desk' | 'Management';
  email: string;
  phone: string;
  status: 'active' | 'on_leave' | 'off_duty';
  shift: 'morning' | 'afternoon' | 'night';
  assignedArea?: string;
  currentTask?: string;
  performance: {
    tasksCompleted: number;
    averageRating: number;
    issuesResolved: number;
  };
  schedule: {
    date: string;
    shift: 'morning' | 'afternoon' | 'night';
  }[];
  skills: string[];
  startDate: string;
  image?: string;
}

const mockStaff: StaffMember[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Housekeeping',
    email: 'john.doe@taskbeds.com',
    phone: '(555) 123-4567',
    status: 'active',
    shift: 'morning',
    assignedArea: '3rd Floor',
    currentTask: 'Room 305 Cleaning',
    performance: {
      tasksCompleted: 127,
      averageRating: 4.8,
      issuesResolved: 23
    },
    schedule: [
      { date: '2024-01-08', shift: 'morning' },
      { date: '2024-01-09', shift: 'morning' },
      { date: '2024-01-10', shift: 'afternoon' }
    ],
    skills: ['Deep Cleaning', 'VIP Room Service', 'Laundry Management'],
    startDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Mike Johnson',
    role: 'Maintenance',
    email: 'mike.j@taskbeds.com',
    phone: '(555) 234-5678',
    status: 'active',
    shift: 'morning',
    currentTask: 'Fix AC in Room 402',
    performance: {
      tasksCompleted: 89,
      averageRating: 4.9,
      issuesResolved: 45
    },
    schedule: [
      { date: '2024-01-08', shift: 'morning' },
      { date: '2024-01-09', shift: 'morning' },
      { date: '2024-01-10', shift: 'morning' }
    ],
    skills: ['HVAC', 'Plumbing', 'Electrical', 'General Repairs'],
    startDate: '2022-08-20'
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    role: 'Housekeeping',
    email: 'sarah.w@taskbeds.com',
    phone: '(555) 345-6789',
    status: 'on_leave',
    shift: 'afternoon',
    assignedArea: '4th Floor',
    performance: {
      tasksCompleted: 156,
      averageRating: 4.7,
      issuesResolved: 18
    },
    schedule: [
      { date: '2024-01-15', shift: 'afternoon' },
      { date: '2024-01-16', shift: 'afternoon' },
      { date: '2024-01-17', shift: 'morning' }
    ],
    skills: ['Deep Cleaning', 'Inventory Management', 'Team Leadership'],
    startDate: '2023-03-10'
  }
];

export default function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>(mockStaff);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<StaffMember['role'] | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<StaffMember['status'] | 'All'>('All');

  const roles: StaffMember['role'][] = [
    'Housekeeping',
    'Maintenance',
    'Security',
    'Front Desk',
    'Management'
  ];

  const filteredStaff = staff.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.assignedArea?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === 'All' || member.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || member.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const StaffCard = ({ member }: { member: StaffMember }) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      on_leave: 'bg-yellow-100 text-yellow-800',
      off_duty: 'bg-gray-100 text-gray-800'
    };

    const shiftTimes = {
      morning: '6:00 AM - 2:00 PM',
      afternoon: '2:00 PM - 10:00 PM',
      night: '10:00 PM - 6:00 AM'
    };

    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-blue-600" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-lg text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm capitalize ${statusColors[member.status]}`}>
              {member.status.replace('_', ' ')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail size={14} />
              <span>{member.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone size={14} />
              <span>{member.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={14} />
              <span>{shiftTimes[member.shift]}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={14} />
              <span>Since {new Date(member.startDate).toLocaleDateString()}</span>
            </div>
          </div>

          {member.assignedArea && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Building2 size={14} />
              <span>Assigned to {member.assignedArea}</span>
            </div>
          )}

          {member.currentTask && (
            <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm mb-4">
              Currently working on: {member.currentTask}
            </div>
          )}

          <div className="border-t pt-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">
                  {member.performance.tasksCompleted}
                </div>
                <div className="text-xs text-gray-600">Tasks Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900 flex items-center justify-center gap-1">
                  {member.performance.averageRating}
                  <Star size={16} className="text-yellow-400" />
                </div>
                <div className="text-xs text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">
                  {member.performance.issuesResolved}
                </div>
                <div className="text-xs text-gray-600">Issues Resolved</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-3 flex justify-between items-center border-t">
          <Link
            href={`/staff/${member.id}/schedule`}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View Schedule
          </Link>
          <Link
            href={`/staff/${member.id}/performance`}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View Performance
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Staff Management</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <User size={14} />
                <span>Total Staff: {staff.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={14} />
                <span>Active: {staff.filter(s => s.status === 'active').length}</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertTriangle size={14} />
                <span>On Leave: {staff.filter(s => s.status === 'on_leave').length}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/staff/schedule"
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Calendar size={16} />
              Schedule
            </Link>
            <Link
              href="/staff/performance"
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <BarChart2 size={16} />
              Reports
            </Link>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus size={16} />
              Add Staff
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search staff by name, email, or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as StaffMember['role'] | 'All')}
                className="pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="All">All Roles</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as StaffMember['status'] | 'All')}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="active">Active</option>
              <option value="on_leave">On Leave</option>
              <option value="off_duty">Off Duty</option>
            </select>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStaff.map(member => (
          <StaffCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
} 