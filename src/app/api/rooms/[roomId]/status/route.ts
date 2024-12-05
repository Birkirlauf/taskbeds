import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status } = await request.json();
    const { roomId } = params;

    const room = await prisma.room.findUnique({
      where: { id: roomId }
    });

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    if (room.assignedToId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: { 
        status,
        lastCleaned: status === 'COMPLETED' ? new Date() : undefined
      }
    });

    return NextResponse.json({ room: updatedRoom });
  } catch (error) {
    console.error('Error updating room status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 