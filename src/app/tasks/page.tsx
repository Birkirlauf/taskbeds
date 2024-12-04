'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  CheckSquare, 
  Square, 
  Clock, 
  User, 
  Calendar, 
  AlertTriangle,
  Plus,
  Filter,
  Search,
  Building2,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo: string;
  dueDate: string;
  priority: 'High' | 'Normal' | 'Low';
  category: 'Maintenance' | 'Housekeeping' | 'Front Desk' | 'Kitchen' | 'Security' | 'IT';
  isCompleted: boolean;
  location?: string;
  floor?: string;
  room?: string;
  linkedIssue?: string;
  notes?: string[];
}

const initialTasks: Task[] = [
  // Maintenance Tasks
  {
    id: 'm1',
    title: 'Fix broken shower head in Room 402',
    description: 'Replace shower head and check water pressure',
    assignedTo: 'Mike Johnson',
    dueDate: '2024-01-10T15:00:00',
    priority: 'High',
    category: 'Maintenance',
    isCompleted: false,
    room: '402',
    floor: '4th Floor',
    location: 'Bathroom',
    linkedIssue: '1'
  },
  {
    id: 'm2',
    title: 'Monthly HVAC maintenance',
    description: 'Regular maintenance check of all HVAC units',
    assignedTo: 'David Brown',
    dueDate: '2024-01-15T10:00:00',
    priority: 'Normal',
    category: 'Maintenance',
    isCompleted: false,
    floor: 'All Floors'
  },

  // Housekeeping Tasks
  {
    id: 'h1',
    title: 'Deep clean Room 501 after water damage',
    description: 'Complete deep cleaning and sanitization required',
    assignedTo: 'Sarah Wilson',
    dueDate: '2024-01-08T14:00:00',
    priority: 'High',
    category: 'Housekeeping',
    isCompleted: false,
    room: '501',
    floor: '5th Floor',
    linkedIssue: '3'
  },

  // Security Tasks
  {
    id: 's1',
    title: 'Repair lobby security camera',
    description: 'Fix malfunctioning security camera at main entrance',
    assignedTo: 'John Smith',
    dueDate: '2024-01-09T11:00:00',
    priority: 'High',
    category: 'Security',
    isCompleted: false,
    location: 'Main Lobby',
    floor: 'Ground Floor',
    linkedIssue: '4'
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export default function TasksPage() {
  const searchParams = useSearchParams();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedCategory, setSelectedCategory] = useState<Task['category'] | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const issueId = searchParams.get('issue');

  useEffect(() => {
    if (issueId) {
      // In a real app, you would fetch the issue details and create a task
      // For now, just scroll to the linked task if it exists
      const linkedTask = tasks.find(task => task.linkedIssue === issueId);
      if (linkedTask) {
        const element = document.getElementById(`task-${linkedTask.id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          element.classList.add('ring-2', 'ring-blue-500');
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-blue-500');
          }, 2000);
        }
      }
    }
  }, [issueId, tasks]);

  const handleToggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const filteredTasks = tasks
    .filter(task => 
      selectedCategory === 'All' || task.category === selectedCategory
    )
    .filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.room?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const categories: Task['category'][] = [
    'Maintenance',
    'Housekeeping',
    'Front Desk',
    'Kitchen',
    'Security',
    'IT'
  ];

  const TaskItem = ({ task }: { task: Task }) => {
    const priorityColors = {
      High: 'text-red-600',
      Normal: 'text-blue-600',
      Low: 'text-green-600'
    };

    return (
      <div 
        id={`task-${task.id}`}
        className={`
          p-4 rounded-lg border transition-colors
          ${task.isCompleted 
            ? 'bg-green-50 border-green-200' 
            : 'bg-white border-gray-200 hover:border-blue-200'
          }
        `}
      >
        <div className="flex items-start gap-3">
          <button 
            onClick={() => handleToggleTask(task.id)}
            className="mt-1 text-gray-500 hover:text-gray-700"
          >
            {task.isCompleted ? (
              <CheckSquare className="w-5 h-5 text-green-600" />
            ) : (
              <Square className="w-5 h-5" />
            )}
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-medium ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.title}
              </h3>
              <span className={`text-xs ${priorityColors[task.priority]}`}>
                • {task.priority}
              </span>
              {task.linkedIssue && (
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <AlertCircle size={12} />
                  Linked Issue
                </span>
              )}
            </div>
            {task.description && (
              <p className={`text-sm mb-2 ${task.isCompleted ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User size={14} />
                <span>{task.assignedTo}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{formatDate(task.dueDate)}</span>
              </div>
              {(task.room || task.location) && (
                <div className="flex items-center gap-1">
                  <Building2 size={14} />
                  <span>
                    {task.floor}
                    {task.room && ` - Room ${task.room}`}
                    {task.location && ` - ${task.location}`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Hotel Tasks</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <CheckSquare size={14} />
                <span>Completed: {tasks.filter(t => t.isCompleted).length}</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertTriangle size={14} />
                <span>High Priority: {tasks.filter(t => t.priority === 'High').length}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>Due Today: {tasks.filter(t => 
                  new Date(t.dueDate).toDateString() === new Date().toDateString()
                ).length}</span>
              </div>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Task
          </button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Task['category'] | 'All')}
              className="pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <div className="space-y-4">
        {categories.map(category => {
          const categoryTasks = filteredTasks.filter(task => task.category === category);
          if (selectedCategory !== 'All' && category !== selectedCategory) return null;
          if (categoryTasks.length === 0) return null;

          return (
            <div key={category} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{category}</h2>
                <span className="text-sm text-gray-500">
                  {categoryTasks.filter(t => t.isCompleted).length} of {categoryTasks.length} completed
                </span>
              </div>
              <div className="space-y-3">
                {categoryTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 