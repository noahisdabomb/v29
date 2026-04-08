'use client';

import { useRef, useEffect, useState } from 'react';

/**
 * Parse a stat value string like "3.75B", "$750M", "13+", "98%", "381"
 * into numeric target + prefix + suffix for animated counting.
 */
function parseStat(value: string): { target: number; prefix: string; suffix: string; decimals: number } {
  const match = value.match(/^([^0-9]*?)([\d,.]+)(.*)$/);
  if (!match) return { target: 0, prefix: '', suffix: value, decimals: 0 };
  const prefix = match[1];
  const numStr = match[2].replace(/,/g, '');
  const target = parseFloat(numStr);
  const suffix = match[3];
  const decimalIdx = numStr.indexOf('.');
  const decimals = decimalIdx >= 0 ? numStr.length - decimalIdx - 1 : 0;
  return { target, prefix, suffix, decimals };
}

export default function StatCounter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState('\u2014');
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateCount();
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  function animateCount() {
    const { target, prefix, suffix, decimals } = parseStat(value);
    const duration = 2000;
    const start = performance.now();

    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (decimals > 0) {
        setDisplay(prefix + current.toFixed(decimals) + suffix);
      } else {
        setDisplay(prefix + Math.round(current).toLocaleString() + suffix);
      }

      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(value); // Ensure exact final value
    }
    requestAnimationFrame(step);
  }

  return (
    <div ref={ref} className={className}>
      {display}
    </div>
  );
}
