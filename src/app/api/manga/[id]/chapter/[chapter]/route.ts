import { NextRequest, NextResponse } from 'next/server';
import { getChapterPages } from '@/lib/scraper';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; chapter: string }> }
) {
  const { id, chapter } = await params;

  if (!id || !chapter) {
    return NextResponse.json({ error: 'Manga ID and chapter number are required' }, { status: 400 });
  }

  try {
    const pages = await getChapterPages(id, parseInt(chapter));
    
    if (!pages || pages.length === 0) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
    }

    return NextResponse.json({ pages });
  } catch (error) {
    console.error('Chapter pages API error:', error);
    return NextResponse.json({ error: 'Failed to fetch chapter pages' }, { status: 500 });
  }
}
