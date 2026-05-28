// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO users (email, password) 
      VALUES (${email}, ${hashedPassword})
    `;

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'User already exists or server error' }, { status: 400 });
  }
}
