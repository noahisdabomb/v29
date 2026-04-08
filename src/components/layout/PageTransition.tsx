'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTransitionContext } from '@/components/layout/TransitionContext';
import { PAGE_TRANSITION } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const { contentRef, isTransitioning, markComplete } = useTransitionContext();

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // First mount — no transition needed, just ensure visible
    if (pathname === prevPath.current && !isTransitioning) return;

    prevPath.current = pathname;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    // Reset scroll to top
    window.scrollTo(0, 0);

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      markComplete();

      // Refresh ScrollTrigger for new page content
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
      return;
    }

    // Set initial state for enter
    gsap.set(el, { opacity: 0, y: 20 });

    // Play enter animation
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: PAGE_TRANSITION.enterDuration,
      ease: PAGE_TRANSITION.enterEase,
      delay: 0.05, // tiny delay so DOM settles
      onComplete: () => {
        markComplete();

        // Defer ScrollTrigger refresh to next frame to avoid frame drop
        requestAnimationFrame(() => ScrollTrigger.refresh());
      },
    });

    return () => {
      tween.kill();
    };
  }, [pathname]);

  return (
    <div ref={contentRef}>
      {children}
    </div>
  );
}
