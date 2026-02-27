import Link from 'next/link';
import { Section, SectionSkeleton } from '@/components/ui/Section';
import { ContentCard } from '@/components/ui/ContentCard';

// Sample data for demonstration - in production, this would come from the API
const sampleAnime = [
  { id: 'one-piece', title: 'One Piece', poster: '/placeholder-anime.jpg', type: 'anime' as const, episodes: 1000 },
  { id: 'naruto', title: 'Naruto', poster: '/placeholder-anime.jpg', type: 'anime' as const, episodes: 720 },
  { id: 'attack-on-titan', title: 'Attack on Titan', poster: '/placeholder-anime.jpg', type: 'anime' as const, episodes: 87 },
  { id: 'demon-slayer', title: 'Demon Slayer', poster: '/placeholder-anime.jpg', type: 'anime' as const, episodes: 26 },
  { id: 'my-hero-academia', title: 'My Hero Academia', poster: '/placeholder-anime.jpg', type: 'anime' as const, episodes: 138 },
];

const sampleManga = [
  { id: 'one-piece-manga', title: 'One Piece', poster: '/placeholder-manga.jpg', type: 'manga' as const, chapters: 1000 },
  { id: 'berserk', title: 'Berserk', poster: '/placeholder-manga.jpg', type: 'manga' as const, chapters: 370 },
  { id: 'vagabond', title: 'Vagabond', poster: '/placeholder-manga.jpg', type: 'manga' as const, chapters: 340 },
  { id: 'jojos-bizarre-adventure', title: "JoJo's Bizarre Adventure", poster: '/placeholder-manga.jpg', type: 'manga' as const, chapters: 130 },
  { id: 'fullmetal-alchemist', title: 'Fullmetal Alchemist', poster: '/placeholder-manga.jpg', type: 'manga' as const, chapters: 108 },
];

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Welcome to AniManga Hub
          </h1>
          <p className="text-lg text-white/90 mb-6">
            Your ultimate destination for streaming anime and reading manga. 
            Browse thousands of titles and enjoy seamless entertainment.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/anime"
              className="inline-flex items-center px-6 py-3 bg-white text-[var(--accent-primary)] rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Anime
            </Link>
            <Link
              href="/manga"
              className="inline-flex items-center px-6 py-3 bg-[var(--bg-primary)]/50 text-white border border-white/30 rounded-lg font-semibold hover:bg-[var(--bg-primary)]/70 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Read Manga
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/anime" className="group relative overflow-hidden rounded-xl bg-[var(--bg-secondary)] p-6 border border-[var(--border)] hover:border-[var(--accent-primary)] transition-all card-hover">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[var(--accent-primary)]/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">Watch Anime</h3>
            </div>
            <p className="text-[var(--text-secondary)]">Stream your favorite anime series and movies in HD quality.</p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--accent-primary)]/20 to-transparent rounded-full blur-2xl" />
        </Link>

        <Link href="/manga" className="group relative overflow-hidden rounded-xl bg-[var(--bg-secondary)] p-6 border border-[var(--border)] hover:border-[var(--accent-secondary)] transition-all card-hover">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[var(--accent-secondary)]/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--accent-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">Read Manga</h3>
            </div>
            <p className="text-[var(--text-secondary)]">Explore thousands of manga titles from various genres.</p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--accent-secondary)]/20 to-transparent rounded-full blur-2xl" />
        </Link>
      </div>

      {/* Popular Anime Section */}
      <Section title="Popular Anime" viewAllHref="/anime">
        <div className="content-grid">
          {sampleAnime.map((anime) => (
            <ContentCard
              key={anime.id}
              id={anime.id}
              title={anime.title}
              poster={anime.poster}
              type={anime.type}
              episodes={anime.episodes}
            />
          ))}
        </div>
      </Section>

      {/* Popular Manga Section */}
      <Section title="Popular Manga" viewAllHref="/manga">
        <div className="content-grid">
          {sampleManga.map((manga) => (
            <ContentCard
              key={manga.id}
              id={manga.id}
              title={manga.title}
              poster={manga.poster}
              type={manga.type}
              chapters={manga.chapters}
            />
          ))}
        </div>
      </Section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose AniManga Hub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-[var(--accent-primary)]/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast Updates</h3>
            <p className="text-[var(--text-secondary)] text-sm">New episodes and chapters added as soon as they&apos;re available.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-[var(--accent-secondary)]/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--accent-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">24/7 Access</h3>
            <p className="text-[var(--text-secondary)] text-sm">Watch and read anytime, anywhere, on any device.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-[var(--success)]/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Free to Use</h3>
            <p className="text-[var(--text-secondary)] text-sm">No subscription required. Enjoy all content for free.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
