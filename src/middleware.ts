import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/', '/anexo-1', '/anexo-2', '/anexo-3', '/anexo-4', '/anexo-5'];
const PUBLIC_ROUTES = ['/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('firebase-session');

  const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (!sessionToken && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (sessionToken && isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|Image).*)',
  ],
};
