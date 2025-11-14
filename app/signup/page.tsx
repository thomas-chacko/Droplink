'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Link2, Mail, Lock, User } from 'lucide-react';
import { FormEvent, useState } from 'react';
import Image from 'next/image';

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Mock signup - redirect to dashboard
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

            {/* Signup Form */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Create account</h1>
              <p className="text-blue-200 mb-8">Start sharing your links today</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition text-white placeholder-blue-300"
                      placeholder="johndoe"
                      required
                    />
                  </div>
                </div>

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
                  Create Account
                </button>
              </form>

              <p className="text-center text-blue-200 mt-6">
                Already have an account?{' '}
                <Link href="/login" className="text-yellow-400 font-semibold hover:text-yellow-300">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block flex-1 relative bg-white/5">
          <Image
            src="/images/signup.png"
            alt="Signup illustration"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
