'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrambleOnView } from '@/hooks/useScrambleOnView';

gsap.registerPlugin(ScrollTrigger);

export default function ScrambleLabel({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const scrambleRef = useScrambleOnView();
  const wrapRef = useRef<HTMLSpanElement>(null);

  // Slide-in from left (matches v21 section label animation)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, x: 0 });
      return;
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { opacity: 1, x: 0 });
    };
  }, []);

  return (
    <span ref={wrapRef} className={className} aria-label={children}>
      <span ref={scrambleRef as React.RefObject<HTMLSpanElement>} aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
