'use client';

import { useState } from 'react';
import { User, Link as LinkIcon, Palette, LogOut, Plus, Trash2, Edit2 } from 'lucide-react';
import Link from 'next/link';

type LinkItem = {
  id: string;
  title: string;
  url: string;
};

type Theme = {
  primaryColor: string;
  bgStyle: 'light' | 'dark' | 'gradient';
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'links' | 'theme'>('profile');
  const [bio, setBio] = useState('Designer & Creator | Sharing my journey');
  const [links, setLinks] = useState<LinkItem[]>([
    { id: '1', title: 'Portfolio', url: 'https://example.com' },
    { id: '2', title: 'Instagram', url: 'https://instagram.com/johndoe' },
  ]);
  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const [theme, setTheme] = useState<Theme>({ primaryColor: '#2563eb', bgStyle: 'gradient' });
  const [isPremium] = useState(true);

  const addLink = () => {
    if (newLink.title && newLink.url) {
      setLinks([...links, { id: Date.now().toString(), ...newLink }]);
      setNewLink({ title: '', url: '' });
    }
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 backdrop-blur-sm border-r border-white/10 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <LinkIcon className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-xl font-bold text-white">Droplink</span>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              activeTab === 'profile' ? 'bg-white/20 text-white' : 'text-blue-200 hover:bg-white/10'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Profile</span>
          </button>
          
          <button
            onClick={() => setActiveTab('links')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              activeTab === 'links' ? 'bg-white/20 text-white' : 'text-blue-200 hover:bg-white/10'
            }`}
          >
            <LinkIcon className="w-5 h-5" />
            <span className="font-medium">My Links</span>
          </button>
          
          <button
            onClick={() => setActiveTab('theme')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              activeTab === 'theme' ? 'bg-white/20 text-white' : 'text-blue-200 hover:bg-white/10'
            }`}
          >
            <Palette className="w-5 h-5" />
            <span className="font-medium">Theme</span>
            {isPremium && <span className="ml-auto text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded font-bold">PRO</span>}
          </button>
        </nav>

        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-200 hover:bg-white/10 transition mt-auto absolute bottom-6">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Top Navbar */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 mb-6 flex justify-between items-center border border-white/20">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-blue-200 text-sm">Manage your Droplink profile</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="font-semibold text-white">John Doe</p>
              <p className="text-sm text-blue-200">@johndoe</p>
            </div>
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full"></div>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-6">Profile Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Profile Picture</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-purple-600 rounded-full"></div>
                  <button className="px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-50 transition font-semibold">
                    Change Photo
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Username</label>
                <input
                  type="text"
                  value="johndoe"
                  readOnly
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-blue-200"
                />
                <p className="text-sm text-blue-300 mt-1">Your public profile: droplink.com/johndoe</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none text-white placeholder-blue-300"
                  placeholder="Tell people about yourself..."
                />
              </div>

              <button className="px-6 py-3 bg-white text-blue-900 rounded-xl hover:bg-blue-50 transition font-bold">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* My Links Tab */}
        {activeTab === 'links' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-6">Add New Link</h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Link Title (e.g., Instagram)"
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none text-white placeholder-blue-300"
                />
                <input
                  type="url"
                  placeholder="URL (e.g., https://...)"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none text-white placeholder-blue-300"
                />
              </div>
              
              <button
                onClick={addLink}
                className="flex items-center gap-2 px-6 py-3 bg-white text-blue-900 rounded-xl hover:bg-blue-50 transition font-bold"
              >
                <Plus className="w-5 h-5" />
                Add Link
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-6">Your Links</h2>
              
              <div className="space-y-3">
                {links.map((link) => (
                  <div key={link.id} className="flex items-center gap-3 p-4 bg-white/5 border border-white/20 rounded-xl hover:border-blue-400 transition">
                    <LinkIcon className="w-5 h-5 text-blue-300" />
                    <div className="flex-1">
                      <p className="font-semibold text-white">{link.title}</p>
                      <p className="text-sm text-blue-200">{link.url}</p>
                    </div>
                    <button className="p-2 text-blue-300 hover:bg-white/10 rounded-lg transition">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteLink(link.id)}
                      className="p-2 text-red-400 hover:bg-white/10 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Theme Tab */}
        {activeTab === 'theme' && (
          <div className="grid lg:grid-cols-2 gap-6">
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
                  <label className="block text-sm font-medium text-white mb-2">Primary Color</label>
                  <div className="flex gap-3">
                    {['#2563eb', '#7c3aed', '#db2777', '#059669', '#ea580c'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setTheme({ ...theme, primaryColor: color })}
                        className={`w-12 h-12 rounded-xl transition ${
                          theme.primaryColor === color ? 'ring-4 ring-offset-2 ring-white/50' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Background Style</label>
                  <div className="space-y-2">
                    {(['light', 'dark', 'gradient'] as const).map((style) => (
                      <button
                        key={style}
                        onClick={() => setTheme({ ...theme, bgStyle: style })}
                        className={`w-full px-4 py-3 border rounded-xl text-left transition ${
                          theme.bgStyle === style
                            ? 'border-blue-400 bg-white/20 text-white'
                            : 'border-white/20 hover:border-white/40 text-blue-200'
                        }`}
                      >
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-6">Preview</h2>
              
              <div
                className={`rounded-3xl p-8 ${
                  theme.bgStyle === 'light'
                    ? 'bg-gray-100'
                    : theme.bgStyle === 'dark'
                    ? 'bg-gray-900'
                    : 'bg-linear-to-br from-blue-500 to-purple-600'
                }`}
              >
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 bg-white rounded-full mb-3"></div>
                  <h3 className={`text-xl font-bold ${theme.bgStyle === 'dark' || theme.bgStyle === 'gradient' ? 'text-white' : 'text-gray-900'}`}>
                    @johndoe
                  </h3>
                  <p className={theme.bgStyle === 'dark' || theme.bgStyle === 'gradient' ? 'text-gray-300' : 'text-gray-600'}>
                    {bio}
                  </p>
                </div>
                
                <div className="space-y-3">
                  {links.slice(0, 3).map((link) => (
                    <div
                      key={link.id}
                      className={`p-4 rounded-xl text-center font-medium transition cursor-pointer ${
                        theme.bgStyle === 'gradient'
                          ? 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                          : theme.bgStyle === 'dark'
                          ? 'bg-gray-800 text-white hover:bg-gray-700'
                          : 'bg-white text-gray-900 hover:bg-gray-50'
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
        )}
      </main>
    </div>
  );
}
