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
}

const sampleMangaDetails: Record<string, MangaDetails> = {
  'one-piece': {
    id: 'one-piece',
    title: 'One Piece',
    description: 'A pirate crew led by Monkey D. Luffy searches for the greatest treasure ever, known as the One Piece. The crew faces off against the Marines and other pirates while exploring the Grand Line.',
    genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
    status: 'Ongoing',
    year: '1997',
    rating: '9.2',
    totalChapters: 1000,
    chapters: Array.from({ length: 1000 }, (_, i) => ({
      number: i + 1,
      title: `Chapter ${i + 1}`
    })),
  },
  'berserk': {
    id: 'berserk',
    title: 'Berserk',
    description: 'Guts, a former mercenary, joins the Band of the Hawk and battles demons in a dark medieval fantasy world.',
    genres: ['Action', 'Adventure', 'Drama', 'Fantasy', 'Horror'],
    status: 'Completed',
    year: '1989',
    rating: '9.5',
    totalChapters: 370,
    chapters: Array.from({ length: 370 }, (_, i) => ({
      number: i + 1,
      title: `Chapter ${i + 1}`
    })),
  },
  'attack-on-titan-manga': {
    id: 'attack-on-titan-manga',
    title: 'Attack on Titan',
    description: 'Humanity lives within cities surrounded by enormous walls due to the Titans, giant humanoid creatures who devour humans.',
    genres: ['Action', 'Drama', 'Mystery', 'Horror'],
    status: 'Completed',
    year: '2009',
    rating: '9.1',
    totalChapters: 139,
    chapters: Array.from({ length: 139 }, (_, i) => ({
      number: i + 1,
      title: `Chapter ${i + 1}`
    })),
  },
  'naruto': {
    id: 'naruto',
    title: 'Naruto',
    description: 'Naruto Uzumaki, a young ninja with a demon fox sealed inside him, dreams of becoming the Hokage, the leader of his village.',
    genres: ['Action', 'Adventure', 'Martial Arts'],
    status: 'Completed',
    year: '1999',
    rating: '8.7',
    totalChapters: 700,
    chapters: Array.from({ length: 700 }, (_, i) => ({
      number: i + 1,
      title: `Chapter ${i + 1}`
    })),
  },
  'demon-slayer': {
    id: 'demon-slayer',
    title: 'Demon Slayer: Kimetsu no Yaiba',
    description: 'Tanjiro Kamado, a kind-hearted boy, becomes a demon slayer after his family is slaughtered and his sister Nezuko is turned into a demon.',
    genres: ['Action', 'Supernatural', 'Historical'],
    status: 'Completed',
    year: '2016',
    rating: '9.0',
    totalChapters: 205,
    chapters: Array.from({ length: 205 }, (_, i) => ({
      number: i + 1,
      title: `Chapter ${i + 1}`
    })),
  },
  'jujutsu-kaisen': {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    description: 'Yuji Itadori, a high school student with exceptional physical abilities, joins a secret organization of sorcerers to kill a powerful curse.',
    genres: ['Action', 'Supernatural', 'School'],
    status: 'Ongoing',
    year: '2018',
    rating: '8.9',
    totalChapters: 260,
    chapters: Array.from({ length: 260 }, (_, i) => ({
      number: i + 1,
      title: `Chapter ${i + 1}`
    })),
  },
  'solo-leveling': {
    id: 'solo-leveling',
    title: 'Solo Leveling',
    description: 'In a world where hunters, humans who possess magical abilities, must battle dungeons, Sung Jin-Woo is the weakest hunter of all.',
    genres: ['Action', 'Adventure', 'Fantasy'],
    status: 'Completed',
    year: '2018',
    rating: '9.3',
    totalChapters: 180,
    chapters: Array.from({ length: 180 }, (_, i) => ({
      number: i + 1,
      title: `Chapter ${i + 1}`
    })),
  },
  'tower-of-god': {
    id: 'tower-of-god',
    title: 'Tower of God',
    description: 'Twenty-fifth Bam enters a mysterious tower called the Tower, seeking to reach the top and find his friend Rachel.',
    genres: ['Action', 'Adventure', 'Fantasy', 'Mystery'],
    status: 'Ongoing',
    year: '2010',
    rating: '8.5',
    totalChapters: 580,
    chapters: Array.from({ length: 580 }, (_, i) => ({
      number: i + 1,
      title: `Chapter ${i + 1}`
    })),
  },
  'hunter-x-hunter-manga': {
    id: 'hunter-x-hunter-manga',
    title: 'Hunter x Hunter',
    description: 'Gon Freecss dreams of becoming a Hunter, a person who searches for treasures, rare beasts, and other mysteries.',
    genres: ['Action', 'Adventure', 'Comedy'],
    status: 'Ongoing',
    year: '1998',
    rating: '9.4',
    totalChapters: 390,
    chapters: Array.from({ length: 390 }, (_, i) => ({
      number: i + 1,
      title: `Chapter ${i + 1}`
    })),
  },
  'chainsaw-man': {
    id: 'chainsaw-man',
    title: 'Chainsaw Man',
    description: 'Denji is a young man trapped in poverty, until he merges with his pet chainsaw devil and becomes Chainsaw Man.',
    genres: ['Action', 'Supernatural', 'Horror'],
    status: 'Ongoing',
    year: '2018',
    rating: '8.8',
    totalChapters: 166,
    chapters: Array.from({ length: 166 }, (_, i) => ({
      number: i + 1,
      title: `Chapter ${i + 1}`
    })),
  },
  'spy-x-family': {
    id: 'spy-x-family',
    title: 'Spy x Family',
    description: 'A spy known as Twilight is tasked with infiltrating an elite school by creating a fake family.',
    genres: ['Action', 'Comedy', 'Slice of Life'],
    status: 'Ongoing',
    year: '2019',
    rating: '9.0',
    totalChapters: 100,
    chapters: Array.from({ length: 100 }, (_, i) => ({
      number: i + 1,
      title: `Chapter ${i + 1}`
    })),
  },
  'tokyo-ghoul-manga': {
    id: 'tokyo-ghoul-manga',
    title: 'Tokyo Ghoul',
    description: 'Ken Kaneki, a college student, is attacked by a ghoul and becomes a half-ghoul.',
    genres: ['Action', 'Drama', 'Horror', 'Supernatural'],
    status: 'Completed',
    year: '2012',
    rating: '8.6',
    totalChapters: 302,
    chapters: Array.from({ length: 302 }, (_, i) => ({
      number: i + 1,
      title: `Chapter ${i + 1}`
    })),
  },
};

