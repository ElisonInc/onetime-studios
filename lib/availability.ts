/**
 * Availability computation logic
 * Handles timezone conversion and slot calculation
 */

import {
  addHours,
  isBefore,
  isAfter,
  parse,
  format,
} from 'date-fns';
import {
  toZonedTime,
  fromZonedTime,
} from 'date-fns-tz';
import {
  AvailabilityRule,
  AvailabilityOverride,
  AvailabilityBlock,
  Booking,
  Studio,
} from './database.types';

/**
 * Convert local time string (HH:MM) on a date to UTC
 */
export function localToUtc(
  dateLocal: string, // YYYY-MM-DD
  timeLocal: string, // HH:MM
  timezone: string // IANA timezone
): Date {
  const dateTimeStr = `${dateLocal}T${timeLocal}:00`;
  const localDate = parse(dateTimeStr, "yyyy-MM-dd'T'HH:mm:ss", new Date());
  return fromZonedTime(localDate, timezone);
}

/**
 * Convert UTC timestamp to local time string (HH:MM)
 */
export function utcToLocal(utcDate: Date, timezone: string): string {
  const zonedDate = toZonedTime(utcDate, timezone);
  return format(zonedDate, 'HH:mm');
}

/**
 * Convert UTC timestamp to local date string (YYYY-MM-DD)
 */
export function utcToLocalDate(utcDate: Date, timezone: string): string {
  const zonedDate = toZonedTime(utcDate, timezone);
  return format(zonedDate, 'yyyy-MM-dd');
}

/**
 * Get day of week (0=Sun, ..., 6=Sat) for a date in studio's local timezone
 */
export function getDayOfWeek(dateLocal: string, timezone: string): number {
  const date = parse(dateLocal, 'yyyy-MM-dd', new Date());
  const zonedDate = toZonedTime(date, timezone);
  return zonedDate.getDay();
}

/**
 * Get availability windows (rules + overrides) for a specific date
 */
export function getWindowsForDate(
  dateLocal: string,
  rules: AvailabilityRule[],
  overrides: AvailabilityOverride[]
): Array<{ start: string; end: string }> {
  // Check if date has override
  const override = overrides.find((o) => o.date_local === dateLocal);

  if (override) {
    if (override.is_closed) {
      return []; // No windows available
    }
    // Return override windows for this date
    return [
      {
        start: override.start_time_local!,
        end: override.end_time_local!,
      },
    ];
  }

  // Use recurring rule for this day of week
  const dayOfWeek = getDayOfWeek(dateLocal, 'UTC'); // Note: naive but works for this purpose
  const dayRules = rules.filter((r) => r.day_of_week === dayOfWeek);

  return dayRules.map((r) => ({
    start: r.start_time_local,
    end: r.end_time_local,
  }));
}

/**
 * Check if a UTC time range conflicts with blocks or bookings
 */
export function hasConflict(
  startUtc: Date,
  endUtc: Date,
  blocks: AvailabilityBlock[],
  bookings: Booking[]
): boolean {
  // Check blocks
  for (const block of blocks) {
    const blockStart = new Date(block.start_at_utc);
    const blockEnd = new Date(block.end_at_utc);
    if (intervalsOverlap(startUtc, endUtc, blockStart, blockEnd)) {
      return true;
    }
  }

  // Check confirmed bookings (and pending bookings < 10 min old)
  const tenMinutesAgo = addHours(new Date(), -0.167); // ~10 minutes
  for (const booking of bookings) {
    if (booking.status === 'cancelled') continue;

    const shouldCheck =
      booking.status === 'confirmed' ||
      (booking.status === 'pending' &&
        new Date(booking.created_at) > tenMinutesAgo);

    if (shouldCheck) {
      const bookingStart = new Date(booking.start_at_utc);
      const bookingEnd = new Date(booking.end_at_utc);

      // Apply buffer
      const buffer = 0; // TODO: get from studio.buffer_minutes
      const bufferedEnd = addHours(bookingEnd, buffer / 60);

      if (intervalsOverlap(startUtc, endUtc, bookingStart, bufferedEnd)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Check if two time intervals overlap
 */
function intervalsOverlap(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean {
  return isBefore(start1, end2) && isAfter(end1, start2);
}

/**
 * Get available 1-hour start times for a date and duration
 */
export function getAvailableStartTimes(
  dateLocal: string,
  durationHours: number,
  timezone: string,
  windows: Array<{ start: string; end: string }>,
  blocks: AvailabilityBlock[],
  bookings: Booking[]
): string[] {
  if (windows.length === 0) return [];

  const availableTimes: string[] = [];

  for (const window of windows) {
    const windowStart = localToUtc(dateLocal, window.start, timezone);
    const windowEnd = localToUtc(dateLocal, window.end, timezone);

    // Generate 1-hour slot start times
    let slotStart = new Date(windowStart);
    while (isBefore(slotStart, windowEnd)) {
      const slotEnd = addHours(slotStart, durationHours);

      // Check if slot fits within window
      if (isAfter(windowEnd, slotEnd)) {
        // Check for conflicts
        if (!hasConflict(slotStart, slotEnd, blocks, bookings)) {
          const timeLocal = utcToLocal(slotStart, timezone);
          availableTimes.push(timeLocal);
        }
      }

      slotStart = addHours(slotStart, 1); // 1-hour increments
    }
  }

  return availableTimes;
}

/**
 * Calculate price for a booking
 */
export function calculatePrice(
  studio: Studio,
  startAtUtc: Date,
  endAtUtc: Date
): number {
  const durationMs = endAtUtc.getTime() - startAtUtc.getTime();
  const durationHours = durationMs / (1000 * 60 * 60);
  return Number((studio.hourly_rate * durationHours).toFixed(2));
}

/**
 * Validate booking constraints
 */
export function validateBookingConstraints(
  studio: Studio,
  startAtUtc: Date,
  endAtUtc: Date
): { valid: boolean; error?: string } {
  const now = new Date();
  const minNoticeMs = studio.min_notice_minutes * 60 * 1000;
  const bookingWindowMs = studio.booking_window_days * 24 * 60 * 60 * 1000;

  // Check min notice
  if (isBefore(startAtUtc, new Date(now.getTime() + minNoticeMs))) {
    return {
      valid: false,
      error: `Bookings require at least ${studio.min_notice_minutes} minutes notice`,
    };
  }

  // Check booking window
  if (isAfter(startAtUtc, new Date(now.getTime() + bookingWindowMs))) {
    return {
      valid: false,
      error: `Cannot book more than ${studio.booking_window_days} days in advance`,
    };
  }

  // Check duration constraints
  const durationMs = endAtUtc.getTime() - startAtUtc.getTime();
  const durationHours = durationMs / (1000 * 60 * 60);

  if (durationHours < studio.min_booking_hours) {
    return {
      valid: false,
      error: `Minimum booking duration is ${studio.min_booking_hours} hour(s)`,
    };
  }

  if (studio.max_booking_hours && durationHours > studio.max_booking_hours) {
    return {
      valid: false,
      error: `Maximum booking duration is ${studio.max_booking_hours} hour(s)`,
    };
  }

  return { valid: true };
}
