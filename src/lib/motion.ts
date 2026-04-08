/**
 * Shared motion constants — maps to CSS custom properties in globals.css.
 * Use these in all GSAP animations for consistent timing across the site.
 */
export const MOTION = {
  fast: { duration: 0.15, ease: 'power2.out' },
  base: { duration: 0.25, ease: 'cubicBezier(0.16, 1, 0.3, 1)' },
  slow: { duration: 0.4, ease: 'power3.out' },
  entrance: { duration: 0.5, ease: 'cubicBezier(0.16, 1, 0.3, 1)' },
  exit: { duration: 0.3, ease: 'power2.in' },
  stagger: {
    fast: 0.04,
    base: 0.08,
    slow: 0.12,
  },
} as const;
