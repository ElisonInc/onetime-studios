'use client';

import { ArrowRight, Shield, Zap } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to book your next session?</h2>
        <p className="text-xl text-blue-100 mb-12">Join 1,240+ artists who've booked with OTS</p>
        <button className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 rounded-2xl hover:bg-blue-50 font-bold text-lg transition-all transform hover:scale-105">
          Find Studios Near You
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">OTS</span>
            </div>
            <p className="text-sm">The fastest way to book studio space.</p>
          </div>

          {/* For Bookers */}
          <div>
            <h4 className="font-semibold text-white mb-4">For Bookers</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Search Studios</a></li>
              <li><a href="#" className="hover:text-white transition">My Bookings</a></li>
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            </ul>
          </div>

          {/* For Owners */}
          <div>
            <h4 className="font-semibold text-white mb-4">For Owners</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">List Studio</a></li>
              <li><a href="#" className="hover:text-white transition">Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2024 OneTime Studios. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4" />
              <span>Secured by Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
