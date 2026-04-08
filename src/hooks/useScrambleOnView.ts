'use client';

import { useEffect, useRef } from 'react';

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

export function useScrambleOnView() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const finalText = el.textContent || '';
    let hasScrambled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasScrambled) {
            hasScrambled = true;
            scrambleText(el, finalText, 400);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function scrambleText(element: HTMLElement, finalText: string, duration: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
  const seed = finalText.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const rng = seededRandom(seed);
  const totalFrames = Math.ceil(duration / 30);
  let frame = 0;

  function update() {
    let output = '';
    for (let i = 0; i < finalText.length; i++) {
      if (finalText[i] === ' ') {
        output += ' ';
      } else if (frame / totalFrames > i / finalText.length) {
        output += finalText[i];
      } else {
        output += chars[Math.floor(rng() * chars.length)];
      }
    }
    element.textContent = output;
    frame++;
    if (frame <= totalFrames) {
      requestAnimationFrame(update);
    } else {
      element.textContent = finalText;
    }
  }
  update();
}
