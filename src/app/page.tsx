import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function Home() {
  const user = await auth.getCurrentUser();

  if (!user) {
    redirect('/auth/login');
  }

  redirect('/dashboard');
} 