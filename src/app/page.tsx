import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth-server';

export default async function Home() {
  const token = cookies().get('auth_token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  try {
    const verified = await verifyToken(token);
    if (!verified) {
      redirect('/auth/login');
    }
  } catch (error) {
    redirect('/auth/login');
  }

  redirect('/dashboard');
} 