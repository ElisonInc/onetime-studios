'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { 
  MapPin, 
  Star, 
  CheckCircle2, 
  Shield,
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Studio } from '@/types';

interface StudioDetailProps {
  studio: Studio;
}

export function StudioDetail({ studio }: StudioDetailProps) {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [duration, setDuration] = useState<number>(2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const totalPrice = studio.hourly_rate * duration;
  const today = new Date().toISOString().split('T')[0];

  const timeSlots = [];
  for (let i = 9; i <= 22; i++) {
    timeSlots.push(`${i.toString().padStart(2, '0')}:00`);
  }

  const handleBookNow = () => {
    if (!isSignedIn) return;
    if (!selectedDate || !selectedTime) return;

    const params = new URLSearchParams({
      studio: studio.id,
      date: selectedDate,
      time: selectedTime,
      duration: duration.toString(),
    });

    router.push(`/book?${params.toString()}`);
  };

  const nextImage = () => {
    if (studio.images && studio.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % studio.images.length);
    }
  };

  const prevImage = () => {
    if (studio.images && studio.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + studio.images.length) % studio.images.length);
    }
  };

  const currentImage = studio.images?.[currentImageIndex] || studio.cover_image;

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link 
          href="/studios" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to studios
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image Gallery */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
              {currentImage ? (
                <img 
                  src={currentImage} 
                  alt={studio.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl">
                  🎵
                </div>
              )}
              
              {studio.is_verified && (
                <div className="absolute top-4 left-4 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 px-3 py-1 rounded-full text-xs text-blue-300 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Verified
                </div>
              )}

              {/* Image Navigation */}
              {studio.images && studio.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {studio.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition ${
                          idx === currentImageIndex ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Grid */}
            {studio.images && studio.images.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {studio.images.slice(0, 6).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                      idx === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">4.9</span>
                <span className="text-gray-400">· 120+ reviews</span>
                <span className="text-gray-600">·</span>
                <span className="text-gray-400">{studio.city}, {studio.state}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{studio.name}</h1>
              <div className="flex flex-wrap gap-2">
                {studio.studio_type?.map((type, i) => (
                  <span key={i} className="text-sm px-3 py-1 bg-white/5 rounded-full text-gray-300 capitalize">
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="border-t border-white/10 pt-8">
              <h2 className="text-xl font-semibold mb-4">About this studio</h2>
              <p className="text-gray-300 leading-relaxed">
                {studio.description || 'A professional studio space perfect for your creative needs.'}
              </p>
            </div>

            {/* Amenities */}
            <div className="border-t border-white/10 pt-8">
              <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {studio.amenities?.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">{amenity}</span>
                  </div>
                ))}
                {(!studio.amenities || studio.amenities.length === 0) && (
                  <>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Professional Equipment</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Climate Controlled</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Free Parking</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">WiFi Included</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="border-t border-white/10 pt-8">
              <h2 className="text-xl font-semibold mb-4">Where you'll be</h2>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="w-5 h-5 mt-0.5 text-gray-400" />
                <div>
                  <p>{studio.address}</p>
                  <p>{studio.city}, {studio.state} {studio.zip}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold">${studio.hourly_rate}</span>
                <span className="text-gray-400">/hour</span>
              </div>

              {/* Date Selection */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Select Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      min={today}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Start Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Duration</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setDuration(Math.max(1, duration - 1))}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="flex-1 text-center font-medium">{duration} hour{duration > 1 ? 's' : ''}</span>
                    <button
                      onClick={() => setDuration(duration + 1)}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-white/10 pt-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">${studio.hourly_rate} x {duration} hours</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Service fee</span>
                  <span>${Math.round(totalPrice * 0.1)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span>${Math.round(totalPrice * 1.1)}</span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBookNow}
                disabled={!selectedDate || !selectedTime}
                className="w-full py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!isSignedIn ? 'Sign in to Book' : 'Book Now'}
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
