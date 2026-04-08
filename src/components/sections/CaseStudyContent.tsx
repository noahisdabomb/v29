'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import TransitionLink from '@/components/layout/TransitionLink';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { CaseStudy, CaseStudyMedia } from '@/types';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Helper components (kept from original page.tsx)
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
      {children}
    </p>
  );
}

function FullBleedMedia({
  media,
  clientName,
}: {
  media: CaseStudyMedia;
  clientName: string;
}) {
  if (!media.src) return null;

  return (
    <figure className="-mx-6 md:-mx-12">
      {media.type === 'video' ? (
        <video
          src={media.src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full"
        />
      ) : (
        <img
          src={media.src}
          alt={media.alt || `${clientName} project image`}
          className="w-full"
        />
      )}
      {media.caption && (
        <figcaption className="mx-6 mt-3 font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary md:mx-12">
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
  nextStudy: CaseStudy | null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CaseStudyContent({
  caseStudy,
  nextStudy,
}: CaseStudyContentProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const clientDetails = [
    { label: 'Client', value: caseStudy.client },
    caseStudy.agency ? { label: 'Agency', value: caseStudy.agency } : null,
    caseStudy.role ? { label: 'Role', value: caseStudy.role } : null,
    caseStudy.year ? { label: 'Year', value: caseStudy.year } : null,
    caseStudy.industry
      ? { label: 'Industry', value: caseStudy.industry }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  // -----------------------------------------------------------------------
  // GSAP ScrollTrigger animations
  // -----------------------------------------------------------------------
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const tweens: gsap.core.Tween[] = [];
    const timelines: gsap.core.Timeline[] = [];

    // Helper: collect tween for cleanup
    function addTween(t: gsap.core.Tween) {
      tweens.push(t);
      return t;
    }

    // ------------------------------------------------------------------
    // If reduced motion, make everything visible and bail
    // ------------------------------------------------------------------
    if (prefersReducedMotion) {
      const allAnimated = root.querySelectorAll(
        '[data-cs-reveal], [data-cs-label], [data-cs-headline], ' +
          '[data-cs-parallax], [data-cs-pair-left], [data-cs-pair-right], ' +
          '[data-cs-grid-item], [data-cs-quote], [data-cs-quote-mark], ' +
          '[data-cs-metric], [data-cs-mytake-border], [data-cs-mytake-text], ' +
          '[data-cs-next], [data-cs-hero-title], [data-cs-hero-tagline], ' +
          '[data-cs-hero-bg]',
      );
      gsap.set(allAnimated, { opacity: 1, y: 0, x: 0, scale: 1 });
      const border = root.querySelector('[data-cs-mytake-border]');
      if (border) gsap.set(border, { scaleY: 1 });
      return;
    }

    // ------------------------------------------------------------------
    // 1. Hero — parallax background + title/tagline fade up
    // ------------------------------------------------------------------
    const heroBg = root.querySelector('[data-cs-hero-bg]');
    const heroSection = root.querySelector('[data-cs-hero]');

    if (heroBg && heroSection) {
      addTween(
        gsap.fromTo(
          heroBg,
          { y: '0%' },
          {
            y: '20%',
            scrollTrigger: {
              trigger: heroSection,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          },
        ),
      );
    }

    // Hero title + tagline entrance
    const heroTl = gsap.timeline({ delay: 0.3 });
    timelines.push(heroTl);

    const heroTitle = root.querySelectorAll('[data-cs-hero-title]');
    const heroTagline = root.querySelector('[data-cs-hero-tagline]');
    const heroBack = root.querySelector('[data-cs-hero-back]');
    const heroNumber = root.querySelector('[data-cs-hero-number]');

    if (heroBack) {
      heroTl.fromTo(
        heroBack,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      );
    }

    if (heroNumber) {
      heroTl.fromTo(
        heroNumber,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.3',
      );
    }

    if (heroTitle.length > 0) {
      heroTl.fromTo(
        heroTitle,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=0.3',
      );
    }

    if (heroTagline) {
      heroTl.fromTo(
        heroTagline,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4',
      );
    }

    // ------------------------------------------------------------------
    // 2. Section reveals (Brief, Insight, Work, Results, My Take)
    // ------------------------------------------------------------------
    const revealSections = root.querySelectorAll('[data-cs-reveal]');
    revealSections.forEach((section) => {
      addTween(
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        ),
      );
    });

    // Section labels — slide in from left
    const labels = root.querySelectorAll('[data-cs-label]');
    labels.forEach((label) => {
      addTween(
        gsap.fromTo(
          label,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: label,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        ),
      );
    });

    // Headlines — scale from 0.95 to 1.0 with opacity
    const headlines = root.querySelectorAll('[data-cs-headline]');
    headlines.forEach((headline) => {
      addTween(
        gsap.fromTo(
          headline,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headline,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        ),
      );
    });

    // ------------------------------------------------------------------
    // 3. Media animations
    // ------------------------------------------------------------------

    // Full-bleed images: parallax
    const parallaxMedia = root.querySelectorAll('[data-cs-parallax]');
    parallaxMedia.forEach((media) => {
      addTween(
        gsap.fromTo(
          media,
          { y: '-4%' },
          {
            y: '4%',
            scrollTrigger: {
              trigger: media.parentElement || media,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        ),
      );
    });

    // Image pairs: stagger left/right
    const pairLeft = root.querySelector('[data-cs-pair-left]');
    const pairRight = root.querySelector('[data-cs-pair-right]');

    if (pairLeft) {
      addTween(
        gsap.fromTo(
          pairLeft,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pairLeft.parentElement || pairLeft,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        ),
      );
    }

    if (pairRight) {
      addTween(
        gsap.fromTo(
          pairRight,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pairRight.parentElement || pairRight,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        ),
      );
    }

    // Image grid: stagger reveal
    const gridItems = root.querySelectorAll('[data-cs-grid-item]');
    if (gridItems.length > 0) {
      addTween(
        gsap.fromTo(
          gridItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridItems[0].parentElement || gridItems[0],
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        ),
      );
    }

    // ------------------------------------------------------------------
    // 4. Pull quote
    // ------------------------------------------------------------------
    const quote = root.querySelector('[data-cs-quote]');
    const quoteMark = root.querySelector('[data-cs-quote-mark]');

    if (quote) {
      addTween(
        gsap.fromTo(
          quote,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quote,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        ),
      );
    }

    if (quoteMark) {
      addTween(
        gsap.fromTo(
          quoteMark,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: quoteMark.parentElement || quoteMark,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        ),
      );
    }

    // ------------------------------------------------------------------
    // 5. Results metrics — stagger in
    // ------------------------------------------------------------------
    const metrics = root.querySelectorAll('[data-cs-metric]');
    if (metrics.length > 0) {
      addTween(
        gsap.fromTo(
          metrics,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: metrics[0].parentElement || metrics[0],
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        ),
      );
    }

    // ------------------------------------------------------------------
    // 6. My Take — border grows + text fades in
    // ------------------------------------------------------------------
    const myTakeBorder = root.querySelector('[data-cs-mytake-border]');
    const myTakeTexts = root.querySelectorAll('[data-cs-mytake-text]');

    if (myTakeBorder) {
      addTween(
        gsap.fromTo(
          myTakeBorder,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: myTakeBorder.parentElement || myTakeBorder,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        ),
      );
    }

    if (myTakeTexts.length > 0) {
      addTween(
        gsap.fromTo(
          myTakeTexts,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.2,
            scrollTrigger: {
              trigger:
                myTakeTexts[0].parentElement?.parentElement || myTakeTexts[0],
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        ),
      );
    }

    // ------------------------------------------------------------------
    // 7. Next case study — parallax + fade in
    // ------------------------------------------------------------------
    const nextSection = root.querySelector('[data-cs-next]');
    if (nextSection) {
      addTween(
        gsap.fromTo(
          nextSection,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: nextSection,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          },
        ),
      );
    }

    // ------------------------------------------------------------------
    // Cleanup
    // ------------------------------------------------------------------
    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
      timelines.forEach((tl) => {
        tl.kill();
      });
      // Reset to visible on cleanup so Strict Mode remount starts clean
      const allAnimated = root.querySelectorAll(
        '[data-cs-reveal], [data-cs-label], [data-cs-headline], ' +
          '[data-cs-parallax], [data-cs-pair-left], [data-cs-pair-right], ' +
          '[data-cs-grid-item], [data-cs-quote], [data-cs-quote-mark], ' +
          '[data-cs-metric], [data-cs-mytake-border], [data-cs-mytake-text], ' +
          '[data-cs-next], [data-cs-hero-title], [data-cs-hero-tagline], ' +
          '[data-cs-hero-bg], [data-cs-hero-back], [data-cs-hero-number]',
      );
      gsap.set(allAnimated, { opacity: 1, y: 0, x: 0, scale: 1, scaleY: 1 });
    };
  }, []);

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <div ref={rootRef}>
      {/* ================================================================ */}
      {/* 1. Hero -- full-bleed video/image background with text overlay   */}
      {/* ================================================================ */}
      <section
        data-cs-hero
        data-concierge-section="case-study-hero"
        data-concierge-label={`${caseStudy.client} Overview`}
        className="relative flex min-h-[70vh] flex-col justify-end overflow-hidden md:min-h-[85vh]"
      >
        {/* Background: Vimeo video > hero image > solid black */}
        {caseStudy.media?.vimeoIds?.[0] ? (
          <div
            data-cs-hero-bg
            className="absolute inset-0"
            aria-hidden="true"
          >
            <iframe
              src={`https://player.vimeo.com/video/${caseStudy.media.vimeoIds[0]}?background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0`}
              className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
              style={{ width: '177.78vh', height: '56.25vw' }}
              allow="autoplay"
              title={`${caseStudy.client} campaign video`}
              tabIndex={-1}
            />
          </div>
        ) : caseStudy.media?.hero?.src ? (
          <div data-cs-hero-bg className="absolute inset-0">
            <img
              src={caseStudy.media.hero.src}
              alt={
                caseStudy.media.hero.alt ||
                `${caseStudy.client} project image`
              }
              className="size-full object-cover"
              aria-hidden="true"
            />
          </div>
        ) : null}

        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/60 to-transparent" />

        {/* Text content -- positioned at bottom */}
        <div className="relative z-10 pb-16 pt-32 md:pb-20">
          <div className="mx-auto max-w-[1200px] px-6 md:px-12">
            <TransitionLink
              data-cs-hero-back
              href="/work"
              className="inline-block py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent"
            >
              Back to Work
            </TransitionLink>

            <p
              data-cs-hero-number
              className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary"
            >
              Case Study {caseStudy.number}
            </p>
            <h1
              data-cs-hero-title
              className="mt-3 font-heading text-[clamp(2.75rem,7vw,6rem)] font-bold leading-[0.95] text-text-primary text-balance"
            >
              {caseStudy.title}
            </h1>
            <p
              data-cs-hero-tagline
              className="mt-5 max-w-3xl text-xl leading-relaxed text-text-secondary text-pretty"
            >
              {caseStudy.tagline}
            </p>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-[1200px] px-6 pb-24 md:px-12">
        {/* ---------------------------------------------------------------- */}
        {/* The Brief                                                        */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="mt-24"
          data-concierge-section="brief"
          data-concierge-label="The Brief"
        >
          <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-start">
            {/* Left column -- label, headline, narrative */}
            <div>
              <div data-cs-label>
                <SectionLabel>The Brief</SectionLabel>
              </div>

              {caseStudy.briefHeadline && (
                <h2
                  data-cs-headline
                  className="mt-6 font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-text-primary text-balance"
                >
                  {caseStudy.briefHeadline}
                </h2>
              )}

              <div data-cs-reveal>
                <p className="mt-8 text-base leading-relaxed text-text-secondary md:text-lg">
                  {caseStudy.brief || caseStudy.challenge}
                </p>
              </div>
            </div>

            {/* Right column -- client details + services */}
            <div data-cs-reveal className="md:pt-8">
              <div className="grid gap-4">
                {clientDetails.map((detail) => (
                  <div key={detail.label} className="flex gap-6">
                    <span className="w-20 shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary">
                      {detail.label}
                    </span>
                    <span className="text-sm font-medium text-text-primary">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>

              {caseStudy.services.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {caseStudy.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full border border-border-subtle px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-text-secondary"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Media slot 1 -- Full bleed                                       */}
        {/* ---------------------------------------------------------------- */}
        {caseStudy.media?.fullBleed1?.src && (
          <section className="mt-24 overflow-hidden">
            <div data-cs-parallax>
              <FullBleedMedia
                media={caseStudy.media.fullBleed1}
                clientName={caseStudy.client}
              />
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* The Insight                                                      */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="mt-24"
          data-concierge-section="insight"
          data-concierge-label="The Insight"
        >
          <div data-cs-label>
            <SectionLabel>The Insight</SectionLabel>
          </div>

          {caseStudy.insightHeadline && (
            <h2
              data-cs-headline
              className="mt-6 max-w-3xl font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-text-primary text-balance"
            >
              {caseStudy.insightHeadline}
            </h2>
          )}

          <div
            data-cs-reveal
            className="mt-8 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg"
          >
            <p>{caseStudy.insight}</p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Media slot 2 -- Pair                                             */}
        {/* ---------------------------------------------------------------- */}
        {caseStudy.media?.pair &&
          caseStudy.media.pair.left.src &&
          caseStudy.media.pair.right.src && (
            <section className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div
                data-cs-pair-left
                className="relative aspect-[3/2] overflow-hidden rounded-xl"
              >
                <img
                  src={caseStudy.media.pair.left.src}
                  alt={
                    caseStudy.media.pair.left.alt ||
                    `${caseStudy.client} project image`
                  }
                  className="size-full object-cover"
                  loading="lazy"
                />
              </div>
              <div
                data-cs-pair-right
                className="relative aspect-[3/2] overflow-hidden rounded-xl"
              >
                <img
                  src={caseStudy.media.pair.right.src}
                  alt={
                    caseStudy.media.pair.right.alt ||
                    `${caseStudy.client} project image`
                  }
                  className="size-full object-cover"
                  loading="lazy"
                />
              </div>
            </section>
          )}

        {/* ---------------------------------------------------------------- */}
        {/* Image grid                                                       */}
        {/* ---------------------------------------------------------------- */}
        {caseStudy.media?.grid &&
          caseStudy.media.grid.filter((item) => item.src).length > 0 && (
            <div className="mt-12 grid grid-cols-2 gap-2 overflow-hidden rounded-xl">
              {caseStudy.media.grid
                .filter((item) => item.src)
                .slice(0, 4)
                .map((item, i) => (
                  <div
                    key={i}
                    data-cs-grid-item
                    className="relative aspect-square overflow-hidden"
                  >
                    <img
                      src={item.src}
                      alt={
                        item.alt || `${caseStudy.client} project image`
                      }
                      className="size-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
            </div>
          )}

        {/* ---------------------------------------------------------------- */}
        {/* The Work                                                         */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="mt-24"
          data-concierge-section="work"
          data-concierge-label="The Work"
        >
          <div data-cs-label>
            <SectionLabel>The Work</SectionLabel>
          </div>

          {caseStudy.workHeadline && (
            <h2
              data-cs-headline
              className="mt-6 max-w-3xl font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-text-primary text-balance"
            >
              {caseStudy.workHeadline}
            </h2>
          )}

          <div
            data-cs-reveal
            className="mt-8 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg"
          >
            <p>{caseStudy.work || caseStudy.description}</p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Pull quote -- bridge between Work and Results                    */}
        {/* ---------------------------------------------------------------- */}
        {caseStudy.pullQuote && (
          <blockquote data-cs-quote className="relative mt-24 max-w-3xl pl-8">
            <span
              data-cs-quote-mark
              className="absolute -left-2 -top-4 font-heading text-6xl leading-none text-accent/30"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="font-heading text-2xl italic leading-snug text-accent md:text-3xl">
              {caseStudy.pullQuote}
            </p>
          </blockquote>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Vimeo embed 2                                                    */}
        {/* ---------------------------------------------------------------- */}
        {caseStudy.media?.vimeoIds?.[1] && (
          <div data-cs-reveal className="-mx-6 mt-24 md:-mx-12">
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <iframe
                src={`https://player.vimeo.com/video/${caseStudy.media.vimeoIds[1]}?autoplay=0&title=0&byline=0&portrait=0`}
                className="absolute inset-0 size-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={`${caseStudy.client} project video`}
              />
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* The Results                                                      */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="mt-24"
          data-concierge-section="results"
          data-concierge-label="The Results"
        >
          <div data-cs-label>
            <SectionLabel>The Results</SectionLabel>
          </div>

          {/* Metrics */}
          {caseStudy.metrics.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-8 md:gap-16 lg:gap-20">
              {caseStudy.metrics.map((metric) => (
                <div key={metric.label} data-cs-metric>
                  <p className="font-heading text-[clamp(3.5rem,8vw,6rem)] font-bold leading-none tabular-nums text-text-primary">
                    {metric.value}
                  </p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {caseStudy.execution.length > 0 && (
            <div
              data-cs-reveal
              className="mt-12 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg"
            >
              {caseStudy.execution.map((item) => (
                <p key={item} className="mt-4 first:mt-0">
                  {item}
                </p>
              ))}
            </div>
          )}
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* My Take                                                          */}
        {/* ---------------------------------------------------------------- */}
        {caseStudy.myTake && (
          <section
            className="mt-24"
            data-concierge-section="my-take"
            data-concierge-label="My Take"
          >
            <div data-cs-label>
              <SectionLabel>My Take</SectionLabel>
            </div>

            <div className="relative mt-8 pl-8">
              {/* Animated border */}
              <div
                data-cs-mytake-border
                className="absolute bottom-0 left-0 top-0 w-0.5 origin-top bg-accent"
              />

              {caseStudy.myTake.split('\n\n').map((paragraph, i) => (
                <p
                  key={i}
                  data-cs-mytake-text
                  className="mt-4 max-w-2xl font-heading text-lg italic leading-relaxed text-text-secondary first:mt-0 md:text-xl"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                */}
      {/* ------------------------------------------------------------------ */}
      {caseStudy.cta && (
        <div data-cs-reveal className="flex justify-center py-16">
          <a
            href={caseStudy.cta.href}
            {...(caseStudy.cta.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-ui text-sm font-medium tracking-wide text-white transition-opacity duration-200 hover:opacity-90"
          >
            {caseStudy.cta.label}
          </a>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Next case study                                                    */}
      {/* ------------------------------------------------------------------ */}
      {nextStudy && (
        <section
          data-cs-next
          data-concierge-section="next-case-study"
          data-concierge-label="Next Case Study"
          className="mt-24 border-t border-border-subtle py-24"
        >
          <div className="mx-auto max-w-5xl px-6 md:px-12">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-secondary">
              Next Case Study
            </p>
            <TransitionLink href={`/work/${nextStudy.slug}`} className="mt-4 block">
              <h3 className="font-heading text-2xl font-bold text-text-primary transition-colors hover:text-accent md:text-3xl">
                {nextStudy.title}
              </h3>
              <p className="mt-2 text-text-secondary">{nextStudy.tagline}</p>
            </TransitionLink>
          </div>
        </section>
      )}
    </div>
  );
}
