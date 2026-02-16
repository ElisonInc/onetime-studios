'use client';

import { Star, MapPin, Clock } from 'lucide-react';
import type { Studio } from '@/lib/types';

export function StudioCard({ studio }: { studio: Studio }) {
  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-video bg-gray-200 overflow-hidden">
        <img
          src={studio.imageUrl}
          alt={studio.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {studio.featured && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
          ${studio.pricePerHour}/hr
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Name & Rating */}
        <div>
          <h3 className="font-bold text-gray-900 text-base line-clamp-1">{studio.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(studio.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              {studio.rating} ({studio.reviewCount})
            </span>
          </div>
        </div>

        {/* Location & Distance */}
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-gray-900">{studio.city}</p>
            <p className="text-xs">{studio.distance} miles away</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {studio.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              {tag}
            </span>
          ))}
          {studio.tags.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              +{studio.tags.length - 2}
            </span>
          )}
        </div>

        {/* Availability */}
        {studio.nextAvailableSlot && (
          <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 rounded-lg p-2">
            <Clock className="w-3 h-3" />
            <span>Available {studio.nextAvailableSlot}</span>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-sm transition">
            Pick time
          </button>
          <button className="px-3 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 font-semibold text-sm transition">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
