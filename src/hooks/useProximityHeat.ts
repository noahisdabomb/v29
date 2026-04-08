'use client';

import { useEffect, useRef } from 'react';

/**
 * Cursor proximity heat effect for text elements.
 * Sets --heat CSS variable (0-1) on each matched element based on
 * cursor distance, driving color shift (cream→magenta) and subtle Y-lift.
 *
 * Bails on coarse pointer (touch) and prefers-reduced-motion.
 */
export function useProximityHeat(
  containerRef: React.RefObject<HTMLDivElement | null>,
  selector: string,
) {
  const rectsRef = useRef<DOMRect[]>([]);
  const containerRectRef = useRef<DOMRect | null>(null);
  const elementsRef = useRef<HTMLElement[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Bail on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    // Bail on reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = Array.from(
      container.querySelectorAll<HTMLElement>(selector),
    );
    elementsRef.current = elements;

    if (elements.length === 0) return;

    // Cache element and container rects
    function cacheRects() {
      rectsRef.current = elementsRef.current.map((el) =>
        el.getBoundingClientRect(),
      );
      containerRectRef.current = container.getBoundingClientRect();
    }

    cacheRects();

    // Update rects on resize/scroll
    const ro = new ResizeObserver(cacheRects);
    ro.observe(container);
    window.addEventListener('scroll', cacheRects, { passive: true });

    // Track mouse
    function onMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // rAF loop
    function tick() {
      const { x: mx, y: my } = mouseRef.current;
      const rects = rectsRef.current;
      const els = elementsRef.current;

      // Viewport-scaled radius
      const radius = Math.min(window.innerWidth * 0.12, 220);
      const radiusSq = radius * radius;

      // Bounding box early exit — check if mouse is near container at all
      const cRect = containerRectRef.current;
      if (!cRect) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const pad = radius;
      if (
        mx < cRect.left - pad ||
        mx > cRect.right + pad ||
        my < cRect.top - pad ||
        my > cRect.bottom + pad
      ) {
        for (let i = 0; i < els.length; i++) {
          els[i].style.setProperty('--heat', '0');
          els[i].style.transform = '';
          els[i].style.textShadow = '';
          els[i].style.color = '';
        }
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      for (let i = 0; i < rects.length; i++) {
        const rect = rects[i];
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.5;
        const dx = mx - cx;
        const dy = my - cy;
        const distSq = dx * dx + dy * dy;

        if (distSq > radiusSq) {
          els[i].style.setProperty('--heat', '0');
          els[i].style.transform = '';
          els[i].style.textShadow = '';
          els[i].style.color = '';
          continue;
        }

        const dist = Math.sqrt(distSq);
        const t = 1 - dist / radius;

        // Quadratic falloff for color
        const heat = t * t;
        // Cubic falloff for lift (more subtle)
        const lift = t * t * t * 3;

        els[i].style.setProperty('--heat', heat.toFixed(3));
        els[i].style.transform = `translateY(${-lift}px)`;

        // Progressive magenta glow
        if (heat > 0.15) {
          const glowOpacity = (heat * 0.6).toFixed(2);
          const glowSpread = Math.round(heat * 20);
          els[i].style.textShadow =
            `0 0 ${glowSpread}px rgba(224,68,88,${glowOpacity})`;
        } else {
          els[i].style.textShadow = '';
        }

        // Color via color-mix (cream → magenta)
        if (heat > 0.01) {
          const creamPct = Math.round((1 - heat) * 100);
          const magentaPct = Math.round(heat * 100);
          els[i].style.color =
            `color-mix(in srgb, var(--hero-cream) ${creamPct}%, var(--hero-magenta) ${magentaPct}%)`;
        } else {
          els[i].style.color = '';
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', cacheRects);
      ro.disconnect();

      // Reset styles
      for (const el of elementsRef.current) {
        el.style.setProperty('--heat', '0');
        el.style.transform = '';
        el.style.textShadow = '';
        el.style.color = '';
      }
    };
  }, [containerRef, selector]);
}
