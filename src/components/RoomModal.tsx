'use client';

import React, { useState } from 'react';
import { X, User, Clock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Room } from '@/types/types';
import RoomHistoryModal from './RoomHistoryModal';
import ReportIssueModal from './ReportIssueModal';

interface RoomModalProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (status: Room['status']) => void;
}

const statusOptions = [
  { value: 'vacant_clean', label: 'Vacant & Clean', color: 'bg-green-400', icon: CheckCircle },
  { value: 'vacant_dirty', label: 'Vacant & Dirty', color: 'bg-red-400', icon: AlertCircle },
  { value: 'occupied', label: 'Occupied', color: 'bg-blue-400', icon: User },
  { value: 'maintenance', label: 'Maintenance', color: 'bg-yellow-400', icon: AlertCircle },
  { value: 'in_progress', label: 'In Progress', color: 'bg-purple-400', icon: Loader2 },
];

export default function RoomModal({ room, isOpen, onClose, onStatusChange }: RoomModalProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [showIssueReport, setShowIssueReport] = useState(false);

  if (!isOpen) return null;

  const handleIssueSubmit = (data: { category: string; description: string; priority: string }) => {
    console.log('Issue reported:', data);
    // Here you would typically send this to your API
    setShowIssueReport(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-lg mx-4">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Room {room.number}</h2>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Current Status */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Current Status</h3>
              <div className={`
                ${statusOptions.find(opt => opt.value === room.status)?.color}
                text-white px-3 py-2 rounded-lg inline-flex items-center gap-2
              `}>
                {React.createElement(statusOptions.find(opt => opt.value === room.status)?.icon || CheckCircle, { size: 16 })}
                {statusOptions.find(opt => opt.value === room.status)?.label}
              </div>
            </div>

            {/* Status Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Change Status</h3>
              <div className="grid grid-cols-1 gap-2">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onStatusChange(option.value as Room['status'])}
                    className={`
                      ${option.color} text-white p-3 rounded-lg
                      flex items-center justify-between
                      hover:opacity-90 transition-opacity
                    `}
                  >
                    <div className="flex items-center gap-2">
                      {React.createElement(option.icon, { size: 16 })}
                      {option.label}
                    </div>
                    {room.status === option.value && (
                      <div className="bg-white bg-opacity-20 px-2 py-1 rounded text-sm">
                        Current
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setShowHistory(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  <Clock size={16} />
                  View History
                </button>
                <button 
                  onClick={() => setShowIssueReport(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  <AlertCircle size={16} />
                  Report Issue
                </button>
              </div>
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

      <RoomHistoryModal
        room={room}
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />

      <ReportIssueModal
        room={room}
        isOpen={showIssueReport}
        onClose={() => setShowIssueReport(false)}
        onSubmit={handleIssueSubmit}
      />
    </>
  );
} 