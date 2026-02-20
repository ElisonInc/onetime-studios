import { Suspense } from 'react';
import { getFeaturedStudios } from '@/lib/data';
import { Hero } from './hero';
import { Studio } from '@/types';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Star, ArrowRight, Zap, CheckCircle2, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Hero />
      
      <Suspense fallback={<FeaturedStudiosSkeleton />}>
        <FeaturedStudios />
      </Suspense>
      
      <HowItWorks />
      <ForOwners />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

async function FeaturedStudios() {
  const studios = await getFeaturedStudios(4);

  return (
    <section id="studios" className="py-32 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Featured <span className="gradient-text">Studios</span>
            </h2>
            <p className="text-gray-400 text-lg">Hand-picked spaces available today</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <Link 
              href="/studios" 
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
            >
              View all studios
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {studios.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-20 glass rounded-3xl"
          >
            <div className="text-6xl mb-4">🏗️</div>
            <h3 className="text-2xl font-semibold mb-2">Studios coming soon</h3>
            <p className="text-gray-400">We're onboarding new studios every day</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studios.map((studio, index) => (
              <StudioCard key={studio.id} studio={studio} index={index} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Link href="/studios" className="inline-flex items-center gap-2 text-blue-400">
            View all studios
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedStudiosSkeleton() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 bg-white/10 rounded-2xl w-96 mb-16 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass rounded-3xl overflow-hidden">
              <div className="aspect-[4/3] bg-white/10 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-5 bg-white/10 rounded w-24 animate-pulse" />
                <div className="h-7 bg-white/10 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioCard({ studio, index }: { studio: Studio; index: number }) {
  const typeEmoji: Record<string, string> = {
    recording: '🎵',
    photography: '📸',
    video: '🎬',
    rehearsal: '🎸',
    podcast: '🎙️',
  };

  const emoji = studio.studio_type?.[0] ? typeEmoji[studio.studio_type[0]] || '🎵' : '🎵';
  const imageUrl = studio.cover_image || studio.images?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link 
        href={`/studios/${studio.slug}`}
        className="group block"
      >
        <div className="glass-card rounded-3xl overflow-hidden card-hover">
          {/* Image */}
          <div className="aspect-[4/3] relative overflow-hidden">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={studio.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl">
                {emoji}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold">
                  ${studio.hourly_rate}/hr
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">4.9</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-display font-semibold text-xl mb-2 text-white group-hover:text-blue-400 transition-colors">
              {studio.name}
            </h3>
            <p className="text-gray-400 mb-4 flex items-center gap-1 text-sm">
              <MapPin className="w-4 h-4" />
              {studio.city}, {studio.state}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {studio.studio_type?.slice(0, 2).map((type, i) => (
                <span key={i} className="text-xs px-3 py-1.5 bg-white/5 rounded-full text-gray-300 capitalize border border-white/10">
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Search",
      description: "Find studios near you with real-time availability. Filter by type, price, and amenities.",
      icon: "🔍",
      color: "from-blue-500 to-cyan-400",
    },
    {
      step: "02",
      title: "Book",
      description: "Select your time slot and pay securely. Your booking is confirmed instantly.",
      icon: "⚡",
      color: "from-purple-500 to-pink-400",
    },
    {
      step: "03",
      title: "Create",
      description: "Show up and make magic. Rate your experience when you're done.",
      icon: "✨",
      color: "from-pink-500 to-rose-400",
    },
  ];

  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            How <span className="gradient-text">OneTime</span> Works
          </h2>
          <p className="text-gray-400 text-lg">
            Book professional studio space in 3 simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connection Line */}
              {index < 2 && (
                <div className="hidden md:block absolute top-20 left-full w-full h-[2px]">
                  <div className="w-full h-full bg-gradient-to-r from-white/20 to-transparent" />
                </div>
              )}
              
              <div className="glass-card rounded-3xl p-8 h-full relative overflow-hidden group hover:border-blue-500/30 transition-colors duration-500">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Step Number */}
                <div className="absolute top-6 right-6 text-6xl font-display font-bold text-white/5 group-hover:text-white/10 transition-colors">
                  {item.step}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl mb-6 relative`}>
                  {item.icon}
                </div>

                <h3 className="font-display font-bold text-2xl mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForOwners() {
  return (
    <section id="for-owners" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Own a studio?
              <br />
              <span className="gradient-text-animated">Earn more.</span>
            </h2>
            <p className="text-gray-400 text-xl mb-10 leading-relaxed">
              Turn your empty calendar slots into revenue. We handle bookings, 
              payments, and scheduling so you can focus on what you do best.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "List for free — no monthly fees",
                "You control your availability and pricing",
                "Get paid directly to your bank",
                "Only 10% platform fee per booking"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="/list-your-space"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg shadow-white/10"
              >
                List Your Studio
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
            <div className="glass-card rounded-3xl p-8 relative">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "$0", label: "to list", color: "text-blue-400" },
                  { value: "10%", label: "platform fee", color: "text-purple-400" },
                  { value: "24h", label: "to get paid", color: "text-green-400" },
                  { value: "$2.4k", label: "avg monthly", color: "text-yellow-400" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="text-center p-6 glass rounded-2xl"
                  >
                    <div className={`text-4xl font-display font-bold ${stat.color} mb-2`}>{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote: "Booked a session at 2am for 10am same day. Walked in, everything was ready. Game changer.",
      author: "Marcus T.",
      role: "Producer",
      avatar: "🎵",
    },
    {
      quote: "No more DMs, no more waiting. I see what's available, I book, I'm done. Love it.",
      author: "Sarah K.",
      role: "Photographer",
      avatar: "📸",
    },
    {
      quote: "As a studio owner, I've doubled my bookings. The calendar sync is automatic. Beautiful.",
      author: "Jamal R.",
      role: "Studio Owner",
      avatar: "🎙️",
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Loved by <span className="gradient-text">Creators</span>
          </h2>
          <p className="text-gray-400 text-lg">See what artists are saying about OneTime</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card rounded-3xl p-8 relative group hover:border-white/20 transition-colors"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-6xl text-white/5 font-serif">"</div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed relative z-10">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative"
      >
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
          Ready to <span className="gradient-text">create?</span>
        </h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Join thousands of artists booking studio space instantly. 
          No phone calls. No waiting. Just create.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link 
              href="/studios"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg shadow-white/10"
            >
              <Zap className="w-5 h-5" />
              Find a Studio
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link 
              href="/list-your-space"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 glass text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              List Your Space
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg">OneTime</span>
            </Link>
            <p className="text-sm text-gray-400">
              The fastest way to book professional studio space.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Artists</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/studios" className="hover:text-white transition-colors">Search Studios</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Owners</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/list-your-space" className="hover:text-white transition-colors">List Your Studio</Link></li>
              <li><Link href="/dashboard/owner" className="hover:text-white transition-colors">Owner Dashboard</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2024 OneTime Studios. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Secure payments by Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
