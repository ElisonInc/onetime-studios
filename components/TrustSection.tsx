'use client';

import { Clock, Zap, Lock } from 'lucide-react';

export function TrustSection() {
  const features = [
    {
      icon: Clock,
      title: 'Real-time Availability',
      description: 'See exactly when spaces are available. No guessing, no back-and-forth messaging.',
    },
    {
      icon: Zap,
      title: 'Instant Confirmation',
      description: 'Book and confirm your session immediately. Both sides know the deal is done.',
    },
    {
      icon: Lock,
      title: 'Payments Held Securely',
      description: 'Your money is held safely until the session is complete. Then everyone gets paid.',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why studios trust OTS</h2>
          <p className="text-xl text-gray-600">The platform built for creators, by creators</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition duration-300 mb-6">
                  <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
