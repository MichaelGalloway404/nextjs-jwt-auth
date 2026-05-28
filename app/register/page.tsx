// app/register/page.tsx
'use strict';
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) router.push('/login');
    else alert('Registration failed');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleRegister} className="p-6 bg-gray-100 rounded shadow-md w-80">
        <h2 className="mb-4 text-xl font-bold">Register</h2>
        <input type="email" placeholder="Email" className="w-full p-2 mb-3 border text-black" onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 border text-black" onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Sign Up</button>
      </form>
    </div>
  );
}
