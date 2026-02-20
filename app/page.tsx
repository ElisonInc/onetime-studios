import { Suspense } from 'react';
import { getFeaturedStudios } from '@/lib/data';
import { Hero } from './hero';
import { Studio } from '@/types';
import Link from 'next/link';
import { MapPin, Star, ArrowRight, Zap, CheckCircle2, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Hero />
      
      <Suspense fallback={<FeaturedStudiosSkeleton />}>
        <FeaturedStudios />
      </Suspense>
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Categories */}
      <CategoriesSection />
      
      <HowItWorks />
      <ForOwners />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

async function FeaturedStudios() {
  const studios = await getFeaturedStudios(8);

  return (
    <section id="studios" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16">
          <div>
            <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-2 block">Discover</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 md:mb-4">
              Featured <span className="gradient-text">Studios</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg">Hand-picked spaces available today</p>
          </div>
          
          <div className="hidden md:block mt-4 md:mt-0">
            <Link 
              href="/studios" 
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
            >
              View all studios
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {studios.length === 0 ? (
          <div className="text-center py-16 md:py-20 glass rounded-2xl md:rounded-3xl">
            <div className="text-5xl md:text-6xl mb-4">🏗️</div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">Studios coming soon</h3>
            <p className="text-gray-400 px-4">We&apos;re onboarding new studios every day</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {studios.slice(0, 4).map((studio) => (
                <StudioCard key={studio.id} studio={studio} />
              ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-4 md:mt-6">
              {studios.slice(4, 8).map((studio) => (
                <StudioCard key={studio.id} studio={studio} />
              ))}
            </div>
          </>
        )}

        <div className="mt-8 md:mt-12 text-center md:hidden">
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
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-12 md:h-16 bg-white/10 rounded-2xl w-64 md:w-96 mb-10 md:mb-16 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass rounded-2xl md:rounded-3xl overflow-hidden">
              <div className="aspect-[4/3] bg-white/10 animate-pulse" />
              <div className="p-4 md:p-6 space-y-3">
                <div className="h-4 md:h-5 bg-white/10 rounded w-24 animate-pulse" />
                <div className="h-6 md:h-7 bg-white/10 rounded w-3/4 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioCard({ studio }: { studio: Studio }) {
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
    <Link 
      href={`/studios/${studio.slug}`}
      className="group block"
    >
      <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden hover:border-white/20 transition-colors">
        {/* Image */}
        <div className="aspect-[4/3] relative overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={studio.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-5xl md:text-6xl">
              {emoji}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 md:px-3 md:py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs md:text-sm font-semibold">
                ${studio.hourly_rate}/hr
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
                <span className="text-xs md:text-sm font-medium">4.9</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <h3 className="font-display font-semibold text-lg md:text-xl mb-1.5 text-white group-hover:text-blue-400 transition-colors">
            {studio.name}
          </h3>
          <p className="text-gray-400 mb-3 flex items-center gap-1 text-sm">
            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
            {studio.city}, {studio.state}
          </p>
          
          <div className="flex flex-wrap gap-1.5">
            {studio.studio_type?.slice(0, 2).map((type, i) => (
              <span key={i} className="text-[10px] md:text-xs px-2 py-1 bg-white/5 rounded-full text-gray-300 capitalize border border-white/10">
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function StatsSection() {
  const stats = [
    { value: '1,240+', label: 'Studios', icon: '🎵' },
    { value: '50K+', label: 'Bookings', icon: '📅' },
    { value: '$2.4M', label: 'Artist Earnings', icon: '💰' },
    { value: '4.9', label: 'Average Rating', icon: '⭐' },
  ];

  return (
    <section className="py-16 md:py-24 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-5xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-4xl font-display font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const categories = [
    { name: 'Recording', icon: '🎙️', count: '420+', color: 'from-blue-500 to-cyan-400', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop&q=80' },
    { name: 'Photo', icon: '📸', count: '380+', color: 'from-purple-500 to-pink-400', image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=400&h=300&fit=crop&q=80' },
    { name: 'Video', icon: '🎬', count: '290+', color: 'from-pink-500 to-rose-400', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop&q=80' },
    { name: 'Rehearsal', icon: '🎸', count: '150+', color: 'from-green-500 to-emerald-400', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop&q=80' },
  ];

  return (
    <section className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-2 block">Browse by</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">Studio Categories</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <Link 
              key={i} 
              href={`/studios?type=${cat.name.toLowerCase()}`}
              className="group relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/3]"
            >
              <img 
                src={cat.image} 
                alt={cat.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                <div className="text-2xl md:text-4xl mb-2">{cat.icon}</div>
                <h3 className="text-xl md:text-2xl font-display font-bold mb-1">{cat.name}</h3>
                <p className="text-gray-300 text-sm">{cat.count} studios</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { step: "01", title: "Search", description: "Find studios with real-time availability", icon: "🔍" },
    { step: "02", title: "Book", description: "Select time slot and pay securely", icon: "⚡" },
    { step: "03", title: "Create", description: "Show up and make magic happen", icon: "✨" },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32 relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-2 block">Simple Process</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 md:mb-6">
            How <span className="gradient-text">OneTime</span> Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {steps.map((item, index) => (
            <div key={index} className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8">
              <div className="text-5xl md:text-6xl font-display font-bold text-white/5 absolute top-4 right-4">
                {item.step}
              </div>
              <div className="text-3xl md:text-4xl mb-4">{item.icon}</div>
              <h3 className="font-display font-bold text-xl md:text-2xl mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm md:text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForOwners() {
  return (
    <section id="for-owners" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase mb-2 block">For Owners</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4 md:mb-6">
              Own a studio?
              <br />
              <span className="gradient-text">Earn more.</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-8">
              Turn your empty calendar slots into revenue.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "List for free — no monthly fees",
                "You control availability and pricing",
                "Get paid directly to your bank",
                "Only 10% platform fee"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <Link 
              href="/list-your-space"
              className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              List Your Studio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative">
            <div className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-8">
              <div className="grid grid-cols-2 gap-3 md:gap-6">
                {[
                  { value: "$0", label: "to list", color: "text-blue-400" },
                  { value: "10%", label: "platform fee", color: "text-purple-400" },
                  { value: "24h", label: "to get paid", color: "text-green-400" },
                  { value: "$2.4k", label: "avg monthly", color: "text-yellow-400" },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 md:p-6 glass rounded-xl">
                    <div className={`text-2xl md:text-4xl font-display font-bold ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    { quote: "Booked a session at 2am for 10am same day. Everything was ready. Game changer.", author: "Marcus T.", role: "Producer", avatar: "🎵" },
    { quote: "No more DMs, no more waiting. I see what's available, I book, I'm done.", author: "Sarah K.", role: "Photographer", avatar: "📸" },
    { quote: "As a studio owner, I've doubled my bookings. The calendar sync is automatic.", author: "Jamal R.", role: "Studio Owner", avatar: "🎙️" },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-pink-400 text-sm font-semibold uppercase mb-2 block">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Loved by <span className="gradient-text">Creators</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 text-sm md:text-base mb-6">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.author}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      <div className="max-w-4xl mx-auto px-4 text-center relative">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
          Ready to <span className="gradient-text">create?</span>
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Join thousands of artists booking studio space instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/studios" className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100">
            <Zap className="w-4 h-4" />
            Find a Studio
          </Link>
          <Link href="/list-your-space" className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 glass rounded-full font-semibold hover:bg-white/10">
            List Your Space
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg">OneTime</span>
            </Link>
            <p className="text-sm text-gray-400">The fastest way to book professional studio space.</p>
          </div>
          
          {[
            { title: 'For Artists', links: ['Search Studios', 'How It Works', 'Help Center'] },
            { title: 'For Owners', links: ['List Your Studio', 'Owner Dashboard', 'Resources'] },
            { title: 'Company', links: ['About', 'Careers', 'Privacy'] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {col.links.map((link, j) => (
                  <li key={j}><Link href="#" className="hover:text-white transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2024 OneTime Studios. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Secure payments by Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
