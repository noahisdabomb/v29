'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface TestimonialProps {
  testimonial: {
    quote: string;
    attribution: string;
    company: string;
  };
}

// ---------------------------------------------------------------------------
// Testimonial — full-width blockquote social-proof section
// ---------------------------------------------------------------------------

/**
 * A full-width blockquote that appears between sections as social proof.
 * Quote fades in first, attribution follows with slight delay.
 * Respects prefers-reduced-motion by showing content immediately.
 */
export default function Testimonial({ testimonial }: TestimonialProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const quote = el.querySelector('[data-quote]');
    const attr = el.querySelector('[data-attr]');
    const targets = [quote, attr].filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.fromTo(
      targets,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      },
    );

    // Parallax drift — quote moves slower than scroll
    let parallaxTween: gsap.core.Tween | null = null;
    if (quote && !prefersReducedMotion) {
      parallaxTween = gsap.fromTo(
        quote,
        { yPercent: 5 },
        {
          yPercent: -5,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }

    return () => {
      if (Array.isArray(tl)) {
        tl.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
      } else {
        tl.scrollTrigger?.kill();
        tl.kill();
      }
      if (parallaxTween) {
        parallaxTween.scrollTrigger?.kill();
        parallaxTween.kill();
      }
      gsap.set(targets, { opacity: 1, y: 0 });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-y border-border-subtle bg-bg-deep px-6 py-24 md:py-32"
      aria-label="Testimonial"
    >
      <div className="mx-auto max-w-4xl text-center">
        {/* Decorative quote mark */}
        <div
          className="mb-6 font-heading text-8xl leading-none text-accent/40"
          aria-hidden="true"
        >
          &ldquo;
        </div>

        <blockquote data-quote>
          <p className="font-heading text-[clamp(1.25rem,3vw,2rem)] font-medium italic leading-relaxed text-text-primary">
            {testimonial.quote}
          </p>
        </blockquote>

        <div data-attr className="mt-8">
          <span className="font-mono text-sm text-text-secondary">
            {testimonial.attribution}
          </span>
          <span className="mx-2 text-text-tertiary">/</span>
          <span className="font-mono text-sm text-text-tertiary">
            {testimonial.company}
          </span>
        </div>
      </div>
    </section>
  );
}
