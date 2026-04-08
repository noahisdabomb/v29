/**
 * Hermite smoothstep -- the `ease()` function used throughout the site.
 * Maps 0-1 input to a smooth 0-1 curve with zero velocity at endpoints.
 */
export function ease(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

/**
 * Linear interpolation between two values.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Interpolate between two hex color strings.
 * Ported from the codex lerpColor implementation.
 */
export function lerpColor(a: string, b: string, t: number): string {
  const ah = parseInt(a.slice(1), 16);
  const bh = parseInt(b.slice(1), 16);
  const ar = ah >> 16;
  const ag = (ah >> 8) & 0xff;
  const ab = ah & 0xff;
  const br = bh >> 16;
  const bg = (bh >> 8) & 0xff;
  const bb = bh & 0xff;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const b2 = Math.round(ab + (bb - ab) * t);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b2).toString(16).slice(1);
}

/**
 * Clamp a value between min and max.
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * Normalize a value from an arbitrary range to 0-1.
 */
export function normalize(val: number, min: number, max: number): number {
  if (max === min) return 0;
  return clamp((val - min) / (max - min), 0, 1);
}
