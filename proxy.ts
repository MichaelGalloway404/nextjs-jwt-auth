// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

// Renamed from middleware to proxy
export async function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const verifiedToken = token ? await verifyToken(token) : null;

  if (request.nextUrl.pathname.startsWith('/dashboard') && !verifiedToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') && verifiedToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Corrected: Tells Next.js to continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
