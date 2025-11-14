import Link from 'next/link';
import { Link2, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-10">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                <Link2 className="w-6 h-6 text-gray-900" />
              </div>
              <span className="text-2xl font-bold text-white">Droplink</span>
            </div>
            <p className="text-blue-200 mb-6 max-w-sm">
              The simplest way to share all your content. One link to rule them all.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 text-white transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 text-white transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 text-white transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-blue-200 hover:text-yellow-400 transition">Features</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-yellow-400 transition">Pricing</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-yellow-400 transition">Templates</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-yellow-400 transition">Integrations</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-yellow-400 transition">Analytics</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-blue-200 hover:text-yellow-400 transition">About Us</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-yellow-400 transition">Blog</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-yellow-400 transition">Careers</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-yellow-400 transition">Press Kit</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-yellow-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-blue-200 hover:text-yellow-400 transition">Help Center</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-yellow-400 transition">Tutorials</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-yellow-400 transition">Community</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-yellow-400 transition">API Docs</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-yellow-400 transition">Status</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-white font-bold text-lg mb-2">Stay updated</h3>
            <p className="text-blue-200 mb-4">Get the latest news and updates delivered to your inbox.</p>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-blue-300 focus:outline-none focus:border-yellow-400 transition"
                />
              </div>
              <button className="px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-full hover:bg-yellow-300 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-blue-300 text-sm">© 2024 Droplink. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-blue-200">
            <Link href="#" className="hover:text-yellow-400 transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-yellow-400 transition">Terms of Service</Link>
            <Link href="#" className="hover:text-yellow-400 transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
