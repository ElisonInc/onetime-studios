/**
 * POST /api/bookings/confirm
 * Confirm a booking after successful Stripe payment
 */

import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getSupabaseServer } from '@/lib/supabase';
import { ConfirmBookingResponse } from '@/lib/database.types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingId, paymentIntentId } = body;

    if (!bookingId || !paymentIntentId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify Stripe payment succeeded
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment not successful' },
        { status: 400 }
      );
    }

    // Update booking to confirmed (idempotent)
    const { data: booking, error } = await getSupabaseServer()
      .from('bookings')
      .update({
        status: 'confirmed',
        confirmed_at: new Date().toISOString(),
      })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) {
      console.error('Booking update error:', error);
      return NextResponse.json(
        { error: 'Failed to confirm booking' },
        { status: 500 }
      );
    }

    const response: ConfirmBookingResponse = {
      success: true,
      booking: booking,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Confirm booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
