// lib/db.ts
import { sql } from '@vercel/postgres';

export async function initDb() {
  // Creates a simple users table if it does not exist
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `;
}
