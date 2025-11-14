import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FeaturesSection() {
  return (
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
  );
}
