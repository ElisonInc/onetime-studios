import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, DollarSign, Calendar, Users, TrendingUp, Shield, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'List Your Studio | OneTime Studios',
  description: 'List your studio on OneTime and start earning from your empty calendar slots.',
};

export default function ListYourSpacePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-6">
                <DollarSign className="w-4 h-4" />
                Owners earn $2,400/mo on average
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Turn Your Empty Slots Into Revenue
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                List your studio on OneTime and reach thousands of artists looking 
                for professional space. You control your availability, pricing, and rules.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/studios/new"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition"
                >
                  List Your Studio
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 rounded-full font-medium hover:bg-white/5 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl border border-white/10 p-8">
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-400">This Month</span>
                      <span className="text-green-400 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +24%
                      </span>
                    </div>
                    <div className="text-4xl font-bold">$3,240</div>
                    <div className="text-gray-400">Total Earnings</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-2xl p-4">
                      <div className="text-2xl font-bold">18</div>
                      <div className="text-sm text-gray-400">Bookings</div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4">
                      <div className="text-2xl font-bold">4.9</div>
                      <div className="text-sm text-gray-400">Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="how-it-works" className="py-20 bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why List on OneTime?</h2>
            <p className="text-gray-400 text-lg">
              We&apos;ve built the tools you need to manage your studio business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: DollarSign, title: 'Keep 90%', description: 'Only 10% platform fee. The rest goes directly to you.' },
              { icon: Calendar, title: 'Full Control', description: 'Set your own schedule, pricing, and booking rules.' },
              { icon: Users, title: 'Reach More Artists', description: 'Access our growing community of creators.' },
              { icon: Shield, title: 'Protected', description: 'We handle payments, deposits, and disputes.' },
            ].map((benefit, i) => (
              <div key={i} className="bg-black/50 border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 text-blue-400">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">
              Get your studio listed and start earning in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Your Listing', description: 'Add photos, descriptions, amenities, and set your hourly rate.' },
              { step: '02', title: 'Set Your Schedule', description: 'Connect your calendar or manually set available time slots.' },
              { step: '03', title: 'Start Earning', description: 'Get booking requests, approve them, and get paid automatically.' },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-bold text-white/5 absolute -top-6 left-0">{item.step}</div>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white/5 border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple, Transparent Pricing</h2>
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-12">
            <div className="text-6xl font-bold mb-4">10%</div>
            <p className="text-xl text-gray-400 mb-8">Platform fee per booking</p>
            <div className="grid grid-cols-3 gap-8 text-left max-w-lg mx-auto">
              <div className="text-center">
                <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Free to list</p>
              </div>
              <div className="text-center">
                <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No monthly fees</p>
              </div>
              <div className="text-center">
                <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Cancel anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'How much does it cost to list?', a: 'Nothing! It is completely free to list your studio. We only take a 10% fee when you get a booking.' },
              { q: 'When do I get paid?', a: 'Payments are processed within 24 hours of the completed booking and deposited directly to your bank account.' },
              { q: 'What if someone damages my equipment?', a: 'We collect a security deposit from bookers and offer protection programs for verified studios.' },
              { q: 'Can I decline booking requests?', a: 'Yes! You have full control. You can set instant booking or require approval for each request.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Earning?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join thousands of studio owners already earning on OneTime. 
            Listing takes less than 10 minutes.
          </p>
          <Link
            href="/studios/new"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition"
          >
            List Your Studio Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
