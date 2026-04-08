'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ADVANTAGE, ADVANTAGE_ITEMS, CAL_COM_URL } from '@/lib/content';
import ScrambleLabel from '@/components/ui/ScrambleLabel';

gsap.registerPlugin(ScrollTrigger);

export default function AdvantageSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const tweens: gsap.core.Tween[] = [];

    // Word-by-word H2 clip reveal
    const h2Words = el.querySelectorAll('.adv-word-inner');
    if (h2Words.length) {
      if (prefersReducedMotion) {
        gsap.set(h2Words, { y: '0%' });
      } else {
        tweens.push(
          gsap.fromTo(
            h2Words,
            { y: '100%' },
            {
              y: '0%',
              duration: 0.8,
              stagger: 0.04,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: el.querySelector('h2'),
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            },
          ),
        );
      }
    }

    // Paragraphs stagger fade-up
    const paragraphs = el.querySelectorAll('[data-adv-para]');
    if (paragraphs.length && !prefersReducedMotion) {
      tweens.push(
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el.querySelector('[data-adv-left]'),
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          },
        ),
      );
    }

    // Awards fade up
    const awards = el.querySelector('[data-adv-awards]');
    if (awards && !prefersReducedMotion) {
      tweens.push(
        gsap.fromTo(
          awards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: awards,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          },
        ),
      );
    }

    // Items slide from right with icon scale bounce
    const items = el.querySelectorAll('[data-adv-item]');
    items.forEach((item, i) => {
      if (prefersReducedMotion) {
        gsap.set(item, { opacity: 1, x: 0 });
        return;
      }

      tweens.push(
        gsap.fromTo(
          item,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            onStart: () => {
              const icon = item.querySelector('[data-adv-icon]');
              if (icon) {
                gsap.fromTo(
                  icon,
                  { scale: 1.6 },
                  { scale: 1, duration: 0.5, ease: 'back.out(2)' },
                );
              }
            },
          },
        ),
      );
    });

    // Parallax — left column drifts slower than right
    const leftCol = el.querySelector('[data-adv-left]');
    const rightCol = el.querySelector('[data-adv-right]');
    if (leftCol && rightCol && !prefersReducedMotion) {
      tweens.push(
        gsap.fromTo(leftCol, { yPercent: 3 }, {
          yPercent: -3, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        }),
      );
      tweens.push(
        gsap.fromTo(rightCol, { yPercent: -2 }, {
          yPercent: 2, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        }),
      );
    }

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
      gsap.set(
        [
          ...Array.from(h2Words),
          ...Array.from(paragraphs),
          awards,
          ...Array.from(items),
        ].filter(Boolean),
        { opacity: 1, y: 0, x: 0, scale: 1 },
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg-deep py-32 md:py-48"
      id="advantage"
      aria-label="The Advantage"
      data-concierge-section="advantage"
      data-concierge-label="The Advantage"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column */}
          <div data-adv-left>
            <ScrambleLabel className="mb-4 block font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {ADVANTAGE.sectionLabel}
            </ScrambleLabel>

            {/* Word-by-word clip reveal H2 */}
            <h2 className="font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-text-primary text-balance">
              {ADVANTAGE.headline.split(/\s+/).map((word, i) => (
                <span key={i}>
                  <span className="inline-block overflow-hidden align-top">
                    <span className="adv-word-inner inline-block">{word}</span>
                  </span>{' '}
                </span>
              ))}
            </h2>

            {ADVANTAGE.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                data-adv-para
                className="mt-6 text-base leading-relaxed text-text-secondary"
              >
                {paragraph}
              </p>
            ))}

            {/* Awards */}
            <div data-adv-awards className="mt-10 flex flex-wrap gap-4">
              {ADVANTAGE.awards.map((award) => (
                <div
                  key={award}
                  className="flex items-center gap-2 rounded-full border border-border-subtle px-4 py-2"
                >
                  <svg className="size-4 text-accent-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                  <span className="font-mono text-xs uppercase tracking-[0.1em] text-text-secondary">
                    {award}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <a
                href={CAL_COM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-heading text-base font-semibold text-text-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(224,68,88,0.25)] hover:scale-[1.02] active:scale-[0.98] active:duration-100"
              >
                Book a Strategy Call
              </a>
            </div>
          </div>

          {/* Right column -- advantage items */}
          <div data-adv-right className="flex flex-col gap-10">
            {ADVANTAGE_ITEMS.map((item) => (
              <div key={item.number} data-adv-item className="flex gap-6">
                <div
                  data-adv-icon
                  className="shrink-0 font-mono text-sm text-accent/60"
                >
                  +{item.number}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
