'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Episode {
  number: number;
  title?: string;
}

interface AnimeDetails {
  id: string;
  title: string;
  poster?: string;
  banner?: string;
  description?: string;
  genres?: string[];
  status?: string;
  year?: string;
  rating?: string;
  episodes?: Episode[];
  totalEpisodes?: number;
}

const sampleAnimeDetails: Record<string, AnimeDetails> = {
  'one-piece': {
    id: 'one-piece',
    title: 'One Piece',
    description: 'Monkey D. Luffy sets off on an adventure with his pirate crew in hopes of finding the greatest treasure ever, known as the One Piece. The story follows him and his crew as they face off against powerful enemies, make new friends, and explore the vast world of the Grand Line.',
    genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
    status: 'Ongoing',
    year: '1999',
    rating: '9.0',
    totalEpisodes: 1000,
    episodes: Array.from({ length: 1000 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`
    })),
  },
  'naruto': {
    id: 'naruto',
    title: 'Naruto',
    description: 'Naruto Uzumaki, a young ninja with a demon fox sealed inside him, dreams of becoming the Hokage, the leader of his village. Through hard work and determination, he grows stronger while making friends and facing powerful enemies.',
    genres: ['Action', 'Adventure', 'Martial Arts'],
    status: 'Completed',
    year: '2002',
    rating: '8.7',
    totalEpisodes: 220,
    episodes: Array.from({ length: 220 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`
    })),
  },
  'attack-on-titan': {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    description: 'In a world where humanity lives within cities surrounded by enormous walls due to the Titans, giant humanoid creatures who devour humans seemingly without reason, a young boy named Eren Yeager vows to exterminate all Titans after a tragic event.',
    genres: ['Action', 'Drama', 'Mystery'],
    status: 'Completed',
    year: '2013',
    rating: '9.0',
    totalEpisodes: 87,
    episodes: Array.from({ length: 87 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`
    })),
  },
};

export default function AnimeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [anime, setAnime] = useState<AnimeDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/anime/${id}`);
        const data = await response.json();
        
        // Check if API returned valid data
        if (data.details && data.details.title && data.details.title !== 'Unknown Title') {
          setAnime(data.details);
        } else if (sampleAnimeDetails[id]) {
          setAnime(sampleAnimeDetails[id]);
        } else {
          // Default fallback
          setAnime({
            id,
            title: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            description: 'Description not available.',
            genres: ['Unknown'],
            status: 'Unknown',
            episodes: [],
            totalEpisodes: 0,
          });
        }
      } catch (err) {
        console.error('Failed to fetch anime details:', err);
        if (sampleAnimeDetails[id]) {
          setAnime(sampleAnimeDetails[id]);
        } else {
          setAnime({
            id,
            title: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            description: 'Description not available.',
            genres: ['Unknown'],
            status: 'Unknown',
            episodes: [],
            totalEpisodes: 0,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnime();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-[var(--bg-secondary)] rounded-xl mb-8" />
        <div className="h-8 bg-[var(--bg-secondary)] rounded w-64 mb-4" />
        <div className="h-4 bg-[var(--bg-secondary)] rounded w-full mb-2" />
        <div className="h-4 bg-[var(--bg-secondary)] rounded w-3/4" />
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Anime not found</h1>
        <Link href="/anime" className="text-[var(--accent-primary)] hover:underline">
          Back to Anime list
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Banner */}
      {anime.banner && (
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <Image
            src={anime.banner}
            alt={anime.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Section */}
        <div className="lg:col-span-1">
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-[var(--bg-secondary)] mb-6">
            {anime.poster ? (
              <Image
                src={anime.poster}
                alt={anime.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="space-y-4">
            {anime.status && (
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">Status</span>
                <span className={`badge ${
                  anime.status.toLowerCase().includes('ongoing') || anime.status.toLowerCase().includes('airing')
                    ? 'badge-warning'
                    : 'badge-success'
                }`}>
                  {anime.status}
                </span>
              </div>
            )}
            {anime.year && (
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">Year</span>
                <span>{anime.year}</span>
              </div>
            )}
            {anime.rating && (
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">Rating</span>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {anime.rating}
                </span>
              </div>
            )}
            {anime.genres && anime.genres.length > 0 && (
              <div>
                <span className="text-[var(--text-secondary)] block mb-2">Genres</span>
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre) => (
                    <span key={genre} className="px-3 py-1 bg-[var(--bg-tertiary)] rounded-full text-sm">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
          
          {anime.description && (
            <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
              {anime.description}
            </p>
          )}

          {/* Episodes List */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              Episodes ({anime.totalEpisodes || anime.episodes?.length || 0})
            </h2>
            
            {anime.episodes && anime.episodes.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[500px] overflow-y-auto pr-2">
                {anime.episodes.slice(0, 100).map((episode) => (
                  <Link
                    key={episode.number}
                    href={`/anime/${id}/watch?episode=${episode.number}`}
                    className="flex flex-col items-center justify-center p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-tertiary)] transition-all group"
                  >
                    <span className="text-lg font-bold font-mono text-[var(--accent-primary)] group-hover:text-white">
                      {episode.number}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)] mt-1">
                      Watch
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-[var(--bg-secondary)] rounded-lg">
                <p className="text-[var(--text-secondary)]">No episodes available</p>
              </div>
            )}

            {anime.totalEpisodes && anime.totalEpisodes > 100 && (
              <p className="text-center text-[var(--text-secondary)] mt-4">
                Showing first 100 episodes. Visit the site for more.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
