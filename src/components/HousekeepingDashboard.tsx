'use client';

import React, { useState } from 'react';
import { Wing, Room } from '../types/types';
import RoomGrid from './RoomGrid';
import WingSelector from './WingSelector';
import { Calendar, ChevronLeft, ChevronRight, Clock, Building2 } from 'lucide-react';

export default function HousekeepingDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedWing, setSelectedWing] = useState<string>('South Wing');

  const stats = [
    { label: 'Vacant Clean', value: '17', icon: '🏠', color: 'bg-green-100 text-green-800' },
    { label: 'Vacant Dirty', value: '5', icon: '⚡️', color: 'bg-red-100 text-red-800' },
    { label: 'Maintenance', value: '12', icon: '🔧', color: 'bg-yellow-100 text-yellow-800' },
    { label: 'Occupied', value: '28', icon: '👤', color: 'bg-blue-100 text-blue-800' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Housekeeping Dashboard</h1>
          <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span className="truncate">{selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              <span>Grand Hotel Overview</span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 w-full sm:w-auto">
            <button 
              className="p-2 hover:bg-gray-50 rounded-l-lg border-r border-gray-200"
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(selectedDate.getDate() - 1);
                setSelectedDate(newDate);
              }}
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="px-4 py-2 flex items-center gap-2 flex-1 sm:flex-auto justify-center sm:justify-start">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-900">
                {selectedDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit'
                })}
              </span>
            </div>
            <button 
              className="p-2 hover:bg-gray-50 rounded-r-lg border-l border-gray-200"
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(selectedDate.getDate() + 1);
                setSelectedDate(newDate);
              }}
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className={`${stat.color} rounded-lg p-3 sm:p-4 shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl sm:text-2xl">{stat.icon}</span>
              <span className="text-lg sm:text-2xl font-bold">{stat.value}</span>
            </div>
            <div className="mt-1 text-xs sm:text-sm font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Wing Selector */}
      <WingSelector
        wings={['South Wing', 'West Wing']}
        selectedWing={selectedWing}
        onWingSelect={setSelectedWing}
      />

      {/* Room Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <RoomGrid wing={selectedWing} />
      </div>
    </div>
  );
} 