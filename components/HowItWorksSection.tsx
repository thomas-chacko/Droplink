import { UserPlus, Palette, Share2, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Sign Up Free",
    description: "Create your account in seconds. No credit card required, no hidden fees."
  },
  {
    icon: Palette,
    step: "02",
    title: "Customize Your Page",
    description: "Add your links, choose your style, and make it uniquely yours with our easy editor."
  },
  {
    icon: Share2,
    step: "03",
    title: "Share Your Link",
    description: "Get your personalized droplink.com/yourname and share it everywhere."
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Track & Grow",
    description: "Watch your analytics and see what content resonates with your audience."
  }
];

export default function HowItWorksSection() {
  return (
    <section className="container mx-auto px-6 md:px-8 lg:px-12 py-7 md:py-10 lg:py-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Get started in <span className="text-yellow-400">4 simple steps</span>
        </h2>
        <p className="text-xl text-blue-200 max-w-2xl mx-auto">
          From signup to success in minutes. No technical skills needed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connection Line - Hidden on mobile */}
        <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-linear-to-r from-yellow-400 via-blue-400 to-purple-400 opacity-30" 
             style={{ width: 'calc(100% - 8rem)', left: '4rem' }} />

        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 relative z-10">
                {/* Step Number */}
                <div className="text-yellow-400 text-6xl font-bold opacity-20 absolute top-4 right-4">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6 relative z-10">
                  <Icon className="w-8 h-8 text-gray-900" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-blue-200 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <a
          href="/signup"
          className="inline-flex items-center gap-2 px-10 py-5 bg-yellow-400 text-gray-900 text-xl font-bold rounded-full hover:bg-yellow-300 transition shadow-lg hover:shadow-xl"
        >
          Start building now
        </a>
        <p className="text-blue-200 mt-4">
          Join 50,000+ creators already using Droplink
        </p>
      </div>
    </section>
  );
}
