'use client';

import { useState } from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

type Theme = {
  primaryColor: string;
  bgStyle: 'light' | 'dark' | 'gradient';
};

export default function ThemePage() {
  const { user } = useAuthStore();
  const [theme, setTheme] = useState<Theme>({ primaryColor: '#2563eb', bgStyle: 'gradient' });
  const username = user?.username || 'user';
  const bio = 'Designer & Creator | Sharing my journey';

  const sampleLinks = [
    { id: '1', title: 'Portfolio' },
    { id: '2', title: 'Instagram' },
    { id: '3', title: 'YouTube' },
  ];

  // Show premium upgrade screen if user is not premium
  if (!user?.isPremium) {
    return (
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <span className="text-4xl">👑</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">Unlock Premium Themes</h1>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              Customize colors, backgrounds, and make your profile truly unique
            </p>
            <button className="px-8 py-3 bg-white text-purple-600 rounded-xl hover:bg-blue-50 transition font-bold shadow-xl">
              Upgrade to Premium - $9.99/month
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
              <span className="text-xl">🎨</span>
            </div>
            <h3 className="font-bold text-white mb-1">Custom Colors</h3>
            <p className="text-blue-200 text-sm">Match your brand perfectly</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
              <span className="text-xl">✨</span>
            </div>
            <h3 className="font-bold text-white mb-1">Background Styles</h3>
            <p className="text-blue-200 text-sm">Light, dark, or gradient</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
              <span className="text-xl">📊</span>
            </div>
            <h3 className="font-bold text-white mb-1">Advanced Analytics</h3>
            <p className="text-blue-200 text-sm">Track clicks and views</p>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-lg font-bold text-white mb-4 text-center">Theme Preview</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-2"></div>
              <p className="text-white text-xs font-medium">Gradient</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-gray-700 rounded-full mx-auto mb-2"></div>
              <p className="text-white text-xs font-medium">Dark</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2"></div>
              <p className="text-gray-900 text-xs font-medium">Light</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Theme Settings */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-6">Customize Theme</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-3">Primary Color</label>
              <div className="flex flex-wrap gap-3">
                {[
                  { color: '#2563eb', name: 'Blue' },
                  { color: '#7c3aed', name: 'Purple' },
                  { color: '#db2777', name: 'Pink' },
                  { color: '#059669', name: 'Green' },
                  { color: '#ea580c', name: 'Orange' },
                  { color: '#0891b2', name: 'Cyan' },
                ].map(({ color, name }) => (
                  <button
                    key={color}
                    onClick={() => setTheme({ ...theme, primaryColor: color })}
                    className={`w-12 h-12 rounded-xl transition ${theme.primaryColor === color ? 'ring-4 ring-offset-2 ring-white/50 ring-offset-transparent' : ''
                      }`}
                    style={{ backgroundColor: color }}
                    title={name}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-3">Background Style</label>
              <div className="space-y-2">
                {[
                  { value: 'light' as const, label: 'Light', desc: 'Clean white background' },
                  { value: 'dark' as const, label: 'Dark', desc: 'Sleek dark background' },
                  { value: 'gradient' as const, label: 'Gradient', desc: 'Colorful gradient background' },
                ].map((style) => (
                  <button
                    key={style.value}
                    onClick={() => setTheme({ ...theme, bgStyle: style.value })}
                    className={`w-full px-4 py-3 border rounded-xl text-left transition ${theme.bgStyle === style.value
                      ? 'border-blue-400 bg-white/20 text-white'
                      : 'border-white/20 hover:border-white/40 text-blue-200'
                      }`}
                  >
                    <p className="font-medium">{style.label}</p>
                    <p className="text-sm opacity-75">{style.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/20">
              <button className="px-6 py-3 bg-white text-blue-900 rounded-xl hover:bg-blue-50 transition font-bold">
                Save Theme
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 border border-white/20 lg:sticky lg:top-24">
          <h2 className="text-xl font-bold text-white mb-6">Live Preview</h2>

          <div
            className={`rounded-3xl p-8 min-h-[400px] ${theme.bgStyle === 'light'
              ? 'bg-gray-100'
              : theme.bgStyle === 'dark'
                ? 'bg-gray-900'
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
              }`}
          >
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-3"></div>
              <h3 className={`text-xl font-bold ${theme.bgStyle === 'dark' || theme.bgStyle === 'gradient' ? 'text-white' : 'text-gray-900'}`}>
                @{username}
              </h3>
              <p className={`text-center text-sm mt-1 ${theme.bgStyle === 'dark' || theme.bgStyle === 'gradient' ? 'text-gray-300' : 'text-gray-600'}`}>
                {bio}
              </p>
            </div>

            <div className="space-y-3">
              {sampleLinks.map((link) => (
                <div
                  key={link.id}
                  className={`p-4 rounded-xl text-center font-medium transition cursor-pointer ${theme.bgStyle === 'gradient'
                    ? 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                    : theme.bgStyle === 'dark'
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-white text-gray-900 hover:bg-gray-50 shadow-sm'
                    }`}
                  style={theme.bgStyle === 'light' ? { borderColor: theme.primaryColor, borderWidth: '2px' } : {}}
                >
                  {link.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
