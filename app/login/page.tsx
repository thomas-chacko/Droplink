'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Link2, Mail, Lock } from 'lucide-react';
import { FormEvent, useState } from 'react';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Mock login - redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="h-screen overflow-hidden bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 flex">
      <div className="flex flex-col lg:flex-row w-full h-full">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
          <div className="w-full max-w-md">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                <Link2 className="w-6 h-6 text-gray-900" />
              </div>
              <span className="text-2xl font-bold text-white">Droplink</span>
            </Link>

            {/* Login Form */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Welcome back</h1>
              <p className="text-blue-200 mb-8">Login to manage your links</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition text-white placeholder-blue-300"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition text-white placeholder-blue-300"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 transition shadow-lg hover:shadow-xl"
                >
                  Login
                </button>
              </form>

              <p className="text-center text-blue-200 mt-6">
                Don't have an account?{' '}
                <Link href="/signup" className="text-yellow-400 font-semibold hover:text-yellow-300">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block flex-1 relative bg-white/5">
          <Image
            src="/images/login.png"
            alt="Login illustration"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
