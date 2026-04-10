'use client';

import { useRef, useEffect, Fragment } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CREDIBILITY_BRANDS,
  CREDIBILITY_AWARDS,
  CREDIBILITY_PRESS,
  CREDIBILITY_STATS,
  type CredibilityBrand,
} from '@/lib/content';
import StatCounter from '@/components/ui/StatCounter';
import { MOTION } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

/* ── Per-logo size tuning for visual balance ─────────────── */
const LOGO_SIZE: Record<string, string> = {
  'Coca-Cola':                  'max-h-7 max-w-[120px] md:max-h-9 md:max-w-[150px]',
  'Toyota':                     'max-h-10 max-w-[65px] md:max-h-12 md:max-w-[80px]',
  'Delta Air Lines':            'max-h-5 max-w-[130px] md:max-h-6 md:max-w-[160px]',
  'Orangetheory Fitness':       'max-h-6 max-w-[140px] md:max-h-8 md:max-w-[175px]',
  'Brand USA':                  'max-h-9 max-w-[90px]  md:max-h-11 md:max-w-[115px]',
  'NHTSA':                       'max-h-4 max-w-[90px]  md:max-h-5 md:max-w-[115px]',
  'Tombras':                    'max-h-7 max-w-[150px] md:max-h-9 md:max-w-[190px]',
  'BarkleyOKRP':                'max-h-5 max-w-[170px] md:max-h-6 md:max-w-[210px]',
  'Dept Agency':                'max-h-10 max-w-[55px] md:max-h-12 md:max-w-[70px]',
  'Digitas':                    'max-h-11 max-w-[70px] md:max-h-14 md:max-w-[90px]',
  'Possible':                   'max-h-5 max-w-[140px] md:max-h-6 md:max-w-[170px]',
};
const DEFAULT_SIZE = 'max-h-6 max-w-[120px] md:max-h-8 md:max-w-[150px]';

/* ── Per-press-logo size tuning ──────────────────────────── */
const PRESS_SIZE: Record<string, string> = {
  'Adweek':        'max-h-6 max-w-[120px] md:max-h-8 md:max-w-[150px]',
  'Ad Age':        'max-h-6 max-w-[110px] md:max-h-8 md:max-w-[140px]',
  'The Drum':      'max-h-8 max-w-[130px] md:max-h-10 md:max-w-[160px]',
  'MediaPost':     'max-h-8 max-w-[130px] md:max-h-10 md:max-w-[160px]',
  'Shorty Awards': 'max-h-9 max-w-[80px]  md:max-h-11 md:max-w-[100px]',
};
const DEFAULT_PRESS = 'max-h-6 max-w-[110px] md:max-h-8 md:max-w-[140px]';

/* ── Inline SVG trophy icon ───────────────────────────────── */
function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

/* ── Brand Logo ───────────────────────────────────────────── */
function BrandLogo({ brand }: { brand: CredibilityBrand }) {
  const sizeClass = LOGO_SIZE[brand.name] ?? DEFAULT_SIZE;
  return (
    <img
      src={brand.logo}
      alt={brand.name}
      className={`cred-card w-auto object-contain opacity-50 brightness-0 invert transition-opacity duration-300 hover:opacity-90 ${sizeClass}`}
      loading="lazy"
    />
  );
}

/* ── Stat Block ───────────────────────────────────────────── */
function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="cred-stat flex flex-col items-center text-center">
      <StatCounter
        value={value}
        className="font-heading text-2xl font-bold text-white/70 md:text-3xl"
      />
      <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
        {label}
      </span>
    </div>
  );
}

