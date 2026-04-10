'use client';

import { useEffect, useMemo, useRef, useState, useCallback, type CSSProperties, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import CycleTimeRail from '@/components/sections/CycleTimeRail';
import { useScrollPhase } from '@/hooks/useScrollPhase';
import { useLiveClock } from '@/hooks/useLiveClock';
import { useGPUCapability } from '@/hooks/useGPUCapability';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { getCycleStoryState } from '@/lib/getCycleStoryState';
import { getLaptopSequenceState } from '@/lib/cycleScreenState';
import { ease, clamp } from '@/lib/easing';
import {
  BKK_TIME_SEQUENCE,
  CYCLE_MOTION,
  PHASE_ORDER,
  PHASES,
  PHONE_3D_APPROVED,
  SCROLL_TRIGGER_DEFAULTS,
  type PhaseName,
} from '@/lib/constants';
import {
  CYCLE_CLOCK,
  CYCLE_HANDOFF,
  CYCLE_LAPTOP,
  CYCLE_LOG_INTRO,
  CYCLE_STATEMENT,
  EMAIL_ENTRIES,
} from '@/lib/content';
import {
  DEFAULT_VISITOR_CITY,
  DEFAULT_VISITOR_TZ,
  buildBangkokDate,
  formatToSequenceEntry,
  getCycleVisitorCity,
  getCycleVisitorTimeZone,
  getVisitorTimeSequence,
  localizeEmailEntries,
} from '@/lib/viewerTime';
import { OvernightFallback } from '@/components/ui/SceneLoader';
import { useScrollStore, type PhaseTransform } from '@/stores/scrollStore';

const OvernightScene = dynamic(() => import('@/components/three/OvernightScene'), {
  ssr: false,
});

const CYCLE_DEBUG_STOPS = [
  { label: 'Shared Frame', progress: 0.24 },
  { label: 'Phone Hold', progress: 0.38 },
  { label: 'Phone To Clock', progress: 0.455 },
  { label: 'Clock Hold', progress: 0.56 },
  { label: 'Clock To Laptop', progress: 0.655 },
  { label: 'Laptop Hold', progress: 0.74 },
  { label: 'Screen Push', progress: 0.804 },
  { label: 'Red Finish', progress: 0.855 },
] as const;

function selectTransform(phase: PhaseName) {
  return (state: ReturnType<typeof useScrollStore.getState>) =>
    state[`${phase}Transform` as `${PhaseName}Transform`] as PhaseTransform;
}

function PhaseLayer({
  phase,
  children,
  className = '',
  reducedMotion = false,
}: {
  phase: PhaseName;
  children: ReactNode;
  className?: string;
  reducedMotion?: boolean;
}) {
  const transform = useScrollStore(selectTransform(phase));
  const is3DPhase =
    phase === 'phone' ||
    phase === 'clock' ||
    phase === 'laptop';

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        opacity: transform.opacity,
        transform:
          reducedMotion || is3DPhase
            ? 'none'
            : `translate3d(0, ${transform.yShift}px, 0) scale(${transform.scale})`,
        pointerEvents: transform.opacity > 0.01 ? 'auto' : 'none',
        willChange:
          reducedMotion || is3DPhase
            ? 'opacity'
            : transform.opacity > 0.01 && transform.opacity < 0.99
              ? 'opacity, transform'
              : 'auto',
      }}
    >
      {children}
    </div>
  );
}

/* ── Screen-reader phase labels for aria-live announcements ─── */
const PHASE_LABELS: Record<PhaseName, string> = {
  statement: 'The Cycle — Your team\'s asleep. The deadline isn\'t.',
  handoff: 'Overnight Handoff — End of your day. Beginning of mine.',
  coffee: 'Your brief is my morning coffee.',
  logIntro: 'While you slept, the work kept moving.',
  phone: 'Phone notifications arriving through the night.',
  clock: 'Vintage flip clock counting overnight hours.',
  laptop: 'Morning delivery — Campaign ready, files lined up.',
  workTransition: 'Selected Work — The work that got me here.',
};

