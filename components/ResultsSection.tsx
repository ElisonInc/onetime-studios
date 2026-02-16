'use client';

import { StudioCard } from './StudioCard';
import { mockStudios } from '@/lib/mockStudios';
import { MapPin } from 'lucide-react';

export function ResultsSection() {
  return (
    <section id="search-section" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Showing 24 studios near Los Angeles</h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-600">
              Found <strong>{mockStudios.length}</strong> studios available
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 transition bg-white">
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="availability">Most Available</option>
            </select>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Results - Left Column (2/3 on desktop) */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-6">
              {mockStudios.map((studio) => (
                <StudioCard key={studio.id} studio={studio} />
              ))}
            </div>
          </div>

          {/* Map Placeholder - Right Column (1/3 on desktop) */}
          <div className="hidden lg:block sticky top-24 h-fit">
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 aspect-square flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-medium">Map view</p>
                <p className="text-sm text-gray-500">Coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 border-2 border-gray-300 text-gray-900 rounded-xl hover:border-gray-400 hover:bg-gray-50 font-semibold transition">
            Load More Results
          </button>
        </div>
      </div>
    </section>
  );
}
