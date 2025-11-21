'use client';

import { Eye, MousePointerClick, BarChart3, TrendingUp, Users, Copy, ArrowUpRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function DashboardPage() {
  const [copied, setCopied] = useState(false);
  const username = 'johndoe';

  const copyProfileUrl = () => {
    navigator.clipboard.writeText(`droplink.com/${username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Overview</h2>
          <p className="text-slate-400">Here's what's happening with your links today.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${username}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] hover:bg-[#334155] rounded-lg border border-white/5 text-slate-200 font-medium transition-all hover:text-white group"
          >
            <Eye className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            <span>Preview Profile</span>
          </Link>

          <button
            onClick={copyProfileUrl}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-all shadow-lg shadow-blue-900/20"
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? 'Copied!' : 'Copy URL'}</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
              <Eye className="w-5 h-5 text-blue-400" />
            </div>
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium bg-emerald-400/10 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              +12%
            </span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">2,847</p>
          <p className="text-sm text-slate-400">Total Views</p>
        </div>

        <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
              <MousePointerClick className="w-5 h-5 text-purple-400" />
            </div>
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium bg-emerald-400/10 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              +8%
            </span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">1,234</p>
          <p className="text-sm text-slate-400">Total Clicks</p>
        </div>

        <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xs text-slate-400 font-medium">Avg. CTR</span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">43.4%</p>
          <p className="text-sm text-slate-400">Click Rate</p>
        </div>

        <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors">
              <Users className="w-5 h-5 text-orange-400" />
            </div>
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium bg-emerald-400/10 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              +24%
            </span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">892</p>
          <p className="text-sm text-slate-400">New Visitors</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1E293B]/50 backdrop-blur-sm rounded-xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Top Performing Links</h3>
            <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">View All</button>
          </div>
          <div className="p-6 space-y-4">
            {[
              { title: 'My Portfolio Website', url: 'portfolio.com', clicks: 456, ctr: '52%' },
              { title: 'Instagram Profile', url: 'instagram.com/johndoe', clicks: 389, ctr: '45%' },
              { title: 'YouTube Channel', url: 'youtube.com/@johndoe', clicks: 234, ctr: '38%' },
            ].map((link, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#0B1120]/50 rounded-xl border border-white/5 hover:border-white/10 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-white group-hover:text-blue-400 transition-colors">{link.title}</p>
                    <p className="text-xs text-slate-500">{link.url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-white">{link.clicks}</p>
                    <p className="text-xs text-slate-500">Clicks</p>
                  </div>
                  <div className="text-right w-16">
                    <div className="flex items-center justify-end gap-1 text-emerald-400 text-sm font-medium">
                      <TrendingUp className="w-3 h-3" />
                      {link.ctr}
                    </div>
                    <p className="text-xs text-slate-500">CTR</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              href="/dashboard/links"
              className="group flex items-center justify-between p-4 bg-[#0B1120]/50 hover:bg-blue-600/10 rounded-xl border border-white/5 hover:border-blue-500/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-white group-hover:text-blue-400 transition-colors">Add New Link</p>
                  <p className="text-xs text-slate-500">Create a new link for your profile</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
            </Link>

            <Link
              href="/dashboard/theme"
              className="group flex items-center justify-between p-4 bg-[#0B1120]/50 hover:bg-purple-600/10 rounded-xl border border-white/5 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-white group-hover:text-purple-400 transition-colors">Customize Theme</p>
                  <p className="text-xs text-slate-500">Update your profile appearance</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
            </Link>

            <Link
              href="/dashboard/profile"
              className="group flex items-center justify-between p-4 bg-[#0B1120]/50 hover:bg-emerald-600/10 rounded-xl border border-white/5 hover:border-emerald-500/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-white group-hover:text-emerald-400 transition-colors">Edit Profile</p>
                  <p className="text-xs text-slate-500">Update bio and social links</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20">
              <h4 className="font-medium text-white mb-1">Upgrade to Pro</h4>
              <p className="text-xs text-slate-400 mb-3">Get access to advanced analytics and custom themes.</p>
              <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-blue-900/20">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function User({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function Palette({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  )
}
