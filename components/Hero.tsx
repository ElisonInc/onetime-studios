'use client';

import { ArrowRight } from 'lucide-react';

export function Hero() {
  const scrollToSearch = () => {
    document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Social Proof */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-blue-200/50 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-700">
              <strong>1,240 studios</strong> available now
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Book Studio Space in Under <span className="text-blue-600">2 Minutes</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Real-time availability. Instant confirmation. Secure payment hold. Everything you need, nothing you don't.
        </p>

        {/* Value Bullets */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
          {[
            { icon: '⚡', title: 'Real-time Availability', desc: 'See actual open slots' },
            { icon: '✓', title: 'Instant Confirmation', desc: 'Book and confirm immediately' },
            { icon: '🔒', title: 'Secure Payment', desc: 'Held safely until booking complete' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3 p-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToSearch}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition flex items-center justify-center gap-2 group"
          >
            Search Studios
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 border-2 border-gray-300 text-gray-900 rounded-xl hover:border-gray-400 hover:bg-gray-50 font-semibold transition">
            List Your Studio
          </button>
        </div>
      </div>

      {/* Hero Image Placeholder */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 hidden lg:block opacity-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-tl from-blue-600 to-purple-600 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
