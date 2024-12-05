import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received signup request:", { ...body, password: '[REDACTED]' });
    
    const { firstName, lastName, email, password, phoneNumber, hotelName, hotelAddress } = body;

    if (!firstName || !lastName || !email || !password || !phoneNumber || !hotelName || !hotelAddress) {
      console.log("Missing fields:", { 
        firstName: !!firstName,
        lastName: !!lastName,
        email: !!email,
        password: !!password,
        phoneNumber: !!phoneNumber,
        hotelName: !!hotelName,
        hotelAddress: !!hotelAddress
      });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists:", email);
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    console.log("Creating hotel...");
    // Create hotel
    const hotel = await prisma.hotel.create({
      data: {
        name: hotelName,
        address: hotelAddress,
        phone: phoneNumber,
      },
    });
    console.log("Hotel created:", hotel.id);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Creating user...");
    // Create user with proper schema fields
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        role: "MANAGER",
        status: "ACTIVE",
        hotelId: hotel.id,
      },
    });
    console.log("User created:", user.id);

    return NextResponse.json(
      { 
        message: "Account created successfully",
        userId: user.id,
        hotelId: hotel.id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    // Return more specific error message
    return NextResponse.json(
      { 
        error: "Error creating account",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 