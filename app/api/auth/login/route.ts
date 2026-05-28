// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { createToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Query the database for the user
    const { rows } = await sql`SELECT * FROM usersX WHERE email = ${email}`;
    
    // CORRECTED: Extract the single user object from the rows array
    const user = rows[0];

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Pass the correct user properties to the token generator
    const token = await createToken({ id: user.id, email: user.email });

    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
    
    // Set JWT inside a secure, HTTP-only cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7200, // 2 hours
    });

    return response;
  } catch (error: any) {
    // Helpful log to see if any other runtime crashes occur
    console.error("Login API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
