import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Content Creator",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content: "Droplink transformed how I share my content. My engagement increased by 300% in just two months!",
    rating: 5
  },
  {
    name: "Mike Chen",
    role: "Small Business Owner",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    content: "The easiest way to manage all my links. My customers love how simple it is to find everything in one place.",
    rating: 5
  },
  {
    name: "Emma Rodriguez",
    role: "Influencer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    content: "I've tried other link-in-bio tools, but Droplink is by far the most intuitive and beautiful. Highly recommend!",
    rating: 5
  },
  {
    name: "David Park",
    role: "Musician",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    content: "Perfect for sharing my music across all platforms. Setup took less than 5 minutes and it looks amazing!",
    rating: 5
  },
  {
    name: "Lisa Thompson",
    role: "Entrepreneur",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    content: "The analytics help me understand what my audience cares about. Game changer for my business strategy.",
    rating: 5
  },
  {
    name: "Alex Kumar",
    role: "Digital Marketer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    content: "Clean, professional, and powerful. Droplink helps me convert followers into customers effortlessly.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="container mx-auto px-6 md:px-8 lg:px-12 py-7 md:py-10 lg:py-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Loved by <span className="text-yellow-400">creators</span> worldwide
        </h2>
        <p className="text-xl text-blue-200 max-w-2xl mx-auto">
          Join thousands of creators, entrepreneurs, and influencers who trust Droplink
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
          >
            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Content */}
            <p className="text-white text-lg mb-6 leading-relaxed">
              "{testimonial.content}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full bg-white/20"
              />
              <div>
                <h4 className="text-white font-semibold">{testimonial.name}</h4>
                <p className="text-blue-200 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">50K+</div>
          <div className="text-blue-200">Active Users</div>
        </div>
        <div>
          <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">1M+</div>
          <div className="text-blue-200">Links Created</div>
        </div>
        <div>
          <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">99%</div>
          <div className="text-blue-200">Satisfaction Rate</div>
        </div>
        <div>
          <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">24/7</div>
          <div className="text-blue-200">Support</div>
        </div>
      </div>
    </section>
  );
}
