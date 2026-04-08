'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollStore } from '@/stores/scrollStore';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a ScrollTrigger on `triggerRef` that writes master cycle progress
 * into the Zustand store. All per-phase progress, opacity, and background
 * color values are derived inside the store's `setCycleProgress` setter.
 *
 * Usage:
 * ```tsx
 * const pinRef = useRef<HTMLDivElement>(null);
 * useScrollPhase(pinRef);
 * ```
 */
export function useScrollPhase(
  triggerRef: React.RefObject<HTMLDivElement | null>,
  options?: { scrub?: number; disabled?: boolean },
) {
  useEffect(() => {
    if (!triggerRef.current || options?.disabled) return;

    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: options?.scrub ?? 0.1,
      onUpdate: (self) => {
        useScrollStore.getState().setCycleProgress(self.progress);
      },
    });

    // Prime the store immediately so anchored loads and refreshes do not
    // render a blank cycle before the first scroll event fires.
    useScrollStore.getState().setCycleProgress(st.progress);

    return () => {
      st.kill();
    };
  }, [triggerRef, options?.disabled, options?.scrub]);
}
