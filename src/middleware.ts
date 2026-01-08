import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from 'firebase-admin';

// This middleware is now responsible for redirecting based on auth state
// It will be more complex once we have Firebase Auth integrated
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // This is a placeholder. We will need to check for a valid Firebase session cookie.
    const isAuthenticated = false; // Replace with actual Firebase Auth check

    // Allow access to login page and static assets
    if (pathname.startsWith('/login') || pathname.startsWith('/_next/') || pathname.startsWith('/Image/')) {
        return NextResponse.next();
    }

    if (!isAuthenticated && pathname !== '/login') {
       return NextResponse.redirect(new URL('/login', request.url));
    }
    
    if (isAuthenticated && pathname === '/login') {
       return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
