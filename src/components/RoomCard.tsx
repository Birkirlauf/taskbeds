'use client';

import React from 'react';
import { Room } from '../types/types';

interface RoomCardProps {
  room: Room;
}

const statusColors = {
  vacant_clean: 'bg-green-100',
  vacant_dirty: 'bg-red-100',
  occupied: 'bg-blue-100',
  maintenance: 'bg-yellow-100',
  in_progress: 'bg-purple-100',
};

const statusIcons = {
  vacant_clean: '🏠',
  vacant_dirty: '⚡️',
  occupied: '👤',
  maintenance: '🔧',
  in_progress: '🔄',
};

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div 
      className={`
        ${statusColors[room.status]}
        p-4 rounded-lg cursor-pointer
        hover:shadow-md transition-shadow
        relative
      `}
    >
      <div className="flex justify-between items-start">
        <span className="text-xl font-bold">{room.number}</span>
        <span>{statusIcons[room.status]}</span>
      </div>
      
      {room.hasIssues && (
        <div className="absolute bottom-2 right-2">
          ⚠️
        </div>
      )}
      
      {room.assignedTo && (
        <div className="absolute bottom-2 left-2 text-sm text-gray-600">
          👤
        </div>
      )}
    </div>
  );
} 