function ActivePhaseAnnouncer() {
  const prevPhaseRef = useRef<PhaseName | null>(null);
  const [announcement, setAnnouncement] = useState('');

  const selectActivePhase = useCallback(
    (state: ReturnType<typeof useScrollStore.getState>) => {
      let best: PhaseName = PHASE_ORDER[0];
      let bestOpacity = 0;
      for (const phase of PHASE_ORDER) {
        const t = state[`${phase}Transform` as `${PhaseName}Transform`] as PhaseTransform;
        if (t.opacity > bestOpacity) {
          bestOpacity = t.opacity;
          best = phase;
        }
      }
      return bestOpacity > 0.3 ? best : null;
    },
    [],
  );

  const activePhase = useScrollStore(selectActivePhase);

  useEffect(() => {
    if (activePhase && activePhase !== prevPhaseRef.current) {
      prevPhaseRef.current = activePhase;
      setAnnouncement(PHASE_LABELS[activePhase]);
    }
  }, [activePhase]);

  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      {announcement}
    </div>
  );
}

const STAGGER_HIDDEN: CSSProperties = Object.freeze({ opacity: 0, transform: 'translateY(18px)' });
const STAGGER_VISIBLE: CSSProperties = Object.freeze({});

const CINEMATIC_HIDDEN: CSSProperties = Object.freeze({
  opacity: 0,
  transform: 'translateY(18px)',
  filter: 'blur(8px)',
});

const WORD_HIDDEN: CSSProperties = Object.freeze({
  opacity: 0,
  transform: 'translateY(12px)',
  filter: 'blur(8px)',
});
const WORD_VISIBLE: CSSProperties = Object.freeze({});

function staggerStyle(
  progress: number,
  delay: number,
  speed: number,
  reducedMotion: boolean,
): CSSProperties {
  if (reducedMotion) return STAGGER_VISIBLE;

  const t = ease(clamp((progress - delay) * speed, 0, 1));
  if (t <= 0) return STAGGER_HIDDEN;
  if (t >= 1) return STAGGER_VISIBLE;
  return {
    opacity: t,
    transform: `translate3d(0, ${(1 - t) * 18}px, 0)`,
    willChange: 'opacity, transform',
  };
}

function cinematicStaggerStyle(
  progress: number,
  delay: number,
  speed: number,
  reducedMotion: boolean,
): CSSProperties {
  if (reducedMotion) return STAGGER_VISIBLE;
  const t = ease(clamp((progress - delay) * speed, 0, 1));
  if (t <= 0) return CINEMATIC_HIDDEN;
  if (t >= 1) return STAGGER_VISIBLE;
  const blurPx = (1 - t) * 8;
  return {
    opacity: t,
    transform: `translate3d(0, ${(1 - t) * 18}px, 0)`,
    filter: `blur(${blurPx}px)`,
    willChange: 'opacity, transform, filter',
  };
}

function headlineEnvelopeStyle(
  progress: number,
  delay: number,
  speed: number,
  reducedMotion: boolean,
): CSSProperties {
  if (reducedMotion) return STAGGER_VISIBLE;
  const t = ease(clamp((progress - delay) * speed, 0, 1));
  if (t <= 0) return STAGGER_HIDDEN;
  if (t >= 1) return STAGGER_VISIBLE;
  return {
    opacity: t,
    transform: `translate3d(0, ${(1 - t) * 10}px, 0)`,
    willChange: 'opacity, transform',
  };
}

function springScale(t: number): number {
  if (t <= 0) return 0.3;
  if (t >= 1) return 1.0;
  const base = 0.3 + 0.7 * t;
  const overshoot = 2.5 * Math.exp(-6 * t) * Math.sin(2 * Math.PI * t * 1.2);
  return base + overshoot * 0.12;
}

function CinematicText({
  text,
  progress,
  baseDelay = 0.06,
  wordGap = 0.04,
  speed = 5.0,
  reducedMotion,
  className = '',
}: {
  text: string;
  progress: number;
  baseDelay?: number;
  wordGap?: number;
  speed?: number;
  reducedMotion: boolean;
  className?: string;
}) {
  const words = useMemo(() => text.split(/\s+/), [text]);

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => {
        const wordDelay = baseDelay + i * wordGap;
        const t = ease(clamp((progress - wordDelay) * speed, 0, 1));
        const blurPx = (1 - t) * 8;

        return (
          <span
            key={i}
            aria-hidden="true"
            style={
              t <= 0
                ? WORD_HIDDEN
                : t >= 1
                  ? WORD_VISIBLE
                  : {
                      opacity: t,
                      transform: `translateY(${(1 - t) * 12}px)`,
                      filter: `blur(${blurPx}px)`,
                      willChange: 'opacity, transform, filter',
                    }
            }
            className="inline-block"
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        );
      })}
    </span>
  );
}

