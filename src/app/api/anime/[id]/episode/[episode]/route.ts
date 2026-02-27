import { NextRequest, NextResponse } from 'next/server';
import { getEpisodeStream } from '@/lib/scraper';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; episode: string }> }
) {
  const { id, episode } = await params;

  if (!id || !episode) {
    return NextResponse.json({ error: 'Anime ID and episode number are required' }, { status: 400 });
  }

  try {
    const stream = await getEpisodeStream(id, parseInt(episode));
    
    if (!stream) {
      return NextResponse.json({ error: 'Episode not found' }, { status: 404 });
    }

    return NextResponse.json(stream);
  } catch (error) {
    console.error('Episode stream API error:', error);
    return NextResponse.json({ error: 'Failed to fetch episode stream' }, { status: 500 });
  }
}
