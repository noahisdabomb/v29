'use client';

import { useState, useEffect } from 'react';

/**
 * SSR-safe media query hook.
 * Returns false on the server and during first render,
 * then syncs with the actual match state.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);

    // Set initial value
    setMatches(mql.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/** True when viewport width <= 768px */
export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)');
}

/** True when viewport width <= 1024px */
export function useIsTablet() {
  return useMediaQuery('(max-width: 1024px)');
}

/** True when user prefers reduced motion */
export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
