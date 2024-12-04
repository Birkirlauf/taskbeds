'use client';

import React from 'react';

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
    <div className="flex gap-4 mt-4">
      {wings.map(wing => (
        <button
          key={wing}
          className={`
            px-4 py-2 rounded-lg
            ${selectedWing === wing 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-800'
            }
          `}
          onClick={() => onWingSelect(wing)}
        >
          {wing}
        </button>
      ))}
    </div>
  );
} 