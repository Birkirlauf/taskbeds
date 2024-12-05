'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { X, AlertTriangle } from 'lucide-react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

interface CreateIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIssueCreated: (issue: any) => void;
}

export default function CreateIssueModal({
  isOpen,
  onClose,
  onIssueCreated
}: CreateIssueModalProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rooms, setRooms] = useState<Array<{ id: string; number: string }>>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [formData, setFormData] = useState({
    roomId: '',
    type: 'MAINTENANCE',
    description: '',
    priority: 'MEDIUM',
    location: '',
  });

  useEffect(() => {
    const fetchRooms = async () => {
      if (!session) return;

      try {
        setLoadingRooms(true);
        const response = await fetch('/api/rooms', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          router.push('/auth/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }

        const data = await response.json();
        setRooms(data.rooms);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError('Failed to load rooms. Please try again.');
      } finally {
        setLoadingRooms(false);
      }
    };

    if (isOpen) {
      fetchRooms();
    }
  }, [isOpen, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push('/auth/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        router.push('/auth/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create issue');
      }

      const data = await response.json();
      onIssueCreated(data.issue);
      onClose();
      setFormData({
        roomId: '',
        type: 'MAINTENANCE',
        description: '',
        priority: 'MEDIUM',
        location: '',
      });
    } catch (err) {
      console.error('Error creating issue:', err);
      setError(err instanceof Error ? err.message : 'Failed to create issue');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Report New Issue</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
            <AlertTriangle size={16} />
            <span>{error}</span>
          </div>
        )}

        {loadingRooms ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room
                </label>
                <select
                  required
                  value={formData.roomId}
                  onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a room</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      Room {room.number}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Type
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="HOUSEKEEPING">Housekeeping</option>
                  <option value="SECURITY">Security</option>
                  <option value="IT">IT</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  required
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Bathroom, Bedroom, etc."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <LoadingSpinner small />
                    <span>Creating...</span>
                  </>
                ) : (
                  'Create Issue'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 