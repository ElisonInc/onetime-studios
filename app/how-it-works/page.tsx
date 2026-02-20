import { Metadata } from 'next';
import Link from 'next/link';
import { Search, Calendar, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works | OneTime Studios',
  description: 'Learn how to book professional studio space in under 2 minutes with OneTime Studios.',
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Booking Made Simple</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            No phone calls. No waiting. Just find, book, and create. 
            Here&apos;s how OneTime Studios works.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Search, step: 1, title: 'Search Studios', description: 'Browse studios by location, type, or availability.', color: 'blue' },
              { icon: Calendar, step: 2, title: 'Book Instantly', description: 'Select your date and time, and confirm immediately.', color: 'purple' },
              { icon: Zap, step: 3, title: 'Create', description: 'Show up and make magic. Everything will be ready.', color: 'green' },
            ].map((item) => (
              <div key={item.step} className="bg-black/50 border border-white/10 rounded-2xl p-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  item.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                  item.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                  'bg-green-500/10 text-green-400'
                }`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Book?</h2>
          <Link href="/studios" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium">
            Find a Studio
          </Link>
        </div>
      </section>
    </div>
  );
}
