// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black font-sans px-4">
      <main className="flex flex-col items-center text-center max-w-xl p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
          Michaels Next Big App
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          A secure starter application built with Next.js App Router, JWT authentication, and Vercel Postgres storage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/login"
            className="flex h-12 items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 transition-colors shadow-sm min-w-[140px]"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="flex h-12 items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-medium px-6 transition-colors min-w-[140px]"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
