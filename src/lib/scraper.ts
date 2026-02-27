// Utility for scraping data from allmanga.to
// Note: This uses the site's public pages. Rate limiting should be respected.

const BASE_URL = 'https://allmanga.to';

interface SearchResult {
  id: string;
  title: string;
  poster?: string;
  type: 'anime' | 'manga';
  status?: string;
  genres?: string[];
  rating?: string;
  year?: string;
  episodes?: number;
  chapters?: number;
}

interface DetailResult {
  id: string;
  title: string;
  poster?: string;
  banner?: string;
  type: 'anime' | 'manga';
  status?: string;
  genres?: string[];
  rating?: string;
  year?: string;
  description?: string;
  episodes?: Episode[];
  chapters?: Chapter[];
  totalEpisodes?: number;
  totalChapters?: number;
}

interface Episode {
  number: number;
  title?: string;
  url?: string;
}

interface Chapter {
  number: number;
  title?: string;
  url?: string;
}

export async function searchContent(query: string, type?: 'anime' | 'manga'): Promise<SearchResult[]> {
  try {
    const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}${type ? `&type=${type}` : ''}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    if (!response.ok) throw new Error('Search failed');

    const html = await response.text();
    return parseSearchResults(html, type);
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

function parseSearchResults(html: string, type?: 'anime' | 'manga'): SearchResult[] {
  const results: SearchResult[] = [];
  
  // Try to find card elements in the HTML
  const cardRegex = /<a\s+href="(\/manga\/[^"]+)"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*>[\s\S]*?<div[^>]*class="[^"]*title[^"]*"[^>]*>([^<]+)<\/div>/gi;
  
  let match;
  while ((match = cardRegex.exec(html)) !== null && results.length < 20) {
    const url = match[1];
    const poster = match[2];
    const title = match[3].trim();
    
    const isAnime = url.includes('/anime/') || (!url.includes('/manga/') && type === 'anime');
    
    results.push({
      id: url.split('/').pop() || '',
      title,
      poster: poster.startsWith('http') ? poster : `${BASE_URL}${poster}`,
      type: isAnime ? 'anime' : 'manga',
    });
  }
  
  return results;
}

export async function getAnimeList(page: number = 1): Promise<SearchResult[]> {
  try {
    const response = await fetch(`${BASE_URL}/anime?page=${page}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch anime list');

    const html = await response.text();
    return parseListResults(html, 'anime');
  } catch (error) {
    console.error('Get anime list error:', error);
    return [];
  }
}

export async function getMangaList(page: number = 1): Promise<SearchResult[]> {
  try {
    const response = await fetch(`${BASE_URL}/manga?page=${page}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch manga list');

    const html = await response.text();
    return parseListResults(html, 'manga');
  } catch (error) {
    console.error('Get manga list error:', error);
    return [];
  }
}

function parseListResults(html: string, defaultType: 'anime' | 'manga'): SearchResult[] {
  const results: SearchResult[] = [];
  
  // Common patterns for card extraction
  const patterns = [
    // Pattern for card with film-poster class
    /<article[^>]*class="[^"]*film-poster[^"]*"[^>]*>[\s\S]*?<a\s+href="([^"]+)"[^>]*>[\s\S]*?<img[^>]+data-src="([^"]+)"[^>]*>[\s\S]*?<[^>]*class="[^"]*title[^"]*"[^>]*>([^<]+)<\/[^>]*>/gi,
    // Pattern for card with img src
    /<a\s+href="(\/(?:anime|manga)\/[^"]+)"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*>[\s\S]*?<div[^>]*class="[^"]*title[^"]*"[^>]*>([^<]+)<\/div>/gi,
  ];
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) !== null && results.length < 24) {
      const url = match[1];
      const poster = match[2];
      const title = match[3].trim();
      
      if (!title || !url) continue;
      
      const isAnime = url.includes('/anime/');
      
      results.push({
        id: url.split('/').pop() || '',
        title,
        poster: poster.startsWith('http') ? poster : `${BASE_URL}${poster}`,
        type: isAnime ? 'anime' : 'manga',
      });
    }
    if (results.length > 0) break;
  }
  
  return results;
}

