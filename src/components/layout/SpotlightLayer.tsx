'use client';

import { useEffect, useRef } from 'react';

export default function SpotlightLayer() {
  const velocityRef = useRef(0);
  const lastScrollY = useRef(0);
  const rafId = useRef(0);

  useEffect(() => {
    if (window.innerWidth <= 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;

    function handleMouseMove(e: MouseEvent) {
      root.style.setProperty('--mouse-x', e.clientX + 'px');
      root.style.setProperty('--mouse-y', e.clientY + 'px');
    }

    // Decay velocity via rAF loop — only runs when there's velocity to decay
    let decayRunning = true;
    let decayActive = false;
    let lastDecayTime = 0;

    function decayLoop(time: number) {
      if (!decayRunning) return;
      if (time - lastDecayTime > 50) {
        lastDecayTime = time;
        if (velocityRef.current > 0.01) {
          velocityRef.current *= 0.85;
          root.style.setProperty('--spotlight-scale', String(1 + velocityRef.current * 0.6));
          requestAnimationFrame(decayLoop);
        } else {
          decayActive = false;
        }
      } else {
        requestAnimationFrame(decayLoop);
      }
    }

    function startDecay() {
      if (!decayActive && decayRunning) {
        decayActive = true;
        requestAnimationFrame(decayLoop);
      }
    }

    function handleScrollWithDecay() {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY.current);
      lastScrollY.current = currentY;

      velocityRef.current = Math.min(delta / 40, 1);

      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const scale = 1 + velocityRef.current * 0.6;
        root.style.setProperty('--spotlight-scale', String(scale));
      });

      startDecay();
    }

    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScrollWithDecay, { passive: true });

    return () => {
      decayRunning = false;
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScrollWithDecay);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return <div className="spotlight-layer hidden md:block" />;
}
