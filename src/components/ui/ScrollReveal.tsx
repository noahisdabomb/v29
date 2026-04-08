'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type RevealVariant = 'fadeUp' | 'fadeIn' | 'scaleUp';

interface ScrollRevealProps {
  children: ReactNode;
  /** Animation variant (default: 'fadeUp') */
  variant?: RevealVariant;
  /** Delay before animation starts in seconds (default: 0) */
  delay?: number;
  /** Animation duration in seconds (default: 0.8) */
  duration?: number;
  /** ScrollTrigger start position (default: 'top 85%') */
  start?: string;
  /** Additional className for the wrapper */
  className?: string;
  /** HTML tag for the wrapper (default: 'div') */
  as?: keyof HTMLElementTagNameMap;
}

interface StaggerRevealProps {
  children: ReactNode;
  /** Stagger delay between children in seconds (default: 0.12) */
  stagger?: number;
  /** Animation duration per child in seconds (default: 0.7) */
  duration?: number;
  /** ScrollTrigger start position (default: 'top 85%') */
  start?: string;
  /** Additional className for the wrapper */
  className?: string;
  /** HTML tag for the wrapper (default: 'div') */
  as?: keyof HTMLElementTagNameMap;
}

// ---------------------------------------------------------------------------
// Variant configs
// ---------------------------------------------------------------------------
const VARIANTS: Record<RevealVariant, gsap.TweenVars> = {
  fadeUp: { y: 40, opacity: 0 },
  fadeIn: { opacity: 0 },
  scaleUp: { scale: 0.95, opacity: 0 },
};

const VARIANT_TO: Record<RevealVariant, gsap.TweenVars> = {
  fadeUp: { y: 0, opacity: 1 },
  fadeIn: { opacity: 1 },
  scaleUp: { scale: 1, opacity: 1 },
};

// ---------------------------------------------------------------------------
// ScrollReveal — single-element scroll-triggered entrance animation
// ---------------------------------------------------------------------------

/**
 * Wraps content and animates it into view when scrolled to.
 * Uses GSAP ScrollTrigger for efficient, scroll-driven animations.
 * Respects prefers-reduced-motion.
 *
 * Uses fromTo() to avoid React Strict Mode double-mount issues
 * where set() + to() can leave elements invisible.
 */
export function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.8,
  start = 'top 85%',
  className = '',
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const fromVars = VARIANTS[variant];
    const toVars = VARIANT_TO[variant];

    const tween = gsap.fromTo(el, fromVars, {
      ...toVars,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      // Reset to visible on cleanup so Strict Mode remount starts clean
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
    };
  }, [variant, delay, duration, start]);

  return (
    // @ts-expect-error -- dynamic tag element
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

// ---------------------------------------------------------------------------
// StaggerReveal — stagger-animate direct children on scroll
// ---------------------------------------------------------------------------

/**
 * Wraps multiple children and staggers their entrance animation.
 * Uses fromTo() to avoid React Strict Mode double-mount issues.
 */
export function StaggerReveal({
  children,
  stagger = 0.12,
  duration = 0.7,
  start = 'top 85%',
  className = '',
  as: Tag = 'div',
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = container.querySelectorAll(':scope > *');
    if (!items.length) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const tween = gsap.fromTo(
      items,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: 'play none none none',
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      // Reset to visible on cleanup so Strict Mode remount starts clean
      gsap.set(items, { opacity: 1, y: 0 });
    };
  }, [stagger, duration, start]);

  return (
    // @ts-expect-error -- dynamic tag element
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
