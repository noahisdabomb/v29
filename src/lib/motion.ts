/**
 * Shared motion constants — maps to CSS custom properties in globals.css.
 * Use these in all GSAP animations for consistent timing across the site.
 */
export const MOTION = {
  duration: {
    fast: 0.15,
    base: 0.3,
    slow: 0.5,
    entrance: 0.6,
    exit: 0.3,
  },
  ease: {
    standard: 'power3.out',
    emphatic: 'power4.out',
    exit: 'power2.in',
    spring: 'back.out(1.7)',
  },
  stagger: {
    fast: 0.04,
    base: 0.08,
    slow: 0.12,
  },
} as const;
