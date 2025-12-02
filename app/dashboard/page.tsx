'use client';

import { Eye, Copy, ArrowUpRight, TrendingUp, MousePointerClick, Link2, Users, Settings, Crown, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { LIVE_URL } from '@/constants/constant';

export default function DashboardPage() {
  const [copied, setCopied] = useState(false);
  const { user } = useAuthStore();
  const username = user?.username || 'user';
  const isPremium = user?.isPremium || false;

  const copyProfileUrl = () => {
    navigator.clipboard.writeText(`${LIVE_URL}/${username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Welcome back, {user?.username || 'User'}!</h2>
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
            className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-all shadow-lg shadow-blue-900/20"
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? 'Copied!' : 'Copy URL'}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Eye className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12%
            </span>
          </div>
          <p className="text-2xl font-bold text-white">1,234</p>
          <p className="text-sm text-slate-400">Profile Views</p>
        </div>

        <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <MousePointerClick className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8%
            </span>
          </div>
          <p className="text-2xl font-bold text-white">567</p>
          <p className="text-sm text-slate-400">Link Clicks</p>
        </div>

        <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <Link2 className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">8</p>
          <p className="text-sm text-slate-400">Active Links</p>
        </div>

        <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Users className="w-5 h-5 text-orange-400" />
            </div>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +24%
            </span>
          </div>
          <p className="text-2xl font-bold text-white">89</p>
          <p className="text-sm text-slate-400">Unique Visitors</p>
        </div>
      </div>

      {/* Quick Actions and Upgrade Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-[#1E293B]/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-2 gap-4">
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

            <Link
              href="/dashboard/settings"
              className="group flex items-center justify-between p-4 bg-[#0B1120]/50 hover:bg-slate-600/10 rounded-xl border border-white/5 hover:border-slate-500/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-500/10 text-slate-400 group-hover:bg-slate-500 group-hover:text-white transition-colors">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-white group-hover:text-slate-400 transition-colors">Settings</p>
                  <p className="text-xs text-slate-500">Manage your account</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-slate-400 transition-colors" />
            </Link>
          </div>
        </div>

        {/* Upgrade Card for non-premium / Premium Status for premium users */}
        {!isPremium ? (
          <div className="bg-linear-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 flex flex-col">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full mb-4">
                <span className="text-xs font-semibold text-blue-300">✨ PRO</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Upgrade to Pro</h3>
              <p className="text-sm text-slate-300 mb-4">
                Unlock advanced features and take your profile to the next level.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  Custom themes & colors
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  Advanced analytics
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                  Priority support
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                  Remove branding
                </li>
              </ul>
            </div>
            <button className="w-full px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50">
              Upgrade Now
            </button>
          </div>
        ) : (
          <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl border border-white/5 p-6 flex flex-col">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full mb-4">
                <Crown className="w-3 h-3 text-blue-300" />
                <span className="text-xs font-semibold text-blue-300">PRO MEMBER</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">You're a Pro!</h3>
              <p className="text-sm text-slate-400 mb-4">
                Thanks for supporting us. Enjoy all premium features!
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 bg-[#0B1120]/50 rounded-lg border border-white/5">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Custom Themes</p>
                    <p className="text-xs text-slate-500">Unlocked</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#0B1120]/50 rounded-lg border border-white/5">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Advanced Analytics</p>
                    <p className="text-xs text-slate-500">Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#0B1120]/50 rounded-lg border border-white/5">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <Crown className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Priority Support</p>
                    <p className="text-xs text-slate-500">Available 24/7</p>
                  </div>
                </div>
              </div>
            </div>
            <Link
              href="/dashboard/settings"
              className="w-full px-6 py-3 bg-[#0B1120]/50 hover:bg-blue-600/10 border border-white/5 hover:border-blue-500/50 text-white font-semibold rounded-lg transition-all text-center"
            >
              Manage Subscription
            </Link>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-3 bg-[#0B1120]/50 rounded-lg border border-white/5">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <MousePointerClick className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Someone clicked your Portfolio link</p>
              <p className="text-xs text-slate-500">2 minutes ago</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-[#0B1120]/50 rounded-lg border border-white/5">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <Eye className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">New profile view from United States</p>
              <p className="text-xs text-slate-500">15 minutes ago</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-[#0B1120]/50 rounded-lg border border-white/5">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Link2 className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">You added a new link: GitHub Profile</p>
              <p className="text-xs text-slate-500">1 hour ago</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-[#0B1120]/50 rounded-lg border border-white/5">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Users className="w-4 h-4 text-orange-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">5 new visitors from social media</p>
              <p className="text-xs text-slate-500">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-linear-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-2">💡 Pro Tip</h3>
        <p className="text-slate-300 text-sm mb-4">
          Add a custom bio and profile picture to increase engagement by up to 40%. Visitors are more likely to click your links when they know who you are!
        </p>
        <Link
          href="/dashboard/profile"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
        >
          Complete your profile
          <ArrowUpRight className="w-4 h-4" />
        </Link>
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
