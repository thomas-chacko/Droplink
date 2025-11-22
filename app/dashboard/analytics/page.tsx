'use client';

import { Calendar, TrendingUp, Globe, MousePointerClick, Eye, Users, Clock, Smartphone, Monitor, Tablet } from 'lucide-react';
import { useState } from 'react';

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState('7d');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Analytics</h2>
                    <p className="text-slate-400">Detailed insights about your profile performance</p>
                </div>
                <div className="flex gap-2">
                    {['24h', '7d', '30d', '90d'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${timeRange === range
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                : 'bg-[#1E293B] text-slate-400 hover:text-white hover:bg-[#334155]'
                                }`}
                        >
                            {range === '24h' ? 'Today' : range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-5 border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Eye className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-xs text-emerald-400 font-medium">+12.5%</span>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">12,847</p>
                    <p className="text-sm text-slate-400">Profile Views</p>
                </div>

                <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-5 border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <MousePointerClick className="w-5 h-5 text-purple-400" />
                        </div>
                        <span className="text-xs text-emerald-400 font-medium">+8.3%</span>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">5,234</p>
                    <p className="text-sm text-slate-400">Link Clicks</p>
                </div>

                <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-5 border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <Users className="w-5 h-5 text-emerald-400" />
                        </div>
                        <span className="text-xs text-emerald-400 font-medium">+24.1%</span>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">3,892</p>
                    <p className="text-sm text-slate-400">Unique Visitors</p>
                </div>

                <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-5 border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                            <Clock className="w-5 h-5 text-orange-400" />
                        </div>
                        <span className="text-xs text-slate-400">Avg. Time</span>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">2m 34s</p>
                    <p className="text-sm text-slate-400">Time on Page</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Traffic Chart */}
                <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Traffic Overview</h3>
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="h-64 flex items-end justify-between gap-3 px-2">
                        {[65, 45, 78, 52, 88, 72, 95].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3">
                                <div
                                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg relative group cursor-pointer hover:from-blue-500 hover:to-blue-300 transition-all shadow-lg shadow-blue-900/30"
                                    style={{ height: `${height}%`, minHeight: '20px' }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 px-2.5 py-1.5 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-white/10">
                                        {Math.floor(height * 50)} views
                                    </div>
                                </div>
                                <span className="text-xs text-slate-400 font-medium">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Device Breakdown */}
                <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Device Breakdown</h3>
                    <div className="space-y-4">
                        {[
                            { icon: Smartphone, label: 'Mobile', percentage: 62, colorClass: 'bg-blue-500' },
                            { icon: Monitor, label: 'Desktop', percentage: 28, colorClass: 'bg-purple-500' },
                            { icon: Tablet, label: 'Tablet', percentage: 10, colorClass: 'bg-emerald-500' },
                        ].map((device, i) => {
                            const Icon = device.icon;
                            return (
                                <div key={i}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <Icon className="w-5 h-5 text-slate-400" />
                                            <span className="text-sm font-medium text-white">{device.label}</span>
                                        </div>
                                        <span className="text-sm font-semibold text-white">{device.percentage}%</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${device.colorClass} rounded-full transition-all duration-500`}
                                            style={{ width: `${device.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Geographic Data & Top Referrers */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Top Locations */}
                <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Top Locations</h3>
                        <Globe className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="space-y-3">
                        {[
                            { country: 'United States', flag: '🇺🇸', visitors: 1234, percentage: 42 },
                            { country: 'United Kingdom', flag: '🇬🇧', visitors: 856, percentage: 29 },
                            { country: 'Canada', flag: '🇨🇦', visitors: 512, percentage: 17 },
                            { country: 'Germany', flag: '🇩🇪', visitors: 234, percentage: 8 },
                            { country: 'Australia', flag: '🇦🇺', visitors: 118, percentage: 4 },
                        ].map((location, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-[#0B1120]/50 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{location.flag}</span>
                                    <div>
                                        <p className="text-sm font-medium text-white">{location.country}</p>
                                        <p className="text-xs text-slate-500">{location.visitors} visitors</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-white">{location.percentage}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Referrers */}
                <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Top Referrers</h3>
                        <Calendar className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="space-y-3">
                        {[
                            { source: 'Instagram', visits: 2456, percentage: 38 },
                            { source: 'Twitter', visits: 1823, percentage: 28 },
                            { source: 'Direct', visits: 1234, percentage: 19 },
                            { source: 'Google', visits: 678, percentage: 10 },
                            { source: 'Facebook', visits: 312, percentage: 5 },
                        ].map((referrer, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-[#0B1120]/50 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                <div>
                                    <p className="text-sm font-medium text-white">{referrer.source}</p>
                                    <p className="text-xs text-slate-500">{referrer.visits} visits</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-white">{referrer.percentage}%</p>
                                    <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                                        <div
                                            className="h-full bg-purple-500 rounded-full"
                                            style={{ width: `${referrer.percentage * 2.5}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
