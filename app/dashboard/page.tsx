'use client';

import { Eye, MousePointerClick, BarChart3, TrendingUp, Users, Copy } from 'lucide-react';
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
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link 
          href={`/${username}`}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl border border-white/20 text-white font-medium transition"
        >
          <Eye className="w-4 h-4" />
          <span>Preview Profile</span>
        </Link>
        
        <button 
          onClick={copyProfileUrl}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl border border-white/20 text-white font-medium transition"
        >
          <Copy className="w-4 h-4" />
          <span>{copied ? 'Copied!' : 'Copy URL'}</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Eye className="w-5 h-5 text-blue-300" />
            </div>
            <span className="text-xs text-green-300 font-medium">+12%</span>
          </div>
          <p className="text-2xl font-bold text-white mb-1">2,847</p>
          <p className="text-sm text-blue-200">Profile Views</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <MousePointerClick className="w-5 h-5 text-purple-300" />
            </div>
            <span className="text-xs text-green-300 font-medium">+8%</span>
          </div>
          <p className="text-2xl font-bold text-white mb-1">1,234</p>
          <p className="text-sm text-blue-200">Link Clicks</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <BarChart3 className="w-5 h-5 text-green-300" />
            </div>
            <span className="text-xs text-blue-200 font-medium">43.4% CTR</span>
          </div>
          <p className="text-2xl font-bold text-white mb-1">5</p>
          <p className="text-sm text-blue-200">Active Links</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Users className="w-5 h-5 text-orange-300" />
            </div>
            <span className="text-xs text-green-300 font-medium">+24%</span>
          </div>
          <p className="text-2xl font-bold text-white mb-1">892</p>
          <p className="text-sm text-blue-200">New Visitors</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">Top Performing Links</h2>
          <div className="space-y-3">
            {[
              { title: 'Portfolio', clicks: 456, ctr: '52%' },
              { title: 'Instagram', clicks: 389, ctr: '45%' },
              { title: 'YouTube', clicks: 234, ctr: '38%' },
            ].map((link, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="font-medium text-white">{link.title}</p>
                  <p className="text-sm text-blue-200">{link.clicks} clicks</p>
                </div>
                <div className="flex items-center gap-1 text-green-300 text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  {link.ctr}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
          <div className="space-y-3">
            <Link 
              href="/dashboard/links"
              className="block p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-blue-400 transition"
            >
              <p className="font-medium text-white mb-1">Manage Links</p>
              <p className="text-sm text-blue-200">Add, edit, or remove your links</p>
            </Link>
            <Link 
              href="/dashboard/profile"
              className="block p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-blue-400 transition"
            >
              <p className="font-medium text-white mb-1">Edit Profile</p>
              <p className="text-sm text-blue-200">Update your bio and profile picture</p>
            </Link>
            <Link 
              href="/dashboard/theme"
              className="block p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-blue-400 transition"
            >
              <p className="font-medium text-white mb-1">Customize Theme</p>
              <p className="text-sm text-blue-200">Change colors and background style</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
