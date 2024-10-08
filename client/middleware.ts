import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  if (pathname === '/doctor') {
    return NextResponse.redirect(new URL("/doctor/slots", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', "/doctor/:path"],
};
