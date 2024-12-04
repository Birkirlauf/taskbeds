'use client';

import React from 'react';
import RoomCard from './RoomCard';
import { Room } from '../types/types';

interface RoomGridProps {
  wing: string;
}

export default function RoomGrid({ wing }: RoomGridProps) {
  // This would normally come from an API
  const rooms: Room[] = [
    { id: '101', number: '101', status: 'vacant_clean', wing: 'South Wing' },
    { id: '102', number: '102', status: 'in_progress', wing: 'South Wing' },
    { id: '103', number: '103', status: 'maintenance', wing: 'South Wing' },
    { id: '104', number: '104', status: 'occupied', wing: 'South Wing' },
    { id: '105', number: '105', status: 'vacant_dirty', wing: 'South Wing' },
    { id: '601', number: '601', status: 'maintenance', wing: 'West Wing' },
    { id: '602', number: '602', status: 'vacant_clean', wing: 'West Wing' },
    { id: '603', number: '603', status: 'in_progress', wing: 'West Wing' },
    { id: '604', number: '604', status: 'occupied', wing: 'West Wing' },
    { id: '605', number: '605', status: 'vacant_dirty', wing: 'West Wing' },
  ];

  const filteredRooms = rooms.filter(room => room.wing === wing);

  return (
    <div className="grid grid-cols-5 gap-4 mt-6">
      {filteredRooms.map(room => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
} 