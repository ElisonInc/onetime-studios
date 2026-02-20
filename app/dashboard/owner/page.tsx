'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Plus,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  Edit,
  Trash2
} from 'lucide-react';
import { getStudiosByOwner, getBookingsByStudio, getOwnerStats } from '@/lib/data';
import { Studio, Booking } from '@/types';

export default function OwnerDashboardPage() {
  const router = useRouter();
  const { isSignedIn, userId } = useAuth();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState({
    totalStudios: 0,
    totalBookings: 0,
    totalEarnings: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/');
      return;
    }

    async function loadData() {
      if (userId) {
        const [ownerStudios, ownerStats] = await Promise.all([
          getStudiosByOwner(userId),
          getOwnerStats(userId),
        ]);
        setStudios(ownerStudios);
        setStats(ownerStats);

        // Get bookings for first studio (or combine all)
        if (ownerStudios.length > 0) {
          const allBookings: Booking[] = [];
          for (const studio of ownerStudios) {
            const studioBookings = await getBookingsByStudio(studio.id);
            allBookings.push(...studioBookings);
          }
          setBookings(allBookings.sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          ));
        }
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

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Owner Dashboard</h1>
            <p className="text-gray-400">Manage your studios and track earnings</p>
          </div>
          <Link
            href="/studios/new"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
          >
            <Plus className="w-5 h-5" />
            Add New Studio
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Building2 className="w-5 h-5" />}
            label="Studios"
            value={stats.totalStudios}
            color="blue"
          />
          <StatCard
            icon={<Calendar className="w-5 h-5" />}
            label="Total Bookings"
            value={stats.totalBookings}
            color="purple"
          />
          <StatCard
            icon={<DollarSign className="w-5 h-5" />}
            label="Total Earnings"
            value={`$${stats.totalEarnings}`}
            color="green"
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Pending"
            value={stats.pendingBookings}
            color="yellow"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Studios List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your Studios</h2>
              <Link 
                href="/studios/new"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Add new
              </Link>
            </div>

            {studios.length === 0 ? (
              <div className="bg-white/5 border border-white/10 border-dashed rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No studios yet</h3>
                <p className="text-gray-400 mb-4">List your first studio and start earning</p>
                <Link
                  href="/studios/new"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add Studio
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {studios.map((studio) => (
                  <StudioCard key={studio.id} studio={studio} />
                ))}
              </div>
            )}
          </div>

          {/* Recent Bookings */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
            {bookings.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-gray-400">No bookings yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.slice(0, 5).map((booking) => (
                  <div 
                    key={booking.id} 
                    className="bg-white/5 border border-white/10 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{booking.studio?.name}</span>
                      <span className="text-sm text-green-400">+${booking.total_amount}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {booking.start_at_utc ? new Date(booking.start_at_utc).toLocaleDateString() : booking.date} · {booking.duration_hours || Math.round((new Date(booking.end_at_utc).getTime() - new Date(booking.start_at_utc).getTime()) / (1000 * 60 * 60))} hours
                    </div>
                    <div className="mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                        booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                        booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-white/10 text-gray-400'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number;
  color: 'blue' | 'purple' | 'green' | 'yellow';
}) {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-400',
    purple: 'bg-purple-500/10 text-purple-400',
    green: 'bg-green-500/10 text-green-400',
    yellow: 'bg-yellow-500/10 text-yellow-400',
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorClasses[color]}`}>
        {icon}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

function StudioCard({ studio }: { studio: Studio }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
      {/* Image */}
      <div className="w-full md:w-48 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-4xl flex-shrink-0 overflow-hidden">
        {studio.cover_image || studio.images?.[0] ? (
          <img 
            src={studio.cover_image || studio.images?.[0]} 
            alt={studio.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>🎵</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">{studio.name}</h3>
            <p className="text-gray-400 text-sm mb-2">{studio.city}, {studio.state}</p>
            <div className="flex flex-wrap gap-2">
              {studio.studio_type?.map((type, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-300 capitalize">
                  {type}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold">${studio.hourly_rate}/hr</div>
            <div className={`text-xs capitalize ${
              studio.status === 'active' ? 'text-green-400' : 'text-yellow-400'
            }`}>
              {studio.status}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex md:flex-col gap-2">
        <Link
          href={`/studios/${studio.slug}/edit`}
          className="p-2 border border-white/10 rounded-lg hover:bg-white/5 transition"
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Link>
        <button
          className="p-2 border border-white/10 rounded-lg hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
