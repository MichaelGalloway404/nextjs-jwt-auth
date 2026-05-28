// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL('/login', request.url));
  // Clear cookie by setting expiration to zero
  response.cookies.set('token', '', { maxAge: 0 });
  return response;
}
