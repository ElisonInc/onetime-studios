'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Clock, 
  MapPin, 
  ArrowRight,
  Music,
  Camera,
  Mic,
  Film
} from 'lucide-react';
import { getBookingsByUser, getProfile } from '@/lib/data';
import { Booking, Profile } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const { isSignedIn, userId } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/');
      return;
    }

    async function loadData() {
      if (userId) {
        const [userBookings, userProfile] = await Promise.all([
          getBookingsByUser(userId),
          getProfile(userId),
        ]);
        setBookings(userBookings);
        setProfile(userProfile);
      }
      setLoading(false);
    }

    loadData();
  }, [isSignedIn, userId, router]);

  if (!isSignedIn) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full" />
      </div>
    );
  }

  const upcomingBookings = bookings.filter(b => 
    new Date(b.date) >= new Date() && 
    !['cancelled', 'refunded'].includes(b.status)
  );

  const pastBookings = bookings.filter(b => 
    new Date(b.date) < new Date() || 
    ['completed', 'cancelled', 'refunded'].includes(b.status)
  );

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {profile?.first_name || 'Creator'}
          </h1>
          <p className="text-gray-400">Manage your bookings and find your next studio</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl font-bold text-blue-400 mb-1">{upcomingBookings.length}</div>
            <div className="text-gray-400">Upcoming Sessions</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl font-bold text-purple-400 mb-1">{pastBookings.length}</div>
            <div className="text-gray-400">Past Sessions</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl font-bold text-green-400 mb-1">
              ${bookings.reduce((sum, b) => sum + (b.total_amount || 0), 0)}
            </div>
            <div className="text-gray-400">Total Spent</div>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
            <Link 
              href="/studios" 
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              Book New Session
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {upcomingBookings.length === 0 ? (
            <div className="bg-white/5 border border-white/10 border-dashed rounded-2xl p-12 text-center">
              <div className="text-5xl mb-4">🎵</div>
              <h3 className="text-lg font-semibold mb-2">No upcoming sessions</h3>
              <p className="text-gray-400 mb-4">Ready to create? Find your perfect studio.</p>
              <Link 
                href="/studios"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
              >
                Find a Studio
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </div>

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Past Sessions</h2>
            <div className="space-y-4">
              {pastBookings.slice(0, 3).map((booking) => (
                <BookingCard key={booking.id} booking={booking} isPast />
              ))}
            </div>
          </div>
        )}

        {/* Owner CTA */}
        {profile?.role !== 'owner' && (
          <div className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2">Own a studio?</h2>
            <p className="text-gray-400 mb-4">
              List your space and start earning. Join thousands of studio owners.
            </p>
            <Link 
              href="/list-your-space"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
            >
              List Your Space
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function BookingCard({ booking, isPast = false }: { booking: Booking; isPast?: boolean }) {
  const studio = booking.studio;
  
  const typeIcons: Record<string, React.ReactNode> = {
    recording: <Music className="w-5 h-5" />,
    photography: <Camera className="w-5 h-5" />,
    podcast: <Mic className="w-5 h-5" />,
    rehearsal: <Music className="w-5 h-5" />,
    video: <Film className="w-5 h-5" />,
  };

  const icon = studio?.studio_type?.[0] 
    ? typeIcons[studio.studio_type[0]] 
    : <Music className="w-5 h-5" />;

  // Use icon to avoid unused variable warning
  void icon;

  return (
    <div className={`bg-white/5 border rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-6 ${
      isPast ? 'border-white/5 opacity-75' : 'border-white/10'
    }`}>
      {/* Date */}
      <div className="flex-shrink-0 w-20 text-center">
        <div className="text-sm text-gray-400 uppercase">
          {new Date(booking.date).toLocaleDateString('en-US', { month: 'short' })}
        </div>
        <div className="text-3xl font-bold">
          {new Date(booking.date).getDate()}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-1">{studio?.name || 'Studio Session'}</h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {booking.start_time} - {booking.end_time}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {studio?.city}, {studio?.state}
          </span>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-sm capitalize ${
          booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
          booking.status === 'pending_payment' ? 'bg-yellow-500/20 text-yellow-400' :
          booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
          'bg-white/10 text-gray-400'
        }`}>
          {booking.status.replace('_', ' ')}
        </span>
        {!isPast && (
          <Link 
            href={`/bookings/${booking.id}`}
            className="text-blue-400 hover:text-blue-300"
          >
            View
          </Link>
        )}
      </div>
    </div>
  );
}
