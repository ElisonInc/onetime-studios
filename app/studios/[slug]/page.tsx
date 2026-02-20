import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStudioBySlug } from '@/lib/data';
import { StudioDetail } from './studio-detail';

interface StudioPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: StudioPageProps): Promise<Metadata> {
  const studio = await getStudioBySlug(params.slug);
  
  if (!studio) {
    return { title: 'Studio Not Found | OneTime Studios' };
  }

  return {
    title: `${studio.name} | OneTime Studios`,
    description: studio.description || `Book ${studio.name} in ${studio.city}. $${studio.hourly_rate}/hour.`,
  };
}

export default async function StudioPage({ params }: StudioPageProps) {
  const studio = await getStudioBySlug(params.slug);

  if (!studio) {
    notFound();
  }

  return <StudioDetail studio={studio} />;
}
