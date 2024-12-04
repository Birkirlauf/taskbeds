'use client';

import React, { useState } from 'react';
import { Clock, User, CheckCircle, Bed } from 'lucide-react';
import CleaningChecklist from '@/components/CleaningChecklist';

interface Room {
  number: string;
  type: 'Standard' | 'Suite' | 'Deluxe' | 'VIP';
  floor: string;
  status: 'available' | 'in_progress' | 'completed';
}

const mockRooms: Room[] = [
  { number: '101', type: 'Standard', floor: '1st Floor', status: 'available' },
  { number: '102', type: 'Standard', floor: '1st Floor', status: 'available' },
  { number: '201', type: 'Suite', floor: '2nd Floor', status: 'in_progress' },
  { number: '202', type: 'Deluxe', floor: '2nd Floor', status: 'completed' },
  { number: '301', type: 'VIP', floor: '3rd Floor', status: 'available' },
];

const staff = [
  'John Doe',
  'Jane Smith',
  'Mike Johnson',
  'Sarah Wilson',
  'David Brown'
];

export default function RoomCleaningPage() {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [assignedStaff, setAssignedStaff] = useState<string>(staff[0]);

  const handleStartCleaning = (room: Room) => {
    setSelectedRoom(room);
    setRooms(prev =>
      prev.map(r =>
        r.number === room.number ? { ...r, status: 'in_progress' } : r
      )
    );
  };

  const handleCompleteRoom = () => {
    if (selectedRoom) {
      setRooms(prev =>
        prev.map(r =>
          r.number === selectedRoom.number ? { ...r, status: 'completed' } : r
        )
      );
      setSelectedRoom(null);
    }
  };

  const RoomCard = ({ room }: { room: Room }) => {
    const statusColors = {
      available: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800'
    };

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className={`text-xs px-2 py-1 rounded-full ${statusColors[room.status]} capitalize`}>
              {room.status.replace('_', ' ')}
            </span>
            <h3 className="font-medium text-gray-900 mt-2">Room {room.number}</h3>
            <p className="text-sm text-gray-600">{room.floor}</p>
          </div>
          <span className={`text-sm font-medium ${
            room.type === 'VIP' ? 'text-purple-600' :
            room.type === 'Suite' ? 'text-orange-600' :
            room.type === 'Deluxe' ? 'text-blue-600' :
            'text-gray-600'
          }`}>
            {room.type}
          </span>
        </div>

        {room.status === 'available' && (
          <button
            onClick={() => handleStartCleaning(room)}
            className="w-full mt-2 py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Bed size={16} />
            Start Cleaning
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      {selectedRoom ? (
        <CleaningChecklist
          roomNumber={selectedRoom.number}
          roomType={selectedRoom.type}
          assignedTo={assignedStaff}
          startTime={new Date().toISOString()}
          onComplete={handleCompleteRoom}
        />
      ) : (
        <>
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Room Cleaning</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Bed size={14} />
                <span>Rooms to Clean: {rooms.filter(r => r.status === 'available').length}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>In Progress: {rooms.filter(r => r.status === 'in_progress').length}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={14} />
                <span>Completed: {rooms.filter(r => r.status === 'completed').length}</span>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned Staff
              </label>
              <select
                value={assignedStaff}
                onChange={(e) => setAssignedStaff(e.target.value)}
                className="w-64 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {staff.map((person) => (
                  <option key={person} value={person}>{person}</option>
                ))}
              </select>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {rooms.map(room => (
              <RoomCard key={room.number} room={room} />
            ))}
          </div>
        </>
      )}
    </div>
  );
} 