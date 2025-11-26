'use client';

import { useState, useEffect } from 'react';
import {
  Camera,
  Copy,
  Mail,
  User,
  Save,
  CheckCircle2,
  AtSign,
  Sparkles,
  MapPin,
  Link as LinkIcon,
  Loader2
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { userServices } from '@/services/userServices';
import { LIVE_URL } from '@/constants/constant';

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    email: '',
    bio: '',
    location: '',
    website: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;

      try {
        setFetching(true);
        setError(null);
        const response = await userServices.getUserById(user.id);

        if (response.success) {
          const userData = response.data;
          setFormData({
            displayName: userData.name || '',
            username: userData.username || '',
            email: userData.email || '',
            bio: userData.bio || '',
            location: userData.location || '',
            website: userData.socialLinks?.website || ''
          });
        }
      } catch (error: any) {
        setError(error.response?.data?.message || 'Failed to fetch profile');
      } finally {
        setFetching(false);
      }
    };

    fetchUserData();
  }, [user?.id]);

  const copyProfileUrl = () => {
    navigator.clipboard.writeText(`${LIVE_URL}/${formData.username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const updateData = {
        name: formData.displayName,
        bio: formData.bio,
        location: formData.location,
        socialLinks: {
          website: formData.website
        }
      };

      const response = await userServices.updateUser(user.id, updateData);

      if (response.success) {
        updateUser({
          username: response.data.username,
          email: response.data.email,
          isPremium: response.data.isPremium
        });
        setSuccess('Profile updated successfully!');
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update profile');
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="w-full mx-auto p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto space-y-8">
      {/* Notifications */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-4 text-green-400 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          {success}
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Profile Settings</h1>
          <p className="text-blue-200/60 mt-1">Manage your public profile and account details</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Preview Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="sticky top-8">
            <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              {/* Banner */}
              <div className="h-32 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 relative">
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Profile Info */}
              <div className="px-6 pb-8 relative">
                {/* Avatar */}
                <div className="relative -mt-16 mb-4 inline-block">
                  <div className="w-32 h-32 rounded-full border-4 border-gray-900 bg-gray-800 relative overflow-hidden group cursor-pointer shadow-xl">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
                      {formData.displayName.charAt(0)}
                    </div>
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <button className="absolute bottom-1 right-1 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg border-2 border-gray-900 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-white">{formData.displayName}</h2>
                  <p className="text-blue-200 font-medium">@{formData.username}</p>
                </div>

                <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                  {formData.bio || "No bio yet..."}
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span>{formData.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <LinkIcon className="w-4 h-4 text-pink-400" />
                    <a href={`https://${formData.website}`} target="_blank" rel="noreferrer" className="hover:text-blue-300 transition-colors">
                      {formData.website}
                    </a>
                  </div>
                </div>

                {/* Profile Link Box */}
                <div className="mt-8 p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between gap-2 group hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Public Profile</span>
                      <span className="text-sm text-blue-200 truncate font-medium">{LIVE_URL}/{formData.username}</span>
                    </div>
                  </div>
                  <button
                    onClick={copyProfileUrl}
                    className="p-2 hover:bg-white/10 cursor-pointer rounded-lg text-gray-400 hover:text-white transition-colors relative"
                    title="Copy Link"
                  >
                    {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Display Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="w-full pl-4 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white placeholder-gray-500 transition-all"
                    placeholder="Your Name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Username</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <AtSign className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={formData.username}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/5 rounded-xl text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white placeholder-gray-500 transition-all resize-none"
                  placeholder="Tell the world about yourself..."
                />
                <div className="flex justify-end">
                  <span className="text-xs text-gray-500">{formData.bio.length}/150</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Contact Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white placeholder-gray-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Website</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <LinkIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white placeholder-gray-500 transition-all"
                    placeholder="yourwebsite.com"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Location</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white placeholder-gray-500 transition-all"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
