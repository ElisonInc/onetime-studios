'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Clock, Search, Sparkles } from 'lucide-react';

export function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('2');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (date) params.set('date', date);
    router.push(`/studios?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Static Background - No animation */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="mb-6 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-300">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Book instantly — no waiting</span>
            <span className="flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-4 md:mb-6 animate-fade-in-up">
          <span className="text-white">Book Studio Time.</span>
          <br />
          <span className="gradient-text">Instantly.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-xl md:text-2xl text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Real availability. Instant confirmation. No back-and-forth.
          <span className="hidden sm:inline"> Find and book professional studios in under 2 minutes.</span>
        </p>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto px-2 sm:px-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="glass rounded-2xl md:rounded-3xl p-2 md:p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {/* Location */}
              <div className="relative">
                <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Where to?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full bg-transparent border border-white/10 focus:border-blue-500/50 rounded-xl md:rounded-2xl pl-9 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Date */}
              <div className="relative">
                <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent border border-white/10 focus:border-blue-500/50 rounded-xl md:rounded-2xl pl-9 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 text-sm md:text-base text-white focus:outline-none transition-colors [color-scheme:dark]"
                />
              </div>

              {/* Duration */}
              <div className="relative">
                <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Clock className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-transparent border border-white/10 focus:border-blue-500/50 rounded-xl md:rounded-2xl pl-9 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 text-sm md:text-base text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="1" className="bg-gray-900">1 hour</option>
                  <option value="2" className="bg-gray-900">2 hours</option>
                  <option value="3" className="bg-gray-900">3 hours</option>
                  <option value="4" className="bg-gray-900">4 hours</option>
                  <option value="8" className="bg-gray-900">Full day</option>
                </select>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 bg-white text-black rounded-xl md:rounded-2xl py-3 md:py-4 text-sm md:text-base font-semibold hover:bg-gray-100 transition-colors active:scale-[0.98]"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Search</span>
                <span className="sm:hidden">Find</span>
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-8 md:mt-12 text-xs md:text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="text-green-400">✓</span>
            <span>Instant confirmation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-blue-400">🔒</span>
            <span>Secure payments</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-400">★</span>
            <span>Verified studios</span>
          </div>
        </div>
      </div>
    </section>
  );
}
