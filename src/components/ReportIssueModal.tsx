'use client';

import React, { useState } from 'react';
import { X, AlertCircle, Wrench, Droplets, Wifi, Thermometer, Plus } from 'lucide-react';
import { Room } from '@/types/types';

interface IssueCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const issueCategories: IssueCategory[] = [
  { id: 'maintenance', label: 'Maintenance', icon: Wrench, color: 'bg-orange-100 text-orange-800' },
  { id: 'plumbing', label: 'Plumbing', icon: Droplets, color: 'bg-blue-100 text-blue-800' },
  { id: 'wifi', label: 'WiFi/Network', icon: Wifi, color: 'bg-indigo-100 text-indigo-800' },
  { id: 'climate', label: 'Climate Control', icon: Thermometer, color: 'bg-green-100 text-green-800' },
];

interface ReportIssueModalProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { category: string; description: string; priority: string }) => void;
}

export default function ReportIssueModal({ room, isOpen, onClose, onSubmit }: ReportIssueModalProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('normal');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      category: selectedCategory,
      description,
      priority
    });
    // Reset form
    setSelectedCategory('');
    setDescription('');
    setPriority('normal');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-xl font-bold">Report Issue</h2>
            <p className="text-sm text-gray-500">Room {room.number}</p>
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
          {/* Issue Categories */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              {issueCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    flex items-center gap-2 p-3 rounded-lg border-2 transition-all
                    ${selectedCategory === category.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    {React.createElement(category.icon, { size: 18 })}
                  </div>
                  <span className="font-medium">{category.label}</span>
                </button>
              ))}
              <button
                type="button"
                className="flex items-center gap-2 p-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400"
              >
                <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
                  <Plus size={18} />
                </div>
                <span className="font-medium">Other</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Describe the issue in detail..."
              required
            />
          </div>

          {/* Priority */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <div className="flex gap-3">
              {['low', 'normal', 'high'].map((level) => (
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
                    onChange={(e) => setPriority(e.target.value)}
                    className="sr-only"
                  />
                  <AlertCircle size={16} className={
                    level === 'high' ? 'text-red-500' :
                    level === 'normal' ? 'text-yellow-500' :
                    'text-green-500'
                  } />
                  <span className="font-medium capitalize">{level}</span>
                </label>
              ))}
            </div>
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
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
} 