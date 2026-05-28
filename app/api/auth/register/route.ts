// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO usersX (email, password) 
      VALUES (${email}, ${hashedPassword})
    `;

    alert("Success!");
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error: any) {
    // This logs the exact database issue directly to your terminal
    console.error("Registration DB Error:", error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 400 });
  }
}
