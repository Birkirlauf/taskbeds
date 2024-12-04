import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create hotel
  const hotel = await prisma.hotel.create({
    data: {
      name: 'Grand Hotel',
      address: '123 Main Street, City',
      email: 'info@grandhotel.com',
      phone: '+1 (555) 123-4567',
    },
  });

  // Create manager account
  const hashedPassword = await bcrypt.hash('password123', 12);
  const manager = await prisma.user.create({
    data: {
      email: 'manager@test.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'MANAGER',
      hotelId: hotel.id,
    },
  });

  // Create some rooms
  const rooms = await Promise.all([
    prisma.room.create({
      data: {
        number: '101',
        type: 'STANDARD',
        status: 'VACANT',
        floor: 1,
        hotelId: hotel.id,
      },
    }),
    prisma.room.create({
      data: {
        number: '102',
        type: 'DELUXE',
        status: 'OCCUPIED',
        floor: 1,
        hotelId: hotel.id,
      },
    }),
    prisma.room.create({
      data: {
        number: '201',
        type: 'SUITE',
        status: 'CLEANING',
        floor: 2,
        hotelId: hotel.id,
      },
    }),
  ]);

  // Create some staff members
  const staff = await Promise.all([
    prisma.user.create({
      data: {
        email: 'staff1@test.com',
        password: hashedPassword,
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'STAFF',
        hotelId: hotel.id,
      },
    }),
    prisma.user.create({
      data: {
        email: 'staff2@test.com',
        password: hashedPassword,
        firstName: 'Mike',
        lastName: 'Johnson',
        role: 'STAFF',
        hotelId: hotel.id,
      },
    }),
  ]);

  // Create some tasks
  await Promise.all([
    prisma.task.create({
      data: {
        title: 'Clean Room 201',
        description: 'Regular cleaning and bed making',
        status: 'PENDING',
        priority: 'HIGH',
        hotelId: hotel.id,
        roomId: rooms[2].id,
        userId: staff[0].id,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Restock Room 101',
        description: 'Restock minibar and toiletries',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        hotelId: hotel.id,
        roomId: rooms[0].id,
        userId: staff[1].id,
      },
    }),
  ]);

  console.log('Test data has been created!');
  console.log('Manager login:');
  console.log('Email: manager@test.com');
  console.log('Password: password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 