import { NextRequest, NextResponse } from 'next/server';
import { getMangaList, getTrending, getRecentUpdates } from '@/lib/scraper';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const type = searchParams.get('type'); // 'trending' | 'recent' | 'list'

  try {
    let results;
    
    if (type === 'trending') {
      results = await getTrending('manga');
    } else if (type === 'recent') {
      results = await getRecentUpdates('manga');
    } else {
      results = await getMangaList(page);
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Manga list API error:', error);
    return NextResponse.json({ error: 'Failed to fetch manga list' }, { status: 500 });
  }
}
