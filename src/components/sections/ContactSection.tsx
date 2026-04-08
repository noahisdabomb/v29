'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT, CONTACT_DETAILS, CAL_COM_URL } from '@/lib/content';
import { ScrollReveal, StaggerReveal } from '@/components/ui/ScrollReveal';
import ScrambleLabel from '@/components/ui/ScrambleLabel';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const grid = el.querySelector('[data-contact-grid]');
    let parallaxTween: gsap.core.Tween | null = null;

    if (grid && !prefersReducedMotion) {
      parallaxTween = gsap.fromTo(
        grid,
        { yPercent: 4 },
        {
          yPercent: -2,
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
      if (parallaxTween) {
        parallaxTween.scrollTrigger?.kill();
        parallaxTween.kill();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg-deep py-32 md:py-48"
      id="contact"
      aria-label="Contact"
      data-concierge-section="contact"
      data-concierge-label="Contact"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        {/* Section header */}
        <ScrollReveal>
          <ScrambleLabel className="mb-4 block font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {CONTACT.sectionLabel}
          </ScrambleLabel>

          <h2 className="max-w-3xl font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-text-primary text-balance">
            {CONTACT.headline}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary">
            {CONTACT.subline}
          </p>
        </ScrollReveal>

        {/* Contact details grid */}
        <div data-contact-grid>
        <StaggerReveal
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
          start="top 80%"
        >
          {CONTACT_DETAILS.map((detail) => (
            <div
              key={detail.label}
              className="rounded-lg border border-border-subtle bg-bg-card p-6 transition-[transform,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-border-accent"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
                {detail.label}
              </span>
              <p className="mt-3 font-heading text-base font-semibold text-text-primary">
                {detail.value}
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                {detail.description}
              </p>
            </div>
          ))}
        </StaggerReveal>
        </div>

        {/* CTA */}
        <ScrollReveal className="mt-12">
          <div className="text-center">
            <a
              href={CAL_COM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-heading text-base font-semibold text-text-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(224,68,88,0.25)] hover:scale-[1.02] active:scale-[0.98] active:duration-100"
            >
              Schedule a Conversation
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
