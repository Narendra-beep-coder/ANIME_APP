# Active Context: AniManga Hub

## Current State

**Project Status**: ✅ Complete - Anime & Manga Streaming App

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] Complete anime streaming app with:
  - Homepage with featured content
  - Anime browse page with filtering
  - Manga browse page with filtering
  - Anime detail page with episode list
  - Manga detail page with chapter list
  - Anime video player with controls
  - Manga reader with horizontal/vertical modes
  - Search functionality
  - API routes for scraping allmanga.to
  - Dark theme with orange/purple accents
- [x] Fixed app to show correct content:
  - Replaced broken allmanga.to scraper with Jikan API (free MyAnimeList API)
  - Real anime/manga data with cover images, descriptions, genres, ratings
  - Numeric MAL IDs used for routing (e.g. /anime/21 for One Piece)
  - Home page fetches real top anime/manga server-side
  - Detail pages show real metadata with episode/chapter pagination
  - Watch page uses BigBuckBunny sample video for demo
  - Manga reader uses picsum.photos for placeholder pages
  - Search uses Jikan search API for real results
  - Updated next.config.ts to allow cdn.myanimelist.net and picsum.photos
  - Build and lint pass successfully

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page with featured sections | ✅ |
| `src/app/anime/page.tsx` | Anime browse page | ✅ |
| `src/app/manga/page.tsx` | Manga browse page | ✅ |
| `src/app/anime/[id]/page.tsx` | Anime detail page | ✅ |
| `src/app/anime/[id]/watch/page.tsx` | Anime video player | ✅ |
| `src/app/manga/[id]/page.tsx` | Manga detail page | ✅ |
| `src/app/manga/[id]/read/page.tsx` | Manga reader | ✅ |
| `src/app/search/page.tsx` | Search results page | ✅ |
| `src/lib/scraper.ts` | allmanga.to scraping utilities | ✅ |
| `src/app/api/` | API routes for server-side scraping | ✅ |
| `src/components/` | Reusable UI components | ✅ |

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript 5.9
- Tailwind CSS 4
- Bun package manager
- ESLint for code quality

## Design

- Dark theme with deep black background (#0f0f0f)
- Primary accent: Orange (#ff6b35)
- Secondary accent: Purple (#7c3aed)
- Fonts: Poppins (headings), Inter (body), JetBrains Mono (code)
- Responsive design for mobile, tablet, and desktop
- Custom video player controls
- Horizontal and vertical manga reader modes

## Notes

- Uses allmanga.to as the content source
- Includes sample data for demonstration when API is unavailable
- Video player uses sample video for demo purposes
- Manga reader includes sample placeholder pages
- Build passes successfully with TypeScript and ESLint checks
