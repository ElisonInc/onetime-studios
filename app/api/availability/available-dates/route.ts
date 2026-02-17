/**
 * GET /api/availability/available-dates
 * Get dates with available slots for a studio
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase';
import { GetAvailableDatesResponse } from '@/lib/database.types';
import { parse, format, addDays } from 'date-fns';
import { getWindowsForDate } from '@/lib/availability';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const studioId = searchParams.get('studioId');
    const rangeStart = searchParams.get('rangeStart');
    const rangeEnd = searchParams.get('rangeEnd');

    if (!studioId || !rangeStart || !rangeEnd) {
      return NextResponse.json(
        { error: 'Missing required parameters: studioId, rangeStart, rangeEnd' },
        { status: 400 }
      );
    }

    // Fetch studio
    const supabaseServer = getSupabaseServer();
    const { data: studio } = await supabaseServer
      .from('studios')
      .select('*')
      .eq('id', studioId)
      .single();

    if (!studio) {
      return NextResponse.json(
        { error: 'Studio not found' },
        { status: 404 }
      );
    }

    if (studio.status !== 'published') {
      return NextResponse.json(
        { error: 'Studio is not published' },
        { status: 403 }
      );
    }

    // Fetch availability rules and overrides
    const { data: rules } = await supabaseServer
      .from('availability_rules')
      .select('*')
      .eq('studio_id', studioId);

    const { data: overrides } = await supabaseServer
      .from('availability_overrides')
      .select('*')
      .eq('studio_id', studioId)
      .gte('date_local', rangeStart)
      .lte('date_local', rangeEnd);

    // Generate list of dates with available slots
    const availableDates: string[] = [];
    let current = parse(rangeStart, 'yyyy-MM-dd', new Date());
    const end = parse(rangeEnd, 'yyyy-MM-dd', new Date());

    while (current <= end) {
      const dateLocal = format(current, 'yyyy-MM-dd');

      // Get windows for this date
      const windows = getWindowsForDate(dateLocal, rules || [], overrides || []);

      if (windows.length > 0) {
        // Check if any slot is free (simplified: just check first 1-hour slot)
        // TODO: Improve to check all constraints properly
        availableDates.push(dateLocal);
      }

      current = addDays(current, 1);
    }

    const response: GetAvailableDatesResponse = {
      dates: availableDates,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Available dates error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
