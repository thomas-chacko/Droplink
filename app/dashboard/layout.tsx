'use client';

import { useState } from 'react';
import { User, Link as LinkIcon, Palette, LogOut, X, LayoutDashboard, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const username = 'johndoe';

    const navItems = [
        { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
        { href: '/dashboard/profile', icon: User, label: 'Profile' },
        { href: '/dashboard/links', icon: LinkIcon, label: 'My Links' },
        { href: '/dashboard/theme', icon: Palette, label: 'Theme', isPro: true },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed md:static w-64 bg-white/5 backdrop-blur-sm border-r border-white/10 p-6 h-screen z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}>
                <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <LinkIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-xl font-bold text-white">Droplink</span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden text-white hover:bg-white/10 p-2 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive ? 'bg-white/20 text-white' : 'text-blue-200 hover:bg-white/10'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                                {item.isPro && (
                                    <span className="ml-auto text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded font-bold">PRO</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-200 hover:bg-white/10 transition mt-auto absolute bottom-6"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </Link>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="shrink-0 z-30 bg-white/10 backdrop-blur-md border-b border-white/20 px-4 md:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Left Side - Page Title */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="md:hidden text-white hover:bg-white/10 p-2 rounded-lg"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-white">
                                    {pathname === '/dashboard' && 'Dashboard Overview'}
                                    {pathname === '/dashboard/profile' && 'Profile Settings'}
                                    {pathname === '/dashboard/links' && 'My Links'}
                                    {pathname === '/dashboard/theme' && 'Theme Customization'}
                                </h1>
                                <p className="text-xs md:text-sm text-blue-200">
                                    {pathname === '/dashboard' && "Welcome back! Here's your performance summary"}
                                    {pathname === '/dashboard/profile' && 'Manage your public profile information'}
                                    {pathname === '/dashboard/links' && 'Add and manage your links'}
                                    {pathname === '/dashboard/theme' && 'Personalize your profile appearance'}
                                </p>
                            </div>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="font-semibold text-white text-sm">John Doe</p>
                                <p className="text-xs text-blue-200">@{username}</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
