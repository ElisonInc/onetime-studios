'use client';

import { useState } from 'react';
import { ChevronDown, MapPin, Calendar, Clock, Zap, CheckCircle, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full bg-white">
      {/* Header/Navigation */}
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-lg">OneTime Studios</span>
          </div>
          <nav className="flex gap-6 text-sm">
            <a href="#search" className="text-gray-600 hover:text-gray-900">Search Studios</a>
            <a href="#owner" className="text-gray-600 hover:text-gray-900">For Owners</a>
          </nav>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Sign In</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Get Started</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">🟢 1,240 studios available now</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Book Studio Space in Under 2 Minutes
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Real availability. Instant confirmation. No back-and-forth.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto">
              <MapPin className="w-4 h-4" />
              Search by date & time
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              List your studio
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mt-12">
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
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="grid md:grid-cols-5 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input type="text" placeholder="Enter city" className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input type="date" className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <input type="time" className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Session Type</label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option>All Types</option>
                  <option>Recording</option>
                  <option>Photo</option>
                  <option>Video</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 font-medium">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mt-8">
            <p className="text-gray-600 mb-6">Showing 24 studios near Los Angeles</p>
            <div className="flex gap-4 items-center mb-6">
              <span className="text-sm text-gray-600">Sort by:</span>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm">Availability</button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                  <div className="bg-gray-200 h-40"></div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">Studio {i}</h4>
                    <p className="text-sm text-gray-600 mb-4">Professional recording space with equipment</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">$50/hr</span>
                      <button className="text-blue-600 text-sm hover:underline">Pick a time</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Artists Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why artists trust OTS</h2>
          <p className="text-center text-gray-600 mb-12">Built for creators, by creators</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '📅', title: 'Real-time availability', desc: 'What you see is what you get. No surprises.' },
              { icon: '⚡', title: 'Instant booking', desc: 'Book in under 2 minutes. Confirmed immediately.' },
              { icon: '🔒', title: 'Payments held securely', desc: 'Your money is safe until your session completes.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Studio Owners */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-4">For Studio Owners</h2>
            <h3 className="text-2xl font-semibold mb-6">Turn unused studio time into revenue</h3>
            <p className="mb-8 text-gray-300">
              We handle scheduling, bookings, and payments. You focus on creating.
            </p>
            <div className="flex gap-4 mb-8">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                List your studio
              </button>
              <button className="px-6 py-3 border border-white rounded-lg hover:bg-white/10">
                Learn more
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold mb-2">$0</div>
                <p className="text-gray-300">to list</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">10%</div>
                <p className="text-gray-300">platform fee</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24h</div>
                <p className="text-gray-300">payout time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Common questions</h2>
          <div className="space-y-4">
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
                <summary className="cursor-pointer p-4 font-medium flex items-center justify-between hover:bg-white">
                  {item.q}
                  <ChevronDown className="w-5 h-5 group-open:rotate-180 transition" />
                </summary>
                <div className="px-4 pb-4 text-gray-600 bg-white border-t">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to book your next session?</h2>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            Find Studios Near You
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5" />
                <span className="font-bold">OneTime Studios</span>
              </div>
              <p className="text-sm text-gray-400">The fastest way to book studio space.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Bookers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Search Studios</a></li>
                <li><a href="#" className="hover:text-white">My Bookings</a></li>
                <li><a href="#" className="hover:text-white">Help</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Owners</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">List Studio</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex justify-between items-center text-sm text-gray-400">
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
