export function StudiosSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-10 bg-white/10 rounded-lg w-64 mb-2 animate-pulse" />
        <div className="h-5 bg-white/10 rounded-lg w-48 animate-pulse" />
      </div>

      {/* Search Bar Skeleton */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 h-12 bg-white/10 rounded-xl animate-pulse" />
          <div className="w-32 h-12 bg-white/10 rounded-xl animate-pulse" />
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="aspect-[4/3] bg-white/10 animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-white/10 rounded w-20 animate-pulse" />
              <div className="h-6 bg-white/10 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse" />
              <div className="flex gap-2">
                <div className="h-6 bg-white/10 rounded-full w-16 animate-pulse" />
                <div className="h-6 bg-white/10 rounded-full w-20 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
