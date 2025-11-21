import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';
import AuthRedirect from '@/components/AuthRedirect';

export default function LandingPage() {
  return (
    <AuthRedirect redirectTo="/dashboard" redirectIfAuthenticated={true}>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
        <Header />
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <HowItWorksSection />
        <PricingSection />
        <Footer />
      </div>
    </AuthRedirect>
  );
}
