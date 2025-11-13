import { Instagram, Twitter, Youtube, Globe, Github, Linkedin } from 'lucide-react';

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
  globe: Globe,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  github: Github,
  linkedin: Linkedin,
};

export default function PublicProfilePage() {
  const user = mockUserData; // In real app, fetch based on dynamic route params
  const { theme } = user;

  const bgClass =
    theme.bgStyle === 'light'
      ? 'bg-gray-50'
      : theme.bgStyle === 'dark'
      ? 'bg-gray-900'
      : 'bg-linear-to-br from-blue-500 via-purple-600 to-pink-500';

  const isDarkTheme = theme.bgStyle === 'dark' || theme.bgStyle === 'gradient';
  const textClass = isDarkTheme ? 'text-white' : 'text-gray-900';
  const subtextClass = isDarkTheme ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${bgClass} flex items-center justify-center p-4`}>
      <div className="w-full max-w-2xl">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto bg-white rounded-full mb-4 shadow-lg"></div>
          <h1 className={`text-3xl font-bold ${textClass} mb-2`}>@{user.username}</h1>
          <p className={`${subtextClass} max-w-md mx-auto`}>{user.bio}</p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          {user.links.map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap] || Globe;
            
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-5 rounded-2xl font-medium transition transform hover:scale-105 hover:shadow-xl ${
                  theme.bgStyle === 'gradient'
                    ? 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'
                    : theme.bgStyle === 'dark'
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-white text-gray-900 hover:bg-gray-50 shadow-md'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <Icon className="w-5 h-5" />
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
            <a href="/" className="font-semibold hover:underline">
              droplink.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
