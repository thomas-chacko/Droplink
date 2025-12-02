'use client';

import { useEffect, useState } from 'react';
import { Instagram, Facebook, Twitter, Youtube, Github, Linkedin, Globe, ExternalLink } from 'lucide-react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { LIVE_URL } from '@/constants/constant';

// Types
interface UserData {
  username: string;
  name: string;
  bio: string;
  avatar?: string;
  coverImage?: string;
  isPremium: boolean;
  location?: string;
  theme?: {
    primaryColor?: string;
    bgStyle?: 'light' | 'dark' | 'gradient';
  };
  socialLinks?: any;
}

interface LinkData {
  _id: string;
  title: string;
  url: string;
  icon?: string;
  clicks?: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    user: UserData;
    links: LinkData[];
  };
}

const iconMap: Record<string, any> = {
  globe: Globe,
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  youtube: Youtube,
  github: Github,
  linkedin: Linkedin,
  external: ExternalLink,
};

export default function PublicProfilePage() {
  const params = useParams();
  const username = params?.username as string;

  const [userData, setUserData] = useState<UserData | null>(null);
  const [links, setLinks] = useState<LinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/user/${username}`);
        const data: ApiResponse = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to fetch user profile');
        }

        setUserData(data.data.user);
        setLinks(data.data.links);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchUserProfile();
    }
  }, [username]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">❌</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Profile Not Found</h1>
          <p className="text-blue-200 mb-6">{error || 'The user you are looking for does not exist.'}</p>
          <a href="/" className="inline-block px-6 py-3 bg-white text-blue-900 rounded-xl font-semibold hover:bg-blue-50 transition">
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  // Success state - Display user profile
  const bgClass = 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900';
  const textClass = 'text-white';
  const subtextClass = 'text-blue-200';

  return (
    <div className={`min-h-screen ${bgClass} flex items-center justify-center p-6`}>
      <div className="w-full max-w-2xl">
        {/* Profile Header */}
        <div className="text-center mb-8">
          {userData.avatar ? (
            <div className="w-24 h-24 mx-auto rounded-full mb-4 shadow-2xl overflow-hidden">
              <Image
                src={userData.avatar}
                alt={userData.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-2xl flex items-center justify-center">
              <span className="text-4xl font-bold text-white">{userData.name?.[0]?.toUpperCase() || userData.username[0].toUpperCase()}</span>
            </div>
          )}

          <h1 className={`text-3xl font-bold ${textClass} mb-2`}>
            {userData.name || `@${userData.username}`}
          </h1>
          {userData.name && (
            <p className={`text-lg ${subtextClass} mb-2`}>@{userData.username}</p>
          )}
        </div>

        {/* Links */}
        {links.length > 0 ? (
          <div className="space-y-4">
            {links.map((link) => {
              const IconComponent = iconMap[link.icon || 'external'] || ExternalLink;

              return (
                <a
                  key={link._id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 rounded-2xl font-medium transition transform hover:scale-105 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20 shadow-lg"
                >
                  <div className="flex items-center justify-center gap-3">
                    <IconComponent className="w-5 h-5" />
                    <span>{link.title}</span>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className={`${subtextClass} text-lg`}>No links added yet</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12">
          <p className={`text-sm ${subtextClass}`}>
            Create your own Droplink →{' '}
            <a href="/" className="font-semibold hover:underline text-white">
              {LIVE_URL}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
