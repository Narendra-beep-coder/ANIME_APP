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
  { id: 'vagabond', title: 'Vagabond', poster: undefined, type: 'manga' as const, chapters: 340, status: 'Completed' },
  { id: 'jojos-bizarre-adventure', title: "JoJo's Bizarre Adventure", poster: undefined, type: 'manga' as const, chapters: 130, status: 'Ongoing' },
  { id: 'fullmetal-alchemist', title: 'Fullmetal Alchemist', poster: undefined, type: 'manga' as const, chapters: 108, status: 'Completed' },
  { id: 'attack-on-titan-manga', title: 'Attack on Titan', poster: undefined, type: 'manga' as const, chapters: 139, status: 'Completed' },
  { id: 'demon-slayer-manga', title: 'Demon Slayer', poster: undefined, type: 'manga' as const, chapters: 205, status: 'Completed' },
  { id: 'hunter-x-hunter-manga', title: 'Hunter x Hunter', poster: undefined, type: 'manga' as const, chapters: 390, status: 'Ongoing' },
  { id: 'chainsaw-man', title: 'Chainsaw Man', poster: undefined, type: 'manga' as const, chapters: 166, status: 'Ongoing' },
  { id: ' Jujutsu Kaisen', title: 'Jujutsu Kaisen', poster: undefined, type: 'manga' as const, chapters: 253, status: 'Ongoing' },
  { id: 'spy-x-family', title: 'Spy x Family', poster: undefined, type: 'manga' as const, chapters: 100, status: 'Ongoing' },
  { id: 'tokyo-ghoul-manga', title: 'Tokyo Ghoul', poster: undefined, type: 'manga' as const, chapters: 302, status: 'Completed' },
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold gradient-text">Manga</h1>
        
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[var(--accent-secondary)]"
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
            <ContentCardSkeleton key={i} type="manga" />
          ))}
        </div>
      ) : (
        <>
          <div className="content-grid">
            {manga.map((item) => (
              <ContentCard
                key={item.id}
                id={item.id}
                title={item.title}
                poster={item.poster}
                type={item.type}
                status={item.status}
                chapters={item.chapters}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[var(--accent-secondary)] transition"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-[var(--text-secondary)]">
              Page {page}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg hover:border-[var(--accent-secondary)] transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
