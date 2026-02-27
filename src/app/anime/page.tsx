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
  { id: ' jujutsu-kaisen', title: 'Jujutsu Kaisen', poster: undefined, type: 'anime' as const, episodes: 24, status: 'Completed' },
  { id: 'death-note', title: 'Death Note', poster: undefined, type: 'anime' as const, episodes: 37, status: 'Completed' },
  { id: 'fullmetal-alchemist', title: 'Fullmetal Alchemist', poster: undefined, type: 'anime' as const, episodes: 64, status: 'Completed' },
  { id: 'one-punch-man', title: 'One Punch Man', poster: undefined, type: 'anime' as const, episodes: 24, status: 'Completed' },
  { id: 'hunter-x-hunter', title: 'Hunter x Hunter', poster: undefined, type: 'anime' as const, episodes: 148, status: 'Completed' },
  { id: 'tokyo-ghoul', title: 'Tokyo Ghoul', poster: undefined, type: 'anime' as const, episodes: 48, status: 'Completed' },
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold gradient-text">Anime</h1>
        
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]"
          >
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
            <option value="recent">Recently Updated</option>
            <option value="new">New Releases</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="content-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <ContentCardSkeleton key={i} type="anime" />
          ))}
        </div>
      ) : (
        <>
          <div className="content-grid">
            {anime.map((item) => (
              <ContentCard
                key={item.id}
                id={item.id}
                title={item.title}
                poster={item.poster}
                type={item.type}
                status={item.status}
                episodes={item.episodes}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[var(--accent-primary)] transition"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-[var(--text-secondary)]">
              Page {page}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg hover:border-[var(--accent-primary)] transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
