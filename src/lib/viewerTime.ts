import type { EmailEntry, TimeSequenceEntry } from '@/types';

export const DEFAULT_VISITOR_TZ = 'America/New_York';
export const DEFAULT_VISITOR_CITY = 'New York';
export const BANGKOK_TZ = 'Asia/Bangkok';

const TZ_CITY_MAP: Record<string, string> = {
  'America/New_York': 'New York',
  'America/Chicago': 'Chicago',
  'America/Denver': 'Denver',
  'America/Los_Angeles': 'Los Angeles',
  'America/Anchorage': 'Anchorage',
  'Pacific/Honolulu': 'Honolulu',
  'America/Toronto': 'Toronto',
  'America/Vancouver': 'Vancouver',
  'America/Sao_Paulo': 'Sao Paulo',
  'America/Argentina/Buenos_Aires': 'Buenos Aires',
  'America/Mexico_City': 'Mexico City',
  'America/Bogota': 'Bogota',
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

function formatTimeInZone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

function normalizeHour(hour: number, ampm: 'AM' | 'PM'): number {
  if (ampm === 'AM') {
    return hour % 12;
  }

  return (hour % 12) + 12;
}

function parseTimeString(timeLabel: string): { hour: number; minute: number; ampm: 'AM' | 'PM' } | null {
  const compact = timeLabel.trim().replace(/\s+/g, ' ');
  const match = compact.match(/(\d{1,2}):(\d{2})\s*([AP]M)$/i);

  if (!match) {
    return null;
  }

  return {
    hour: Number(match[1]),
    minute: Number(match[2]),
    ampm: match[3].toUpperCase() as 'AM' | 'PM',
  };
}

export function buildBangkokDate(hour24: number, minute: number): Date {
  const date = new Date();
  date.setUTCHours(hour24 - 7, minute, 0, 0);
  return date;
}

export function formatToSequenceEntry(date: Date, timeZone: string): TimeSequenceEntry {
  const formatted = formatTimeInZone(date, timeZone);
  const parsed = parseTimeString(formatted);

  if (!parsed) {
    return { h: 10, m: 0, ampm: 'PM' };
  }

  return {
    h: parsed.hour,
    m: parsed.minute,
    ampm: parsed.ampm,
  };
}

export function getViewerTimeZone(): string {
  if (typeof Intl === 'undefined') {
    return DEFAULT_VISITOR_TZ;
  }

  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || DEFAULT_VISITOR_TZ;
  } catch {
    return DEFAULT_VISITOR_TZ;
  }
}

export function getCycleVisitorTimeZone(timeZone?: string): string {
  if (!timeZone || timeZone === BANGKOK_TZ) {
    return DEFAULT_VISITOR_TZ;
  }

  return timeZone;
}

export function getCityFromTimezone(timeZone: string): string {
  if (!timeZone) {
    return DEFAULT_VISITOR_CITY;
  }

  if (TZ_CITY_MAP[timeZone]) {
    return TZ_CITY_MAP[timeZone];
  }

  const parts = timeZone.split('/');
  const raw = parts[parts.length - 1];

  if (!raw || raw.length < 2) {
    return DEFAULT_VISITOR_CITY;
  }

  return raw.replace(/_/g, ' ');
}

export function getCycleVisitorCity(timeZone?: string): string {
  return getCityFromTimezone(getCycleVisitorTimeZone(timeZone));
}

export function getVisitorTimeSequence(
  bkkSequence: readonly TimeSequenceEntry[],
  visitorTimeZone: string,
): TimeSequenceEntry[] {
  return bkkSequence.map((entry) => {
    const hour24 = normalizeHour(entry.h, entry.ampm);
    const date = buildBangkokDate(hour24, entry.m);
    return formatToSequenceEntry(date, visitorTimeZone);
  });
}

export function localizeBangkokTimeString(
  bkkTimeLabel: string,
  visitorTimeZone: string,
): string {
  const parsed = parseTimeString(bkkTimeLabel);

  if (!parsed) {
    return bkkTimeLabel;
  }

  const hour24 = normalizeHour(parsed.hour, parsed.ampm);
  const date = buildBangkokDate(hour24, parsed.minute);
  return formatTimeInZone(date, visitorTimeZone);
}

export function localizeEmailEntries(
  entries: readonly EmailEntry[],
  visitorTimeZone: string,
): EmailEntry[] {
  return entries.map((entry) => ({
    ...entry,
    time: localizeBangkokTimeString(entry.time, visitorTimeZone),
  }));
}
