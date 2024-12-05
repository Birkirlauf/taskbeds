import { Room, CleaningStatus } from '@/types';
import { useState } from 'react';
import CleaningChecklist from '../CleaningChecklist';

interface CleaningRoomCardProps {
  room: Room;
  onStatusUpdate: (roomId: string, status: CleaningStatus) => Promise<void>;
}

export default function CleaningRoomCard({ room, onStatusUpdate }: CleaningRoomCardProps) {
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const getStatusColor = (status: CleaningStatus) => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">Room {room.number}</h3>
          <p className="text-sm text-gray-600">{room.type}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(room.status)}`}>
          {room.status.replace('_', ' ')}
        </span>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => onStatusUpdate(room.id, 'IN_PROGRESS')}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          disabled={room.status === 'IN_PROGRESS'}
        >
          Start Cleaning
        </button>

        <button
          onClick={() => setIsChecklistOpen(true)}
          className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
        >
          View Checklist
        </button>

        <button
          onClick={() => onStatusUpdate(room.id, 'COMPLETED')}
          className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          disabled={room.status === 'COMPLETED'}
        >
          Mark as Complete
        </button>
      </div>

      {isChecklistOpen && (
        <CleaningChecklist
          roomId={room.id}
          onClose={() => setIsChecklistOpen(false)}
        />
      )}
    </div>
  );
} 