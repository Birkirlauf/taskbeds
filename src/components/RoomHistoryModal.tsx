'use client';

import React from 'react';
import { X, Clock, User, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Room } from '@/types/types';

interface HistoryEntry {
  id: string;
  timestamp: string;
  action: string;
  status: Room['status'];
  user: string;
  notes?: string;
}

// Mock history data - in a real app, this would come from an API
const mockHistory: HistoryEntry[] = [
  {
    id: '1',
    timestamp: '2023-12-04T15:30:00',
    action: 'Status Changed',
    status: 'vacant_clean',
    user: 'John Doe',
    notes: 'Regular cleaning completed'
  },
  {
    id: '2',
    timestamp: '2023-12-04T12:15:00',
    action: 'Status Changed',
    status: 'in_progress',
    user: 'John Doe'
  },
  {
    id: '3',
    timestamp: '2023-12-04T12:00:00',
    action: 'Status Changed',
    status: 'vacant_dirty',
    user: 'System',
    notes: 'Guest checkout'
  },
  {
    id: '4',
    timestamp: '2023-12-03T14:00:00',
    action: 'Status Changed',
    status: 'occupied',
    user: 'System',
    notes: 'Guest check-in'
  }
];

const statusIcons = {
  vacant_clean: CheckCircle,
  vacant_dirty: AlertCircle,
  occupied: User,
  maintenance: AlertCircle,
  in_progress: Loader2
};

const statusColors = {
  vacant_clean: 'bg-green-100 text-green-800',
  vacant_dirty: 'bg-red-100 text-red-800',
  occupied: 'bg-blue-100 text-blue-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-purple-100 text-purple-800'
};

interface RoomHistoryModalProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
}

export default function RoomHistoryModal({ room, isOpen, onClose }: RoomHistoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-xl font-bold">Room {room.number} History</h2>
            <p className="text-sm text-gray-500">Activity and status changes</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="space-y-6">
            {mockHistory.map((entry, index) => {
              const StatusIcon = statusIcons[entry.status];
              return (
                <div key={entry.id} className="relative flex gap-4">
                  {/* Timeline line */}
                  {index !== mockHistory.length - 1 && (
                    <div className="absolute left-[15px] top-[28px] bottom-0 w-[2px] bg-gray-200" />
                  )}
                  
                  {/* Time */}
                  <div className="flex-shrink-0 w-32 pt-1">
                    <div className="text-sm text-gray-500">
                      {new Date(entry.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`p-1 rounded ${statusColors[entry.status]}`}>
                        <StatusIcon size={16} />
                      </div>
                      <span className="font-medium">{entry.action}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      Changed by: {entry.user}
                    </div>
                    {entry.notes && (
                      <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded">
                        {entry.notes}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 