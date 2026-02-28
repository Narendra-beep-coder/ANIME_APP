'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Chapter {
  number: number;
  title?: string;
}

interface MangaDetails {
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
  chapters?: Chapter[];
  totalChapters?: number;
  authors?: string[];
  titleEnglish?: string;
  titleJapanese?: string;
}

export default function MangaDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [manga, setManga] = useState<MangaDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chapterPage, setChapterPage] = useState(0);
  const CHAPTERS_PER_PAGE = 100;

  useEffect(() => {
    const fetchManga = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/manga/${id}`);
        const data = await response.json();
        
        if (data.details) {
          setManga(data.details);
        } else {
          setError('Manga not found');
        }
      } catch (err) {
        console.error('Failed to fetch manga details:', err);
        setError('Failed to load manga details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchManga();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-48 bg-[var(--bg-secondary)] rounded-xl mb-8" />
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

  if (error || !manga) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold mb-4">{error || 'Manga not found'}</h1>
        <Link href="/manga" className="btn-secondary inline-flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Manga list
        </Link>
      </div>
    );
  }

  const totalChapters = manga.totalChapters || manga.chapters?.length || 0;
  const chapterPages = Math.ceil(totalChapters / CHAPTERS_PER_PAGE);
  const currentChapters = manga.chapters?.slice(
    chapterPage * CHAPTERS_PER_PAGE,
    (chapterPage + 1) * CHAPTERS_PER_PAGE
  ) || [];

  return (
    <div>
      {/* Banner */}
      {manga.poster && (
        <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-8">
          <Image
            src={manga.poster}
            alt={manga.title}
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
            {manga.poster ? (
              <Image
                src={manga.poster}
                alt={manga.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-purple-600/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-purple-500/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            )}
          </div>

          {/* Read Button */}
          {totalChapters > 0 && (
            <Link
              href={`/manga/${id}/read?chapter=1`}
              className="btn-secondary w-full flex items-center justify-center gap-2 mb-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Read Chapter 1
            </Link>
          )}

          {/* Metadata */}
          <div className="space-y-3 p-4 bg-[var(--bg-card)] rounded-2xl border border-[var(--border)]">
            {manga.status && (
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-sm">Status</span>
                <span className={`badge ${
                  manga.status.toLowerCase().includes('publishing') || manga.status.toLowerCase().includes('ongoing')
                    ? 'badge-warning'
                    : manga.status.toLowerCase().includes('finished') || manga.status.toLowerCase().includes('complete')
                    ? 'badge-success'
                    : 'badge-info'
                }`}>
                  {manga.status}
                </span>
              </div>
            )}
            {manga.year && (
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-sm">Year</span>
                <span className="text-sm font-medium">{manga.year}</span>
              </div>
            )}
            {manga.rating && (
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-sm">Rating</span>
                <span className="flex items-center gap-1 text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {manga.rating}
                </span>
              </div>
            )}
            {totalChapters > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-sm">Chapters</span>
                <span className="text-sm font-medium">{totalChapters}</span>
              </div>
            )}
            {manga.authors && manga.authors.length > 0 && (
              <div className="flex items-start justify-between gap-2">
                <span className="text-[var(--text-secondary)] text-sm shrink-0">Author</span>
                <span className="text-sm font-medium text-right">{manga.authors.join(', ')}</span>
              </div>
            )}
            {manga.genres && manga.genres.length > 0 && (
              <div>
                <span className="text-[var(--text-secondary)] text-sm block mb-2">Genres</span>
                <div className="flex flex-wrap gap-1.5">
                  {manga.genres.map((genre) => (
                    <Link
                      key={genre}
                      href={`/search?q=${encodeURIComponent(genre)}&type=manga`}
                      className="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs hover:bg-purple-500/20 transition-colors"
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
            <Link href="/manga" className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--accent-secondary)] transition text-sm mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Manga
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-1">{manga.title}</h1>
          {manga.titleJapanese && (
            <p className="text-[var(--text-muted)] text-sm mb-4">{manga.titleJapanese}</p>
          )}
          
          {manga.description && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2 text-[var(--text-secondary)]">Synopsis</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                {manga.description}
              </p>
            </div>
          )}

          {/* Chapters List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                Chapters <span className="text-[var(--text-muted)] text-base font-normal">({totalChapters})</span>
              </h2>
              {chapterPages > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[var(--text-muted)]">
                    {chapterPage * CHAPTERS_PER_PAGE + 1}–{Math.min((chapterPage + 1) * CHAPTERS_PER_PAGE, totalChapters)}
                  </span>
                </div>
              )}
            </div>
            
            {currentChapters.length > 0 ? (
              <>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                  {currentChapters.map((chapter) => (
                    <Link
                      key={chapter.number}
                      href={`/manga/${id}/read?chapter=${chapter.number}`}
                      className="flex flex-col items-center justify-center p-3 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group"
                    >
                      <span className="text-base font-bold font-mono text-purple-500 group-hover:text-purple-400">
                        {chapter.number}
                      </span>
                      <span className="text-xs text-[var(--text-muted)] mt-0.5 group-hover:text-[var(--text-secondary)]">
                        CH
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Chapter pagination */}
                {chapterPages > 1 && (
                  <div className="flex items-center gap-2 mt-4 flex-wrap">
                    {Array.from({ length: chapterPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setChapterPage(i)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          chapterPage === i
                            ? 'bg-purple-500 text-white'
                            : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-purple-500/50'
                        }`}
                      >
                        {i * CHAPTERS_PER_PAGE + 1}–{Math.min((i + 1) * CHAPTERS_PER_PAGE, totalChapters)}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[var(--text-muted)] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-[var(--text-secondary)]">No chapters available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
