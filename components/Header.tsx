import Link from 'next/link';
import Image from 'next/image';
import LogoImage from "@/public/images/logoImage.png"

export default function Header() {
  return (
    <header className="container mx-auto px-6 md:px-8 lg:px-12 py-4 flex justify-between items-center relative z-10">
      <Link href="/" className="flex items-center">
        <div className="h-12 flex items-center">
          <Image
            src={LogoImage}
            alt="Droplink Logo"
            width={180}
            height={48}
            className="object-contain h-full w-auto"
            priority
          />
        </div>
      </Link>
      <div className="flex gap-3">
        <Link href="/login" className="px-6 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-50 transition font-semibold">
          Join Now
        </Link>
      </div>
    </header>
  );
}