export async function getAnimeDetails(id: string): Promise<DetailResult | null> {
  try {
    const response = await fetch(`${BASE_URL}/anime/${id}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch anime details');

    const html = await response.text();
    return parseDetails(html, 'anime', id);
  } catch (error) {
    console.error('Get anime details error:', error);
    return null;
  }
}

export async function getMangaDetails(id: string): Promise<DetailResult | null> {
  try {
    const response = await fetch(`${BASE_URL}/manga/${id}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch manga details');

    const html = await response.text();
    return parseDetails(html, 'manga', id);
  } catch (error) {
    console.error('Get manga details error:', error);
    return null;
  }
}

function parseDetails(html: string, type: 'anime' | 'manga', id: string): DetailResult {
  const result: DetailResult = {
    id,
    title: 'Unknown Title',
    type,
    episodes: [],
    chapters: [],
  };

  // Extract title
  const titleMatch = html.match(/<h1[^>]*class="[^"]*title[^"]*"[^>]*>([^<]+)<\/h1>/i);
  if (titleMatch) result.title = titleMatch[1].trim();

  // Extract poster
  const posterMatch = html.match(/<img[^>]+class="[^"]*poster[^"]*"[^>]+src="([^"]+)"/i) 
    || html.match(/<img[^>]+data-src="([^"]+)"[^>]*class="[^"]*poster/i);
  if (posterMatch) result.poster = posterMatch[1];

  // Extract banner/background
  const bannerMatch = html.match(/<div[^>]+class="[^"]*banner[^"]*"[^>]+style="[^"]*background[^:]+:url\("([^"]+)"\)/i);
  if (bannerMatch) result.banner = bannerMatch[1];

  // Extract description
  const descMatch = html.match(/<div[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
    || html.match(/<p[^>]*class="[^"]*synopsis[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
  if (descMatch) result.description = descMatch[1].replace(/<[^>]+>/g, '').trim();

  // Extract genres
  const genreMatch = html.match(/<a[^>]*class="[^"]*genre[^"]*"[^>]*>([^<]+)<\/a>/gi);
  if (genreMatch) {
    result.genres = genreMatch.map(g => g.replace(/<[^>]+>/g, '').trim());
  }

  // Extract status
  const statusMatch = html.match(/<span[^>]*class="[^"]*status[^"]*"[^>]*>([^<]+)<\/span>/i);
  if (statusMatch) result.status = statusMatch[1].trim();

  // Extract year
  const yearMatch = html.match(/<span[^>]*class="[^"]*year[^"]*"[^>]*>([^<]+)<\/span>/i);
  if (yearMatch) result.year = yearMatch[1].trim();

  // Extract rating
  const ratingMatch = html.match(/<span[^>]*class="[^"]*rating[^"]*"[^>]*>([^<]+)<\/span>/i);
  if (ratingMatch) result.rating = ratingMatch[1].trim();

  // Extract episodes/chapters list
  const episodePattern = new RegExp('<a[^>]+href="(/anime/[^/]+/episode-(\\d+))"[^>]*>', 'gi');
  const chapterPattern = new RegExp('<a[^>]+href="(/manga/[^/]+/chapter-(\\d+))"[^>]*>', 'gi');
  
  const pattern = type === 'anime' ? episodePattern : chapterPattern;
  let match;
  while ((match = pattern.exec(html)) !== null) {
    const item = {
      number: parseInt(match[2]),
      url: match[1],
    };
    if (type === 'anime') {
      result.episodes?.push(item as any);
    } else {
      result.chapters?.push(item as any);
    }
  }

  result.totalEpisodes = result.episodes?.length || 0;
  result.totalChapters = result.chapters?.length || 0;

  return result;
}

export async function getEpisodeStream(id: string, episode: number): Promise<{ url: string; subtitles?: string[] } | null> {
  try {
    const response = await fetch(`${BASE_URL}/anime/${id}/episode-${episode}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch episode');

    const html = await response.text();
    
    // Look for video URL in the page
    const videoMatch = html.match(/src\s*[=:]\s*["']([^"']+\.m3u8[^"']*)["']/i)
      || html.match(/src\s*[=:]\s*["']([^"']+\.mp4[^"']*)["']/i)
      || html.match(/videoSrc\s*[=:]\s*["']([^"']+)["']/i)
      || html.match(/file\s*[=:]\s*["']([^"']+)["']/i);
    
    if (videoMatch) {
      return { url: videoMatch[1] };
    }
    
    // If no direct video found, return a placeholder URL
    // In production, you'd need to parse the actual video source from the page
    return { url: '' };
  } catch (error) {
    console.error('Get episode stream error:', error);
    return null;
  }
}

export async function getChapterPages(id: string, chapter: number): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/manga/${id}/chapter-${chapter}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch chapter');

    const html = await response.text();
    return parseChapterPages(html);
  } catch (error) {
    console.error('Get chapter pages error:', error);
    return [];
  }
}

function parseChapterPages(html: string): string[] {
  const pages: string[] = [];
  
  // Look for page images - common patterns
  const patterns = [
    /<img[^>]+data-src="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"[^>]*>/gi,
    /<img[^>]+src="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"[^>]*>/gi,
    /"image"\s*:\s*"([^"]+)"/gi,
  ];
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const url = match[1];
      if (url && !url.includes('data:image') && !pages.includes(url)) {
        pages.push(url);
      }
    }
  }
  
  return pages;
}

export async function getTrending(type: 'anime' | 'manga' = 'anime'): Promise<SearchResult[]> {
  try {
    const url = type === 'anime' ? `${BASE_URL}/top-anime` : `${BASE_URL}/top-manga`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch trending');

    const html = await response.text();
    return parseListResults(html, type);
  } catch (error) {
    console.error('Get trending error:', error);
    return [];
  }
}

export async function getRecentUpdates(type: 'anime' | 'manga' = 'anime'): Promise<SearchResult[]> {
  try {
    const url = type === 'anime' ? `${BASE_URL}/recent-anime` : `${BASE_URL}/recent-manga`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch recent');

    const html = await response.text();
    return parseListResults(html, type);
  } catch (error) {
    console.error('Get recent updates error:', error);
    return [];
  }
}
