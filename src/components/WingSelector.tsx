'use client';

import React from 'react';
import { Building } from 'lucide-react';

interface WingSelectorProps {
  wings: string[];
  selectedWing: string;
  onWingSelect: (wing: string) => void;
}

export default function WingSelector({ 
  wings, 
  selectedWing, 
  onWingSelect 
}: WingSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Building className="h-5 w-5 text-gray-400" />
        <h2 className="text-base sm:text-lg font-medium text-gray-900">Select Wing</h2>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        {wings.map(wing => (
          <button
            key={wing}
            onClick={() => onWingSelect(wing)}
            className={`
              px-4 py-2 sm:py-3 rounded-lg
              font-medium text-sm
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${selectedWing === wing 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            {wing}
          </button>
        ))}
      </div>
    </div>
  );
} 