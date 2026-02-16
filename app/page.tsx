'use client';

import { useState } from 'react';
import { ChevronDown, MapPin, Zap, CheckCircle, Shield, Menu, X } from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuth = (type: 'signin' | 'signup') => {
    console.log(`${type === 'signin' ? 'Sign In' : 'Get Started'} clicked`);
    // TODO: Integrate with Clerk authentication
    alert(`${type === 'signin' ? 'Sign In' : 'Get Started'} flow - Ready for Clerk integration`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search submitted');
    alert('Search functionality ready - Connect to Supabase for real studio data');
  };

  const handlePickTime = (studioId: number) => {
    console.log(`Pick time for studio ${studioId}`);
    alert(`Booking flow for Studio ${studioId} - Ready for Stripe payment integration`);
  };

  return (
    <div className="w-full bg-white">
      {/* Header/Navigation */}
      <header className="border-b sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-lg hidden sm:inline">OneTime Studios</span>
            <span className="font-bold text-base sm:hidden">OTS</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex gap-6 text-sm">
            <a href="#search" className="text-gray-600 hover:text-gray-900">Search Studios</a>
            <a href="#owner" className="text-gray-600 hover:text-gray-900">For Owners</a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden sm:flex gap-2">
            <button 
              onClick={() => handleAuth('signin')}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm"
            >
              Sign In
            </button>
            <button 
              onClick={() => handleAuth('signup')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t bg-white">
            <nav className="px-4 py-4 space-y-3">
              <button 
                onClick={() => {
                  handleNavigation('search');
                  setMobileMenuOpen(false);
                }}
                className="block text-gray-600 hover:text-gray-900 w-full text-left"
              >
                Search Studios
              </button>
              <button 
                onClick={() => {
                  handleNavigation('owner');
                  setMobileMenuOpen(false);
                }}
                className="block text-gray-600 hover:text-gray-900 w-full text-left"
              >
                For Owners
              </button>
              <hr className="my-3" />
              <button 
                onClick={() => handleAuth('signin')}
                className="w-full px-4 py-2 text-gray-600 hover:text-gray-900 text-left"
              >
                Sign In
              </button>
              <button 
                onClick={() => handleAuth('signup')}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Get Started
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm text-gray-600">🟢 1,240 studios available now</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Book Studio Space in Under 2 Minutes
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Real availability. Instant confirmation. No back-and-forth.
          </p>
          <div className="flex gap-3 justify-center flex-col sm:flex-row">
            <button 
              onClick={() => handleNavigation('search')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 justify-center w-full sm:w-auto"
            >
              <MapPin className="w-4 h-4" />
              <span>Search Studios</span>
            </button>
            <button 
              onClick={() => handleNavigation('owner')}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 w-full sm:w-auto"
            >
              List your studio
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto mt-10 sm:mt-12">
            <div className="p-4 bg-white rounded-lg border">
              <CheckCircle className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="font-medium text-sm">Instant confirmation</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <Zap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="font-medium text-sm">No back-and-forth</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="font-medium text-sm">Secure payment hold</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search" className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-50 rounded-xl p-4 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">Location</label>
                <input type="text" placeholder="Enter city" className="w-full border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">Date</label>
                <input type="date" className="w-full border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">Time</label>
                <input type="time" className="w-full border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">Type</label>
                <select className="w-full border rounded-lg px-3 py-2 text-sm">
                  <option>All Types</option>
                  <option>Recording</option>
                  <option>Photo</option>
                  <option>Video</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={handleSearch}
                  className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 font-medium text-sm"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mt-8">
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Showing 24 studios near Los Angeles</p>
            <div className="flex gap-2 sm:gap-4 items-center mb-4 sm:mb-6 overflow-x-auto pb-2">
              <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
              <button className="px-3 sm:px-4 py-2 border rounded-lg hover:bg-gray-50 text-xs sm:text-sm whitespace-nowrap">Availability</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                  <div className="bg-gray-200 h-40 sm:h-48"></div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Studio {i}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4">Professional recording space with equipment</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm sm:text-base">$50/hr</span>
                      <button 
                        onClick={() => handlePickTime(i)}
                        className="text-blue-600 text-xs sm:text-sm hover:underline"
                      >
                        Pick time
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Artists Trust Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 sm:mb-4">Why artists trust OTS</h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">Built for creators, by creators</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: '📅', title: 'Real-time availability', desc: 'What you see is what you get. No surprises.' },
              { icon: '⚡', title: 'Instant booking', desc: 'Book in under 2 minutes. Confirmed immediately.' },
              { icon: '🔒', title: 'Payments held securely', desc: 'Your money is safe until your session completes.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-base sm:text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Studio Owners */}
      <section id="owner" className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">For Studio Owners</h2>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Turn unused studio time into revenue</h3>
            <p className="mb-6 sm:mb-8 text-gray-300 text-sm sm:text-base">
              We handle scheduling, bookings, and payments. You focus on creating.
            </p>
            <div className="flex gap-3 sm:gap-4 mb-8 flex-col sm:flex-row">
              <button 
                onClick={() => handleNavigation('owner')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base w-full sm:w-auto"
              >
                List your studio
              </button>
              <button 
                onClick={() => alert('Learn more about our owner program - Ready for detailed info page')}
                className="px-6 py-3 border border-white rounded-lg hover:bg-white/10 text-sm sm:text-base w-full sm:w-auto"
              >
                Learn more
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              <div>
                <div className="text-2xl sm:text-3xl font-bold mb-2">$0</div>
                <p className="text-gray-300 text-xs sm:text-base">to list</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold mb-2">10%</div>
                <p className="text-gray-300 text-xs sm:text-base">platform fee</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold mb-2">24h</div>
                <p className="text-gray-300 text-xs sm:text-base">payout time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Common questions</h2>
          <div className="space-y-3 sm:space-y-4">
            {[
              {
                q: 'How does payment work?',
                a: 'Your payment is securely held by Stripe until your session completes. The studio owner receives payment only after your booking is fulfilled.',
              },
              {
                q: 'Can I cancel?',
                a: 'Yes. Free cancellation up to 24 hours before your session. Cancellations within 24 hours receive a 50% refund.',
              },
              {
                q: 'Is availability real-time?',
                a: 'Yes. When you see a time slot, it\'s actually available. Our system syncs directly with studio calendars to prevent double-booking.',
              },
              {
                q: 'What types of spaces are listed?',
                a: 'Recording studios, photo studios, rehearsal spaces, video/film studios, podcast rooms, and creative workspaces.',
              },
            ].map((item, i) => (
              <details key={i} className="group border rounded-lg">
                <summary className="cursor-pointer p-3 sm:p-4 font-medium flex items-center justify-between hover:bg-white text-sm sm:text-base">
                  {item.q}
                  <ChevronDown className="w-5 h-5 group-open:rotate-180 transition flex-shrink-0" />
                </summary>
                <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-gray-600 bg-white border-t text-xs sm:text-sm">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 sm:py-16 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Ready to book your next session?</h2>
          <button 
            onClick={() => handleNavigation('search')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium w-full sm:w-auto"
          >
            Find Studios Near You
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Zap className="w-5 h-5" />
                <span className="font-bold text-sm sm:text-base">OTS</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400">The fastest way to book studio space.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">For Bookers</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Search Studios</a></li>
                <li><a href="#" className="hover:text-white">My Bookings</a></li>
                <li><a href="#" className="hover:text-white">Help</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">For Owners</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">List Studio</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-400">
            <p>© 2024 OneTime Studios</p>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Secured by Stripe</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
