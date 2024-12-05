import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || 
                    req.nextUrl.pathname.startsWith('/signup') ||
                    req.nextUrl.pathname.startsWith('/forgot-password');

  if (isAuthPage) {
    if (req.auth) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }

  if (!req.auth) {
    let from = req.nextUrl.pathname;
    if (from === '/') from = '/dashboard';
    const url = new URL('/login', req.url);
    url.searchParams.set('from', from);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};