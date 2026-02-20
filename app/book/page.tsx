'use client';

import { Suspense } from 'react';
import { BookContent } from './book-content';

export const dynamic = 'force-dynamic';

function BookSkeleton() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full" />
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<BookSkeleton />}>
      <BookContent />
    </Suspense>
  );
}
