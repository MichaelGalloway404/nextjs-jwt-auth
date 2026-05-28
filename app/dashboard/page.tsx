// app/dashboard/page.tsx
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const user = token ? await verifyToken(token) : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="p-8 bg-white border shadow-lg rounded-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back!</h1>
        <p className="text-gray-600 mb-6">You have successfully bypassed the JWT middleware barrier.</p>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-left mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Authenticated As</p>
          <p className="text-sm font-mono text-blue-600 font-bold break-all">{user?.email}</p>
        </div>
        <a 
          href="/api/auth/logout" 
          className="inline-block w-full py-2.5 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors shadow-sm"
        >
          Disconnect Session
        </a>
      </div>
    </div>
  );
}
