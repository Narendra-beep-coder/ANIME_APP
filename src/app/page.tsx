import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { ContentCard } from '@/components/ui/ContentCard';
import { getTopAnime, getTopManga } from '@/lib/scraper';

const genres = [
  { name: 'Action', icon: '⚔️', color: 'from-red-500 to-orange-500' },
  { name: 'Adventure', icon: '🗺️', color: 'from-green-500 to-teal-500' },
  { name: 'Comedy', icon: '😂', color: 'from-yellow-500 to-amber-500' },
  { name: 'Drama', icon: '🎭', color: 'from-purple-500 to-pink-500' },
  { name: 'Fantasy', icon: '✨', color: 'from-indigo-500 to-purple-500' },
  { name: 'Romance', icon: '💕', color: 'from-pink-500 to-rose-500' },
  { name: 'Sci-Fi', icon: '🚀', color: 'from-cyan-500 to-blue-500' },
  { name: 'Horror', icon: '👻', color: 'from-gray-700 to-gray-900' },
];

export default async function HomePage() {
  // Fetch real data server-side
  const [topAnime, topManga] = await Promise.allSettled([
    getTopAnime(10),
    getTopManga(10),
  ]);

  const animeList = topAnime.status === 'fulfilled' ? topAnime.value : [];
  const mangaList = topManga.status === 'fulfilled' ? topManga.value : [];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-card)] to-[var(--bg-tertiary)] p-8 md:p-12 border border-[var(--border)]">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Your Gateway to Anime & Manga
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <span className="gradient-text">Discover</span> Endless Entertainment
          </h1>
          
          <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-xl leading-relaxed">
            Dive into thousands of anime series and manga titles. Stream latest episodes, 
            read chapters, and explore a world of Japanese entertainment—all in one place.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              href="/anime"
              className="btn-primary inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Browse Anime
            </Link>
            <Link
              href="/manga"
              className="btn-secondary inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Read Manga
            </Link>
          </div>
        </div>
        
        {/* Stats */}
        <div className="relative z-10 flex flex-wrap gap-8 mt-12 pt-8 border-t border-[var(--border)]">
          <div>
            <div className="text-3xl font-bold gradient-text">10K+</div>
            <div className="text-sm text-[var(--text-muted)]">Anime Titles</div>
          </div>
          <div>
            <div className="text-3xl font-bold gradient-text">50K+</div>
            <div className="text-sm text-[var(--text-muted)]">Manga Chapters</div>
          </div>
          <div>
            <div className="text-3xl font-bold gradient-text">24/7</div>
            <div className="text-sm text-[var(--text-muted)]">Access</div>
          </div>
          <div>
            <div className="text-3xl font-bold gradient-text">Free</div>
            <div className="text-sm text-[var(--text-muted)]">To Watch</div>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/anime" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 p-6 border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">Watch Anime</h3>
              <p className="text-[var(--text-secondary)] text-sm">Stream thousands of anime series in HD quality with regular updates.</p>
            </div>
          </div>
        </Link>

        <Link href="/manga" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">Read Manga</h3>
              <p className="text-[var(--text-secondary)] text-sm">Explore thousands of manga titles from classic to latest releases.</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Genres Quick Access */}
      <section className="py-8">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Browse by Genre</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {genres.map((genre) => (
            <Link
              key={genre.name}
              href={`/search?q=${genre.name}`}
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent-primary)]/50 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{genre.icon}</span>
              <span className="text-xs font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                {genre.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Anime Section */}
      {animeList.length > 0 && (
        <Section title="Top Anime" viewAllHref="/anime">
          <div className="content-grid">
            {animeList.map((anime, index) => (
              <div 
                key={anime.id} 
                className="slide-up" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ContentCard
                  id={anime.id}
                  title={anime.title}
                  poster={anime.poster}
                  type={anime.type}
                  episodes={anime.episodes}
                  status={anime.status}
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Top Manga Section */}
      {mangaList.length > 0 && (
        <Section title="Top Manga" viewAllHref="/manga">
          <div className="content-grid">
            {mangaList.map((manga, index) => (
              <div 
                key={manga.id} 
                className="slide-up" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ContentCard
                  id={manga.id}
                  title={manga.title}
                  poster={manga.poster}
                  type={manga.type}
                  chapters={manga.chapters}
                  status={manga.status}
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-2xl font-bold text-center mb-12">
          <span className="gradient-text">Why Choose Us</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-orange-500/30 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-14 h-14 mb-5 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Lightning Fast Updates</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">New episodes and chapters added within hours of release. Never miss your favorite content.</p>
            </div>
          </div>
          
          <div className="group relative p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-purple-500/30 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-14 h-14 mb-5 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Anytime, Anywhere</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Access your favorite content 24/7 on any device. Seamless streaming and reading experience.</p>
            </div>
          </div>
          
          <div className="group relative p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-cyan-500/30 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-14 h-14 mb-5 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Completely Free</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">No subscriptions, no hidden fees. Enjoy unlimited access to all content for free forever.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
