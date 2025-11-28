'use client'

import Link from 'next/link'
import { Home, ArrowLeft, Link2 } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-blue-500/20 rounded-full animate-spin-slow"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
                {/* 404 Number with Icon */}
                <div className="mb-8 relative">
                    <h1 className="text-9xl md:text-[12rem] font-bold text-white/10 select-none">404</h1>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-400/30">
                            <Link2 className="w-12 h-12 text-blue-400" />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Oops! Link Not Found
                </h2>

                {/* Description */}
                <p className="text-xl text-blue-200 mb-12 max-w-2xl leading-relaxed">
                    The page you're looking for seems to have wandered off.
                    <br className="hidden md:block" />
                    Let's get you back to connecting your links!
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 text-lg font-bold rounded-xl hover:bg-blue-50 transition shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transform"
                    >
                        <Home className="w-5 h-5" />
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center cursor-pointer gap-2 px-8 py-4 bg-blue-500/20 text-white text-lg font-bold rounded-xl hover:bg-blue-500/30 transition border border-blue-400/30 backdrop-blur-sm hover:scale-105 transform"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </div>

                {/* Additional Info */}
                <div className="mt-16 text-blue-300/60 text-sm">
                    Error Code: 404 - Page Not Found
                </div>
            </div>
        </div>
    )
}
