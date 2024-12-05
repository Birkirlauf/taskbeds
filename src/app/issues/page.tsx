'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  ClipboardList, 
  Search,
  Filter,
  Plus,
  ArrowRight,
  Building2
} from 'lucide-react';
import Link from 'next/link';

interface Issue {
  id: string;
  room: string;
  type: 'Maintenance' | 'Housekeeping' | 'Security' | 'IT' | 'Other';
  description: string;
  status: 'reported' | 'investigating' | 'in_progress' | 'resolved';
  reportedAt: string;
  priority: 'high' | 'medium' | 'low';
  assignedTo?: string;
  convertedToTask?: boolean;
  images?: string[];
  location: string;
  floor: string;
}

const mockIssues: Issue[] = [
  {
    id: '1',
    room: '402',
    type: 'Maintenance',
    description: 'Broken shower head needs replacement',
    status: 'reported',
    reportedAt: '2023-12-04T09:30:00',
    priority: 'high',
    location: 'Bathroom',
    floor: '4th Floor'
  },
  {
    id: '2',
    room: '305',
    type: 'Maintenance',
    description: 'Sink draining slowly',
    status: 'in_progress',
    reportedAt: '2023-12-04T10:15:00',
    priority: 'medium',
    assignedTo: 'Mike Johnson',
    location: 'Bathroom',
    floor: '3rd Floor'
  },
  {
    id: '3',
    room: '501',
    type: 'Housekeeping',
    description: 'Deep cleaning needed after water damage',
    status: 'investigating',
    reportedAt: '2023-12-04T11:00:00',
    priority: 'high',
    location: 'Bedroom',
    floor: '5th Floor',
    convertedToTask: true
  },
  {
    id: '4',
    room: 'Lobby',
    type: 'Security',
    description: 'Security camera malfunction',
    status: 'in_progress',
    reportedAt: '2023-12-04T12:30:00',
    priority: 'high',
    assignedTo: 'John Smith',
    location: 'Main Entrance',
    floor: 'Ground Floor'
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export default function Issues() {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<Issue['type'] | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<Issue['status'] | 'All'>('All');

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = 
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'All' || issue.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || issue.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const IssueCard = ({ issue }: { issue: Issue }) => {
    const statusColors = {
      reported: 'bg-yellow-100 text-yellow-800',
      investigating: 'bg-purple-100 text-purple-800',
      in_progress: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800'
    };

    const priorityColors = {
      high: 'text-red-600',
      medium: 'text-orange-600',
      low: 'text-green-600'
    };

    const statusIcons = {
      reported: AlertTriangle,
      investigating: Search,
      in_progress: Clock,
      resolved: CheckCircle
    };

    const StatusIcon = statusIcons[issue.status];

    const handleConvertToTask = (issue: Issue) => {
      // Update issue to show it's been converted
      setIssues(prev => 
        prev.map(i => 
          i.id === issue.id ? { ...i, convertedToTask: true } : i
        )
      );

      // In a real app, you would create a task here and possibly use a global state management solution
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-lg">Room {issue.room}</h3>
              <span className={`text-sm font-medium ${priorityColors[issue.priority]}`}>
                • {issue.priority.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Building2 size={14} />
              <span>{issue.floor} - {issue.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {issue.convertedToTask && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Task Created
              </span>
            )}
            <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${statusColors[issue.status]}`}>
              <StatusIcon size={14} />
              {issue.status.replace('_', ' ')}
            </span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{issue.description}</p>
        
        <div className="flex justify-between items-center text-sm border-t pt-4">
          <div className="space-y-1">
            <div className="text-gray-500">
              Reported: {formatDate(issue.reportedAt)}
            </div>
            {issue.assignedTo && (
              <div className="text-gray-500">
                Assigned to: {issue.assignedTo}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {!issue.convertedToTask && issue.status !== 'resolved' && (
              <button
                onClick={() => handleConvertToTask(issue)}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
              >
                <ClipboardList size={14} />
                Convert to Task
              </button>
            )}
            <Link
              href={`/tasks?issue=${issue.id}`}
              className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <ArrowRight size={14} />
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Maintenance Issues</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <AlertTriangle size={14} />
                <span>Open Issues: {issues.filter(i => i.status !== 'resolved').length}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>In Progress: {issues.filter(i => i.status === 'in_progress').length}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={14} />
                <span>Resolved: {issues.filter(i => i.status === 'resolved').length}</span>
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus size={16} />
            Report Issue
          </button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as Issue['type'] | 'All')}
                className="pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="All">All Types</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Security">Security</option>
                <option value="IT">IT</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as Issue['status'] | 'All')}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="reported">Reported</option>
              <option value="investigating">Investigating</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {filteredIssues.map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
} 