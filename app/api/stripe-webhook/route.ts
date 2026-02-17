/**
 * POST /api/stripe-webhook
 * Handle Stripe webhook events (payment_intent.succeeded, etc.)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getStripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe';
import { getSupabaseServer } from '@/lib/supabase';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    if (!STRIPE_WEBHOOK_SECRET) {
      console.warn('STRIPE_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      const stripe = getStripe();
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle events
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const paymentIntentId = paymentIntent.id;

  // Find booking by payment intent ID
  const { data: booking, error } = await getSupabaseServer()
    .from('bookings')
    .select('*')
    .eq('stripe_payment_intent_id', paymentIntentId)
    .single();

  if (error || !booking) {
    console.error(`Booking not found for payment intent ${paymentIntentId}`);
    return;
  }

  // Update booking to confirmed (idempotent)
  if (booking.status !== 'confirmed') {
    await getSupabaseServer()
      .from('bookings')
      .update({
        status: 'confirmed',
        confirmed_at: new Date().toISOString(),
      })
      .eq('id', booking.id);

    console.log(`Booking ${booking.id} confirmed via webhook`);
  }

  // TODO: Send confirmation email to user + studio owner
  // TODO: Create calendar event
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  const paymentIntentId = paymentIntent.id;

  // Find booking by payment intent ID
  const { data: booking, error } = await getSupabaseServer()
    .from('bookings')
    .select('*')
    .eq('stripe_payment_intent_id', paymentIntentId)
    .single();

  if (error || !booking) {
    console.error(`Booking not found for payment intent ${paymentIntentId}`);
    return;
  }

  // Mark booking as cancelled
  if (booking.status === 'pending') {
    await getSupabaseServer()
      .from('bookings')
      .update({
        status: 'cancelled',
      })
      .eq('id', booking.id);

    console.log(`Booking ${booking.id} cancelled due to payment failure`);
  }

  // TODO: Send failure email to user
}
