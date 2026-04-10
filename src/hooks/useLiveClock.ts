'use client';

import { useState, useEffect } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ClockState {
  /** Bangkok time formatted as "10:42 AM" */
  bkkTime: string;
  /** Bangkok hour 0-23 */
  bkkHour: number;
  /** Bangkok minute 0-59 */
  bkkMinute: number;
  /** Visitor local time formatted as "9:42 PM" */
  visitorTime: string;
  /** Visitor city name derived from timezone */
  visitorCity: string;
  /** Visitor IANA timezone string */
  visitorTZ: string;
  /** Signed hour offset from Bangkok to visitor (e.g. -12 for New York) */
  hourOffset: number;
  /** Whether the visitor is in Bangkok timezone */
  isSameZone: boolean;
  /** Availability status based on Bangkok hour */
  status: 'available' | 'winding-down' | 'offline';
  /** Human-readable status text */
  statusText: string;
}

// ---------------------------------------------------------------------------
// Timezone city name map
// ---------------------------------------------------------------------------
const TZ_CITY_MAP: Record<string, string> = {
  'America/New_York': 'New York',
  'America/Chicago': 'Chicago',
  'America/Denver': 'Denver',
  'America/Los_Angeles': 'Los Angeles',
  'America/Anchorage': 'Anchorage',
  'Pacific/Honolulu': 'Honolulu',
  'America/Toronto': 'Toronto',
  'America/Vancouver': 'Vancouver',
  'America/Sao_Paulo': 'S\u00E3o Paulo',
  'America/Argentina/Buenos_Aires': 'Buenos Aires',
  'America/Mexico_City': 'Mexico City',
  'America/Bogota': 'Bogot\u00E1',
  'Europe/London': 'London',
  'Europe/Paris': 'Paris',
  'Europe/Berlin': 'Berlin',
  'Europe/Amsterdam': 'Amsterdam',
  'Europe/Madrid': 'Madrid',
  'Europe/Rome': 'Rome',
  'Europe/Stockholm': 'Stockholm',
  'Europe/Zurich': 'Zurich',
  'Europe/Istanbul': 'Istanbul',
  'Europe/Moscow': 'Moscow',
  'Asia/Dubai': 'Dubai',
  'Asia/Kolkata': 'Mumbai',
  'Asia/Bangkok': 'Bangkok',
  'Asia/Singapore': 'Singapore',
  'Asia/Hong_Kong': 'Hong Kong',
  'Asia/Shanghai': 'Shanghai',
  'Asia/Tokyo': 'Tokyo',
  'Asia/Seoul': 'Seoul',
  'Australia/Sydney': 'Sydney',
  'Australia/Melbourne': 'Melbourne',
  'Pacific/Auckland': 'Auckland',
  'Africa/Johannesburg': 'Johannesburg',
  'Africa/Lagos': 'Lagos',
  'Africa/Cairo': 'Cairo',
};

function getCityFromTimezone(tz: string): string {
  if (TZ_CITY_MAP[tz]) return TZ_CITY_MAP[tz];
  // Fallback: extract city from "Region/City" or "Region/Sub/City"
  const parts = tz.split('/');
  const raw = parts[parts.length - 1];
  return raw.replace(/_/g, ' ');
}

function formatTime(date: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

function getBkkHour(date: Date): number {
  const bkkStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Bangkok',
    hour: 'numeric',
    hour12: false,
  }).format(date);
  return parseInt(bkkStr, 10);
}

function getBkkMinute(date: Date): number {
  const bkkStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Bangkok',
    minute: 'numeric',
  }).format(date);
  return parseInt(bkkStr, 10);
}

function getVisitorHour(date: Date, tz: string): number {
  const str = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: 'numeric',
    hour12: false,
  }).format(date);
  return parseInt(str, 10);
}

function getStatus(bkkHour: number): { status: ClockState['status']; statusText: string } {
  // 8AM-5PM BKK → available (green)
  if (bkkHour >= 8 && bkkHour < 17) {
    return { status: 'available', statusText: 'Available now' };
  }
  // 5PM-8PM BKK → winding down (amber)
  if (bkkHour >= 17 && bkkHour < 20) {
    return { status: 'winding-down', statusText: 'Wrapping up' };
  }
  // 8PM-8AM BKK → offline (red)
  return { status: 'offline', statusText: 'Offline' };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Live clock showing Bangkok time + visitor's local time.
 * Updates every 30 seconds. Status is derived from Bangkok hour.
 */
export function useLiveClock(): ClockState {
  const [state, setState] = useState<ClockState>(() => {
    // SSR-safe initial state
    return {
      bkkTime: '',
      bkkHour: 0,
      bkkMinute: 0,
      visitorTime: '',
      visitorCity: '',
      visitorTZ: '',
      hourOffset: 0,
      isSameZone: false,
      status: 'offline',
      statusText: 'Offline',
    };
  });

  useEffect(() => {
    // Detect visitor timezone
    const visitorTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const visitorCity = getCityFromTimezone(visitorTZ);

    const GMT7_ZONES = new Set([
      'Asia/Bangkok', 'Asia/Ho_Chi_Minh', 'Asia/Phnom_Penh',
      'Asia/Vientiane', 'Asia/Jakarta', 'Asia/Pontianak',
      'Asia/Barnaul', 'Asia/Hovd', 'Asia/Krasnoyarsk',
      'Asia/Novokuznetsk', 'Asia/Novosibirsk', 'Asia/Tomsk',
    ]);
    const isSameZone = GMT7_ZONES.has(visitorTZ);

    function tick() {
      const now = new Date();
      const bkkTime = formatTime(now, 'Asia/Bangkok');
      const bkkHour = getBkkHour(now);
      const bkkMinute = getBkkMinute(now);
      const visitorTime = formatTime(now, visitorTZ);
      const visitorHour = getVisitorHour(now, visitorTZ);
      const { status, statusText } = getStatus(bkkHour);

      // Compute signed hour offset (visitor − Bangkok), handle day wrap
      let offset = visitorHour - bkkHour;
      if (offset > 12) offset -= 24;
      if (offset < -12) offset += 24;

      setState({
        bkkTime,
        bkkHour,
        bkkMinute,
        visitorTime,
        visitorCity,
        visitorTZ,
        hourOffset: offset,
        isSameZone,
        status,
        statusText,
      });
    }

    // Run immediately
    tick();

    // Update every 30 seconds
    const interval = setInterval(tick, 30_000);

    return () => clearInterval(interval);
  }, []);

  return state;
}
