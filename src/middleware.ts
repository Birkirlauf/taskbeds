import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth-server';

// List of paths that don't require authentication
const publicPaths = [
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
  '/terms',
  '/privacy',
  '/contact'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is public
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // For API routes, let them handle their own authentication
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check for authentication token
  try {
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      // If no token and trying to access root, redirect to login
      if (pathname === '/') {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
      
      // For other protected routes, redirect to login with return URL
      const encodedPath = encodeURIComponent(pathname);
      return NextResponse.redirect(new URL(`/auth/login?returnUrl=${encodedPath}`, request.url));
    }

    // Verify token
    const verified = await verifyToken(token);
    if (!verified) {
      throw new Error('Invalid token');
    }

    // If accessing login page with valid token, redirect to dashboard
    if (pathname === '/auth/login' || pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // If token is invalid, clear it and redirect to login
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('auth_token');
    return response;
  }
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|logo.png|public).*)',
  ],
}; 