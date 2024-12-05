'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Room, CleaningStatus } from '@/types';
import CleaningRoomCard from '@/components/cleaning/CleaningRoomCard';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function CleaningPage() {
  const { data: session } = useSession();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/rooms/assigned', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setRooms(data.rooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const updateRoomStatus = async (roomId: string, status: CleaningStatus) => {
    try {
      await fetch(`/api/rooms/${roomId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      setRooms(rooms.map(room => 
        room.id === roomId ? { ...room, status } : room
      ));
    } catch (error) {
      console.error('Error updating room status:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Assigned Rooms</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <CleaningRoomCard
            key={room.id}
            room={room}
            onStatusUpdate={updateRoomStatus}
          />
        ))}
      </div>

      {rooms.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No rooms assigned yet
        </div>
      )}
    </div>
  );
} 