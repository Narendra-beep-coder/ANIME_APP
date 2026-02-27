# Anime & Manga Streaming App Specification

## 1. Project Overview

**Project Name**: AniManga Hub  
**Project Type**: Web Application (Next.js)  
**Core Functionality**: A unified platform for watching anime and reading manga, using allmanga.to as the content source. Users can browse, search, stream anime episodes, and read manga chapters.  
**Target Users**: Anime and manga enthusiasts who want a convenient all-in-one viewing/reading experience.

---

## 2. UI/UX Specification

### Layout Structure

**Global Layout**:
- Sticky header with logo, navigation tabs (Anime/Manga), and search bar
- Main content area with dynamic routing
- Footer with copyright and links

**Page Sections**:
- **Home**: Featured content carousel, trending sections for both anime and manga
- **Browse**: Filterable grid of anime/manga with genre, status, sort options
- **Detail Page**: Cover image, synopsis, episode/chapter list, related content
- **Watch/Read Page**: Full-screen video player or image-based manga reader
- **Search Results**: Grid results with filters

**Responsive Breakpoints**:
- Mobile: < 640px (single column, stacked navigation)
- Tablet: 640px - 1024px (2-column grids)
- Desktop: > 1024px (3-4 column grids, sidebar filters)

### Visual Design

**Color Palette**:
- Primary Background: `#0f0f0f` (deep black)
- Secondary Background: `#1a1a1a` (card backgrounds)
- Primary Accent: `#ff6b35` (orange - CTAs, highlights)
- Secondary Accent: `#7c3aed` (purple - secondary actions)
- Text Primary: `#f5f5f5` (off-white)
- Text Secondary: `#a0a0a0` (muted gray)
- Success: `#10b981` (green)
- Error: `#ef4444` (red)

**Typography**:
- Headings: `"Poppins", sans-serif` - Bold, 700 weight
  - H1: 2.5rem (40px)
  - H2: 2rem (32px)
  - H3: 1.5rem (24px)
- Body: `"Inter", sans-serif` - Regular, 400 weight
  - Base: 1rem (16px)
  - Small: 0.875rem (14px)
- Monospace (episode numbers): `"JetBrains Mono", monospace`

**Spacing System**:
- Base unit: 4px
- XS: 4px | SM: 8px | MD: 16px | LG: 24px | XL: 32px | 2XL: 48px

**Visual Effects**:
- Card hover: Scale 1.02, box-shadow `0 8px 30px rgba(255, 107, 53, 0.15)`
- Buttons: Gradient background with subtle glow on hover
- Page transitions: Fade-in with 300ms ease
- Skeleton loaders: Animated shimmer effect

### Components

**Header**:
- Logo (left): "AniManga" with gradient text
- Navigation (center): Tabs for "Anime", "Manga", "Home"
- Search (right): Expandable search input with icon
- Mobile: Hamburger menu with slide-out drawer

**Content Cards**:
- Aspect ratio: 2:3 for manga, 16:9 for anime
- Shows: Cover image, title, type (Sub/Dub for anime), status badge
- Hover state: Overlay with quick actions (Play, Add to list)
- Size variants: Small (150px), Medium (200px), Large (280px)

**Episode/Chapter List**:
- Scrollable horizontal or vertical list
- Episode number badge
- Watched/Read indicator (checkmark)
- Hover: Highlight with accent color

**Video Player**:
- Custom controls overlay
- Quality selector dropdown
- Episode navigation (prev/next)
- Skip intro/outro buttons (if available)
- Fullscreen toggle

**Manga Reader**:
- Horizontal scroll mode (default)
- Vertical scroll mode (optional)
- Page navigation arrows
- Chapter progress indicator
- Zoom controls

**Search**:
- Autocomplete suggestions
- Recent searches
- Filter chips (Type, Genre, Status)

---

## 3. Functionality Specification

### Core Features

**1. Content Browsing**:
- Homepage with featured/trending anime and manga
- Browse pages with filtering (genre, status, year, sort by)
- Category pages for each genre
- Pagination or infinite scroll

**2. Search**:
- Real-time search suggestions
- Search by title (fuzzy matching)
- Filter results by type (anime/manga), status, genre

**3. Anime Streaming**:
- Episode list with numbering
- Video playback with quality options (if available from source)
- Playback controls: play/pause, seek, volume, fullscreen
- Auto-play next episode
- Remember watch progress

**4. Manga Reading**:
- Chapter list with reading progress
- Image-based page viewer
- Navigation: arrow keys, click zones, swipe (mobile)
- Preload adjacent pages for smooth reading
- Remember reading position

**5. Details Page**:
- Cover image, title, alternative titles
- Synopsis/description
- Metadata: Year, genres, status, rating
- Episode/chapter list
- Related/similar content

### User Interactions and Flows

**Flow 1: Browse and Watch Anime**
1. User lands on homepage
2. Clicks "Anime" tab or browses trending
3. Filters by genre or searches for specific title
4. Clicks on anime card → Detail page
5. Selects episode from list
6. Video player opens → watches content
7. Can navigate episodes or return to detail

**Flow 2: Read Manga**
1. User clicks "Manga" tab
2. Browses or searches for manga
3. Clicks on manga card → Detail page
4. Selects chapter
5. Reader opens → reads through pages
6. Navigation via arrows or scroll
7. Auto-advance to next chapter option

### Data Handling

**API Routes (Backend)**:
- `/api Generic proxy to fetch from allm/proxy` -anga.to (avoid CORS)
- `/api/search` - Search anime/manga
- `/api/anime/[id]` - Get anime details and episodes
- `/api/anime/[id]/episode/[num]` - Get episode streaming URL
- `/api/manga/[id]` - Get manga details and chapters
- `/api/manga/[id]/chapter/[num]` - Get chapter pages

**Note**: Allmanga.to is a scraping source. The app will need to:
1. Fetch HTML from allmanga.to via server-side proxy
2. Parse and extract relevant data
3. Return structured JSON to frontend
4. For video/images, either proxy or use direct URLs

### Edge Cases

- **Source unavailable**: Show error message, suggest retry
- **No results**: "No anime/manga found" state with suggestions
- **Video playback error**: Fallback message, try reload
- **Slow connection**: Show loading skeletons, progressive loading
- **Missing metadata**: Show placeholder, indicate "Unknown"
- **Mobile navigation**: Touch-friendly controls, responsive layout

---

## 4. Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme with orange/purple accents applied consistently
- [ ] Header is sticky and navigation works
- [ ] Content cards display properly in grid (responsive)
- [ ] Hover effects work on cards and buttons
- [ ] Video player has custom controls
- [ ] Manga reader displays pages correctly

### Functional Checkpoints
- [ ] Can browse anime list from homepage
- [ ] Can browse manga list from homepage
- [ ] Search returns relevant results
- [ ] Can view anime details and episode list
- [ ] Can view manga details and chapter list
- [ ] Video player plays anime episodes
- [ ] Manga reader displays chapter pages
- [ ] Navigation between pages works
- [ ] Responsive on mobile/tablet/desktop

### Technical Checkpoints
- [ ] No critical console errors
- [ ] API routes return valid JSON
- [ ] Proxy handles CORS correctly
- [ ] Pages load within reasonable time
- [ ] TypeScript compiles without errors
- [ ] ESLint passes
