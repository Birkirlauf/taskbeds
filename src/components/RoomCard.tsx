'use client';

import React from 'react';
import { Room } from '../types/types';
import { User, Clock, Bed, Moon, Settings, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  onClick?: () => void;
}

const getCardColor = (status: string) => {
  switch (status) {
    case 'vacant_clean':
      return 'bg-emerald-50 border-emerald-200';
    case 'occupied':
      return 'bg-blue-50 border-blue-200';
    case 'maintenance':
      return 'bg-amber-50 border-amber-200';
    case 'vacant_dirty':
      return 'bg-rose-50 border-rose-200';
    case 'in_progress':
      return 'bg-violet-50 border-violet-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'vacant_clean':
      return 'text-emerald-700 bg-emerald-100';
    case 'occupied':
      return 'text-blue-700 bg-blue-100';
    case 'maintenance':
      return 'text-amber-700 bg-amber-100';
    case 'vacant_dirty':
      return 'text-rose-700 bg-rose-100';
    case 'in_progress':
      return 'text-violet-700 bg-violet-100';
    default:
      return 'text-gray-700 bg-gray-100';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'vacant_clean':
      return <CheckCircle className="h-4 w-4" />;
    case 'vacant_dirty':
      return <XCircle className="h-4 w-4" />;
    case 'in_progress':
      return <Loader2 className="h-4 w-4 animate-spin" />;
    case 'maintenance':
      return <Settings className="h-4 w-4" />;
    case 'occupied':
      return <User className="h-4 w-4" />;
    default:
      return null;
  }
};

export default function RoomCard({ room, onClick }: RoomCardProps) {
  const cardColor = getCardColor(room.status);
  const statusColor = getStatusColor(room.status);
  const StatusIcon = () => getStatusIcon(room.status);

  return (
    <button 
      onClick={onClick}
      className={`
        ${cardColor}
        w-full h-full
        rounded-xl
        transition-all duration-200
        hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-blue-500
        p-4
        border
        relative
        flex flex-col
      `}
    >
      {/* Room number and bed type */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{room.number}</h3>
          <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-0.5">
            <Bed className="h-4 w-4" />
            <span>Double</span>
          </div>
        </div>
        {room.assignedTo?.includes('Tomorrow') && (
          <div className="bg-gray-100 p-1.5 rounded-full">
            <Moon className="h-4 w-4 text-gray-500" />
          </div>
        )}
      </div>

      {/* Status badge */}
      <div className={`${statusColor} px-2.5 py-1 rounded-md inline-flex items-center gap-1.5 text-sm font-medium w-fit`}>
        <StatusIcon />
        <span>
          {room.status === 'vacant_clean' ? 'Clean' : 
           room.status === 'vacant_dirty' ? 'Dirty' : 
           room.status === 'in_progress' ? 'In Progress' : 
           room.status === 'maintenance' ? 'Maintenance' : 
           'Occupied'}
        </span>
      </div>

      {/* Assignment info */}
      {room.assignedTo && (
        <div className="mt-auto pt-3 flex items-center gap-1.5 text-sm text-gray-600">
          {room.assignedTo.includes('John') ? (
            <User className="h-4 w-4 text-gray-400" />
          ) : (
            <Clock className="h-4 w-4 text-gray-400" />
          )}
          <span>{room.assignedTo}</span>
        </div>
      )}
    </button>
  );
} 