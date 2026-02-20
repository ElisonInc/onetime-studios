'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard,
  Shield,
  CheckCircle2
} from 'lucide-react';
import { createBooking } from '@/lib/data';
import { Studio } from '@/types';

export function BookContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isSignedIn, userId } = useAuth();
  
  const studioId = searchParams.get('studio');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const duration = parseInt(searchParams.get('duration') || '2');

  const [studio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!studioId) {
      router.push('/studios');
      return;
    }
    setLoading(false);
  }, [studioId, router]);

  if (!studioId || !date || !time) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Booking</h1>
          <p className="text-gray-400 mb-6">Please select a studio and time first.</p>
          <Link href="/studios" className="text-blue-400 hover:text-blue-300">
            Browse Studios
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full" />
      </div>
    );
  }

  // Mock studio for demo
  const mockStudio: Studio = {
    id: studioId,
    owner_id: 'owner-1',
    name: 'Neon Sound Labs',
    slug: 'neon-sound-labs',
    description: 'Professional recording studio',
    address: '123 Music Row',
    city: 'Los Angeles',
    state: 'CA',
    country: 'US',
    studio_type: ['recording'],
    amenities: ['SSL Console', 'Vocal Booth'],
    hourly_rate: 75,
    minimum_booking_hours: 1,
    images: [],
    status: 'active',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const studioData = studio || mockStudio;
  const hourlyRate = studioData.hourly_rate;
  const subtotal = hourlyRate * duration;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const handleConfirmBooking = async () => {
    if (!isSignedIn || !userId) return;
    
    setProcessing(true);

    const [hours, minutes] = time.split(':').map(Number);
    const endHours = hours + duration;
    const endTime = `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    // Build UTC timestamps from date and time strings
    const startAtUtc = new Date(`${date}T${time}:00`).toISOString();
    const endAtUtc = new Date(`${date}T${endTime}:00`).toISOString();

    const booking = await createBooking({
      studio_id: studioId!,
      booker_id: userId,
      start_at_utc: startAtUtc,
      end_at_utc: endAtUtc,
      price_total: total,
      stripe_payment_intent_id: null,
      status: 'pending',
      expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 min hold
      confirmed_at: null,
    });

    setProcessing(false);
    if (booking) {
      setStep(3);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href={`/studios/${studioData.slug}`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to studio
        </Link>

        <h1 className="text-3xl font-bold mb-8">Confirm your booking</h1>

        <div className="flex items-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                step >= s ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400'
              }`}>
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-0.5 ${step > s ? 'bg-blue-500' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-3xl">
                    🎵
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{studioData.name}</h3>
                    <p className="text-gray-400 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {studioData.city}, {studioData.state}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Date</p>
                      <p className="font-medium">{date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Time</p>
                      <p className="font-medium">{time} ({duration} hours)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Price Details</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">${hourlyRate} x {duration} hours</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Service fee</span>
                  <span>${serviceFee}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Method
              </h2>
              <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded" />
                  <div>
                    <p className="font-medium">Card ending in 4242</p>
                    <p className="text-sm text-gray-400">Expires 12/25</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400">Total due now</p>
                  <p className="text-2xl font-bold">${total}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4" />
                  Secure payment
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 border border-white/20 rounded-xl font-medium hover:bg-white/5 transition"
              >
                Back
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={processing}
                className="flex-1 py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition disabled:opacity-50"
              >
                {processing ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-gray-400 mb-6">
              Your session at {studioData.name} has been booked.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
