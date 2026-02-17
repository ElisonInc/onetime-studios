/**
 * POST /api/bookings/create-payment-intent
 * Create a Stripe PaymentIntent and a pending booking
 */

import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getSupabaseServer } from '@/lib/supabase';
import {
  CreatePaymentIntentRequest,
  CreatePaymentIntentResponse,
  Studio,
} from '@/lib/database.types';
import {
  calculatePrice,
  validateBookingConstraints,
  hasConflict,
} from '@/lib/availability';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreatePaymentIntentRequest;
    const { studioId, startAtUtc, endAtUtc, userId } = body;

    if (!studioId || !startAtUtc || !endAtUtc || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Fetch studio
    const { data: studio, error: studioError } = await getSupabaseServer()
      .from('studios')
      .select('*')
      .eq('id', studioId)
      .single();

    if (studioError || !studio) {
      return NextResponse.json(
        { error: 'Studio not found' },
        { status: 404 }
      );
    }

    if (studio.status !== 'published') {
      return NextResponse.json(
        { error: 'Studio is not available for booking' },
        { status: 403 }
      );
    }

    const startDate = new Date(startAtUtc);
    const endDate = new Date(endAtUtc);

    // Validate booking constraints
    const validation = validateBookingConstraints(studio as Studio, startDate, endDate);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Fetch availability blocks and confirmed bookings
    const { data: blocks } = await getSupabaseServer()
      .from('availability_blocks')
      .select('*')
      .eq('studio_id', studioId)
      .lte('start_at_utc', endAtUtc)
      .gte('end_at_utc', startAtUtc);

    const { data: bookings } = await getSupabaseServer()
      .from('bookings')
      .select('*')
      .eq('studio_id', studioId)
      .lte('start_at_utc', endAtUtc)
      .gte('end_at_utc', startAtUtc);

    // Check for conflicts (race condition check)
    if (hasConflict(startDate, endDate, blocks || [], bookings || [])) {
      return NextResponse.json(
        { error: 'This time slot is no longer available' },
        { status: 409 }
      );
    }

    // Calculate price
    const price = calculatePrice(studio as Studio, startDate, endDate);
    const priceInCents = Math.round(price * 100);

    // Create Stripe PaymentIntent
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceInCents,
      currency: 'usd',
      metadata: {
        studio_id: studioId,
        user_id: userId,
      },
    });

    // Create pending booking
    const bookingId = uuidv4();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const { error: bookingError } = await getSupabaseServer()
      .from('bookings')
      .insert({
        id: bookingId,
        studio_id: studioId,
        user_id: userId,
        start_at_utc: startAtUtc,
        end_at_utc: endAtUtc,
        price_total: price,
        stripe_payment_intent_id: paymentIntent.id,
        status: 'pending',
        expires_at: expiresAt.toISOString(),
      });

    if (bookingError) {
      // Clean up Stripe PaymentIntent if booking creation fails
      await stripe.paymentIntents.cancel(paymentIntent.id);
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      );
    }

    const response: CreatePaymentIntentResponse = {
      bookingId,
      clientSecret: paymentIntent.client_secret || '',
      amount: priceInCents,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Payment intent error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
