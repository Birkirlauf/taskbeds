"use client";

import { useEffect, useState } from 'react';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { User } from '@/types';

export default function ManageCleaningPage() {
  const [staff, setStaff] = useState<User[]>([]);

  useEffect(() => {
    const fetchStaff = async () => {
      const response = await fetch('/api/staff');
      const data = await response.json();
      setStaff(data);
    };

    fetchStaff();
  }, []);

  return (
    <div>
      <h1>Manage Cleaning</h1>
      <ul>
        {staff.map((member) => (
          <li key={member.id}>{member.firstName} {member.lastName}</li>
        ))}
      </ul>
    </div>
  );
}
