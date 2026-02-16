'use client';

import { useState } from 'react';
import { MapPin, Calendar, Clock, Filter, Search } from 'lucide-react';

export function SearchBar({ onSearch }: { onSearch?: (params: any) => void }) {
  const [location, setLocation] = useState('Los Angeles, CA');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch?.({ location, date, time, type });
  };

  return (
    <div className="space-y-6">
      {/* Search Card - Desktop & Tablet */}
      <div className="hidden sm:block bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          {/* Location */}
          <div className="lg:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Where
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or neighborhood"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Date */}
          <div className="lg:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              When
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Time */}
          <div className="lg:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Type */}
          <div className="lg:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
            >
              <option value="">All types</option>
              <option value="recording">Recording</option>
              <option value="photo">Photo</option>
              <option value="video">Video</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="lg:col-span-1 flex items-end">
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold py-3 transition flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>

        {/* Filters Toggle */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <p className="text-xs text-gray-500">Showing 24 studios near Los Angeles</p>
        </div>
      </div>

      {/* Mobile Search - Bottom Sheet Style */}
      <div className="sm:hidden bg-white rounded-t-3xl p-4 space-y-4 border-t border-gray-200">
        <div className="space-y-3">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-sm"
          >
            <option value="">Studio type</option>
            <option value="recording">Recording</option>
            <option value="photo">Photo</option>
            <option value="video">Video</option>
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}
