import { NextRequest, NextResponse } from 'next/server';
import { getAnimeList, getTrending, getRecentUpdates } from '@/lib/scraper';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const type = searchParams.get('type'); // 'trending' | 'recent' | 'list' | 'popular'

  try {
    let results;
    
    if (type === 'trending') {
      results = await getTrending('anime');
    } else if (type === 'recent') {
      results = await getRecentUpdates('anime');
    } else {
      results = await getAnimeList(page);
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Anime list API error:', error);
    return NextResponse.json({ error: 'Failed to fetch anime list' }, { status: 500 });
  }
}
