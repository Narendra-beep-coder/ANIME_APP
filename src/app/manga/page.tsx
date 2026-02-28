'use client';

import { useState, useEffect } from 'react';
import { ContentCard } from '@/components/ui/ContentCard';
import { ContentCardSkeleton } from '@/components/ui/ContentCard';

interface MangaItem {
  id: string;
  title: string;
  poster?: string;
  type: 'manga';
  status?: string;
  chapters?: number;
}

const sampleManga = [
  { id: 'one-piece', title: 'One Piece', poster: undefined, type: 'manga' as const, chapters: 1000, status: 'Ongoing' },
  { id: 'berserk', title: 'Berserk', poster: undefined, type: 'manga' as const, chapters: 370, status: 'Completed' },
  { id: 'naruto', title: 'Naruto', poster: undefined, type: 'manga' as const, chapters: 700, status: 'Completed' },
  { id: 'attack-on-titan-manga', title: 'Attack on Titan', poster: undefined, type: 'manga' as const, chapters: 139, status: 'Completed' },
  { id: 'demon-slayer', title: 'Demon Slayer', poster: undefined, type: 'manga' as const, chapters: 205, status: 'Completed' },
  { id: 'jujutsu-kaisen', title: 'Jujutsu Kaisen', poster: undefined, type: 'manga' as const, chapters: 260, status: 'Ongoing' },
  { id: 'solo-leveling', title: 'Solo Leveling', poster: undefined, type: 'manga' as const, chapters: 180, status: 'Completed' },
  { id: 'tower-of-god', title: 'Tower of God', poster: undefined, type: 'manga' as const, chapters: 580, status: 'Ongoing' },
  { id: 'hunter-x-hunter-manga', title: 'Hunter x Hunter', poster: undefined, type: 'manga' as const, chapters: 390, status: 'Ongoing' },
  { id: 'chainsaw-man', title: 'Chainsaw Man', poster: undefined, type: 'manga' as const, chapters: 166, status: 'Ongoing' },
  { id: 'spy-x-family', title: 'Spy x Family', poster: undefined, type: 'manga' as const, chapters: 100, status: 'Ongoing' },
  { id: 'tokyo-ghoul-manga', title: 'Tokyo Ghoul', poster: undefined, type: 'manga' as const, chapters: 302, status: 'Completed' },
];

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'trending', label: 'Trending' },
  { value: 'recent', label: 'Recently Updated' },
  { value: 'new', label: 'New Releases' },
];

export default function MangaPage() {
  const [manga, setManga] = useState<MangaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    const fetchManga = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/manga?type=${sortBy}&page=${page}`);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          setManga(data.results);
        } else {
          // Use sample data if API doesn't return results
          setManga(sampleManga);
        }
      } catch (err) {
        console.error('Failed to fetch manga:', err);
        setManga(sampleManga);
      } finally {
        setLoading(false);
      }
    };

    fetchManga();
  }, [page, sortBy]);

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">Manga</h1>
        </div>
        <p className="text-[var(--text-secondary)]">Explore thousands of manga titles from all genres</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]">
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span>{manga.length} results</span>
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
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
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
            <ContentCardSkeleton key={i} type="manga" />
          ))}
        </div>
      ) : (
        <>
          <div className="content-grid">
            {manga.map((item, index) => (
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
                  chapters={item.chapters}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-16">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-5 py-2.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:border-purple-500/50 hover:text-purple-500 transition-all"
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
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-white border border-[var(--border)] hover:border-purple-500/50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-5 py-2.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-sm font-medium hover:border-purple-500/50 hover:text-purple-500 transition-all"
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
