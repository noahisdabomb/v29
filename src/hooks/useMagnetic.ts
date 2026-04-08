'use client';

import { useEffect, useRef } from 'react';

export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cachedRect: DOMRect | null = null;

    function handleEnter() {
      cachedRect = el!.getBoundingClientRect();
    }

    function handleMove(e: MouseEvent) {
      const r = cachedRect ?? el!.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      el!.style.transition = 'none';
      el!.style.transform = `translate(${(e.clientX - cx) * 0.25}px, ${(e.clientY - cy) * 0.25}px)`;
    }

    function handleLeave() {
      cachedRect = null;
      el!.style.transition = 'transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)';
      el!.style.transform = '';
    }

    el.addEventListener('mouseenter', handleEnter);
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mouseenter', handleEnter);
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return ref;
}
