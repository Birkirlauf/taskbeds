import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rooms = await prisma.room.findMany({
      where: {
        assignedToId: session.user.id,
        status: {
          not: 'COMPLETED'
        }
      },
      orderBy: {
        number: 'asc'
      }
    });

    return NextResponse.json({ rooms });
  } catch (error) {
    console.error('Error fetching assigned rooms:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 