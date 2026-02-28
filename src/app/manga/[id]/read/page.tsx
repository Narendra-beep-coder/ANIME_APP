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
  const [currentPage, setCurrentPage] = useState(0);
  const [isVertical, setIsVertical] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Generate sample pages using picsum.photos (reliable placeholder images)
  const getSamplePages = useCallback(() => {
    const seeds = [
      `manga-${id}-ch${chapter}-cover`,
      `manga-${id}-ch${chapter}-p1`,
      `manga-${id}-ch${chapter}-p2`,
      `manga-${id}-ch${chapter}-p3`,
      `manga-${id}-ch${chapter}-p4`,
      `manga-${id}-ch${chapter}-p5`,
      `manga-${id}-ch${chapter}-p6`,
      `manga-${id}-ch${chapter}-p7`,
      `manga-${id}-ch${chapter}-p8`,
      `manga-${id}-ch${chapter}-p9`,
      `manga-${id}-ch${chapter}-p10`,
      `manga-${id}-ch${chapter}-p11`,
      `manga-${id}-ch${chapter}-p12`,
      `manga-${id}-ch${chapter}-p13`,
      `manga-${id}-ch${chapter}-p14`,
      `manga-${id}-ch${chapter}-p15`,
      `manga-${id}-ch${chapter}-p16`,
      `manga-${id}-ch${chapter}-end`,
    ];
    // Use picsum.photos with consistent seeds for each page
    return seeds.map((seed, i) => 
      `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/1200`
    );
  }, [id, chapter]);

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      setCurrentPage(0);
      
      try {
        const response = await fetch(`/api/manga/${id}/chapter/${chapter}`);
        const data = await response.json();
        
        if (data.pages && data.pages.length > 0) {
          setPages(data.pages);
        } else {
          setPages(getSamplePages());
        }
      } catch {
        setPages(getSamplePages());
      } finally {
        setLoading(false);
      }
    };

    if (id && chapter) {
      fetchPages();
    }
  }, [id, chapter, getSamplePages]);

  const goToPage = useCallback((page: number) => {
    if (page >= 0 && page < pages.length) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pages.length]);

  const goToChapter = (ch: number) => {
    if (ch > 0) {
      router.push(`/manga/${id}/read?chapter=${ch}`);
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      if (isVertical) {
        window.scrollBy({ top: -400, behavior: 'smooth' });
      } else {
        goToPage(currentPage - 1);
      }
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
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

  // Auto-hide controls
  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, [showControls]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--accent-secondary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--text-secondary)]">Loading chapter {chapter}...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-black -mx-4 -my-8 px-0 py-0"
      onMouseMove={() => setShowControls(true)}
      onClick={() => setShowControls(true)}
    >
      {/* Top Controls */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/95 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            href={`/manga/${id}`}
            className="flex items-center text-white hover:text-purple-400 transition gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Chapter navigation */}
            <div className="flex items-center gap-1 bg-black/60 rounded-xl px-2 py-1">
              <button 
                onClick={() => goToChapter(chapter - 1)}
                disabled={chapter <= 1}
                className="p-1.5 text-white hover:text-purple-400 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-white text-sm font-medium px-2">
                Ch. {chapter}
              </span>
              <button 
                onClick={() => goToChapter(chapter + 1)}
                className="p-1.5 text-white hover:text-purple-400 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* View mode toggle */}
            <button 
              onClick={() => setIsVertical(!isVertical)}
              className="p-2 text-white hover:text-purple-400 transition bg-black/60 rounded-xl"
              title={isVertical ? 'Switch to page mode' : 'Switch to scroll mode'}
            >
              {isVertical ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
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

      {/* Content */}
      {isVertical ? (
        /* Vertical scroll mode */
        <div className="max-w-3xl mx-auto pt-16 pb-24">
          {pages.map((page, index) => (
            <div key={index} className="relative w-full">
              <Image
                src={page}
                alt={`Page ${index + 1}`}
                width={800}
                height={1200}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 800px"
                priority={index < 3}
              />
            </div>
          ))}
          
          {/* Next chapter button */}
          <div className="text-center py-12 bg-black">
            <p className="text-gray-400 mb-4">End of Chapter {chapter}</p>
            <button 
              onClick={() => goToChapter(chapter + 1)}
              className="btn-secondary"
            >
              Next Chapter →
            </button>
          </div>
        </div>
      ) : (
        /* Page-by-page mode */
        <div className="relative min-h-screen flex items-center justify-center bg-black pt-16 pb-24">
          {pages.length > 0 && (
            <div className="relative max-w-3xl w-full mx-auto">
              <Image
                src={pages[currentPage]}
                alt={`Page ${currentPage + 1}`}
                width={800}
                height={1200}
                className="w-full h-auto max-h-[calc(100vh-8rem)] object-contain mx-auto"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          )}

          {/* Left/Right click zones */}
          <div 
            className="fixed top-16 bottom-20 left-0 w-1/3 z-40 cursor-pointer"
            onClick={() => goToPage(currentPage - 1)}
          />
          <div 
            className="fixed top-16 bottom-20 right-0 w-1/3 z-40 cursor-pointer"
            onClick={() => goToPage(currentPage + 1)}
          />
        </div>
      )}

      {/* Bottom Controls */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/95 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="max-w-4xl mx-auto">
          {!isVertical && (
            <>
              {/* Page slider */}
              <div className="mb-3">
                <input
                  type="range"
                  min="0"
                  max={Math.max(0, pages.length - 1)}
                  value={currentPage}
                  onChange={(e) => goToPage(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:rounded-full"
                />
              </div>

              {/* Page navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="px-4 py-2 bg-white/10 text-white rounded-xl text-sm disabled:opacity-30 hover:bg-white/20 transition flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Prev
                </button>

                <span className="text-white text-sm font-medium bg-black/60 px-4 py-2 rounded-xl">
                  {currentPage + 1} / {pages.length}
                </span>

                <button
                  onClick={() => {
                    if (currentPage < pages.length - 1) {
                      goToPage(currentPage + 1);
                    } else {
                      goToChapter(chapter + 1);
                    }
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm hover:bg-purple-500 transition flex items-center gap-2"
                >
                  {currentPage < pages.length - 1 ? (
                    <>
                      Next
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Next Ch.
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </>
          )}

          {isVertical && (
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => goToChapter(chapter - 1)}
                disabled={chapter <= 1}
                className="px-4 py-2 bg-white/10 text-white rounded-xl text-sm disabled:opacity-30 hover:bg-white/20 transition"
              >
                ← Prev Chapter
              </button>
              <span className="text-white text-sm font-medium">Chapter {chapter}</span>
              <button
                onClick={() => goToChapter(chapter + 1)}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm hover:bg-purple-500 transition"
              >
                Next Chapter →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
