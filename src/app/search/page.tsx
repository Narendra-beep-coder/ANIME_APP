'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ContentCard } from '@/components/ui/ContentCard';
import { ContentCardSkeleton } from '@/components/ui/ContentCard';

interface SearchResult {
  id: string;
  title: string;
  poster?: string;
  type: 'anime' | 'manga';
  status?: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setResults(data.results || []);
        }
      } catch (err) {
        setError('Failed to search. Please try again.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">
          Searching for &quot;{query}&quot;...
        </h1>
        <div className="content-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <ContentCardSkeleton key={i} type="anime" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-[var(--error)] text-lg mb-4">{error}</div>
        <p className="text-[var(--text-secondary)]">
          Please try a different search term.
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">No results found</h1>
        <p className="text-[var(--text-secondary)]">
          Try searching with different keywords or browse our collections.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Search Results for &quot;{query}&quot; ({results.length})
      </h1>
      <div className="content-grid">
        {results.map((item) => (
          <ContentCard
            key={`${item.type}-${item.id}`}
            id={item.id}
            title={item.title}
            poster={item.poster}
            type={item.type}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
