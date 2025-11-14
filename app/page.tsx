import Link from 'next/link';
import { ArrowRight, Link2, Instagram, Facebook, Twitter, Linkedin, Youtube, Github, MessageCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Header */}
      <header className="container mx-auto px-6 md:px-8 lg:px-12 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <Link2 className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-2xl font-bold text-white">Droplink</span>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="px-6 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-50 transition font-semibold">
            Join Now
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-8 lg:px-12 py-7 md:py-10 lg:py-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-[600px]">
          {/* Left Side - Text Content */}
          <div className="text-white tec space-y-8 relative z-10 px-4 md:px-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              All Your Links
              <br />
              <span className="text-blue-300">In One Place</span>
              <br />
              Share Everywhere
            </h1>

            <p className="text-xl md:text-2xl text-blue-200 leading-relaxed">
              Connect all your social profiles, portfolio, and content with a single customizable link
            </p>

            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 text-lg font-bold rounded-xl hover:bg-blue-50 transition shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transform"
            >
              Start Free
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="flex items-center gap-6 pt-4">
              <div>
                <div className="text-3xl font-bold">100+</div>
                <div className="text-blue-300 text-sm">Active Users</div>
              </div>
              <div className="w-px h-12 bg-blue-700"></div>
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-blue-300 text-sm">Links Shared</div>
              </div>
            </div>
          </div>

          {/* Right Side - Animated Rings with Icons */}
          <div className="relative flex items-center justify-center h-[400px] lg:h-[600px]">
            {/* Center Text */}
            <div className="absolute z-20 text-center">
              <div className="text-5xl font-bold text-white mb-2">One Link</div>
              <div className="text-xl text-blue-300">All Platforms</div>
            </div>

            {/* Ring 1 - Inner */}
            <div className="absolute w-64 h-64 border-2 border-blue-500/30 rounded-full animate-spin-slow">
              {/* Instagram */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-14 h-14 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
                  <Instagram className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Facebook */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
                  <Facebook className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Twitter */}
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-14 h-14 bg-sky-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
                  <Twitter className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* LinkedIn */}
              <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
                <div className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
                  <Linkedin className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            {/* Ring 2 - Outer */}
            <div className="absolute w-96 h-96 border-2 border-purple-500/20 rounded-full animate-spin-reverse">
              {/* YouTube */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
                  <Youtube className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* GitHub */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
                  <Github className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* WhatsApp */}
              <div className="absolute left-8 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Link Icon */}
              <div className="absolute right-8 top-1/2 translate-x-1/2 -translate-y-1/2">
                <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
                  <Link2 className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            {/* Glow Effects */}
            <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 md:px-8 lg:px-12 py-7 md:py-10">
        <div className="flex flex-col-reverse lg:flex-row gap-16 items-center">
          {/* Left Side - Video */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative">
              {/* Video Container */}
              <div className="relative w-full md:w-96 h-[650px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl border-8 border-gray-800 overflow-hidden">
                {/* Video */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-[2.5rem]"
                >
                  <source src="/videos/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* Right Side - Feature Text */}
          <div className="text-white space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Create and customize
              <br />
              <span className="text-yellow-400">your Droplink</span>
              <br />
              in minutes
            </h2>

            <p className="text-xl text-blue-200 leading-relaxed">
              Connect all your content across social media, websites, stores and more in one link in bio.
              Customize every detail or let Droplink automatically enhance it to match your brand and drive more clicks.
            </p>

            <Link
              href="/signup"
              className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-yellow-400 text-gray-900 text-lg font-bold rounded-full hover:bg-yellow-300 transition shadow-lg hover:shadow-xl"
            >
              Get started for free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 md:px-8 lg:px-12 py-12 border-t border-white/10 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Link2 className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-lg font-bold text-white">Droplink</span>
          </div>

          <div className="flex gap-8 text-blue-200">
            <Link href="#" className="hover:text-white transition">About</Link>
            <Link href="#" className="hover:text-white transition">Privacy</Link>
            <Link href="#" className="hover:text-white transition">Terms</Link>
            <Link href="#" className="hover:text-white transition">Contact</Link>
          </div>

          <p className="text-blue-300 text-sm">© 2024 Droplink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
