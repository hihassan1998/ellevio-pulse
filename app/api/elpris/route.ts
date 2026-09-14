import { NextResponse } from 'next/server';
import { getAggregatedPrices } from '@/lib/elpris';

export async function GET() {
  try {
    const data = await getAggregatedPrices();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch electricity prices' }, { status: 500 });
  }
}
