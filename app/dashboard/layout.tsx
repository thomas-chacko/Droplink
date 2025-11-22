'use client';

import { useState } from 'react';
import { User, Link as LinkIcon, Palette, LogOut, X, LayoutDashboard, Menu, Smartphone, BarChart3, Settings } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { authServices } from '@/services/authServices';
import LogoImage from "@/public/images/logoImage.png";
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { useAuthStore } from '@/store/useAuthStore';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { installPWA, isInstallable } = usePWAInstall();
    const { user } = useAuthStore();

    const handleLogout = () => {
        authServices.logout();
        router.push('/login');
    };

    const navItems = [
        { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
        { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
        { href: '/dashboard/profile', icon: User, label: 'Profile' },
        { href: '/dashboard/links', icon: LinkIcon, label: 'My Links' },
        { href: '/dashboard/theme', icon: Palette, label: 'Theme', isPro: true },
    ];

    return (
        <ProtectedRoute redirectTo="/login">
            <div className="min-h-screen bg-[#0B1120] text-white flex font-sans selection:bg-blue-500/30">
                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside className={`fixed md:static w-72 bg-[#0F172A] border-r border-white/5 h-screen z-50 transition-transform duration-300 ease-out flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}>
                    <div className="flex items-center justify-between p-6 h-20 border-b border-white/5">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative h-10 w-auto transition-transform">
                                <Image
                                    src={LogoImage}
                                    alt="Droplink Logo"
                                    width={140}
                                    height={40}
                                    className="object-contain h-full w-auto"
                                    priority
                                />
                            </div>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="md:hidden text-slate-400 hover:text-white hover:bg-white/5 p-2 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
                        <nav className="space-y-1.5">
                            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Menu</p>
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                                            <span className="font-medium">{item.label}</span>
                                        </div>
                                        {item.isPro && (
                                            <span className="text-[10px] bg-gradient-to-r from-amber-400 to-orange-500 text-black px-2 py-0.5 rounded-full font-bold shadow-sm">PRO</span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="space-y-1.5">
                            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Account</p>
                            <Link
                                href="/dashboard/settings"
                                onClick={() => setSidebarOpen(false)}
                                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                    pathname === '/dashboard/settings'
                                        ? 'bg-slate-700 text-white'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <Settings className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                                <span className="font-medium">Settings</span>
                            </Link>
                            {isInstallable && (
                                <button
                                    onClick={installPWA}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all duration-200 group"
                                >
                                    <Smartphone className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                                    <span className="font-medium">Get App</span>
                                </button>
                            )}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
                            >
                                <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-400 transition-colors" />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-4 border-t border-white/5">
                        <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/10 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                                    {user?.username?.substring(0, 2).toUpperCase() || 'U'}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-medium text-white truncate">{user?.username || 'User'}</p>
                                    <p className="text-xs text-slate-400 truncate">{user?.isPremium ? 'Premium Plan' : 'Free Plan'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0B1120]">
                    {/* Header */}
                    <header className="h-20 shrink-0 z-30 bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/5 px-6 md:px-8 flex items-center justify-between sticky top-0">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="md:hidden text-slate-400 hover:text-white hover:bg-white/5 p-2 rounded-lg transition-colors"
                            >
                                <Menu className="w-6 h-6" />
                            </button>

                            <div className="flex flex-col">
                                <h1 className="text-xl font-bold text-white tracking-tight">
                                    {pathname === '/dashboard' && 'Dashboard'}
                                    {pathname === '/dashboard/analytics' && 'Analytics'}
                                    {pathname === '/dashboard/profile' && 'Profile'}
                                    {pathname === '/dashboard/links' && 'Links'}
                                    {pathname === '/dashboard/theme' && 'Theme'}
                                    {pathname === '/dashboard/settings' && 'Settings'}
                                </h1>
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <span>Overview</span>
                                    <span className="text-slate-600">/</span>
                                    <span className="text-blue-400">
                                        {pathname === '/dashboard' && 'Home'}
                                        {pathname === '/dashboard/analytics' && 'Insights'}
                                        {pathname === '/dashboard/profile' && 'Settings'}
                                        {pathname === '/dashboard/links' && 'Management'}
                                        {pathname === '/dashboard/theme' && 'Customization'}
                                        {pathname === '/dashboard/settings' && 'Account'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 pl-2">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[2px] ring-2 ring-black/20">
                                    <div className="w-full h-full rounded-full bg-[#0B1120] flex items-center justify-center">
                                        <span className="text-xs font-bold text-white">{user?.username?.substring(0, 2).toUpperCase() || 'U'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {/* <div className="max-w-6xl mx-auto"> */}
                            {children}
                        {/* </div> */}
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
