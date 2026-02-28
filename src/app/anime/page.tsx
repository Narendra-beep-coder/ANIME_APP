'use client';

import { useState, useEffect } from 'react';
import { ContentCard } from '@/components/ui/ContentCard';
import { ContentCardSkeleton } from '@/components/ui/ContentCard';

interface AnimeItem {
  id: string;
  title: string;
  poster?: string;
  type: 'anime';
  status?: string;
  episodes?: number;
}

const sampleAnime = [
  { id: 'one-piece', title: 'One Piece', poster: undefined, type: 'anime' as const, episodes: 1000, status: 'Ongoing' },
  { id: 'naruto', title: 'Naruto', poster: undefined, type: 'anime' as const, episodes: 720, status: 'Completed' },
  { id: 'naruto-shippuden', title: 'Naruto Shippuden', poster: undefined, type: 'anime' as const, episodes: 500, status: 'Completed' },
  { id: 'attack-on-titan', title: 'Attack on Titan', poster: undefined, type: 'anime' as const, episodes: 87, status: 'Completed' },
  { id: 'demon-slayer', title: 'Demon Slayer', poster: undefined, type: 'anime' as const, episodes: 26, status: 'Completed' },
  { id: 'my-hero-academia', title: 'My Hero Academia', poster: undefined, type: 'anime' as const, episodes: 138, status: 'Completed' },
  { id: 'jujutsu-kaisen', title: 'Jujutsu Kaisen', poster: undefined, type: 'anime' as const, episodes: 24, status: 'Completed' },
  { id: 'death-note', title: 'Death Note', poster: undefined, type: 'anime' as const, episodes: 37, status: 'Completed' },
  { id: 'fullmetal-alchemist', title: 'Fullmetal Alchemist', poster: undefined, type: 'anime' as const, episodes: 64, status: 'Completed' },
  { id: 'one-punch-man', title: 'One Punch Man', poster: undefined, type: 'anime' as const, episodes: 24, status: 'Completed' },
  { id: 'hunter-x-hunter', title: 'Hunter x Hunter', poster: undefined, type: 'anime' as const, episodes: 148, status: 'Completed' },
  { id: 'tokyo-ghoul', title: 'Tokyo Ghoul', poster: undefined, type: 'anime' as const, episodes: 48, status: 'Completed' },
];

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'trending', label: 'Trending' },
  { value: 'recent', label: 'Recently Updated' },
  { value: 'new', label: 'New Releases' },
];

export default function AnimePage() {
  const [anime, setAnime] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/anime?type=${sortBy}&page=${page}`);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          setAnime(data.results);
        } else {
          // Use sample data if API doesn't return results
          setAnime(sampleAnime);
        }
      } catch (err) {
        console.error('Failed to fetch anime:', err);
        setAnime(sampleAnime);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [page, sortBy]);

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">Anime</h1>
        </div>
        <p className="text-[var(--text-secondary)]">Discover and stream your favorite anime series</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]">
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span>{anime.length} results</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-[var(--text-muted)]">Sort by:</span>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  sortBy === option.value
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-tertiary)] border border-[var(--border)]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="content-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <ContentCardSkeleton key={i} type="anime" />
          ))}
        </div>
      ) : (
        <>
          <div className="content-grid">
            {anime.map((item, index) => (
              <div 
                key={item.id} 
                className="slide-up" 
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ContentCard
                  id={item.id}
                  title={item.title}
                  poster={item.poster}
                  type={item.type}
                  status={item.status}
                  episodes={item.episodes}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-16">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-5 py-2.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:border-orange-500/50 hover:text-orange-500 transition-all"
            >
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </span>
            </button>
            
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                    page === p
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                      : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-white border border-[var(--border)] hover:border-orange-500/50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-5 py-2.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-sm font-medium hover:border-orange-500/50 hover:text-orange-500 transition-all"
            >
              <span className="flex items-center gap-2">
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
