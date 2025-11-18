'use client';

import { useState } from 'react';
import { Copy, ExternalLink, Upload } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [bio, setBio] = useState('Designer & Creator | Sharing my journey');
  const [copied, setCopied] = useState(false);
  const username = 'johndoe';

  const copyProfileUrl = () => {
    navigator.clipboard.writeText(`droplink.com/${username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 border border-white/20">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Profile Picture</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-50 transition font-semibold">
                <Upload className="w-4 h-4" />
                Change Photo
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Username</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={username}
                readOnly
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-blue-200"
              />
              <button 
                onClick={copyProfileUrl}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition"
                title="Copy profile URL"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-blue-300 mt-1 flex items-center gap-1">
              Your public profile: 
              <Link href={`/${username}`} target="_blank" className="hover:underline inline-flex items-center gap-1">
                droplink.com/{username}
                <ExternalLink className="w-3 h-3" />
              </Link>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Display Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none text-white placeholder-blue-300"
              placeholder="Your name"
            />
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
            <p className="text-sm text-blue-300 mt-1">{bio.length} / 150 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Email</label>
            <input
              type="email"
              defaultValue="john@example.com"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none text-white placeholder-blue-300"
              placeholder="your@email.com"
            />
          </div>

          <div className="pt-4 border-t border-white/20">
            <button className="px-6 py-3 bg-white text-blue-900 rounded-xl hover:bg-blue-50 transition font-bold">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
