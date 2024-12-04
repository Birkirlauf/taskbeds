import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import { prisma } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const COOKIE_NAME = 'auth_token';

export async function createToken(userData: any): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET);
  const token = await new SignJWT({ ...userData })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);

  return token;
}

export async function verifyToken(token: string) {
  const secret = new TextEncoder().encode(JWT_SECRET);
  return await jwtVerify(token, secret);
}

export async function getCurrentUser() {
  try {
    const token = cookies().get(COOKIE_NAME)?.value;
    if (!token) return null;

    const verified = await verifyToken(token);
    const payload = verified.payload as any;

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      include: {
        hotel: true,
      },
    });

    if (!user) return null;

    const { password: _, ...userData } = user;
    return userData;
  } catch (error) {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 // 24 hours
  });
}

export async function clearAuthCookie() {
  cookies().delete(COOKIE_NAME);
} 