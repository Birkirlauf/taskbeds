'use client';

import React, { useState } from 'react';
import { X, Clock, AlertCircle } from 'lucide-react';
import { Room } from '@/types/types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: {
    room: string;
    roomType: string;
    priority: 'High' | 'Normal' | 'Low';
    estimatedTime: string;
    instructions?: string;
  }) => void;
  availableRooms: Room[];
}

const roomTypes = [
  'Standard King',
  'Double Queen',
  'Suite',
  'Standard Twin',
  'Deluxe King',
];

export default function AddTaskModal({ isOpen, onClose, onSubmit, availableRooms }: AddTaskModalProps) {
  const [room, setRoom] = useState('');
  const [roomType, setRoomType] = useState(roomTypes[0]);
  const [priority, setPriority] = useState<'High' | 'Normal' | 'Low'>('Normal');
  const [estimatedTime, setEstimatedTime] = useState('30');
  const [instructions, setInstructions] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      room,
      roomType,
      priority,
      estimatedTime: `${estimatedTime} min`,
      instructions: instructions.trim() || undefined,
    });
    // Reset form
    setRoom('');
    setRoomType(roomTypes[0]);
    setPriority('Normal');
    setEstimatedTime('30');
    setInstructions('');
  };

  const cleanableRooms = availableRooms.filter(
    r => r.status === 'vacant_dirty' || r.status === 'occupied'
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-xl font-bold">Add New Task</h2>
            <p className="text-sm text-gray-500">Create a new cleaning task</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Room Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Room
            </label>
            <select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a room...</option>
              {cleanableRooms.map((room) => (
                <option key={room.id} value={room.number}>
                  Room {room.number} ({room.status === 'occupied' ? 'Occupied' : 'Dirty'})
                </option>
              ))}
            </select>
          </div>

          {/* Room Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Type
            </label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {roomTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <div className="flex gap-3">
              {(['Low', 'Normal', 'High'] as const).map((level) => (
                <label
                  key={level}
                  className={`
                    flex-1 flex items-center justify-center gap-2 p-2 rounded-lg border-2 cursor-pointer
                    ${priority === level 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="priority"
                    value={level}
                    checked={priority === level}
                    onChange={(e) => setPriority(e.target.value as typeof priority)}
                    className="sr-only"
                  />
                  <AlertCircle size={16} className={
                    level === 'High' ? 'text-red-500' :
                    level === 'Normal' ? 'text-yellow-500' :
                    'text-green-500'
                  } />
                  <span className="font-medium">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Estimated Time */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Time (minutes)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="15"
                max="180"
                step="15"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                required
                className="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Clock size={16} className="text-gray-400" />
              <span className="text-sm text-gray-500">minutes</span>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Add any special instructions or notes..."
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
} 