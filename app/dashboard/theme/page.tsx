'use client';

import { useState } from 'react';
import { Link as LinkIcon } from 'lucide-react';

type Theme = {
  primaryColor: string;
  bgStyle: 'light' | 'dark' | 'gradient';
};

export default function ThemePage() {
  const [theme, setTheme] = useState<Theme>({ primaryColor: '#2563eb', bgStyle: 'gradient' });
  const [isPremium] = useState(true);
  const username = 'johndoe';
  const bio = 'Designer & Creator | Sharing my journey';
  
  const sampleLinks = [
    { id: '1', title: 'Portfolio' },
    { id: '2', title: 'Instagram' },
    { id: '3', title: 'YouTube' },
  ];

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Theme Settings */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-6">Customize Theme</h2>
          
          {!isPremium && (
            <div className="bg-yellow-400/20 border border-yellow-400/40 rounded-xl p-4 mb-6">
              <p className="text-yellow-200 font-medium">🌟 Premium Feature</p>
              <p className="text-yellow-300 text-sm">Upgrade to customize your theme</p>
            </div>
          )}

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
                    className={`w-12 h-12 rounded-xl transition ${
                      theme.primaryColor === color ? 'ring-4 ring-offset-2 ring-white/50 ring-offset-transparent' : ''
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
                    className={`w-full px-4 py-3 border rounded-xl text-left transition ${
                      theme.bgStyle === style.value
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
            className={`rounded-3xl p-8 min-h-[400px] ${
              theme.bgStyle === 'light'
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
                  className={`p-4 rounded-xl text-center font-medium transition cursor-pointer ${
                    theme.bgStyle === 'gradient'
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
