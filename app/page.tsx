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
    <section id="studios" className="py-20 md:py-32 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16">
          <div className="reveal">
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
          <div className="text-center py-16 md:py-20 glass rounded-2xl md:rounded-3xl reveal">
            <div className="text-5xl md:text-6xl mb-4">🏗️</div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">Studios coming soon</h3>
            <p className="text-gray-400 px-4">We&apos;re onboarding new studios every day</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {studios.map((studio, index) => (
              <StudioCard key={studio.id} studio={studio} index={index} />
            ))}
          </div>
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
                <div className="h-3 md:h-4 bg-white/10 rounded w-1/2 animate-pulse" />
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
    <div className="reveal" style={{ animationDelay: `${index * 0.1}s` }}>
      <Link 
        href={`/studios/${studio.slug}`}
        className="group block"
      >
        <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden card-hover">
          {/* Image */}
          <div className="aspect-[4/3] relative overflow-hidden">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={studio.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
            <h3 className="font-display font-semibold text-lg md:text-xl mb-1.5 md:mb-2 text-white group-hover:text-blue-400 transition-colors">
              {studio.name}
            </h3>
            <p className="text-gray-400 mb-3 md:mb-4 flex items-center gap-1 text-sm">
              <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
              {studio.city}, {studio.state}
            </p>
            
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {studio.studio_type?.slice(0, 2).map((type, i) => (
                <span key={i} className="text-[10px] md:text-xs px-2 md:px-3 py-1 md:py-1.5 bg-white/5 rounded-full text-gray-300 capitalize border border-white/10">
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
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
    <section id="how-it-works" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-blue-500/5 rounded-full blur-[100px] md:blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20 reveal">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
            How <span className="gradient-text">OneTime</span> Works
          </h2>
          <p className="text-gray-400 text-base md:text-lg px-4">
            Book professional studio space in 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="reveal"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connection Line - Desktop */}
              {index < 2 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-[2px]">
                  <div className="w-full h-full bg-gradient-to-r from-white/20 to-transparent" />
                </div>
              )}
              
              <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 h-full relative overflow-hidden group hover:border-blue-500/30 transition-colors duration-500">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Step Number */}
                <div className="absolute top-4 md:top-6 right-4 md:right-6 text-4xl md:text-6xl font-display font-bold text-white/5 group-hover:text-white/10 transition-colors">
                  {item.step}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl md:text-3xl mb-4 md:mb-6 relative`}>
                  {item.icon}
                </div>

                <h3 className="font-display font-bold text-xl md:text-2xl mb-2 md:mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForOwners() {
  return (
    <section id="for-owners" className="py-20 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="reveal">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4 md:mb-6 leading-tight">
              Own a studio?
              <br />
              <span className="gradient-text-animated">Earn more.</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-8 md:mb-10 leading-relaxed">
              Turn your empty calendar slots into revenue. We handle bookings, 
              payments, and scheduling so you can focus on what you do best.
            </p>

            <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
              {[
                "List for free — no monthly fees",
                "You control your availability and pricing",
                "Get paid directly to your bank",
                "Only 10% platform fee per booking"
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 reveal"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                  </div>
                  <span className="text-gray-300 text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>

            <Link 
              href="/list-your-space"
              className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg shadow-white/10 text-sm md:text-base"
            >
              List Your Studio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="reveal relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl md:rounded-3xl blur-3xl" />
            <div className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-8 relative">
              <div className="grid grid-cols-2 gap-3 md:gap-6">
                {[
                  { value: "$0", label: "to list", color: "text-blue-400" },
                  { value: "10%", label: "platform fee", color: "text-purple-400" },
                  { value: "24h", label: "to get paid", color: "text-green-400" },
                  { value: "$2.4k", label: "avg monthly", color: "text-yellow-400" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="text-center p-4 md:p-6 glass rounded-xl md:rounded-2xl reveal"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className={`text-2xl md:text-4xl font-display font-bold ${stat.color} mb-1 md:mb-2`}>{stat.value}</div>
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
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 reveal">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 md:mb-4">
            Loved by <span className="gradient-text">Creators</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg">See what artists are saying about OneTime</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="reveal"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 relative group hover:border-white/20 transition-colors h-full flex flex-col">
                {/* Quote Icon */}
                <div className="absolute top-4 md:top-6 right-4 md:right-6 text-4xl md:text-6xl text-white/5 font-serif">&quot;</div>
                
                {/* Stars */}
                <div className="flex gap-1 mb-4 md:mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-300 text-sm md:text-base mb-6 md:mb-8 leading-relaxed relative z-10 flex-grow">
                  &quot;{testimonial.quote}&quot;
                </p>
                
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg md:text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm md:text-base">{testimonial.author}</p>
                    <p className="text-xs md:text-sm text-gray-500">{testimonial.role}</p>
                  </div>
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
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-blue-500/10 rounded-full blur-[100px] md:blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative reveal">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4 md:mb-6">
          Ready to <span className="gradient-text">create?</span>
        </h2>
        <p className="text-base md:text-xl text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto px-4">
          Join thousands of artists booking studio space instantly. 
          No phone calls. No waiting. Just create.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
          <Link 
            href="/studios"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg shadow-white/10 text-sm md:text-base"
          >
            <Zap className="w-4 h-4 md:w-5 md:h-5" />
            Find a Studio
          </Link>
          <Link 
            href="/list-your-space"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 glass text-white rounded-full font-semibold hover:bg-white/10 transition-colors text-sm md:text-base"
          >
            List Your Space
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
              </div>
              <span className="font-display font-bold text-base md:text-lg">OneTime</span>
            </Link>
            <p className="text-xs md:text-sm text-gray-400">
              The fastest way to book professional studio space.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-sm md:text-base">For Artists</h4>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-400">
              <li><Link href="/studios" className="hover:text-white transition-colors">Search Studios</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm md:text-base">For Owners</h4>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-400">
              <li><Link href="/list-your-space" className="hover:text-white transition-colors">List Your Studio</Link></li>
              <li><Link href="/dashboard/owner" className="hover:text-white transition-colors">Owner Dashboard</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm md:text-base">Company</h4>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-xs md:text-sm text-gray-500">
            © 2024 OneTime Studios. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
            <Shield className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>Secure payments by Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
