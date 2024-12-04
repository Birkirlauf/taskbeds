'use client';

import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Room } from '@/types/types';
import RoomModal from '@/components/RoomModal';

interface RoomData extends Room {
  lastCleaned?: string;
  assignedTo?: string;
  nextService?: string;
}

const initialRooms: RoomData[] = [
  // South Wing - Floor 1
  { id: '101', number: '101', status: 'vacant_clean', wing: 'South Wing', lastCleaned: '2 hours ago' },
  { id: '102', number: '102', status: 'in_progress', wing: 'South Wing', assignedTo: 'John Doe' },
  { id: '103', number: '103', status: 'maintenance', wing: 'South Wing', nextService: 'Today 3 PM' },
  { id: '104', number: '104', status: 'occupied', wing: 'South Wing', nextService: 'Tomorrow' },
  { id: '105', number: '105', status: 'vacant_dirty', wing: 'South Wing' },
  { id: '106', number: '106', status: 'maintenance', wing: 'South Wing' },
  { id: '107', number: '107', status: 'occupied', wing: 'South Wing' },
  { id: '108', number: '108', status: 'vacant_clean', wing: 'South Wing' },
  // South Wing - Floor 2
  { id: '201', number: '201', status: 'vacant_clean', wing: 'South Wing' },
  { id: '202', number: '202', status: 'occupied', wing: 'South Wing' },
  { id: '203', number: '203', status: 'vacant_dirty', wing: 'South Wing' },
  { id: '204', number: '204', status: 'maintenance', wing: 'South Wing' },
  { id: '205', number: '205', status: 'in_progress', wing: 'South Wing' },
  { id: '206', number: '206', status: 'occupied', wing: 'South Wing' },
  { id: '207', number: '207', status: 'vacant_clean', wing: 'South Wing' },
  // West Wing - Floor 6
  { id: '601', number: '601', status: 'maintenance', wing: 'West Wing' },
  { id: '602', number: '602', status: 'vacant_clean', wing: 'West Wing' },
  { id: '603', number: '603', status: 'in_progress', wing: 'West Wing' },
  { id: '604', number: '604', status: 'occupied', wing: 'West Wing' },
  { id: '605', number: '605', status: 'vacant_dirty', wing: 'West Wing' },
  { id: '606', number: '606', status: 'maintenance', wing: 'West Wing' },
  { id: '607', number: '607', status: 'occupied', wing: 'West Wing' },
  { id: '608', number: '608', status: 'vacant_clean', wing: 'West Wing' },
];

const RoomCard = ({ room, onClick }: { room: RoomData; onClick: () => void }) => {
  const statusConfig = {
    vacant_clean: {
      color: 'bg-green-400',
      icon: Icons.CheckCircle,
      label: 'Clean'
    },
    vacant_dirty: {
      color: 'bg-red-400',
      icon: Icons.AlertCircle,
      label: 'Dirty'
    },
    occupied: {
      color: 'bg-blue-400',
      icon: Icons.User,
      label: 'Occupied'
    },
    maintenance: {
      color: 'bg-yellow-400',
      icon: Icons.Wrench,
      label: 'Maintenance'
    },
    in_progress: {
      color: 'bg-purple-400',
      icon: Icons.Loader2,
      label: 'In Progress'
    }
  };

  const status = statusConfig[room.status] || {
    color: 'bg-gray-400',
    icon: Icons.HelpCircle,
    label: 'Unknown'
  };

  const StatusIcon = status.icon;

  return (
    <div
      onClick={onClick}
      className={`
        ${status.color}
        aspect-square rounded-lg p-3
        cursor-pointer hover:opacity-90 transition-opacity
        flex flex-col justify-between relative
        overflow-hidden
      `}
    >
      {/* Room Number */}
      <div className="text-lg font-bold text-white">{room.number}</div>

      {/* Status Indicator */}
      <div className="absolute top-3 right-3">
        <StatusIcon className="text-white" size={16} />
      </div>

      {/* Status and Info */}
      <div className="flex flex-col gap-1">
        <div className="bg-white bg-opacity-20 px-2 py-1 rounded text-sm text-white">
          {status.label}
        </div>
        
        {room.assignedTo && (
          <div className="flex items-center gap-1 text-xs text-white">
            <Icons.User size={12} />
            {room.assignedTo}
          </div>
        )}
        {room.lastCleaned && (
          <div className="flex items-center gap-1 text-xs text-white">
            <Icons.History size={12} />
            {room.lastCleaned}
          </div>
        )}
        {room.nextService && (
          <div className="flex items-center gap-1 text-xs text-white">
            <Icons.Clock size={12} />
            {room.nextService}
          </div>
        )}
      </div>
    </div>
  );
};

const WingTab = ({ name, count, isSelected, onClick }: { 
  name: string; 
  count: number;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 rounded-lg text-sm
      ${isSelected ? 'bg-gray-200' : 'hover:bg-gray-100'}
    `}
  >
    {name} ({count})
  </button>
);

export default function RoomsPage() {
  const [selectedWing, setSelectedWing] = useState('South Wing');
  const [searchQuery, setSearchQuery] = useState('');
  const [rooms, setRooms] = useState(initialRooms);
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredRooms = rooms.filter(room => 
    room.wing === selectedWing &&
    (searchQuery === '' || room.number.includes(searchQuery))
  );

  const getWingRoomCount = (wing: string) => 
    rooms.filter(room => room.wing === wing).length;

  const stats = {
    total: filteredRooms.length,
    clean: filteredRooms.filter(r => r.status === 'vacant_clean').length,
    dirty: filteredRooms.filter(r => r.status === 'vacant_dirty').length,
    maintenance: filteredRooms.filter(r => r.status === 'maintenance').length,
  };

  const handleRoomClick = (room: RoomData) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleStatusChange = (newStatus: Room['status']) => {
    if (!selectedRoom) return;
    
    const updatedRooms = rooms.map(room => 
      room.id === selectedRoom.id 
        ? { ...room, status: newStatus }
        : room
    );
    
    setRooms(updatedRooms);
    setIsModalOpen(false);
  };

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          Housekeeping ({rooms.length})
        </h1>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <span>{stats.clean} clean</span>
          <span>•</span>
          <span>{stats.dirty} dirty</span>
          <span>•</span>
          <span>{stats.maintenance} maintenance</span>
        </div>
      </header>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Area names, groups, and more"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg text-sm"
        />
        <Icons.Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      <div className="flex gap-2 mb-6">
        <WingTab
          name="South Wing"
          count={getWingRoomCount('South Wing')}
          isSelected={selectedWing === 'South Wing'}
          onClick={() => setSelectedWing('South Wing')}
        />
        <WingTab
          name="West Wing"
          count={getWingRoomCount('West Wing')}
          isSelected={selectedWing === 'West Wing'}
          onClick={() => setSelectedWing('West Wing')}
        />
      </div>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {filteredRooms.map(room => (
          <RoomCard 
            key={room.id} 
            room={room}
            onClick={() => handleRoomClick(room)}
          />
        ))}
      </div>

      {selectedRoom && (
        <RoomModal
          room={selectedRoom}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
} 