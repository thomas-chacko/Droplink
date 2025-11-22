'use client';

import { User, Lock, Bell, Shield, Trash2, Mail, Globe, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false,
    analytics: true,
  });

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-slate-400">Manage your account settings and preferences</p>
      </div>

      {/* Account Information */}
      <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Account Information</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
            <input
              type="text"
              defaultValue={user?.username || ''}
              className="w-full px-4 py-2.5 bg-[#0B1120] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-slate-500 mt-1">Your profile will be available at droplink.com/{user?.username || 'username'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input
              type="email"
              defaultValue={user?.email || ''}
              className="w-full px-4 py-2.5 bg-[#0B1120] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Account Type</label>
            <div className="w-full px-4 py-2.5 bg-[#0B1120] border border-white/10 rounded-lg text-white flex items-center justify-between">
              <span>{user?.isPremium ? 'Premium Account' : 'Free Account'}</span>
              {!user?.isPremium && (
                <span className="text-xs bg-blue-600 px-3 py-1 rounded-full">Upgrade Available</span>
              )}
            </div>
          </div>

          <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-blue-900/20">
            Save Changes
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Lock className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Security</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter current password"
                className="w-full px-4 py-2.5 bg-[#0B1120] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2.5 bg-[#0B1120] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2.5 bg-[#0B1120] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <button className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-purple-900/20">
            Update Password
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Bell className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#0B1120]/50 rounded-lg border border-white/5">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-white">Email Notifications</p>
                <p className="text-xs text-slate-500">Receive email updates about your account</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications.email ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  notifications.email ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#0B1120]/50 rounded-lg border border-white/5">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-white">Marketing Emails</p>
                <p className="text-xs text-slate-500">Receive tips, updates and special offers</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, marketing: !notifications.marketing })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications.marketing ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  notifications.marketing ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#0B1120]/50 rounded-lg border border-white/5">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-white">Weekly Analytics Report</p>
                <p className="text-xs text-slate-500">Get weekly insights about your profile</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, analytics: !notifications.analytics })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications.analytics ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  notifications.analytics ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/5 backdrop-blur-sm rounded-xl border border-red-500/20 overflow-hidden">
        <div className="p-6 border-b border-red-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Trash2 className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Danger Zone</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-white mb-1">Delete Account</p>
              <p className="text-xs text-slate-400">
                Once you delete your account, there is no going back. Please be certain.
              </p>
            </div>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
