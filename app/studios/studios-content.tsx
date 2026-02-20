'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, Star, Search, SlidersHorizontal, X } from 'lucide-react';
import { Studio } from '@/types';

interface StudiosContentProps {
  initialStudios: Studio[];
  searchParams: {
    location?: string;
    date?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

const studioTypes = [
  { value: 'recording', label: 'Recording Studio' },
  { value: 'photography', label: 'Photo Studio' },
  { value: 'video', label: 'Video Studio' },
  { value: 'rehearsal', label: 'Rehearsal Space' },
  { value: 'podcast', label: 'Podcast Studio' },
];

export function StudiosContent({ initialStudios, searchParams }: StudiosContentProps) {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);

  const [location, setLocation] = useState(searchParams.location || '');
  const [selectedType, setSelectedType] = useState(searchParams.type || '');
  const [minPrice, setMinPrice] = useState(searchParams.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.maxPrice || '');

  const handleSearch = () => {
    const newParams = new URLSearchParams();
    if (location) newParams.set('location', location);
    if (selectedType) newParams.set('type', selectedType);
    if (minPrice) newParams.set('minPrice', minPrice);
    if (maxPrice) newParams.set('maxPrice', maxPrice);
    
    router.push(`/studios?${newParams.toString()}`);
  };

  const clearFilters = () => {
    setLocation('');
    setSelectedType('');
    setMinPrice('');
    setMaxPrice('');
    router.push('/studios');
  };

  const hasFilters = location || selectedType || minPrice || maxPrice;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Your Perfect Studio</h1>
        <p className="text-gray-400">Browse {initialStudios.length} professional studios available for booking</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by city or state..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 bg-white text-black rounded-xl px-6 py-3 font-medium hover:bg-gray-200 transition"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-2 border rounded-xl px-6 py-3 font-medium transition ${
              showFilters ? 'border-blue-500 text-blue-400' : 'border-white/20 text-white hover:bg-white/5'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Studio Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">All Types</option>
                {studioTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Min Price ($/hr)</label>
              <input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Max Price ($/hr)</label>
              <input
                type="number"
                placeholder="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-end">
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                  Clear filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {initialStudios.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No studios found</h3>
          <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-blue-400 hover:text-blue-300"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialStudios.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
        </div>
      )}
    </div>
  );
}

function StudioCard({ studio }: { studio: Studio }) {
  const typeEmoji: Record<string, string> = {
    recording: '🎵',
    photography: '📸',
    video: '🎬',
    rehearsal: '🎸',
    podcast: '🎙️',
  };

  const emoji = studio.studio_type?.[0] ? typeEmoji[studio.studio_type[0]] || '🎵' : '🎵';

  return (
    <Link href={`/studios/${studio.slug}`} className="group">
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02]">
        {/* Image Placeholder */}
        <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl relative overflow-hidden">
          {emoji}
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-white">
            ${studio.hourly_rate}/hr
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">4.9</span>
            <span className="text-sm text-gray-400">(120+ reviews)</span>
          </div>

          <h3 className="font-semibold text-lg mb-1 text-white group-hover:text-blue-400 transition">
            {studio.name}
          </h3>
          <p className="text-sm text-gray-400 mb-3 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {studio.city}, {studio.state}
          </p>

          <div className="flex flex-wrap gap-2">
            {studio.studio_type?.slice(0, 2).map((type, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-300 capitalize">
                {type}
              </span>
            ))}
            {studio.amenities?.slice(0, 2).map((amenity, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-300">
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
