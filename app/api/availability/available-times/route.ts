/**
 * GET /api/availability/available-times
 * Get available start times for a specific date and duration
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase';
import { GetAvailableTimesResponse } from '@/lib/database.types';
import { getWindowsForDate, getAvailableStartTimes } from '@/lib/availability';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const studioId = searchParams.get('studioId');
    const dateLocal = searchParams.get('dateLocal');
    const durationHours = parseInt(searchParams.get('durationHours') || '1');

    if (!studioId || !dateLocal) {
      return NextResponse.json(
        { error: 'Missing required parameters: studioId, dateLocal' },
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

    const tz = studio.tz || 'America/New_York';

    // Fetch availability rules and overrides
    const { data: rules } = await supabaseServer
      .from('availability_rules')
      .select('*')
      .eq('studio_id', studioId);

    const { data: overrides } = await supabaseServer
      .from('availability_overrides')
      .select('*')
      .eq('studio_id', studioId)
      .eq('date_local', dateLocal);

    const { data: blocks } = await supabaseServer
      .from('availability_blocks')
      .select('*')
      .eq('studio_id', studioId);

    const { data: bookings } = await supabaseServer
      .from('bookings')
      .select('*')
      .eq('studio_id', studioId)
      .eq('status', 'confirmed');

    // Get windows for this date
    const windows = getWindowsForDate(dateLocal, rules || [], overrides || []);

    if (windows.length === 0) {
      const response: GetAvailableTimesResponse = {
        times: [],
      };
      return NextResponse.json(response);
    }

    // Get available start times
    const times = getAvailableStartTimes(
      dateLocal,
      durationHours,
      tz,
      windows,
      blocks || [],
      bookings || []
    );

    const response: GetAvailableTimesResponse = {
      times,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Available times error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
