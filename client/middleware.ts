import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import patientMiddleware from './middleware/patientMiddleware';
import adminMiddleware from './middleware/adminMiddleware';
import doctorMiddleware from './middleware/doctorMiddleware';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = patientMiddleware(request, pathname);
  if (response) return response;

  response = adminMiddleware(request, pathname);
  if (response) return response;

  response = doctorMiddleware(request, pathname);
  if (response) return response;

  return NextResponse.next();
}
