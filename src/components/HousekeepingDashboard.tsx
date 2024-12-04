'use client';

import React, { useState } from 'react';
import { Wing, Room } from '../types/types';
import RoomGrid from './RoomGrid';
import WingSelector from './WingSelector';

export default function HousekeepingDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedWing, setSelectedWing] = useState<string>('South Wing');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-gray-600">
          <span>⚡️ 17</span>
          <span>🏠 5</span>
          <span>🔧 12</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(selectedDate.getDate() - 1);
              setSelectedDate(newDate);
            }}
          >
            ←
          </button>
          <span className="font-medium">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: '2-digit',
              year: 'numeric'
            })}
          </span>
          <button 
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(selectedDate.getDate() + 1);
              setSelectedDate(newDate);
            }}
          >
            →
          </button>
        </div>
      </div>

      <WingSelector
        wings={['South Wing', 'West Wing']}
        selectedWing={selectedWing}
        onWingSelect={setSelectedWing}
      />

      <RoomGrid wing={selectedWing} />
    </div>
  );
} 