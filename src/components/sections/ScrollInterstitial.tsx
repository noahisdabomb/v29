'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { InterstitialSection } from '@/types';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ScrollInterstitialProps {
  interstitial: InterstitialSection;
}

// ---------------------------------------------------------------------------
// ScrollInterstitial — pinned scroll section with sequential line reveals
// ---------------------------------------------------------------------------

/**
 * A pinned scroll section where text lines reveal one at a time.
 * Each line fades in with scale + blur, holds, then fades out (except the last).
 * Respects prefers-reduced-motion by showing all lines statically.
 *
 * Uses fromTo() and gsap.set() patterns consistent with ScrollReveal.tsx.
 */
export default function ScrollInterstitial({
  interstitial,
}: ScrollInterstitialProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lines = lineRefs.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );
    if (lines.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    // Reduced motion: show all lines visible, no pinning or animation
    if (prefersReducedMotion) {
      gsap.set(lines, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' });
      return;
    }

    // Set all lines invisible initially
    gsap.set(lines, { opacity: 0, y: 20, scale: 0.96, filter: 'blur(6px)' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.3,
        start: 'top top',
        end: () =>
          `+=${lines.length * 45 * window.innerHeight / 100}`,
        invalidateOnRefresh: true,
      },
    });

    lines.forEach((line, i) => {
      // Fade in
      tl.fromTo(
        line,
        { opacity: 0, y: 20, scale: 0.96, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
        },
      );

      // Hold
      tl.to(line, { duration: 0.4 });

      // Fade out (except last line)
      if (i < lines.length - 1) {
        tl.to(line, {
          opacity: 0,
          y: -15,
          scale: 1.02,
          filter: 'blur(4px)',
          duration: 0.7,
          ease: 'power2.in',
        });
      }
    });

    // Brief hold after last line
    tl.to({}, { duration: 0.3 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      // Reset to visible on cleanup so Strict Mode remount starts clean
      gsap.set(lines, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' });
    };
  }, [interstitial]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-dvh items-center justify-center bg-bg-deep px-6"
      aria-label={interstitial.label}
    >
      <div className="flex flex-col items-center gap-8">
        {interstitial.lines.map((line, i) => (
          <div
            key={`${interstitial.label}-${i}`}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            className="max-w-3xl text-center font-heading text-[clamp(1.5rem,4vw,3rem)] font-bold leading-tight text-text-primary text-balance"
          >
            {line}
          </div>
        ))}
      </div>
    </section>
  );
}
