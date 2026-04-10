'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Module-level singleton reference for imperative access (e.g. Footer scroll-to-top)
let lenisInstance: Lenis | null = null;

/** Get the active Lenis instance (null if reduced motion or SSR) */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Initialize Lenis smooth scroll and sync with GSAP ScrollTrigger.
 * Matches the codex configuration: duration 1.0, exponential easing,
 * touchMultiplier 2.
 *
 * Returns a ref to the Lenis instance for imperative control
 * (e.g. lenis.scrollTo, lenis.stop/start).
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's unified ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // Disable GSAP lag smoothing so scroll feels instantaneous
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance = null;
    };
  }, []);

  return lenisRef;
}
