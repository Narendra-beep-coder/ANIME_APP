import { NextRequest, NextResponse } from 'next/server';
import { getAnimeDetails } from '@/lib/scraper';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Anime ID is required' }, { status: 400 });
  }

  try {
    const details = await getAnimeDetails(id);
    
    if (!details) {
      return NextResponse.json({ error: 'Anime not found' }, { status: 404 });
    }

    return NextResponse.json({ details });
  } catch (error) {
    console.error('Anime details API error:', error);
    return NextResponse.json({ error: 'Failed to fetch anime details' }, { status: 500 });
  }
}
