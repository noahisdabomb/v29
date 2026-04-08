'use client';

import { useRef, useEffect } from 'react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const pct = (scrollTop / docHeight) * 100;
        progressRef.current = pct;
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${pct / 100})`;
          barRef.current.setAttribute('aria-valuenow', String(Math.round(pct)));
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 z-20 h-0.5 w-full bg-accent"
      style={{ transformOrigin: '0 0', transform: 'scaleX(0)' }}
      role="progressbar"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}
