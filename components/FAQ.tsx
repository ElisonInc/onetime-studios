'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does payment work?',
      a: 'Your payment is securely held by Stripe when you book. The studio owner receives their cut immediately after your session is confirmed complete. You get your payment back if you cancel within the refund window.',
    },
    {
      q: 'Can I cancel my booking?',
      a: 'Yes. Free cancellation up to 24 hours before your session. Cancellations within 24 hours are subject to a 50% refund, depending on the studio\'s policy.',
    },
    {
      q: 'Is the availability really real-time?',
      a: 'Absolutely. Our system syncs directly with studio calendars. When you see a time slot available, it\'s actually available. We use database-level locking to prevent double-bookings.',
    },
    {
      q: 'What types of studios are on OTS?',
      a: 'Recording studios, photo studios, video production spaces, rehearsal rooms, podcast studios, and creative workspaces. We support all types of creative spaces.',
    },
    {
      q: 'How do I list my studio?',
      a: 'Click "List Your Studio" in the header. Add photos, set your pricing, configure your availability, and you\'re live. Bookings will start coming in right away.',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
          <p className="text-lg text-gray-600">Everything you need to know about booking and listing</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <button
              key={i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left"
            >
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.q}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {openIndex === i && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
