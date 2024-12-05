'use client';

import React, { useState } from 'react';
import RoomCard from './RoomCard';
import { Room } from '../types/types';
import { Search, Filter, CheckCircle, XCircle, Settings, User, Loader2 } from 'lucide-react';

interface RoomGridProps {
  wing: string;
}

const wings = ['South Wing', 'North Wing', 'East Wing', 'West Wing'];
const statuses = [
  { id: 'vacant_clean', label: 'Clean', icon: CheckCircle, color: 'text-emerald-700 bg-emerald-100' },
  { id: 'vacant_dirty', label: 'Dirty', icon: XCircle, color: 'text-rose-700 bg-rose-100' },
  { id: 'in_progress', label: 'In Progress', icon: Loader2, color: 'text-violet-700 bg-violet-100' },
  { id: 'maintenance', label: 'Maintenance', icon: Settings, color: 'text-amber-700 bg-amber-100' },
  { id: 'occupied', label: 'Occupied', icon: User, color: 'text-blue-700 bg-blue-100' },
];

export default function RoomGrid({ wing: defaultWing }: RoomGridProps) {
  const [wing, setWing] = useState(defaultWing);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // This would normally come from an API
  const rooms: Room[] = [
    { id: '101', number: '101', status: 'vacant_clean', wing: 'South Wing', assignedTo: '2 hours ago' },
    { id: '102', number: '102', status: 'in_progress', wing: 'South Wing', assignedTo: 'John Doe' },
    { id: '103', number: '103', status: 'maintenance', wing: 'South Wing', assignedTo: 'Today 3 PM' },
    { id: '104', number: '104', status: 'occupied', wing: 'South Wing', assignedTo: 'Tomorrow' },
    { id: '105', number: '105', status: 'vacant_dirty', wing: 'South Wing' },
    { id: '106', number: '106', status: 'maintenance', wing: 'South Wing' },
    { id: '107', number: '107', status: 'occupied', wing: 'South Wing' },
    { id: '108', number: '108', status: 'vacant_clean', wing: 'South Wing' },
    { id: '201', number: '201', status: 'vacant_clean', wing: 'North Wing' },
    { id: '202', number: '202', status: 'occupied', wing: 'North Wing' },
    { id: '203', number: '203', status: 'vacant_dirty', wing: 'North Wing' },
    { id: '204', number: '204', status: 'maintenance', wing: 'North Wing' },
    { id: '205', number: '205', status: 'in_progress', wing: 'North Wing' },
    { id: '206', number: '206', status: 'occupied', wing: 'North Wing' },
    { id: '207', number: '207', status: 'vacant_clean', wing: 'North Wing' },
  ];

  const filteredRooms = rooms.filter(room => {
    const matchesWing = room.wing === wing;
    const matchesSearch = room.number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || room.status === selectedStatus;
    return matchesWing && matchesSearch && matchesStatus;
  });

  const stats = {
    clean: filteredRooms.filter(r => r.status === 'vacant_clean').length,
    dirty: filteredRooms.filter(r => r.status === 'vacant_dirty').length,
    maintenance: filteredRooms.filter(r => r.status === 'maintenance').length,
    occupied: filteredRooms.filter(r => r.status === 'occupied').length,
    inProgress: filteredRooms.filter(r => r.status === 'in_progress').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Housekeeping</h1>
          <div className="flex gap-3 text-sm text-gray-600 mt-1">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              {stats.clean} clean
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-rose-400" />
              {stats.dirty} dirty
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              {stats.maintenance} maintenance
            </span>
          </div>
        </div>
        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium inline-flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Search and filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by room number..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {wings.map((w) => (
            <button
              key={w}
              onClick={() => setWing(w)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${wing === w 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Status filters */}
      <div className="flex gap-2 flex-wrap">
        {statuses.map((status) => {
          const Icon = status.icon;
          return (
            <button
              key={status.id}
              onClick={() => setSelectedStatus(selectedStatus === status.id ? null : status.id)}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium inline-flex items-center gap-1.5
                ${selectedStatus === status.id ? status.color : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              `}
            >
              <Icon className="h-4 w-4" />
              {status.label}
            </button>
          );
        })}
      </div>

      {/* Room grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {filteredRooms.map(room => (
          <div key={room.id} className="aspect-square">
            <RoomCard 
              room={room} 
              onClick={() => console.log('Room clicked:', room.number)} 
            />
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No rooms match your search criteria</p>
        </div>
      )}
    </div>
  );
} 