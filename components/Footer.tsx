import Link from 'next/link';
import { Link2 } from 'lucide-react';

export default function Footer() {
  return (
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
  );
}
