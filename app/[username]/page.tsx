import { Instagram, Facebook, Twitter, Youtube, Github, Linkedin } from 'lucide-react';

// Mock data - will be replaced with real data later
const mockUserData = {
  username: 'johndoe',
  name: 'John Doe',
  bio: 'Designer & Creator | Sharing my journey through design, code, and creativity',
  profileImage: null,
  isPremium: true,
  theme: {
    primaryColor: '#2563eb',
    bgStyle: 'gradient' as 'light' | 'dark' | 'gradient',
  },
  links: [
    { id: '1', title: 'Portfolio Website', url: 'https://johndoe.com', icon: 'globe' },
    { id: '2', title: 'Instagram', url: 'https://instagram.com/johndoe', icon: 'instagram' },
    { id: '3', title: 'Twitter', url: 'https://twitter.com/johndoe', icon: 'twitter' },
    { id: '4', title: 'YouTube Channel', url: 'https://youtube.com/@johndoe', icon: 'youtube' },
    { id: '5', title: 'GitHub', url: 'https://github.com/johndoe', icon: 'github' },
    { id: '6', title: 'LinkedIn', url: 'https://linkedin.com/in/johndoe', icon: 'linkedin' },
  ],
};

const iconMap = {
  globe: () => <span className="text-2xl">🌐</span>,
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  youtube: Youtube,
  github: Github,
  linkedin: Linkedin,
};

export default function PublicProfilePage() {
  const user = mockUserData;
  const { theme } = user;

  const bgClass = 'bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900';
  const textClass = 'text-white';
  const subtextClass = 'text-blue-200';

  return (
    <div className={`min-h-screen ${bgClass} flex items-center justify-center p-6`}>
      <div className="w-full max-w-2xl">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto bg-linear-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-2xl"></div>
          <h1 className={`text-3xl font-bold ${textClass} mb-2`}>@{user.username}</h1>
          <p className={`${subtextClass} max-w-md mx-auto`}>{user.bio}</p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          {user.links.map((link) => {
            const IconComponent = iconMap[link.icon as keyof typeof iconMap];
            
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 rounded-2xl font-medium transition transform hover:scale-105 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20 shadow-lg"
              >
                <div className="flex items-center justify-center gap-3">
                  {IconComponent === iconMap.globe ? (
                    IconComponent()
                  ) : (
                    <IconComponent className="w-5 h-5" />
                  )}
                  <span>{link.title}</span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className={`text-sm ${subtextClass}`}>
            Create your own Droplink →{' '}
            <a href="/" className="font-semibold hover:underline text-white">
              droplink.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
