import Image from 'next/image';
import Link from 'next/link';

interface ContentCardProps {
  id: string;
  title: string;
  poster?: string;
  type: 'anime' | 'manga';
  status?: string;
  episodes?: number;
  chapters?: number;
}

export function ContentCard({ id, title, poster, type, status, episodes, chapters }: ContentCardProps) {
  const href = type === 'anime' ? `/anime/${id}` : `/manga/${id}`;
  const count = type === 'anime' ? episodes : chapters;

  return (
    <Link href={href} className="block group">
      <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-[var(--bg-card)] card-hover border border-[var(--border)] group-hover:border-[var(--accent-primary)]/50">
        {/* Poster Image */}
        {poster ? (
          <Image
            src={poster}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)]">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
              type === 'anime' 
                ? 'bg-orange-500/10 text-orange-500' 
                : 'bg-purple-500/10 text-purple-500'
            }`}>
              {type === 'anime' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              )}
            </div>
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{type}</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`type-pill ${type === 'anime' ? 'type-pill-anime' : 'type-pill-manga'}`}>
                {type === 'anime' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )}
                {type}
              </span>
            </div>
            {count && (
              <p className="text-sm text-[var(--text-secondary)] font-medium">
                {type === 'anime' ? `${count} Episodes` : `${count} Chapters`}
              </p>
            )}
          </div>
        </div>

        {/* Status Badge */}
        {status && (
          <div className="absolute top-3 right-3">
            <span className={`badge ${
              status.toLowerCase().includes('ongoing') || status.toLowerCase().includes('airing')
                ? 'badge-warning'
                : status.toLowerCase().includes('complete')
                ? 'badge-success'
                : 'badge-info'
            }`}>
              {status}
            </span>
          </div>
        )}

        {/* Play/Read indicator on hover */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
            type === 'anime' 
              ? 'bg-orange-500 shadow-lg shadow-orange-500/50' 
              : 'bg-purple-500 shadow-lg shadow-purple-500/50'
          }`}>
            {type === 'anime' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-3 text-sm font-semibold text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors duration-300 leading-tight">
        {title}
      </h3>
    </Link>
  );
}

interface ContentCardSkeletonProps {
  type?: 'anime' | 'manga';
}

export function ContentCardSkeleton({ type = 'anime' }: ContentCardSkeletonProps) {
  return (
    <div className="animate-pulse">
      <div 
        className="aspect-[2/3] rounded-2xl bg-[var(--bg-secondary)] relative overflow-hidden"
      >
        <div className="absolute inset-0 shimmer" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-[var(--bg-secondary)] rounded w-3/4" />
        <div className="h-3 bg-[var(--bg-secondary)] rounded w-1/2" />
      </div>
    </div>
  );
}
