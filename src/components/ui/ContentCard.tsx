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
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-[var(--bg-secondary)] card-hover">
        {/* Poster Image */}
        {poster ? (
          <Image
            src={poster}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-[var(--text-muted)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-[var(--accent-primary)] text-white mb-2">
              {type === 'anime' ? 'Anime' : 'Manga'}
            </span>
            {count && (
              <p className="text-sm text-[var(--text-secondary)]">
                {type === 'anime' ? `${count} Episodes` : `${count} Chapters`}
              </p>
            )}
          </div>
        </div>

        {/* Status Badge */}
        {status && (
          <div className="absolute top-2 right-2">
            <span className={`badge ${
              status.toLowerCase().includes('ongoing') || status.toLowerCase().includes('airing')
                ? 'badge-warning'
                : status.toLowerCase().includes('complete')
                ? 'badge-success'
                : 'badge-error'
            }`}>
              {status}
            </span>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="mt-2 text-sm font-medium text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors">
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
        className="aspect-[2/3] rounded-xl bg-[var(--bg-secondary)]"
        style={{ aspectRatio: type === 'anime' ? '16/9' : '2/3' }}
      />
      <div className="mt-2 h-4 bg-[var(--bg-secondary)] rounded w-3/4" />
    </div>
  );
}
