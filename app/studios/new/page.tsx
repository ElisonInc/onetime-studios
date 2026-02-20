'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { createStudio } from '@/lib/data';
import { ImageUpload } from '@/components/image-upload';

const studioTypes = [
  { value: 'recording', label: 'Recording Studio' },
  { value: 'photography', label: 'Photo Studio' },
  { value: 'video', label: 'Video Studio' },
  { value: 'rehearsal', label: 'Rehearsal Space' },
  { value: 'podcast', label: 'Podcast Studio' },
];

const commonAmenities = [
  'WiFi', 'Parking', 'Air Conditioning', 'Restroom', 
  'Waiting Area', 'Kitchen', 'Wheelchair Accessible', '24/7 Access'
];

export default function NewStudioPage() {
  const router = useRouter();
  const { isSignedIn, userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    hourlyRate: '50',
    minimumHours: '1',
    studioTypes: [] as string[],
    amenities: [] as string[],
    customAmenity: '',
  });

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
          <p className="text-gray-400 mb-6">Please sign in to list your studio.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!userId) {
      setError('You must be signed in');
      setLoading(false);
      return;
    }

    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const studio = await createStudio({
      owner_id: userId,
      name: formData.name,
      slug,
      description: formData.description,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      hourly_rate: parseInt(formData.hourlyRate),
      minimum_booking_hours: parseInt(formData.minimumHours),
      studio_type: formData.studioTypes,
      amenities: formData.amenities,
      images: images,
      cover_image: images[0] || undefined,
      status: 'active',
    });

    if (studio) {
      router.push('/dashboard/owner');
    } else {
      setError('Failed to create studio. Please try again.');
      setLoading(false);
    }
  };

  const toggleStudioType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      studioTypes: prev.studioTypes.includes(type)
        ? prev.studioTypes.filter(t => t !== type)
        : [...prev.studioTypes, type]
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const addCustomAmenity = () => {
    if (formData.customAmenity && !formData.amenities.includes(formData.customAmenity)) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, formData.customAmenity],
        customAmenity: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard/owner" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="text-3xl font-bold mb-2">List Your Studio</h1>
        <p className="text-gray-400 mb-8">Share your space with creators and start earning</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Images */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Photos</h2>
            <p className="text-sm text-gray-400 mb-4">
              Add photos of your studio. The first image will be the cover photo.
            </p>
            <ImageUpload images={images} onChange={setImages} maxImages={10} />
          </div>

          {/* Basic Info */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <input
                type="text"
                required
                placeholder="Studio Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Studio Type */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Studio Type *</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {studioTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => toggleStudioType(type.value)}
                  className={`p-3 rounded-xl border text-sm transition ${
                    formData.studioTypes.includes(type.value)
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Location *</h2>
            <div className="space-y-4">
              <input
                type="text"
                required
                placeholder="Street Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="ZIP"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Hourly Rate ($)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Minimum Hours</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.minimumHours}
                  onChange={(e) => setFormData({ ...formData, minimumHours: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.amenities.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                >
                  {amenity}
                  <X className="w-3 h-3" />
                </button>
              ))}
            </div>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={formData.customAmenity}
                onChange={(e) => setFormData({ ...formData, customAmenity: e.target.value })}
                placeholder="Add amenity"
                className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomAmenity())}
              />
              <button type="button" onClick={addCustomAmenity} className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {commonAmenities.filter(a => !formData.amenities.includes(a)).map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className="px-3 py-1.5 border border-white/10 rounded-full text-sm hover:border-white/30"
                >
                  + {amenity}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="/dashboard/owner" className="flex-1 py-4 border border-white/20 rounded-xl font-medium text-center hover:bg-white/5">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading || formData.studioTypes.length === 0}
              className="flex-1 py-4 bg-white text-black rounded-xl font-medium hover:bg-gray-200 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
