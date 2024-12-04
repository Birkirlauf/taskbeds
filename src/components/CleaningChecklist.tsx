'use client';

import React, { useState } from 'react';
import { CheckSquare, Square, Clock, User, Sparkles } from 'lucide-react';

interface ChecklistItem {
  id: string;
  task: string;
  isCompleted: boolean;
  category: 'bathroom' | 'bedroom' | 'general';
}

const defaultChecklist: ChecklistItem[] = [
  // Bathroom Tasks
  { id: 'b1', task: 'Clean and sanitize toilet', isCompleted: false, category: 'bathroom' },
  { id: 'b2', task: 'Clean shower/bathtub', isCompleted: false, category: 'bathroom' },
  { id: 'b3', task: 'Clean sink and counter', isCompleted: false, category: 'bathroom' },
  { id: 'b4', task: 'Replace towels', isCompleted: false, category: 'bathroom' },
  { id: 'b5', task: 'Restock toiletries', isCompleted: false, category: 'bathroom' },
  { id: 'b6', task: 'Clean mirrors', isCompleted: false, category: 'bathroom' },
  { id: 'b7', task: 'Empty trash', isCompleted: false, category: 'bathroom' },
  
  // Bedroom Tasks
  { id: 'r1', task: 'Make bed with fresh linens', isCompleted: false, category: 'bedroom' },
  { id: 'r2', task: 'Dust furniture', isCompleted: false, category: 'bedroom' },
  { id: 'r3', task: 'Vacuum carpet/floor', isCompleted: false, category: 'bedroom' },
  { id: 'r4', task: 'Clean windows and sills', isCompleted: false, category: 'bedroom' },
  { id: 'r5', task: 'Empty trash bins', isCompleted: false, category: 'bedroom' },
  
  // General Tasks
  { id: 'g1', task: 'Check and replace light bulbs', isCompleted: false, category: 'general' },
  { id: 'g2', task: 'Check TV and remote functionality', isCompleted: false, category: 'general' },
  { id: 'g3', task: 'Check AC/heating', isCompleted: false, category: 'general' },
  { id: 'g4', task: 'Check for maintenance issues', isCompleted: false, category: 'general' },
];

interface CleaningChecklistProps {
  roomNumber: string;
  roomType: string;
  assignedTo: string;
  startTime: string;
  onComplete: () => void;
}

export default function CleaningChecklist({
  roomNumber,
  roomType,
  assignedTo,
  startTime,
  onComplete
}: CleaningChecklistProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(defaultChecklist);
  const [notes, setNotes] = useState('');

  const handleToggleTask = (taskId: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === taskId ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const allTasksCompleted = checklist.every(item => item.isCompleted);

  const renderCategory = (category: 'bathroom' | 'bedroom' | 'general') => {
    const categoryTasks = checklist.filter(item => item.category === category);
    const categoryProgress = Math.round(
      (categoryTasks.filter(item => item.isCompleted).length / categoryTasks.length) * 100
    );

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-900 capitalize">{category}</h3>
          <span className="text-sm text-gray-500">{categoryProgress}% complete</span>
        </div>
        <div className="space-y-2">
          {categoryTasks.map(item => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                item.isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
              }`}
              onClick={() => handleToggleTask(item.id)}
            >
              <button className="text-gray-500 hover:text-gray-700">
                {item.isCompleted ? (
                  <CheckSquare className="w-5 h-5 text-green-600" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </button>
              <span className={`flex-1 ${item.isCompleted ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                {item.task}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold mb-1">Room {roomNumber}</h2>
            <p className="text-sm text-gray-600">{roomType}</p>
          </div>
          <div className="text-sm text-gray-600">
            <div className="flex items-center gap-2 mb-1">
              <User size={14} />
              <span>{assignedTo}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{new Date(startTime).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all"
            style={{
              width: `${Math.round(
                (checklist.filter(item => item.isCompleted).length / checklist.length) * 100
              )}%`
            }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="p-6">
        {renderCategory('bathroom')}
        {renderCategory('bedroom')}
        {renderCategory('general')}

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Add any notes about the room condition..."
          />
        </div>

        {/* Complete Button */}
        <button
          onClick={onComplete}
          disabled={!allTasksCompleted}
          className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 ${
            allTasksCompleted
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Sparkles size={16} />
          {allTasksCompleted ? 'Mark Room as Clean' : 'Complete All Tasks to Finish'}
        </button>
      </div>
    </div>
  );
} 