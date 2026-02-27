import { NextRequest, NextResponse } from 'next/server';
import { getMangaDetails } from '@/lib/scraper';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Manga ID is required' }, { status: 400 });
  }

  try {
    const details = await getMangaDetails(id);
    
    if (!details) {
      return NextResponse.json({ error: 'Manga not found' }, { status: 404 });
    }

    return NextResponse.json({ details });
  } catch (error) {
    console.error('Manga details API error:', error);
    return NextResponse.json({ error: 'Failed to fetch manga details' }, { status: 500 });
  }
}
