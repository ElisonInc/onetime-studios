import { Suspense } from 'react';
import { Metadata } from 'next';
import { getStudios } from '@/lib/data';
import { StudiosContent } from './studios-content';
import { StudiosSkeleton } from './studios-skeleton';

export const metadata: Metadata = {
  title: 'Find Studios | OneTime Studios',
  description: 'Browse and book professional recording studios, photo studios, and rehearsal spaces.',
};

interface StudiosPageProps {
  searchParams: {
    location?: string;
    date?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export default async function StudiosPage({ searchParams }: StudiosPageProps) {
  return (
    <div className="min-h-screen bg-black">
      <Suspense fallback={<StudiosSkeleton />}>
        <StudiosWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function StudiosWrapper({ searchParams }: StudiosPageProps) {
  const filters = {
    location: searchParams.location,
    studioType: searchParams.type,
    minPrice: searchParams.minPrice ? parseInt(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? parseInt(searchParams.maxPrice) : undefined,
  };

  const studios = await getStudios(filters);

  return <StudiosContent initialStudios={studios} searchParams={searchParams} />;
}
