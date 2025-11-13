import Link from 'next/link';
import { ArrowRight, Link2, Palette, Share2, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link2 className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">Droplink</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600 transition">
            Login
          </Link>
          <Link href="/signup" className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Share your world in one link</span>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            All your links.<br />
            <span className="text-blue-600">One Droplink.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create a beautiful landing page for all your social links, portfolio, and content. 
            Share one link everywhere.
          </p>
          
          <Link 
            href="/signup" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg rounded-full hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Link2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Unlimited Links</h3>
            <p className="text-gray-600">Add all your social profiles, websites, and content in one place.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom Themes</h3>
            <p className="text-gray-600">Personalize your page with colors and styles that match your brand.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Share2 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
            <p className="text-gray-600">Share your unique link across all platforms and track engagement.</p>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-8">See it in action</h2>
          
          <div className="max-w-sm mx-auto bg-linear-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-white rounded-full mb-4"></div>
              <h3 className="text-2xl font-bold">@johndoe</h3>
              <p className="text-blue-100">Designer & Creator</p>
            </div>
            
            <div className="space-y-3">
              {['Portfolio', 'Instagram', 'Twitter', 'YouTube'].map((link) => (
                <div key={link} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center font-medium hover:bg-white/30 transition cursor-pointer">
                  {link}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 mt-20 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Link2 className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Droplink</span>
          </div>
          
          <div className="flex gap-6 text-gray-600">
            <Link href="#" className="hover:text-blue-600 transition">About</Link>
            <Link href="#" className="hover:text-blue-600 transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600 transition">Contact</Link>
          </div>
          
          <p className="text-gray-500 text-sm">© 2024 Droplink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
