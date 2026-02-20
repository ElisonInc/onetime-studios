import { Suspense } from 'react';
import Link from 'next/link';
import { getFeaturedStudios } from '@/lib/data';
import { Hero } from './hero';
import { Studio } from '@/types';
import { MapPin, Star, Zap, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
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
    <section id="studios" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Studios</h2>
            <p className="text-gray-400">Hand-picked spaces available today</p>
          </div>
          <Link 
            href="/studios" 
            className="hidden md:flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
          >
            View all studios
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {studios.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-5xl mb-4">🏗️</div>
            <h3 className="text-xl font-semibold mb-2">Studios coming soon</h3>
            <p className="text-gray-400">We&apos;re onboarding new studios every day</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studios.map((studio) => (
              <StudioCard key={studio.id} studio={studio} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link href="/studios" className="inline-flex items-center gap-2 text-sm text-blue-400">
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
        <div className="h-10 bg-white/10 rounded w-64 mb-10 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] bg-white/10 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-white/10 rounded w-20 animate-pulse" />
                <div className="h-6 bg-white/10 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse" />
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

  return (
    <Link 
      href={`/studios/${studio.slug}`} 
      className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02]"
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl relative overflow-hidden">
        {emoji}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-white">
          ${studio.hourly_rate}/hr
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium">4.9</span>
          <span className="text-sm text-gray-400">(120+ reviews)</span>
        </div>
        
        <h3 className="font-semibold text-lg mb-1 text-white group-hover:text-blue-400 transition">
          {studio.name}
        </h3>
        <p className="text-sm text-gray-400 mb-3 flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {studio.city}, {studio.state}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {studio.studio_type?.slice(0, 2).map((type, i) => (
            <span key={i} className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-300 capitalize">
              {type}
            </span>
          ))}
          {studio.amenities?.slice(0, 2).map((amenity, i) => (
            <span key={i} className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-300">
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-white/5 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How OneTime Works</h2>
          <p className="text-gray-400 text-lg">
            Book professional studio space in 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Search",
              description: "Find studios near you with real-time availability. Filter by type, price, and amenities.",
            },
            {
              step: "02",
              title: "Book",
              description: "Select your time slot and pay securely. Your booking is confirmed instantly.",
            },
            {
              step: "03",
              title: "Create",
              description: "Show up and make magic. Rate your experience when you're done.",
            }
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="text-6xl font-bold text-white/5 absolute -top-6 left-0">{item.step}</div>
              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 h-full">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400 font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
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
    <section id="for-owners" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Own a studio?
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Earn more.
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Turn your empty calendar slots into revenue. We handle bookings, 
              payments, and scheduling so you can focus on what you do best.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "List for free — no monthly fees",
                "You control your availability and pricing",
                "Get paid directly to your bank",
                "Only 10% platform fee per booking"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <Link 
              href="/list-your-space"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition"
            >
              List Your Studio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white/5 rounded-2xl">
                <div className="text-4xl font-bold text-blue-400 mb-2">$0</div>
                <div className="text-sm text-gray-400">to list</div>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-2xl">
                <div className="text-4xl font-bold text-purple-400 mb-2">10%</div>
                <div className="text-sm text-gray-400">platform fee</div>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-2xl">
                <div className="text-4xl font-bold text-green-400 mb-2">24h</div>
                <div className="text-sm text-gray-400">to get paid</div>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-2xl">
                <div className="text-4xl font-bold text-yellow-400 mb-2">$2.4k</div>
                <div className="text-sm text-gray-400">avg monthly</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-white/5 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Creators</h2>
          <p className="text-gray-400">See what artists are saying about OneTime</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "Booked a session at 2am for 10am same day. Walked in, everything was ready. Game changer.",
              author: "Marcus T.",
              role: "Producer",
            },
            {
              quote: "No more DMs, no more waiting. I see what's available, I book, I'm done. Love it.",
              author: "Sarah K.",
              role: "Photographer",
            },
            {
              quote: "As a studio owner, I've doubled my bookings. The calendar sync is automatic. Beautiful.",
              author: "Jamal R.",
              role: "Studio Owner",
            }
          ].map((testimonial, i) => (
            <div key={i} className="bg-black/50 border border-white/10 rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">&quot;{testimonial.quote}&quot;</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
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
    <section className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Ready to create?
        </h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Join thousands of artists booking studio space instantly. 
          No phone calls. No waiting. Just create.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/studios"
            className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition inline-flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Find a Studio
          </Link>
          <Link 
            href="/list-your-space"
            className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-medium hover:bg-white/20 transition"
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
    <footer className="border-t border-white/10 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">OneTime</span>
            </Link>
            <p className="text-sm text-gray-400">
              The fastest way to book professional studio space.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Artists</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/studios" className="hover:text-white transition">Search Studios</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition">How It Works</Link></li>
              <li><Link href="#" className="hover:text-white transition">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Owners</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/list-your-space" className="hover:text-white transition">List Your Studio</Link></li>
              <li><Link href="/dashboard/owner" className="hover:text-white transition">Owner Dashboard</Link></li>
              <li><Link href="#" className="hover:text-white transition">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition">About</Link></li>
              <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition">Privacy</Link></li>
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
