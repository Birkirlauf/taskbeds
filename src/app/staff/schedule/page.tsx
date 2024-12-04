'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Users,
  AlertCircle,
  Calendar,
  Plus
} from 'lucide-react';

interface StaffShift {
  id: string;
  staffId: string;
  staffName: string;
  role: string;
  date: string;
  shift: 'morning' | 'afternoon' | 'night';
  area?: string;
}

const mockShifts: StaffShift[] = [
  {
    id: '1',
    staffId: '1',
    staffName: 'John Doe',
    role: 'Housekeeping',
    date: '2024-01-08',
    shift: 'morning',
    area: '3rd Floor'
  },
  {
    id: '2',
    staffId: '2',
    staffName: 'Mike Johnson',
    role: 'Maintenance',
    date: '2024-01-08',
    shift: 'morning'
  },
  {
    id: '3',
    staffId: '3',
    staffName: 'Sarah Wilson',
    role: 'Housekeeping',
    date: '2024-01-08',
    shift: 'afternoon',
    area: '4th Floor'
  }
  // Add more mock shifts as needed
];

export default function StaffSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [shifts, setShifts] = useState<StaffShift[]>(mockShifts);

  const getWeekDates = (date: Date) => {
    const week = [];
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay()); // Start from Sunday

    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(currentDate);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getShiftsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return shifts.filter(shift => shift.date === dateStr);
  };

  const ShiftCard = ({ shift }: { shift: StaffShift }) => {
    const shiftColors = {
      morning: 'bg-yellow-50 border-yellow-200',
      afternoon: 'bg-blue-50 border-blue-200',
      night: 'bg-purple-50 border-purple-200'
    };

    const shiftTimes = {
      morning: '6:00 AM - 2:00 PM',
      afternoon: '2:00 PM - 10:00 PM',
      night: '10:00 PM - 6:00 AM'
    };

    return (
      <div className={`p-3 rounded-lg border ${shiftColors[shift.shift]} mb-2`}>
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium">{shift.staffName}</span>
          <span className="text-xs text-gray-600">{shift.role}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock size={14} />
          <span>{shiftTimes[shift.shift]}</span>
        </div>
        {shift.area && (
          <div className="text-sm text-gray-600 mt-1">
            Area: {shift.area}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Staff Schedule</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span>Staff on Duty Today: {getShiftsForDate(new Date()).length}</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertCircle size={14} />
                <span>Upcoming Shift Changes: 2</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Calendar size={16} />
              Month View
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus size={16} />
              Add Shift
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-medium">
              {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
            </span>
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-7 gap-4">
        {weekDates.map((date, index) => (
          <div key={index} className="min-h-[600px]">
            <div className={`
              p-2 rounded-t-lg text-center mb-2
              ${isToday(date) ? 'bg-blue-50 text-blue-600' : 'bg-gray-50'}
            `}>
              <div className="font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div className="text-sm">{date.getDate()}</div>
            </div>
            <div className="space-y-2">
              {getShiftsForDate(date).map(shift => (
                <ShiftCard key={shift.id} shift={shift} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 