function CinematicLetterbox({
  cycleProgress,
  reducedMotion,
}: {
  cycleProgress: number;
  reducedMotion: boolean;
}) {
  if (reducedMotion) return null;

  const presence = 1 - ease(clamp((cycleProgress - 0.28) / 0.10, 0, 1));
  const fadeIn = ease(clamp(cycleProgress / 0.02, 0, 1));
  const barOpacity = presence * fadeIn;

  if (barOpacity <= 0.001) return null;

  const barHeight = 10;

  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[5]"
        style={{
          height: `${barHeight}vh`,
          background: '#000',
          opacity: barOpacity,
          transform: `translateY(${(1 - barOpacity) * -100}%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5]"
        style={{
          height: `${barHeight}vh`,
          background: '#000',
          opacity: barOpacity,
          transform: `translateY(${(1 - barOpacity) * 100}%)`,
        }}
      />
    </>
  );
}

function CycleAtmosphere() {
  const cycleProgress = useScrollStore((state) => state.cycleProgress);

  // Quantize to 2 decimal places — reduces recalculations from ~60/sec to ~10/sec
  // with no visible difference (0.01 progress resolution is sub-pixel)
  const quantized = Math.round(cycleProgress * 100) / 100;

  const glowStyles = useMemo(() => {
    const amberStart = PHASES.handoff.in;
    const amberEnd = PHASES.clock.in;
    const morningStart = PHASES.clock.in + (PHASES.clock.out - PHASES.clock.in) * 0.5;
    const morningEnd = PHASES.laptop.in + (PHASES.laptop.out - PHASES.laptop.in) * 0.58;
    const resetStart =
      PHASES.workTransition.in + (PHASES.workTransition.out - PHASES.workTransition.in) * 0.75;
    const resetDuration = Math.max(PHASES.workTransition.out - resetStart, 0.001);

    const amber = ease(
      clamp((quantized - amberStart) / Math.max(amberEnd - amberStart, 0.001), 0, 1),
    );
    const morning = ease(
      clamp(
        (quantized - morningStart) / Math.max(morningEnd - morningStart, 0.001),
        0,
        1,
      ),
    );
    const reset = ease(clamp((quantized - resetStart) / resetDuration, 0, 1));

    return {
      topGlow: 0.18 + amber * 0.3 - reset * 0.18,
      leftGlow: 0.1 + amber * 0.16,
      morningGlow: morning * 0.55,
    };
  }, [quantized]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-[18%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          opacity: glowStyles.topGlow,
          background:
            'radial-gradient(circle, rgba(224,68,88,0.18) 0%, rgba(186,139,44,0.12) 32%, rgba(5,5,5,0) 72%)',
        }}
      />
      <div
        className="absolute left-[15%] top-[56%] h-[24rem] w-[24rem] rounded-full blur-[100px]"
        style={{
          opacity: glowStyles.leftGlow,
          background:
            'radial-gradient(circle, rgba(120,90,28,0.26) 0%, rgba(11,10,8,0) 72%)',
        }}
      />
      <div
        className="absolute right-[12%] top-[50%] h-[34rem] w-[34rem] rounded-full blur-[120px]"
        style={{
          opacity: glowStyles.morningGlow,
          background:
            'radial-gradient(circle, rgba(247,242,232,0.75) 0%, rgba(232,220,187,0.28) 38%, rgba(255,255,255,0) 74%)',
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{
          opacity: 0.6,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0))',
        }}
      />
    </div>
  );
}

function StatementContent({ reducedMotion }: { reducedMotion: boolean }) {
  const progress = useScrollStore((state) => state.statementProgress);

  return (
    <div className="relative flex h-full flex-col items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(224,68,88,0.08),rgba(224,68,88,0)_38%)]" />
      <span
        className="relative mb-7 font-mono text-xs uppercase tracking-[0.24em] text-accent"
        style={cinematicStaggerStyle(progress, 0, 6, reducedMotion)}
      >
        {CYCLE_STATEMENT.sectionLabel}
      </span>
      <h2
        className="relative max-w-4xl text-center font-heading text-[clamp(2.4rem,6vw,5.2rem)] font-bold italic leading-[0.96] text-text-primary text-balance"
        style={cinematicStaggerStyle(progress, 0.06, 4.4, reducedMotion)}
      >
        {CYCLE_STATEMENT.headline}
      </h2>
    </div>
  );
}

function HandoffContent({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const progress = useScrollStore((state) => state.handoffProgress);

  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <span
        className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-accent/72"
        style={cinematicStaggerStyle(progress, 0, 6, reducedMotion)}
      >
        {CYCLE_HANDOFF.sectionLabel}
      </span>
      <h3
        className="max-w-3xl text-center font-heading text-[clamp(2rem,5vw,4.1rem)] font-bold italic leading-[0.98] text-text-primary text-balance"
        style={cinematicStaggerStyle(progress, 0.05, 4.5, reducedMotion)}
      >
        {CYCLE_HANDOFF.headline}
      </h3>
    </div>
  );
}

function CoffeeContent({ reducedMotion }: { reducedMotion: boolean }) {
  const progress = useScrollStore((state) => state.coffeeProgress);

  return (
    <div className="flex h-full items-center justify-center px-6">
      <h3
        className="max-w-4xl text-center font-heading text-[clamp(2.4rem,6vw,5rem)] font-bold italic leading-[0.94] text-text-primary"
        style={headlineEnvelopeStyle(progress, 0.04, 3.0, reducedMotion)}
      >
        <CinematicText
          text="Your brief is my morning coffee."
          progress={progress}
          baseDelay={0.06}
          wordGap={0.04}
          speed={5.0}
          reducedMotion={reducedMotion}
        />
      </h3>
    </div>
  );
}

function LogIntroContent({ reducedMotion }: { reducedMotion: boolean }) {
  const progress = useScrollStore((state) => state.logIntroProgress);

  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      {CYCLE_LOG_INTRO.sectionLabel && (
        <div className="rounded-full border border-accent/18 bg-accent/[0.08] px-4 py-2">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent/82"
            style={cinematicStaggerStyle(progress, 0, 6, reducedMotion)}
          >
            {CYCLE_LOG_INTRO.sectionLabel}
          </span>
        </div>
      )}
      <h3
        className="mt-7 max-w-4xl text-center font-heading text-[clamp(2rem,5vw,4.2rem)] font-bold italic leading-[0.96] text-text-primary text-balance"
        style={headlineEnvelopeStyle(progress, 0.06, 4.0, reducedMotion)}
      >
        <CinematicText
          text={CYCLE_LOG_INTRO.headline}
          progress={progress}
          baseDelay={0.08}
          wordGap={0.035}
          speed={4.5}
          reducedMotion={reducedMotion}
        />
      </h3>
      {CYCLE_LOG_INTRO.subline && (
        <p
          className="mt-6 max-w-2xl text-center text-lg leading-relaxed text-text-secondary md:text-xl"
          style={cinematicStaggerStyle(progress, 0.2, 3.4, reducedMotion)}
        >
          {CYCLE_LOG_INTRO.subline}
        </p>
      )}
      <div
        className="mt-10 h-px w-full max-w-xl bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        style={cinematicStaggerStyle(progress, 0.28, 3.5, reducedMotion)}
      />
    </div>
  );
}

function PhoneContent({ reducedMotion }: { reducedMotion: boolean }) {
  const progress = useScrollStore((state) => state.phoneProgress);
  const yieldT = reducedMotion
    ? 0
    : ease(
        clamp(
          (progress - CYCLE_MOTION.phone.glowYieldStart) /
            (1 - CYCLE_MOTION.phone.glowYieldStart),
          0,
          1,
        ),
      );

  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-[48%] h-[50rem] w-[50rem] max-h-[88vh] max-w-[88vw] rounded-full bg-[radial-gradient(circle,rgba(224,68,88,0.12),rgba(155,108,30,0.18)_34%,rgba(10,9,7,0)_70%)] blur-[110px]"
          style={{
            opacity: 1 - yieldT * 0.4,
            transform: `translate(-50%, -50%) scale(${1 - yieldT * 0.035})`,
          }}
        />
      </div>
    </div>
  );
}

function ClockContent({ reducedMotion }: { reducedMotion: boolean }) {
  const progress = useScrollStore((state) => state.clockProgress);
  const receiveIn = reducedMotion
    ? 1
    : ease(clamp(progress / CYCLE_MOTION.clock.receiveInEnd, 0, 1));
  const pillIn = reducedMotion
    ? 1
    : ease(
        clamp(
          (progress - CYCLE_MOTION.clock.pillInStart) /
            (CYCLE_MOTION.clock.pillInEnd - CYCLE_MOTION.clock.pillInStart),
          0,
          1,
        ),
      );
  const yieldT = reducedMotion
    ? 0
    : ease(
        clamp(
          (progress - CYCLE_MOTION.clock.yieldStart) /
            (CYCLE_MOTION.clock.yieldEnd - CYCLE_MOTION.clock.yieldStart),
          0,
          1,
        ),
      );

  return (
    <div className="relative flex h-full flex-col items-center justify-center px-6">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-[48%] h-[46rem] w-[46rem] max-h-[82vh] max-w-[82vw] rounded-full bg-[radial-gradient(circle,rgba(240,233,210,0.4),rgba(224,68,88,0.12)_28%,rgba(15,11,6,0)_70%)] blur-[120px]"
          style={{
            opacity: (0.3 + receiveIn * 0.7) * (1 - yieldT * 0.4),
            transform: `translate(-50%, -50%) scale(${0.94 + receiveIn * 0.06 - yieldT * 0.03})`,
          }}
        />
      </div>
    </div>
  );
}

const SENDERS = ['Strategy', 'Production', 'Social Media', 'Project Ops'];
const AVATAR_COLORS = ['#E04458', '#c83a50', '#d44a5e', '#b33344'];

function LaptopViewportOverlay({
  emails,
  reducedMotion,
}: {
  emails: { subject: string; preview: string; time: string }[];
  reducedMotion: boolean;
}) {
  const laptopProgress = useScrollStore((state) => state.laptopProgress);
  const cycleProgress = useScrollStore((state) => state.cycleProgress);
  const effectiveProgress = cycleProgress >= PHASES.laptop.out ? 1.0 : laptopProgress;

  const seqState = getLaptopSequenceState(
    effectiveProgress,
    emails.length,
    reducedMotion,
  );
  const overlayOpacity = seqState.greenOverlayOpacity;

  // Hooks MUST be called before any early return (Rules of Hooks)
  const eyebrowText = CYCLE_LAPTOP.inboxEyebrow;
  const eyebrowLetters = useMemo(() => eyebrowText.split(''), [eyebrowText]);
  const titleText = CYCLE_LAPTOP.inboxTitle;
  const titleWords = useMemo(() => titleText.split(/\s+/), [titleText]);

  if (overlayOpacity <= 0.001) return null;

  const slamT = reducedMotion ? 1 : overlayOpacity;
  const slamScale = reducedMotion ? 1 : springScale(slamT);
  const slamBlur = reducedMotion ? 0 : (1 - slamT) * 12;

  // --- Cinematic timing ---
  // Per-email reveal with wider spacing (empty shell appears first)
  const emailTs = emails.map((_, i) => {
    const threshold = 0.35 + i * 0.14;
    return reducedMotion ? 1 : ease(clamp((overlayOpacity - threshold) / 0.18, 0, 1));
  });

  // Badge count-up: count of emails that have crossed 50% reveal
  const visibleCount = emailTs.filter(t => t >= 0.5).length;

  // Badge scale pulse: briefly enlarges when a new email crosses threshold
  const badgeRawT = visibleCount > 0
    ? emailTs[visibleCount - 1] ?? 1
    : 0;
  const badgePulse = reducedMotion ? 1 : 1 + 0.2 * Math.max(0, 1 - badgeRawT * 2);

  // Header timing — eyebrow types in first, title cascades after
  const headerT = reducedMotion ? 1 : clamp(overlayOpacity * 4, 0, 1);
  const titleT = reducedMotion ? 1 : clamp((overlayOpacity - 0.15) * 3, 0, 1);

  // Atmospheric glow intensity grows with each email
  const glowIntensity = 0.3 + visibleCount * 0.15;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9] flex items-center justify-center"
      style={{
        opacity: overlayOpacity,
        background: '#E04458',
      }}
      aria-hidden="true"
    >
      {/* Atmospheric glow bloom behind card */}
      <div
        className="absolute rounded-full"
        style={{
          width: '130%',
          height: '130%',
          opacity: reducedMotion ? 0 : glowIntensity,
          background: `radial-gradient(circle, rgba(255,200,180,${glowIntensity * 0.18}) 0%, rgba(224,68,88,${glowIntensity * 0.08}) 40%, transparent 65%)`,
          filter: 'blur(60px)',
          willChange: glowIntensity < 0.85 ? 'opacity' : 'auto',
        }}
      />

      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.5)]"
        style={{
          background: 'rgba(26,16,24,0.92)',
          backdropFilter: 'blur(24px)',
          transform: reducedMotion ? 'none' : `scale(${slamScale})`,
          filter: slamBlur > 0.01 ? `blur(${slamBlur}px)` : 'none',
          willChange: slamT > 0 && slamT < 1 ? 'transform, filter' : 'auto',
        }}
      >
        {/* Title bar */}
        <div className="flex items-center border-b border-white/8 px-4 py-3">
          <div className="flex gap-2">
            <span className="block size-3 rounded-full" style={{ background: '#ff5f57' }} />
            <span className="block size-3 rounded-full" style={{ background: '#febc2e' }} />
            <span className="block size-3 rounded-full" style={{ background: '#28c840' }} />
          </div>
          <span className="flex-1 text-center font-mono text-[11px] tracking-wide text-white/40">
            Mail
          </span>
          <div className="w-[52px]" />
        </div>

        {/* Body */}
        <div className="flex min-h-[360px]">
          {/* Sidebar */}
          <div className="hidden w-[120px] shrink-0 border-r border-white/6 px-3 py-4 sm:block">
            <div className="flex items-center justify-between rounded-md bg-white/6 px-2.5 py-1.5">
              <span className="text-[12px] font-semibold text-white">Inbox</span>
              <span
                className="flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{
                  background: '#E04458',
                  transform: `scale(${badgePulse})`,
                  boxShadow: visibleCount > 0
                    ? `0 0 ${6 + visibleCount * 3}px rgba(224,68,88,${0.3 + visibleCount * 0.1})`
                    : 'none',
                }}
              >
                {visibleCount}
              </span>
            </div>
            {['Sent', 'Drafts', 'Archive'].map((folder) => (
              <p key={folder} className="mt-2 px-2.5 text-[12px] text-white/30">
                {folder}
              </p>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 px-5 py-4">
            {/* Header — cinematic letter/word reveal */}
            <div className="mb-4 border-b border-white/8 pb-3">
              {/* Eyebrow — letter-by-letter stagger */}
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50" aria-label={eyebrowText}>
                {reducedMotion ? eyebrowText : eyebrowLetters.map((char, i) => {
                  const charT = clamp((headerT - i * 0.04) * 6, 0, 1);
                  return (
                    <span
                      key={i}
                      aria-hidden="true"
                      style={{ opacity: charT }}
                    >
                      {char}
                    </span>
                  );
                })}
              </p>
              {/* Title — word-by-word cascade with blur */}
              <p
                className="mt-1.5 font-heading text-lg font-bold leading-tight text-white/90"
                aria-label={titleText}
              >
                {reducedMotion ? titleText : titleWords.map((word, i) => {
                  const wordT = clamp((titleT - i * 0.08) * 4, 0, 1);
                  return (
                    <span
                      key={i}
                      aria-hidden="true"
                      className="inline-block"
                      style={{
                        opacity: wordT,
                        transform: wordT < 1 ? `translateY(${(1 - wordT) * 10}px)` : 'none',
                        filter: wordT < 1 ? `blur(${(1 - wordT) * 6}px)` : 'none',
                        marginRight: '0.3em',
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </p>
            </div>

            {/* Email list — cinematic stagger with notification pulse */}
            {emails.map((email, index) => {
              const emailT = emailTs[index] ?? 1;
              const isActive = index === emails.length - 1;
              const sender = SENDERS[index] ?? 'Team';
              const avatarColor = AVATAR_COLORS[index] ?? '#E04458';

              // Notification pulse: flashes during the row's entrance then fades
              const pulseOpacity = !reducedMotion && emailT > 0.05 && emailT < 0.92
                ? (1 - emailT) * 0.35
                : 0;

              return (
                <div
                  key={index}
                  className="relative rounded-lg py-3 px-3 -mx-3"
                  style={{
                    opacity: emailT,
                    transform: reducedMotion
                      ? 'none'
                      : `translateX(${(1 - emailT) * 60}px)`,
                    background: isActive && emailT > 0.8 ? 'rgba(255,255,255,0.06)' : 'transparent',
                    borderLeft: isActive && emailT > 0.8 ? '2px solid #E04458' : '2px solid transparent',
                  }}
                >
                  {/* Notification pulse glow */}
                  {pulseOpacity > 0.01 && (
                    <div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        opacity: pulseOpacity,
                        background: 'radial-gradient(ellipse at 20% 50%, rgba(224,68,88,0.3) 0%, transparent 70%)',
                      }}
                    />
                  )}

                  <div className="relative flex items-start gap-3">
                    {/* Avatar */}
                    <span
                      className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white/90"
                      style={{ background: avatarColor }}
                    >
                      {sender[0]}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[12px] font-medium text-white/60">
                          {sender}
                        </span>
                        <span className="shrink-0 font-mono text-[10px] text-white/40">
                          {email.time}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[13px] font-semibold leading-tight text-white">
                        {email.subject}
                      </p>
                      <p className="mt-0.5 truncate text-[12px] text-white/45">
                        {email.preview}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


function CycleDebugPanel({
  enabled,
  progress,
  setProgress,
  cameraShot,
}: {
  enabled: boolean;
  progress: number;
  setProgress: (value: number) => void;
  cameraShot: ReturnType<typeof getCycleStoryState>['cameraShot'];
}) {
  if (!enabled) return null;

  return (
    <div className="absolute right-4 top-20 z-[40] w-[min(24rem,calc(100vw-2rem))] rounded-2xl border border-white/12 bg-black/68 p-4 text-white shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/56">
            Cycle Debug
          </p>
          <p className="mt-1 text-sm text-white/88">{cameraShot}</p>
        </div>
        <p className="font-mono text-xs text-white/62">{progress.toFixed(3)}</p>
      </div>

      <input
        className="mt-4 w-full accent-[#e04458]"
        type="range"
        min={0}
        max={1}
        step={0.001}
        value={progress}
        onChange={(event) => setProgress(Number(event.currentTarget.value))}
      />

      <div className="mt-4 grid grid-cols-2 gap-2">
        {CYCLE_DEBUG_STOPS.map((stop) => {
          const active = Math.abs(progress - stop.progress) < 0.008;
          return (
            <button
              key={stop.label}
              type="button"
              onClick={() => setProgress(stop.progress)}
              className="rounded-full border px-3 py-2 text-left transition-colors"
              style={{
                borderColor: active ? 'rgba(224,68,88,0.45)' : 'rgba(255,255,255,0.09)',
                background: active ? 'rgba(224,68,88,0.14)' : 'rgba(255,255,255,0.04)',
              }}
            >
              <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-white/54">
                {stop.progress.toFixed(3)}
              </span>
              <span className="mt-1 block text-xs text-white/92">{stop.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CycleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cycleBgColor = useScrollStore((state) => state.cycleBgColor);
  const cycleProgress = useScrollStore((state) => state.cycleProgress);
  const setCycleProgress = useScrollStore((state) => state.setCycleProgress);
  const { canRender3D } = useGPUCapability();
  const reducedMotion = useReducedMotion();
  const { visitorCity, visitorTZ } = useLiveClock();
  const [reviewMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('review') === '1';
  });
  const [cycleDebugEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('cycleDebug') === '1' || params.get('review') === '1';
  });
  const [debugProgress, setDebugProgress] = useState<number>(() => {
    if (typeof window === 'undefined') return CYCLE_DEBUG_STOPS[0].progress;
    const params = new URLSearchParams(window.location.search);
    const requestedStop = params.get('debugStop');
    if (requestedStop) {
      const matchedStop = CYCLE_DEBUG_STOPS.find(
        (stop) => stop.label.toLowerCase().replace(/\s+/g, '-') === requestedStop,
      );
      if (matchedStop) return matchedStop.progress;
    }
    if (params.get('review') === '1') {
      return CYCLE_DEBUG_STOPS.find((stop) => stop.label === 'Phone Hold')?.progress
        ?? CYCLE_DEBUG_STOPS[0].progress;
    }
    return CYCLE_DEBUG_STOPS[0].progress;
  });

  useScrollPhase(sectionRef, { disabled: cycleDebugEnabled });

  useEffect(() => {
    if (!cycleDebugEnabled) return;
    setCycleProgress(debugProgress);
  }, [cycleDebugEnabled, debugProgress, setCycleProgress]);

  const safeVisitorTZ = getCycleVisitorTimeZone(visitorTZ || DEFAULT_VISITOR_TZ);
  const safeVisitorCity =
    visitorCity && visitorTZ && visitorTZ !== 'Asia/Bangkok'
      ? visitorCity
      : getCycleVisitorCity(visitorTZ || DEFAULT_VISITOR_TZ) || DEFAULT_VISITOR_CITY;
  const visitorTimeSequence = useMemo(() => {
    const base = getVisitorTimeSequence(BKK_TIME_SEQUENCE, safeVisitorTZ);
    // Compute visitor's local equivalent of BKK 7:00 AM (dynamic end time)
    const bkk7am = buildBangkokDate(7, 0);
    const visitorEnd = formatToSequenceEntry(bkk7am, safeVisitorTZ);
    return [...base, visitorEnd];
  }, [safeVisitorTZ]);
  const localizedEmails = useMemo(
    () => localizeEmailEntries(EMAIL_ENTRIES, safeVisitorTZ),
    [safeVisitorTZ],
  );
  const storyState = useMemo(
    () => getCycleStoryState(cycleProgress, visitorTimeSequence, reducedMotion),
    [cycleProgress, visitorTimeSequence, reducedMotion],
  );
  const shouldRender3D = canRender3D && PHONE_3D_APPROVED;
  const sceneOpacity = reviewMode ? 1 : storyState.sceneReveal;

  return (
    <section
      ref={sectionRef}
      data-cycle-section
      className="relative"
      id="timeline"
      aria-label="The 24-Hour Cycle"
      data-concierge-section="timeline"
      data-concierge-label="The 24-Hour Cycle"
      style={{
        height: reducedMotion
          ? '200vh'
          : `${SCROLL_TRIGGER_DEFAULTS.cycleScrollDistance * 100}vh`,
      }}
    >
      <div
        className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden"
        style={{ backgroundColor: cycleBgColor }}
      >
        <CycleAtmosphere />
        <CinematicLetterbox cycleProgress={cycleProgress ?? 0} reducedMotion={reducedMotion} />
        <ActivePhaseAnnouncer />
        <div style={{ opacity: clamp(1 - ((cycleProgress ?? 0) - 0.96) / 0.03, 0, 1) }}>
          <CycleTimeRail storyState={storyState} visitorCity={safeVisitorCity} />
        </div>
        <CycleDebugPanel
          enabled={cycleDebugEnabled}
          progress={debugProgress}
          setProgress={setDebugProgress}
          cameraShot={storyState.cameraShot}
        />

        <div
          className="absolute inset-0"
          style={{
            opacity: sceneOpacity,
            transform:
              reducedMotion || reviewMode
                ? 'none'
                : `translate3d(0, ${storyState.sceneVerticalShift * 25}%, 0) scale(${0.992 + storyState.sceneReveal * 0.008})`,
          }}
        >
          {shouldRender3D ? (
            <OvernightScene
              storyState={storyState}
              emails={localizedEmails}
              reducedMotion={reducedMotion}
            />
          ) : (
            <OvernightFallback
              storyState={storyState}
              emails={localizedEmails}
              reducedMotion={reducedMotion}
            />
          )}
        </div>

        <LaptopViewportOverlay
          emails={localizedEmails}
          reducedMotion={reducedMotion}
        />

        <PhaseLayer phase="statement" reducedMotion={reducedMotion}>
          <StatementContent reducedMotion={reducedMotion} />
        </PhaseLayer>

        <PhaseLayer phase="handoff" reducedMotion={reducedMotion}>
          <HandoffContent
            reducedMotion={reducedMotion}
          />
        </PhaseLayer>

        <PhaseLayer phase="coffee" reducedMotion={reducedMotion}>
          <CoffeeContent reducedMotion={reducedMotion} />
        </PhaseLayer>

        <PhaseLayer phase="logIntro" reducedMotion={reducedMotion}>
          <LogIntroContent reducedMotion={reducedMotion} />
        </PhaseLayer>

        <PhaseLayer phase="phone" reducedMotion={reducedMotion}>
          <PhoneContent reducedMotion={reducedMotion} />
        </PhaseLayer>

        <PhaseLayer phase="clock" reducedMotion={reducedMotion}>
          <ClockContent reducedMotion={reducedMotion} />
        </PhaseLayer>

        <PhaseLayer phase="laptop" reducedMotion={reducedMotion}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_54%,rgba(255,242,232,0.12),rgba(224,68,88,0.08)_26%,rgba(0,0,0,0)_58%)]" />
        </PhaseLayer>

        {/* Skip to Work affordance — appears after scrolling begins */}
        {cycleProgress > 0.04 && cycleProgress < 0.85 && (
          <a
            href="#work"
            className="absolute bottom-8 right-8 z-20 flex items-center gap-2 rounded-full border border-border-subtle bg-bg-deep/80 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-text-secondary backdrop-blur-sm transition-all duration-300 hover:border-accent hover:text-text-primary"
            style={{
              opacity: cycleProgress > 0.06 ? 1 : 0,
              transform: cycleProgress > 0.06 ? 'translateY(0)' : 'translateY(8px)',
            }}
          >
            Skip to Work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>
        )}
      </div>
    </section>
  );
}
