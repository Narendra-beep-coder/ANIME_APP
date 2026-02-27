'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function MangaReaderPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const id = params.id as string;
  const chapterParam = searchParams.get('chapter');
  const chapter = chapterParam ? parseInt(chapterParam) : 1;
  
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isVertical, setIsVertical] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Sample pages for demo
  const samplePages = [
    'https://via.placeholder.com/800x1200/1a1a1a/ffffff?text=Chapter+Cover',
    'https://via.placeholder.com/800x1200/252525/ffffff?text=Page+1',
    'https://via.placeholder.com/800x1200/2a2a2a/ffffff?text=Page+2',
    'https://via.placeholder.com/800x1200/303030/ffffff?text=Page+3',
    'https://via.placeholder.com/800x1200/353535/ffffff?text=Page+4',
    'https://via.placeholder.com/800x1200/3a3a3a/ffffff?text=Page+5',
    'https://via.placeholder.com/800x1200/404040/ffffff?text=Page+6',
    'https://via.placeholder.com/800x1200/454545/ffffff?text=Page+7',
    'https://via.placeholder.com/800x1200/4a4a4a/ffffff?text=Page+8',
    'https://via.placeholder.com/800x1200/505050/ffffff?text=Chapter+End',
  ];

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/manga/${id}/chapter/${chapter}`);
        const data = await response.json();
        
        if (data.pages && data.pages.length > 0) {
          setPages(data.pages);
        } else {
          // Use sample pages for demo
          setPages(samplePages);
        }
      } catch (err) {
        // Use sample pages on error
        setPages(samplePages);
      } finally {
        setLoading(false);
      }
    };

    if (id && chapter) {
      fetchPages();
    }
  }, [id, chapter]);

  const goToPage = useCallback((page: number) => {
    if (page >= 0 && page < pages.length) {
      setCurrentPage(page);
    }
  }, [pages.length]);

  const goToChapter = (ch: number) => {
    if (ch > 0) {
      router.push(`/manga/${id}/read?chapter=${ch}`);
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
      if (isVertical) {
        window.scrollBy({ top: -400, behavior: 'smooth' });
      } else {
        goToPage(currentPage - 1);
      }
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
      if (isVertical) {
        window.scrollBy({ top: 400, behavior: 'smooth' });
      } else {
        goToPage(currentPage + 1);
      }
    }
  }, [currentPage, goToPage, isVertical]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--accent-secondary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--text-secondary)]">Loading chapter...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-[var(--error)] text-lg mb-4">{error}</div>
        <Link href={`/manga/${id}`} className="text-[var(--accent-secondary)] hover:underline">
          Back to details
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] -mx-4 -my-8 px-4 py-8">
      {/* Top Controls */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            href={`/manga/${id}`}
            className="flex items-center text-white hover:text-[var(--accent-secondary)] transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          <div className="flex items-center gap-4">
            {/* Chapter navigation */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => goToChapter(chapter - 1)}
                disabled={chapter <= 1}
                className="p-2 text-white hover:text-[var(--accent-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-white font-medium px-3 py-1 bg-[var(--bg-tertiary)] rounded">
                Ch. {chapter}
              </span>
              <button 
                onClick={() => goToChapter(chapter + 1)}
                className="p-2 text-white hover:text-[var(--accent-secondary)] transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* View mode toggle */}
            <button 
              onClick={() => setIsVertical(!isVertical)}
              className="p-2 text-white hover:text-[var(--accent-secondary)] transition"
              title={isVertical ? 'Switch to horizontal' : 'Switch to vertical'}
            >
              {isVertical ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation zones for horizontal mode */}
      {!isVertical && pages.length > 0 && (
        <>
          <div 
            className="fixed top-0 bottom-0 left-0 w-1/6 z-40 cursor-pointer flex items-center justify-start pl-4"
            onClick={() => goToPage(currentPage - 1)}
            style={{ opacity: currentPage > 0 ? 0.3 : 0 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div 
            className="fixed top-0 bottom-0 right-0 w-1/6 z-40 cursor-pointer flex items-center justify-end pr-4"
            onClick={() => goToPage(currentPage + 1)}
            style={{ opacity: currentPage < pages.length - 1 ? 0.3 : 0 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </>
      )}

      {/* Content */}
      {isVertical ? (
        <div className="max-w-3xl mx-auto space-y-4">
          {pages.map((page, index) => (
            <div key={index} className="relative w-full aspect-[2/3]">
              <Image
                src={page}
                alt={`Page ${index + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          ))}
          
          {/* Next chapter button */}
          <div className="text-center py-8">
            <button 
              onClick={() => goToChapter(chapter + 1)}
              className="btn-primary"
            >
              Next Chapter
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {pages.length > 0 && (
            <div className="relative w-full aspect-[2/3]">
              <Image
                src={pages[currentPage]}
                alt={`Page ${currentPage + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}
          
          {/* Page indicator */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm z-50">
            {currentPage + 1} / {pages.length}
          </div>

          {/* Page slider */}
          <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-64 z-50">
            <input
              type="range"
              min="0"
              max={pages.length - 1}
              value={currentPage}
              onChange={(e) => goToPage(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[var(--accent-secondary)] [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>
        </div>
      )}

      {/* Toggle controls visibility */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-32 z-30"
        onMouseEnter={() => setShowControls(true)}
      />
    </div>
  );
}
