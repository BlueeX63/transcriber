import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const session = request.cookies.get('admin_session')?.value;

  // Protect all routes except login, public home, and auth APIs
  const isAuthRoute = request.nextUrl.pathname.startsWith('/api/auth');
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isPublicRoute = request.nextUrl.pathname === '/';

  if (!session && !isAuthRoute && !isLoginPage && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session) {
    try {
      await decrypt(session);
      // If logged in and trying to access login page, redirect to home
      if (isLoginPage) {
        return NextResponse.redirect(new URL('/home', request.url));
      }
    } catch (e) {
      // Invalid session, delete cookie and redirect to login if not public
      if (!isAuthRoute && !isLoginPage && !isPublicRoute) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('admin_session');
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