/* ── Main Section ─────────────────────────────────────────── */
export default function CredibilityGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const allTargets =
      '.cred-header, .cred-rule, .cred-card, .cred-stat, .cred-sublabel, .cred-stat-border, .cred-award, .cred-press-logo';

    if (prefersReducedMotion) {
      gsap.set(el.querySelectorAll(allTargets), {
        opacity: 1,
        y: 0,
        x: 0,
        scaleX: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      /* ── Single choreographed timeline ─────────────────────
       * Sticky section = everything enters at once.
       * Timeline sequences the reveal with overlapping phases. */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 100%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Label slides from left
      tl.fromTo(
        '.cred-header',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, ease: MOTION.ease.standard },
      );

      // 2. Rule line grows from left
      tl.fromTo(
        '.cred-rule',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.8, ease: MOTION.ease.standard },
        '-=0.4',
      );

      // 3. Brand logos stagger fade-up
      tl.fromTo(
        '.cred-card',
        { opacity: 0, y: 30 },
        {
          opacity: 0.5,
          y: 0,
          duration: MOTION.duration.entrance,
          ease: MOTION.ease.standard,
          stagger: 0.06,
          clearProps: 'transform',
        },
        '-=0.35',
      );

      // 4. Stats border lines fade in
      tl.fromTo(
        '.cred-stat-border',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: MOTION.ease.standard },
        '-=0.25',
      );

      // 5. Stats counter fade-up with stagger
      tl.fromTo(
        '.cred-stat',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.duration.entrance,
          ease: MOTION.ease.standard,
          stagger: 0.1,
          clearProps: 'transform',
        },
        '-=0.3',
      );

      // 6. Sub-labels ("Recognition", "Featured in") slide from left
      tl.fromTo(
        '.cred-sublabel',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: MOTION.duration.entrance,
          ease: MOTION.ease.standard,
          stagger: 0.1,
        },
        '-=0.25',
      );

      // 7. Awards + press logos fade-up
      tl.fromTo(
        '.cred-award',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.duration.slow,
          ease: MOTION.ease.standard,
          stagger: 0.06,
          clearProps: 'transform',
        },
        '-=0.3',
      );

      tl.fromTo(
        '.cred-press-logo',
        { opacity: 0, y: 16 },
        {
          opacity: 0.5,
          y: 0,
          duration: MOTION.duration.slow,
          ease: MOTION.ease.standard,
          stagger: 0.06,
          clearProps: 'transform',
        },
        '-=0.4',
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Credentials and clients"
      className="sticky top-0 z-0 py-16 md:py-24"
      style={{ background: 'var(--accent)' }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        {/* ── Header ─────────────────────────────────────── */}
        <div className="mb-10 flex items-center gap-4">
          <p className="cred-header shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
            Trusted by
          </p>
          <div className="cred-rule h-px flex-1 bg-white/15" />
        </div>

        {/* ── Brand Logo Grid ────────────────────────────── */}
        <div className="cred-grid flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14 md:gap-y-10">
          {CREDIBILITY_BRANDS.map((brand) => (
            <BrandLogo key={brand.name} brand={brand} />
          ))}
        </div>

        {/* ── Stats Row ──────────────────────────────────── */}
        <div className="cred-stats cred-stat-border mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 border-y border-white/15 py-8 md:gap-x-16">
          {CREDIBILITY_STATS.map((stat, i) => (
            <Fragment key={stat.label}>
              {i > 0 && (
                <span
                  className="hidden text-white/30 md:inline"
                  aria-hidden="true"
                >
                  ·
                </span>
              )}
              <StatBlock value={stat.value} label={stat.label} />
            </Fragment>
          ))}
        </div>

        {/* ── Awards + Press ─────────────────────────────── */}
        <div className="cred-bottom mt-10 grid gap-8 md:grid-cols-2">
          {/* Awards */}
          <div>
            <p className="cred-sublabel mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
              Recognition
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {CREDIBILITY_AWARDS.map((award) => (
                <span
                  key={award.name}
                  className="cred-award inline-flex items-center gap-1.5"
                >
                  <TrophyIcon className="text-white/70" />
                  <span className="font-heading text-sm font-medium text-white">
                    {award.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/70">
                    {award.detail}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Press — logo row */}
          <div>
            <p className="cred-sublabel mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
              Featured in
            </p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-5 md:gap-x-12">
              {CREDIBILITY_PRESS.map((pub) => (
                <img
                  key={pub.name}
                  src={pub.logo}
                  alt={pub.name}
                  className={`cred-press-logo w-auto object-contain opacity-50 brightness-0 invert transition-opacity duration-300 hover:opacity-90 ${PRESS_SIZE[pub.name] ?? DEFAULT_PRESS}`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
