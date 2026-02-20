'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Clock, Search, CheckCircle2, Shield, Star } from 'lucide-react';

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
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">Book instantly — no waiting</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Book Studio Time.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Instantly.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Real availability. Instant confirmation. No back-and-forth. 
            Find and book professional studios in under 2 minutes.
          </p>

          {/* Search Bar */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div className="text-left flex-1">
                  <p className="text-xs text-gray-400">Location</p>
                  <input
                    type="text"
                    placeholder="Los Angeles"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div className="text-left flex-1">
                  <p className="text-xs text-gray-400">Date</p>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent text-sm text-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition">
                <Clock className="w-5 h-5 text-gray-400" />
                <div className="text-left flex-1">
                  <p className="text-xs text-gray-400">Duration</p>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-transparent text-sm text-white focus:outline-none"
                  >
                    <option value="1" className="bg-black">1 hour</option>
                    <option value="2" className="bg-black">2 hours</option>
                    <option value="3" className="bg-black">3 hours</option>
                    <option value="4" className="bg-black">4 hours</option>
                    <option value="8" className="bg-black">Full day</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 bg-white text-black rounded-xl py-3 font-medium hover:bg-gray-200 transition"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>Instant confirmation</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Secure payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>Verified studios</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
