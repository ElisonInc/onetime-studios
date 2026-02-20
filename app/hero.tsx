'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Search, CheckCircle2, Shield, Star, Sparkles } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('2');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (date) params.set('date', date);
    router.push(`/studios?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: -mousePosition.x * 0.5,
            y: -mousePosition.y * 0.5,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: mousePosition.x * 0.3,
            y: mousePosition.y * 0.3,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-[150px]"
        />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-300">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Book instantly — no waiting</span>
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6"
        >
          <span className="text-white">Book Studio Time.</span>
          <br />
          <span className="gradient-text-animated">Instantly.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Real availability. Instant confirmation. No back-and-forth.
          Find and book professional studios in under 2 minutes.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-3xl p-2 md:p-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              {/* Location */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Where to?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full bg-transparent border border-white/10 group-focus-within:border-blue-500/50 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none transition-all"
                />
              </div>

              {/* Date */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent border border-white/10 group-focus-within:border-blue-500/50 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none transition-all [color-scheme:dark]"
                />
              </div>

              {/* Duration */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors">
                  <Clock className="w-5 h-5" />
                </div>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-transparent border border-white/10 group-focus-within:border-blue-500/50 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="1" className="bg-gray-900">1 hour</option>
                  <option value="2" className="bg-gray-900">2 hours</option>
                  <option value="3" className="bg-gray-900">3 hours</option>
                  <option value="4" className="bg-gray-900">4 hours</option>
                  <option value="8" className="bg-gray-900">Full day</option>
                </select>
              </div>

              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 bg-white text-black rounded-2xl py-4 font-semibold hover:bg-gray-100 transition-colors"
              >
                <Search className="w-5 h-5" />
                Search
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-8 mt-12"
        >
          {[
            { icon: CheckCircle2, text: 'Instant confirmation', color: 'text-green-400' },
            { icon: Shield, text: 'Secure payments', color: 'text-blue-400' },
            { icon: Star, text: 'Verified studios', color: 'text-yellow-400' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 hidden lg:block"
        >
          <div className="glass rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-lg">
              🎵
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-400">Just booked</p>
              <p className="text-sm font-medium">Neon Sound Labs</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute top-40 right-10 hidden lg:block"
        >
          <div className="glass rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-lg">
              📸
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-400">Available now</p>
              <p className="text-sm font-medium">Golden Hour Studios</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute bottom-40 left-20 hidden lg:block"
        >
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-black"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">+2.4k</span>
            </div>
            <p className="text-xs text-gray-400">artists booked this week</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
