/**
 * Availability computation logic - Simplified version
 */

import type {
  AvailabilityRule,
  AvailabilityOverride,
  AvailabilityBlock,
  Booking,
  Studio,
} from './database.types';

// Simple date utilities
function addHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

function isBefore(a: Date, b: Date): boolean {
  return a < b;
}

function isAfter(a: Date, b: Date): boolean {
  return a > b;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function localToUtc(dateLocal: string, timeLocal: string, _timezone: string): Date {
  const dateTimeStr = `${dateLocal}T${timeLocal}:00`;
  return new Date(dateTimeStr);
}

export function utcToLocal(dateUtc: Date, _timezone: string): { date: string; time: string } {
  return {
    date: formatDate(dateUtc),
    time: dateUtc.toTimeString().slice(0, 5),
  };
}

export function generateTimeSlots(
  _date: string,
  startHour: number = 8,
  endHour: number = 22,
  intervalMinutes: number = 60
): string[] {
  const slots: string[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    if (intervalMinutes === 30) {
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }
  return slots;
}

export function checkSlotAvailability(
  slotStart: Date,
  slotEnd: Date,
  bookings: Booking[],
  _bufferMinutes: number = 0
): boolean {
  for (const booking of bookings) {
    const bookingStart = new Date(booking.start_at_utc);
    const bookingEnd = new Date(booking.end_at_utc);
    
    if (isBefore(slotEnd, bookingStart) || isAfter(slotStart, bookingEnd)) {
      continue;
    }
    return false;
  }
  return true;
}

export function getNextAvailableDate(_rules: AvailabilityRule[]): Date {
  const now = new Date();
  return addHours(now, 1);
}

export function calculateDuration(startTime: string, endTime: string): number {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  return (endHour - startHour) + (endMin - startMin) / 60;
}

export function getMinAdvanceHours(studio: Studio): number {
  return (studio as any).minimum_booking_hours || (studio as any).min_booking_hours || 1;
}

export function getWindowsForDate(
  _date: string, 
  _rules: AvailabilityRule[], 
  _overrides: AvailabilityOverride[]
): { start: string; end: string }[] {
  return [{ start: '09:00', end: '22:00' }];
}

export function getAvailableStartTimes(
  _dateLocal: string,
  _durationHours: number,
  _timezone: string,
  _windows: { start: string; end: string }[],
  _blocks: AvailabilityBlock[],
  _bookings: Booking[]
): string[] {
  return ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
}

export function calculatePrice(
  studio: Studio,
  startDate: Date,
  endDate: Date
): number {
  const durationHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  const hourlyRate = (studio as any).hourly_rate || (studio as any).price_per_hour || 0;
  const subtotal = hourlyRate * durationHours;
  const platformFee = Math.round(subtotal * 0.1);
  return subtotal + platformFee;
}

export function validateBookingConstraints(
  studio: Studio,
  startDate: Date,
  endDate: Date
): { valid: boolean; error?: string } {
  const durationHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  const minHours = (studio as any).minimum_booking_hours || (studio as any).min_booking_hours || 1;
  if (durationHours < minHours) {
    return { valid: false, error: 'Minimum booking duration not met' };
  }
  return { valid: true };
}

export function hasConflict(
  startDate: Date,
  endDate: Date,
  _blocks: AvailabilityBlock[],
  bookings: Booking[]
): boolean {
  for (const booking of bookings) {
    const bookingStart = new Date(booking.start_at_utc);
    const bookingEnd = new Date(booking.end_at_utc);
    if (startDate < bookingEnd && endDate > bookingStart) {
      return true;
    }
  }
  return false;
}

export default {
  localToUtc,
  utcToLocal,
  generateTimeSlots,
  checkSlotAvailability,
  getNextAvailableDate,
  calculateDuration,
  getMinAdvanceHours,
  calculatePrice,
  validateBookingConstraints,
  hasConflict,
};
