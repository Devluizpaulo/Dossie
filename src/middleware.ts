import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from 'firebase-admin';

// This middleware is now responsible for redirecting based on auth state
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // This is a placeholder. In a real Firebase setup, you'd check a session cookie.
    // For now, we'll assume a cookie named 'auth_token' exists if the user is authenticated.
    const isAuthenticated = request.cookies.has('firebase-auth-token'); 

    // Allow access to login page and internal Next.js/static assets
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
