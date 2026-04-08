'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLiveClock } from '@/hooks/useLiveClock';
import { useGPUCapability } from '@/hooks/useGPUCapability';
import { useProximityHeat } from '@/hooks/useProximityHeat';
import { CAL_COM_URL } from '@/lib/content';
import MagneticButton from '@/components/ui/MagneticButton';
import TransitionLink from '@/components/layout/TransitionLink';

gsap.registerPlugin(ScrollTrigger);

// Gate hero 3D scene — flip to true when ready to test WebGL
const HERO_3D_ENABLED = true;

const HeroClockScene = dynamic(
  () => import('@/components/sections/HeroClockScene'),
  { ssr: false },
);

// ---------------------------------------------------------------------------
// Typography wall lines — "IT'S TOMORROW HERE. YOUR WORK IS ALREADY STARTED."
// ---------------------------------------------------------------------------
const WALL_LINES = [
  ["IT'S"],
  ['TOMORROW', 'HERE.'],
  ['YOUR', 'WORK'],
  ['IS', 'ALREADY'],
  ['STARTED.'],
];

// ---------------------------------------------------------------------------
// StatusDot
// ---------------------------------------------------------------------------
function StatusDot({ status }: { status: 'available' | 'winding-down' | 'offline' }) {
  const dotColor =
    status === 'available'
      ? 'bg-emerald-400'
      : status === 'winding-down'
        ? 'bg-amber-400'
        : 'bg-red-400';

  const pingColor =
    status === 'available'
      ? 'bg-emerald-400'
      : status === 'winding-down'
        ? 'bg-amber-400'
        : '';

  return (
    <span className="relative flex size-2">
      {status !== 'offline' && pingColor && (
        <span
          className={`absolute inline-flex size-full rounded-full ${pingColor} opacity-75`}
          style={{ animation: 'ping-limited 1.8s ease-in-out 3' }}
        />
      )}
      <span className={`relative inline-flex size-2 rounded-full ${dotColor}`} />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Hero Component
// ---------------------------------------------------------------------------
export default function Hero() {
  const clock = useLiveClock();
  const gpu = useGPUCapability();
  const sectionRef = useRef<HTMLElement>(null);
  const typeColRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [showingBkk, setShowingBkk] = useState(true);

  // Cursor proximity heat on typography wall words
  useProximityHeat(typeColRef, '.hl-word');

  // Dispose 3D scene when hero scrolls out of view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // GSAP entrance choreography
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const statusBar = el.querySelector('[data-hero="status"]');
    const wallLines = el.querySelectorAll('.hl-line');
    const ctaBlock = el.querySelector('[data-hero="cta"]');
    const clockCol = el.querySelector('[data-hero="clock-col"]');

    const allTargets = [
      statusBar,
      ...Array.from(wallLines),
      ctaBlock,
      clockCol,
    ].filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set(allTargets, { opacity: 1, y: 0 });
      return;
    }

    // Set initial hidden state
    gsap.set(allTargets, { opacity: 0, y: 30 });

    const tl = gsap.timeline({ delay: 0.15 });

    // Typography wall — staggered word slam (60ms between lines)
    tl.to(
      wallLines,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power4.out',
      },
    );

    // Status bar fades in after headline
    tl.to(statusBar, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power3.out',
    }, '-=0.15');

    // 3D clock rises in
    tl.to(
      clockCol,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power4.out',
      },
      '-=0.25',
    );

    // CTAs fade up
    tl.to(
      ctaBlock,
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power3.out',
      },
      '-=0.2',
    );

    // Push-scroll parallax exit
    const heroContent = el.querySelector('[data-hero-content]') as HTMLElement | null;

    const pushTween = gsap.to(heroContent, {
      y: '-8vh',
      opacity: 0,
      scale: 0.95,
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onToggle: (self) => {
          if (heroContent) {
            heroContent.style.willChange = self.isActive
              ? 'transform, opacity'
              : 'auto';
          }
        },
      },
    });

    return () => {
      tl.kill();
      pushTween.kill();
      pushTween.scrollTrigger?.kill();
      gsap.set(allTargets, { opacity: 1, y: 0 });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 z-0 min-h-[100svh] overflow-hidden supports-[height:100dvh]:h-dvh"
      style={{ background: 'var(--hero-bg)' }}
      aria-label="Hero"
      data-concierge-section="hero"
      data-concierge-label="Hero"
    >
      {/* Atmospheric layers — comp-matched */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 92%, rgba(224,68,88,0.11) 0%, rgba(140,30,55,0.06) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Dual-gradient warm vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(180deg, rgba(22,9,16,0.7) 0%, transparent 22%, transparent 75%, rgba(22,9,16,0.65) 100%), radial-gradient(ellipse 75% 70% at 50% 50%, transparent 45%, rgba(22,9,16,0.4) 100%)`,
        }}
      />
      {/* Film noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '128px 128px',
        }}
      />

      <div data-hero-content className="relative z-10 flex h-full flex-col">
        {/* Main content area */}
        <div className="relative flex flex-1 items-center">
          {/* Typography wall + CTAs — vertically centered */}
          <div
            ref={typeColRef}
            className="absolute left-6 right-6 md:left-10 md:right-10 top-[42%] z-[3] -translate-y-1/2"
          >
            {WALL_LINES.map((words, lineIdx) => (
              <span
                key={lineIdx}
                className="hl-line block overflow-visible opacity-0"
                style={{ transform: 'translateY(30px)' }}
              >
                {words.map((word, wordIdx) => (
                  <span key={wordIdx}>
                    <span
                      className="hl-word inline-block cursor-default transition-[color,transform,text-shadow] duration-200"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: 'clamp(40px, 6.5vw, 96px)',
                        lineHeight: 0.92,
                        letterSpacing: '-0.015em',
                        textTransform: 'uppercase' as const,
                        color: 'var(--hero-cream)',
                        textShadow:
                          '0 2px 20px rgba(14,12,10,0.95), 0 6px 40px rgba(14,12,10,0.8), 0 0 80px rgba(224,68,88,0.04)',
                        ['--heat' as string]: '0',
                      }}
                    >
                      {word}
                    </span>
                    {wordIdx < words.length - 1 && (
                      <span
                        className="inline-block"
                        style={{ width: 'clamp(12px, 2vw, 28px)' }}
                      />
                    )}
                  </span>
                ))}
              </span>
            ))}

            {/* Status bar — tied to headline */}
            <div
              data-hero="status"
              className="mt-6 flex items-center gap-2.5 opacity-0"
              style={{ fontFamily: 'var(--font-ui)', transform: 'translateY(30px)' }}
            >
              <StatusDot status={clock.status} />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.2em]"
                style={{ color: 'var(--hero-stone)' }}
              >
                {clock.bkkTime
                  ? `Bangkok ${clock.bkkTime} · ${clock.statusText}`
                  : 'Bangkok · Available'}
              </span>
              <span
                className="hidden text-[10px] font-medium uppercase tracking-[0.2em] md:inline"
                style={{ color: 'var(--hero-stone)', opacity: 0.6 }}
              >
                · 15 yrs · Tombras, BarkleyOKRP, Digitas
              </span>
            </div>

            {/* CTAs — anchored below status */}
            <div
              data-hero="cta"
              className="mt-6 flex gap-4 opacity-0"
              style={{ transform: 'translateY(30px)' }}
            >
              <MagneticButton>
                <TransitionLink
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(245,240,230,0.12)] bg-transparent px-7 py-3.5 font-heading text-sm font-semibold transition-all duration-300 hover:border-[rgba(245,240,230,0.25)] hover:bg-[rgba(245,240,230,0.04)]"
                  style={{ color: 'var(--hero-cream)' }}
                >
                  See the Work
                </TransitionLink>
              </MagneticButton>
              <MagneticButton>
                <a
                  href={CAL_COM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-heading text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(224,68,88,0.25)] hover:scale-[1.02] active:scale-[0.98] active:duration-100"
                  style={{
                    background: 'var(--hero-magenta)',
                    color: 'var(--hero-cream)',
                  }}
                >
                  Book a Strategy Call
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* 3D Clock — bottom right */}
          <div
            data-hero="clock-col"
            className="absolute right-[clamp(20px,4vw,80px)] bottom-[clamp(40px,8vh,100px)] z-10 flex flex-col items-center opacity-0"
            style={{ transform: 'translateY(30px)' }}
          >
            {/* CSS glow behind clock (replaces bloom postprocessing) */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '80%',
                height: '70%',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(224,68,88,0.06) 0%, transparent 55%)',
                filter: 'blur(60px)',
              }}
            />

            {/* 3D scene or fallback */}
            {HERO_3D_ENABLED && heroVisible && gpu.canRender3D ? (
              <div
                className="relative z-[2]"
                style={{
                  width: 'min(52vw, 560px)',
                  height: 'min(44vh, 400px)',
                  filter: 'drop-shadow(0 8px 32px rgba(22,9,16,0.6))',
                }}
                aria-hidden="true"
              >
                <HeroClockScene bkkHour={clock.bkkHour} bkkMinute={clock.bkkMinute} />
              </div>
            ) : (
              <div
                className="relative z-[2] overflow-hidden rounded-2xl"
                style={{
                  width: 'min(36vw, 380px)',
                  height: 'min(30vh, 280px)',
                  background: 'rgba(14,12,10,0.55)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(245,240,230,0.06)',
                }}
                aria-hidden="true"
              >
                <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                  <div className="flex items-center gap-2">
                    {(showingBkk ? clock.bkkTime : clock.visitorTime)
                      ?.split(' ')[0]
                      ?.split('')
                      .map((char, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center justify-center tabular-nums"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(36px, 6vw, 72px)',
                            fontWeight: 800,
                            color: 'var(--hero-cream)',
                            ...(char !== ':'
                              ? {
                                  background: 'rgba(245,240,230,0.04)',
                                  borderRadius: '8px',
                                  padding: '4px 10px',
                                  border: '1px solid rgba(245,240,230,0.06)',
                                }
                              : { opacity: 0.4, padding: '0 2px' }),
                          }}
                        >
                          {char}
                        </span>
                      )) ?? null}
                    <span
                      className="ml-1 text-sm font-medium uppercase"
                      style={{
                        fontFamily: 'var(--font-ui)',
                        color: 'var(--hero-stone)',
                        opacity: 0.6,
                      }}
                    >
                      {(showingBkk ? clock.bkkTime : clock.visitorTime)
                        ?.split(' ')[1] ?? ''}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Dark shadow beneath clock */}
            <div
              className="pointer-events-none absolute bottom-[6%] left-1/2 -translate-x-1/2"
              style={{
                width: '65%',
                height: '16%',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(22,9,16,0.7) 0%, transparent 70%)',
                filter: 'blur(28px)',
              }}
            />

            {/* Accessible text alternative */}
            <span className="sr-only">
              Animated 3D flip clock showing Bangkok time: {clock.bkkTime}
            </span>

            {/* Clock base buttons (timezone toggle) */}
            <div
              className="relative z-[6] -mt-1 flex items-stretch overflow-hidden rounded-full border backdrop-blur-[16px]"
              style={{
                borderColor: 'rgba(245,240,230,0.06)',
                background: 'rgba(14,12,10,0.65)',
                fontFamily: 'var(--font-ui)',
              }}
            >
              <button
                onClick={() => setShowingBkk(true)}
                className="inline-flex min-h-11 items-center gap-2 border-none bg-transparent px-5 py-3 text-xs font-medium uppercase tracking-[0.07em] transition-all duration-300 hover:bg-[rgba(245,240,230,0.04)]"
                style={{
                  color: showingBkk ? 'var(--hero-cream)' : 'var(--hero-stone)',
                  background: showingBkk ? 'rgba(224,68,88,0.12)' : 'transparent',
                }}
                aria-pressed={showingBkk}
              >
                <span
                  className="inline-block size-1.5 rounded-full"
                  style={{ background: 'var(--hero-gold)' }}
                />
                Bangkok
                <span className="text-[11px] font-extralight tabular-nums opacity-55">
                  {clock.bkkTime || ''}
                </span>
              </button>

              <div className="w-px self-stretch" style={{ background: 'rgba(245,240,230,0.06)' }} />

              <span
                className="flex items-center px-2.5 text-[10px] font-extralight tracking-[0.12em]"
                style={{ color: 'var(--hero-cerulean)', fontFamily: 'var(--font-ui)' }}
              >
                {clock.visitorCity && !clock.isSameZone
                  ? `${clock.hourOffset >= 0 ? '+' : ''}${clock.hourOffset}h`
                  : ''}
              </span>

              <div className="w-px self-stretch" style={{ background: 'rgba(245,240,230,0.06)' }} />

              <button
                onClick={() => setShowingBkk(false)}
                className="inline-flex min-h-11 items-center gap-2 border-none bg-transparent px-5 py-3 text-xs font-medium uppercase tracking-[0.07em] transition-all duration-300 hover:bg-[rgba(245,240,230,0.04)]"
                style={{
                  color: !showingBkk ? 'var(--hero-cream)' : 'var(--hero-stone)',
                  background: !showingBkk ? 'rgba(30,144,207,0.12)' : 'transparent',
                }}
                aria-pressed={!showingBkk}
              >
                <span
                  className="inline-block size-1.5 rounded-full"
                  style={{ background: 'var(--hero-cerulean)' }}
                />
                {clock.isSameZone ? 'You' : (clock.visitorCity || 'Your City')}
                <span className="text-[11px] font-extralight tabular-nums opacity-55">
                  {clock.visitorTime || ''}
                </span>
              </button>
            </div>
          </div>

          {/* CTAs moved inline below headline */}
        </div>
      </div>
    </section>
  );
}
