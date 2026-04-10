'use client';

import { useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useLenis();

  // Gentle WorkPanel-only snap: after user stops scrolling near a panel edge,
  // nudge to the nearest panel top. Direction-aware, CycleSection-exempt.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    let isSnapping = false;
    let snapTimer: ReturnType<typeof setTimeout> | null = null;
    let lastScrollY = window.scrollY;
    let scrollDirection: 'down' | 'up' = 'down';

    function trackDirection() {
      const currentY = window.scrollY;
      if (currentY > lastScrollY + 2) scrollDirection = 'down';
      else if (currentY < lastScrollY - 2) scrollDirection = 'up';
      lastScrollY = currentY;
    }

    function isInsideCycleSection(): boolean {
      const cycle = document.querySelector<HTMLElement>('[data-cycle-section]');
      if (!cycle) return false;
      const rect = cycle.getBoundingClientRect();
      const vh = window.innerHeight;
      // Inside if the cycle section spans the viewport
      return rect.top < vh * 0.5 && rect.bottom > vh * 0.5;
    }

    // Snap disabled — preserved for easy re-enable by uncommenting
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function attemptSnap() {
      /* SNAP DISABLED
      if (isSnapping || !lenisRef.current) return;

      // Don't snap inside the CycleSection scroll-driven area
      if (isInsideCycleSection()) return;

      const vh = window.innerHeight;
      const panels = Array.from(
        document.querySelectorAll<HTMLElement>('[data-work-panel]'),
      );
      if (!panels.length) return;

      // Find the panel whose top edge is closest to viewport top,
      // but only if it's within 15% of viewport height (the "snap zone")
      const snapZone = vh * 0.15;
      let bestPanel: HTMLElement | null = null;
      let bestDist = Infinity;

      for (const panel of panels) {
        const top = panel.getBoundingClientRect().top;

        // Only consider panels in the snap zone
        if (Math.abs(top) > snapZone) continue;

        // Respect scroll direction: don't snap backwards
        if (scrollDirection === 'down' && top > 5) continue;
        if (scrollDirection === 'up' && top < -5) continue;

        const dist = Math.abs(top);
        if (dist < bestDist) {
          bestDist = dist;
          bestPanel = panel;
        }
      }

      if (bestPanel && bestDist > 3) {
        isSnapping = true;
        lenisRef.current.scrollTo(bestPanel, { duration: 0.4 });
        setTimeout(() => {
          isSnapping = false;
        }, 450);
      }
      END SNAP DISABLED */
    }

    function clearSnap() {
      if (snapTimer) {
        clearTimeout(snapTimer);
        snapTimer = null;
      }
    }

    function scheduleSnap(delay: number) {
      clearSnap();
      snapTimer = setTimeout(attemptSnap, delay);
    }

    function onWheel() {
      trackDirection();
      clearSnap();
      // 150ms to detect wheel stop, then 150ms before snap = 300ms total
      snapTimer = setTimeout(() => {
        scheduleSnap(150);
      }, 150);
    }

    function onTouchStart() {
      trackDirection();
      clearSnap();
    }

    function onTouchEnd() {
      clearSnap();
      // Slightly longer grace for touch momentum
      snapTimer = setTimeout(() => {
        scheduleSnap(200);
      }, 250);
    }

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      clearSnap();
    };
  }, [lenisRef]);

  return <>{children}</>;
}
