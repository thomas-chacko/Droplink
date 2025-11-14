import { Check, Zap } from 'lucide-react';

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for getting started",
    features: [
      "Unlimited links",
      "Basic analytics",
      "Custom username",
      "Mobile optimized",
      "Email support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "9",
    description: "For serious creators",
    features: [
      "Everything in Free",
      "Advanced analytics",
      "Remove Droplink branding",
      "Custom domains",
      "Priority support",
      "Link scheduling",
      "SEO optimization"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Business",
    price: "29",
    description: "For teams and businesses",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Multiple users",
      "API access",
      "White label",
      "Dedicated account manager",
      "Custom integrations"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export default function PricingSection() {
  return (
    <section className="container mx-auto px-6 md:px-8 lg:px-12 py-7 md:py-10 lg:py-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Simple, <span className="text-yellow-400">transparent pricing</span>
        </h2>
        <p className="text-xl text-blue-200 max-w-2xl mx-auto">
          Start free, upgrade when you need more. No hidden fees, cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-3xl p-8 border-2 transition-all duration-300 hover:scale-105 ${
              plan.popular
                ? 'bg-yellow-400 border-yellow-400 shadow-2xl'
                : 'bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15'
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  Most Popular
                </div>
              </div>
            )}

            {/* Plan Name */}
            <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-gray-900' : 'text-white'}`}>
              {plan.name}
            </h3>

            {/* Description */}
            <p className={`mb-6 ${plan.popular ? 'text-gray-700' : 'text-blue-200'}`}>
              {plan.description}
            </p>

            {/* Price */}
            <div className="mb-8">
              <span className={`text-5xl font-bold ${plan.popular ? 'text-gray-900' : 'text-white'}`}>
                ${plan.price}
              </span>
              <span className={`text-lg ${plan.popular ? 'text-gray-700' : 'text-blue-200'}`}>
                /month
              </span>
            </div>

            {/* CTA Button */}
            <a
              href="/signup"
              className={`block w-full py-4 rounded-full font-bold text-center mb-8 transition ${
                plan.popular
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
              }`}
            >
              {plan.cta}
            </a>

            {/* Features */}
            <ul className="space-y-4">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className={`w-5 h-5 shrink-0 mt-0.5 ${
                    plan.popular ? 'text-gray-900' : 'text-yellow-400'
                  }`} />
                  <span className={plan.popular ? 'text-gray-800' : 'text-white'}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* FAQ Note */}
      <div className="text-center mt-16">
        <p className="text-blue-200 text-lg">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
