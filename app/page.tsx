'use client';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { SearchBar } from '@/components/SearchBar';
import { ResultsSection } from '@/components/ResultsSection';
import { TrustSection } from '@/components/TrustSection';
import { OwnersSection } from '@/components/OwnersSection';
import { FAQ } from '@/components/FAQ';
import { FinalCTA, Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <div className="bg-gradient-to-b from-blue-50/50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SearchBar />
        </div>
      </div>
      <ResultsSection />
      <TrustSection />
      <OwnersSection />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
