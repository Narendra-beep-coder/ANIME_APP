// Jikan API v4 - Free MyAnimeList API
// Documentation: https://docs.api.jikan.moe/

const JIKAN_BASE = 'https://api.jikan.moe/v4';

export interface SearchResult {
  id: string;
  malId: number;
  title: string;
  poster?: string;
  type: 'anime' | 'manga';
  status?: string;
  genres?: string[];
  rating?: string;
  year?: string;
  episodes?: number;
  chapters?: number;
  score?: number;
}

export interface Episode {
  number: number;
  title?: string;
  url?: string;
}

export interface Chapter {
  number: number;
  title?: string;
  url?: string;
}

export interface DetailResult {
  id: string;
  malId: number;
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
  score?: number;
  titleEnglish?: string;
  titleJapanese?: string;
  studios?: string[];
  authors?: string[];
}

async function jikanFetch(path: string) {
  const response = await fetch(`${JIKAN_BASE}${path}`, {
    headers: {
      'Accept': 'application/json',
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Jikan API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function mapAnimeItem(item: Record<string, unknown>): SearchResult {
  const genres = (item.genres as Array<{ name: string }> | undefined) || [];
  const images = item.images as Record<string, Record<string, string>> | undefined;
  
  let year: string | undefined;
  if (item.year) {
    year = String(item.year);
  } else {
    const aired = item.aired as Record<string, unknown> | undefined;
    const prop = aired?.prop as Record<string, unknown> | undefined;
    const from = prop?.from as Record<string, unknown> | undefined;
    if (from?.year) {
      year = String(from.year);
    }
  }

  return {
    id: String(item.mal_id),
    malId: item.mal_id as number,
    title: (item.title_english as string) || (item.title as string) || 'Unknown',
    poster: images?.jpg?.large_image_url || images?.jpg?.image_url,
    type: 'anime',
    status: item.status as string | undefined,
    genres: genres.map((g) => g.name),
    rating: item.score ? String(item.score) : undefined,
    year,
    episodes: item.episodes as number | undefined,
    score: item.score as number | undefined,
  };
}

function mapMangaItem(item: Record<string, unknown>): SearchResult {
  const genres = (item.genres as Array<{ name: string }> | undefined) || [];
  const images = item.images as Record<string, Record<string, string>> | undefined;

  let year: string | undefined;
  const published = item.published as Record<string, unknown> | undefined;
  const prop = published?.prop as Record<string, unknown> | undefined;
  const from = prop?.from as Record<string, unknown> | undefined;
  if (from?.year) {
    year = String(from.year);
  }

  return {
    id: String(item.mal_id),
    malId: item.mal_id as number,
    title: (item.title_english as string) || (item.title as string) || 'Unknown',
    poster: images?.jpg?.large_image_url || images?.jpg?.image_url,
    type: 'manga',
    status: item.status as string | undefined,
    genres: genres.map((g) => g.name),
    rating: item.score ? String(item.score) : undefined,
    year,
    chapters: item.chapters as number | undefined,
    score: item.score as number | undefined,
  };
}

export async function searchContent(query: string, type?: 'anime' | 'manga'): Promise<SearchResult[]> {
  try {
    const results: SearchResult[] = [];

    if (!type || type === 'anime') {
      const data = await jikanFetch(`/anime?q=${encodeURIComponent(query)}&limit=12&sfw=true`);
      if (data.data) {
        results.push(...data.data.map(mapAnimeItem));
      }
    }

    if (!type || type === 'manga') {
      const data = await jikanFetch(`/manga?q=${encodeURIComponent(query)}&limit=12&sfw=true`);
      if (data.data) {
        results.push(...data.data.map(mapMangaItem));
      }
    }

    return results;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

export async function getAnimeList(page: number = 1): Promise<SearchResult[]> {
  try {
    const data = await jikanFetch(`/top/anime?page=${page}&limit=24&filter=bypopularity`);
    if (data.data) {
      return data.data.map(mapAnimeItem);
    }
    return [];
  } catch (error) {
    console.error('Get anime list error:', error);
    return [];
  }
}

export async function getMangaList(page: number = 1): Promise<SearchResult[]> {
  try {
    const data = await jikanFetch(`/top/manga?page=${page}&limit=24&filter=bypopularity`);
    if (data.data) {
      return data.data.map(mapMangaItem);
    }
    return [];
  } catch (error) {
    console.error('Get manga list error:', error);
    return [];
  }
}

export async function getAnimeDetails(id: string): Promise<DetailResult | null> {
  try {
    const data = await jikanFetch(`/anime/${id}/full`);
    if (!data.data) return null;

    const item = data.data as Record<string, unknown>;
    const genres = (item.genres as Array<{ name: string }> | undefined) || [];
    const studios = (item.studios as Array<{ name: string }> | undefined) || [];
    const images = item.images as Record<string, Record<string, string>> | undefined;
    const totalEpisodes = (item.episodes as number) || 0;

    // Generate episode list
    const episodes: Episode[] = [];
    for (let i = 1; i <= Math.min(totalEpisodes, 500); i++) {
      episodes.push({ number: i, title: `Episode ${i}` });
    }

    return {
      id,
      malId: item.mal_id as number,
      title: (item.title_english as string) || (item.title as string) || 'Unknown',
      poster: images?.jpg?.large_image_url || images?.jpg?.image_url,
      banner: images?.jpg?.large_image_url,
      type: 'anime',
      status: item.status as string | undefined,
      genres: genres.map((g) => g.name),
      rating: item.score ? String(item.score) : undefined,
      year: item.year ? String(item.year) : undefined,
      description: item.synopsis as string | undefined,
      episodes,
      totalEpisodes,
      score: item.score as number | undefined,
      titleEnglish: item.title_english as string | undefined,
      titleJapanese: item.title_japanese as string | undefined,
      studios: studios.map((s) => s.name),
    };
  } catch (error) {
    console.error('Get anime details error:', error);
    return null;
  }
}

export async function getMangaDetails(id: string): Promise<DetailResult | null> {
  try {
    const data = await jikanFetch(`/manga/${id}/full`);
    if (!data.data) return null;

    const item = data.data as Record<string, unknown>;
    const genres = (item.genres as Array<{ name: string }> | undefined) || [];
    const authors = (item.authors as Array<{ name: string }> | undefined) || [];
    const images = item.images as Record<string, Record<string, string>> | undefined;
    const totalChapters = (item.chapters as number) || 0;

    // Generate chapter list
    const chapters: Chapter[] = [];
    for (let i = 1; i <= Math.min(totalChapters, 500); i++) {
      chapters.push({ number: i, title: `Chapter ${i}` });
    }

    let mangaYear: string | undefined;
    const publishedData = item.published as Record<string, unknown> | undefined;
    const publishedProp = publishedData?.prop as Record<string, unknown> | undefined;
    const publishedFrom = publishedProp?.from as Record<string, unknown> | undefined;
    if (publishedFrom?.year) {
      mangaYear = String(publishedFrom.year);
    }

    return {
      id,
      malId: item.mal_id as number,
      title: (item.title_english as string) || (item.title as string) || 'Unknown',
      poster: images?.jpg?.large_image_url || images?.jpg?.image_url,
      type: 'manga',
      status: item.status as string | undefined,
      genres: genres.map((g) => g.name),
      rating: item.score ? String(item.score) : undefined,
      year: mangaYear,
      description: item.synopsis as string | undefined,
      chapters,
      totalChapters,
      score: item.score as number | undefined,
      titleEnglish: item.title_english as string | undefined,
      titleJapanese: item.title_japanese as string | undefined,
      authors: authors.map((a) => a.name),
    };
  } catch (error) {
    console.error('Get manga details error:', error);
    return null;
  }
}

export async function getEpisodeStream(id: string, episode: number): Promise<{ url: string; subtitles?: string[] } | null> {
  // Jikan API doesn't provide streaming URLs (it's a metadata API)
  // Return a sample video for demonstration
  return {
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    subtitles: [],
  };
}

export async function getChapterPages(id: string, chapter: number): Promise<string[]> {
  // Jikan API doesn't provide manga pages (it's a metadata API)
  // Return placeholder pages for demonstration
  return Array.from({ length: 18 }, (_, i) =>
    `https://picsum.photos/seed/${id}-ch${chapter}-p${i + 1}/800/1200`
  );
}

export async function getTrending(type: 'anime' | 'manga' = 'anime'): Promise<SearchResult[]> {
  try {
    const data = await jikanFetch(`/top/${type}?limit=12&filter=airing`);
    if (data.data) {
      return type === 'anime'
        ? data.data.map(mapAnimeItem)
        : data.data.map(mapMangaItem);
    }
    return [];
  } catch (error) {
    console.error('Get trending error:', error);
    return [];
  }
}

export async function getRecentUpdates(type: 'anime' | 'manga' = 'anime'): Promise<SearchResult[]> {
  try {
    const filter = type === 'anime' ? 'airing' : 'publishing';
    const data = await jikanFetch(`/top/${type}?limit=12&filter=${filter}`);
    if (data.data) {
      return type === 'anime'
        ? data.data.map(mapAnimeItem)
        : data.data.map(mapMangaItem);
    }
    return [];
  } catch (error) {
    console.error('Get recent updates error:', error);
    return [];
  }
}

export async function getTopAnime(limit: number = 12): Promise<SearchResult[]> {
  try {
    const data = await jikanFetch(`/top/anime?limit=${limit}&filter=bypopularity`);
    if (data.data) {
      return data.data.map(mapAnimeItem);
    }
    return [];
  } catch (error) {
    console.error('Get top anime error:', error);
    return [];
  }
}

export async function getTopManga(limit: number = 12): Promise<SearchResult[]> {
  try {
    const data = await jikanFetch(`/top/manga?limit=${limit}&filter=bypopularity`);
    if (data.data) {
      return data.data.map(mapMangaItem);
    }
    return [];
  } catch (error) {
    console.error('Get top manga error:', error);
    return [];
  }
}
