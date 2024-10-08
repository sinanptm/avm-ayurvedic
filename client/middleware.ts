import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/doctor') {
    return NextResponse.redirect(new URL('/doctor/slots', request.url));
  }
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  const patientToken = request.cookies.get("patientToken")?.value;

  if (patientToken) {
    if (
      pathname === '/signin' ||
      pathname === '/signup' ||
      pathname === '/signin/opt-verification' ||
      pathname === '/signin/reset-password'
    ) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
  } else {
    if (
      pathname === '/profile' ||
      pathname === '/appointments' ||
      pathname === '/register'
    ) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
  }


  return NextResponse.next();
}
