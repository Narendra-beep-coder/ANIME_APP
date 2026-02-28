'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Episode {
  number: number;
  title?: string;
}

interface AnimeDetails {
  id: string;
  malId?: number;
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
  studios?: string[];
  titleEnglish?: string;
  titleJapanese?: string;
}

export default function AnimeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [anime, setAnime] = useState<AnimeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [episodePage, setEpisodePage] = useState(0);
  const EPISODES_PER_PAGE = 100;

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/anime/${id}`);
        const data = await response.json();
        
        if (data.details) {
          setAnime(data.details);
        } else {
          setError('Anime not found');
        }
      } catch (err) {
        console.error('Failed to fetch anime details:', err);
        setError('Failed to load anime details. Please try again.');
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <div className="aspect-[2/3] bg-[var(--bg-secondary)] rounded-xl mb-4" />
            <div className="space-y-3">
              <div className="h-4 bg-[var(--bg-secondary)] rounded w-3/4" />
              <div className="h-4 bg-[var(--bg-secondary)] rounded w-1/2" />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="h-8 bg-[var(--bg-secondary)] rounded w-64 mb-4" />
            <div className="h-4 bg-[var(--bg-secondary)] rounded w-full mb-2" />
            <div className="h-4 bg-[var(--bg-secondary)] rounded w-3/4 mb-2" />
            <div className="h-4 bg-[var(--bg-secondary)] rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold mb-4">{error || 'Anime not found'}</h1>
        <Link href="/anime" className="btn-primary inline-flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Anime list
        </Link>
      </div>
    );
  }

  const totalEpisodes = anime.totalEpisodes || anime.episodes?.length || 0;
  const episodePages = Math.ceil(totalEpisodes / EPISODES_PER_PAGE);
  const currentEpisodes = anime.episodes?.slice(
    episodePage * EPISODES_PER_PAGE,
    (episodePage + 1) * EPISODES_PER_PAGE
  ) || [];

  return (
    <div>
      {/* Banner */}
      {anime.poster && (
        <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-8">
          <Image
            src={anime.poster}
            alt={anime.title}
            fill
            className="object-cover blur-sm scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/60 to-transparent" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Section */}
        <div className="lg:col-span-1">
          <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-[var(--bg-secondary)] mb-6 shadow-2xl">
            {anime.poster ? (
              <Image
                src={anime.poster}
                alt={anime.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-orange-600/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-orange-500/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
            )}
          </div>

          {/* Watch Button */}
          {totalEpisodes > 0 && (
            <Link
              href={`/anime/${id}/watch?episode=1`}
              className="btn-primary w-full flex items-center justify-center gap-2 mb-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Episode 1
            </Link>
          )}

          {/* Metadata */}
          <div className="space-y-3 p-4 bg-[var(--bg-card)] rounded-2xl border border-[var(--border)]">
            {anime.status && (
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-sm">Status</span>
                <span className={`badge ${
                  anime.status.toLowerCase().includes('currently') || anime.status.toLowerCase().includes('airing')
                    ? 'badge-warning'
                    : anime.status.toLowerCase().includes('finished') || anime.status.toLowerCase().includes('complete')
                    ? 'badge-success'
                    : 'badge-info'
                }`}>
                  {anime.status}
                </span>
              </div>
            )}
            {anime.year && (
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-sm">Year</span>
                <span className="text-sm font-medium">{anime.year}</span>
              </div>
            )}
            {anime.rating && (
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-sm">Rating</span>
                <span className="flex items-center gap-1 text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {anime.rating}
                </span>
              </div>
            )}
            {totalEpisodes > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-sm">Episodes</span>
                <span className="text-sm font-medium">{totalEpisodes}</span>
              </div>
            )}
            {anime.studios && anime.studios.length > 0 && (
              <div className="flex items-start justify-between gap-2">
                <span className="text-[var(--text-secondary)] text-sm shrink-0">Studio</span>
                <span className="text-sm font-medium text-right">{anime.studios.join(', ')}</span>
              </div>
            )}
            {anime.genres && anime.genres.length > 0 && (
              <div>
                <span className="text-[var(--text-secondary)] text-sm block mb-2">Genres</span>
                <div className="flex flex-wrap gap-1.5">
                  {anime.genres.map((genre) => (
                    <Link
                      key={genre}
                      href={`/search?q=${encodeURIComponent(genre)}&type=anime`}
                      className="px-2.5 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs hover:bg-orange-500/20 transition-colors"
                    >
                      {genre}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:col-span-2">
          <div className="mb-2">
            <Link href="/anime" className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition text-sm mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Anime
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold mb-1">{anime.title}</h1>
          {anime.titleJapanese && (
            <p className="text-[var(--text-muted)] text-sm mb-4">{anime.titleJapanese}</p>
          )}
          
          {anime.description && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2 text-[var(--text-secondary)]">Synopsis</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                {anime.description}
              </p>
            </div>
          )}

          {/* Episodes List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                Episodes <span className="text-[var(--text-muted)] text-base font-normal">({totalEpisodes})</span>
              </h2>
              {episodePages > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[var(--text-muted)]">
                    {episodePage * EPISODES_PER_PAGE + 1}–{Math.min((episodePage + 1) * EPISODES_PER_PAGE, totalEpisodes)}
                  </span>
                </div>
              )}
            </div>
            
            {currentEpisodes.length > 0 ? (
              <>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                  {currentEpisodes.map((episode) => (
                    <Link
                      key={episode.number}
                      href={`/anime/${id}/watch?episode=${episode.number}`}
                      className="flex flex-col items-center justify-center p-3 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group"
                    >
                      <span className="text-base font-bold font-mono text-orange-500 group-hover:text-orange-400">
                        {episode.number}
                      </span>
                      <span className="text-xs text-[var(--text-muted)] mt-0.5 group-hover:text-[var(--text-secondary)]">
                        EP
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Episode pagination */}
                {episodePages > 1 && (
                  <div className="flex items-center gap-2 mt-4 flex-wrap">
                    {Array.from({ length: episodePages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setEpisodePage(i)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          episodePage === i
                            ? 'bg-orange-500 text-white'
                            : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-orange-500/50'
                        }`}
                      >
                        {i * EPISODES_PER_PAGE + 1}–{Math.min((i + 1) * EPISODES_PER_PAGE, totalEpisodes)}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[var(--text-muted)] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
                <p className="text-[var(--text-secondary)]">No episodes available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
