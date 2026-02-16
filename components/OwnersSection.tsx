'use client';

import { CheckCircle2 } from 'lucide-react';

export function OwnersSection() {
  const steps = [
    { number: '1', title: 'List Your Space', description: 'Add photos, pricing, and availability in minutes' },
    { number: '2', title: 'Accept Bookings', description: 'Get instant confirmed bookings from artists' },
    { number: '3', title: 'Get Paid', description: 'Money deposited within 24 hours, minus 10% fee' },
  ];

  return (
    <section id="owners" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Turn unused studio time into revenue</h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Stop leaving money on the table. List your space on OTS and get bookings from artists who are ready to book and pay instantly.
            </p>

            {/* How It Works */}
            <div className="space-y-6 mb-12">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition mb-8">
              List Your Studio
            </button>
          </div>

          {/* Right: Pricing Card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 lg:p-10">
            <div className="space-y-8">
              <div>
                <p className="text-gray-300 text-sm font-semibold mb-2">TO GET STARTED</p>
                <p className="text-5xl font-bold">$0</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">No setup fees</p>
                    <p className="text-sm text-gray-400">List instantly for free</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">10% platform fee</p>
                    <p className="text-sm text-gray-400">Only on bookings you make</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">24 hour payouts</p>
                    <p className="text-sm text-gray-400">Money in your account next day</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/20 pt-8">
                <p className="text-gray-300 text-sm mb-4">
                  Average studio earns <span className="font-bold text-white">$3,200/month</span>
                </p>
                <p className="text-xs text-gray-400 italic">
                  Based on 8 bookings per month at $50/hr average rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
