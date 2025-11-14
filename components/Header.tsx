import Link from 'next/link';
import { Link2 } from 'lucide-react';

export default function Header() {
  return (
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
  );
}