export default function MangaDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [manga, setManga] = useState<MangaDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManga = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/manga/${id}`);
        const data = await response.json();
        
        // Check if API returned valid data
        if (data.details && data.details.title && data.details.title !== 'Unknown Title') {
          setManga(data.details);
        } else if (sampleMangaDetails[id]) {
          setManga(sampleMangaDetails[id]);
        } else {
          // Default fallback
          setManga({
            id,
            title: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            description: 'Description not available.',
            genres: ['Unknown'],
            status: 'Unknown',
            chapters: [],
            totalChapters: 0,
          });
        }
      } catch (err) {
        console.error('Failed to fetch manga details:', err);
        if (sampleMangaDetails[id]) {
          setManga(sampleMangaDetails[id]);
        } else {
          setManga({
            id,
            title: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            description: 'Description not available.',
            genres: ['Unknown'],
            status: 'Unknown',
            chapters: [],
            totalChapters: 0,
          });
        }
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
        <div className="h-64 bg-[var(--bg-secondary)] rounded-xl mb-8" />
        <div className="h-8 bg-[var(--bg-secondary)] rounded w-64 mb-4" />
        <div className="h-4 bg-[var(--bg-secondary)] rounded w-full mb-2" />
        <div className="h-4 bg-[var(--bg-secondary)] rounded w-3/4" />
      </div>
    );
  }

  if (!manga) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Manga not found</h1>
        <Link href="/manga" className="text-[var(--accent-secondary)] hover:underline">
          Back to Manga list
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Banner */}
      {manga.banner && (
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <Image
            src={manga.banner}
            alt={manga.title}
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
            {manga.poster ? (
              <Image
                src={manga.poster}
                alt={manga.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="space-y-4">
            {manga.status && (
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">Status</span>
                <span className={`badge ${
                  manga.status.toLowerCase().includes('ongoing')
                    ? 'badge-warning'
                    : 'badge-success'
                }`}>
                  {manga.status}
                </span>
              </div>
            )}
            {manga.year && (
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">Year</span>
                <span>{manga.year}</span>
              </div>
            )}
            {manga.rating && (
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">Rating</span>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {manga.rating}
                </span>
              </div>
            )}
            {manga.genres && manga.genres.length > 0 && (
              <div>
                <span className="text-[var(--text-secondary)] block mb-2">Genres</span>
                <div className="flex flex-wrap gap-2">
                  {manga.genres.map((genre) => (
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
          <h1 className="text-3xl font-bold mb-4">{manga.title}</h1>
          
          {manga.description && (
            <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
              {manga.description}
            </p>
          )}

          {/* Chapters List */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              Chapters ({manga.totalChapters || manga.chapters?.length || 0})
            </h2>
            
            {manga.chapters && manga.chapters.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[500px] overflow-y-auto pr-2">
                {manga.chapters.slice(0, 100).map((chapter) => (
                  <Link
                    key={chapter.number}
                    href={`/manga/${id}/read?chapter=${chapter.number}`}
                    className="flex flex-col items-center justify-center p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] hover:border-[var(--accent-secondary)] hover:bg-[var(--bg-tertiary)] transition-all group"
                  >
                    <span className="text-lg font-bold font-mono text-[var(--accent-secondary)] group-hover:text-white">
                      {chapter.number}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)] mt-1">
                      Read
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-[var(--bg-secondary)] rounded-lg">
                <p className="text-[var(--text-secondary)]">No chapters available</p>
              </div>
            )}

            {manga.totalChapters && manga.totalChapters > 100 && (
              <p className="text-center text-[var(--text-secondary)] mt-4">
                Showing first 100 chapters. Visit the site for more.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
