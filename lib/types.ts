export interface Studio {
  id: string;
  name: string;
  city: string;
  distance: number; // in miles
  rating: number; // 1-5
  reviewCount: number;
  tags: string[]; // e.g., ["Soundproof", "WiFi", "Engineer on site"]
  imageUrl: string;
  pricePerHour: number;
  nextAvailableSlot?: string; // e.g., "Today at 4:00 PM"
  description: string;
  featured?: boolean;
}

export interface SearchParams {
  location?: string;
  date?: string;
  time?: string;
  type?: 'recording' | 'photo' | 'video' | '';
}

export interface FilterOptions {
  priceRange: [number, number];
  spaceTypes: string[];
  amenities: string[];
  sortBy: 'recommended' | 'price-low' | 'price-high' | 'rating' | 'availability';
}
