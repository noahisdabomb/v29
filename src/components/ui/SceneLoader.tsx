'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useScrollStore } from '@/stores/scrollStore';
import {
  getClockSequenceState,
  getLaptopSequenceState,
  getPhoneSequenceState,
} from '@/lib/cycleScreenState';
import {
  CYCLE_CLOCK,
  CYCLE_LAPTOP,
  LOG_ENTRIES,
} from '@/lib/content';
import type { CycleStoryState } from '@/lib/getCycleStoryState';
import { CLOCK_CANVAS, CYCLE_MOTION, PHASES } from '@/lib/constants';
import { drawClockFace } from '@/lib/drawClockFace';
import { clamp, ease } from '@/lib/easing';
import { getPhoneMotionTransform } from '@/lib/phoneMotion';
import type { EmailEntry } from '@/types';

export function SceneLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-12">
          <div className="absolute inset-0 animate-ping rounded-full border border-accent/20" />
          <div className="absolute inset-2 rounded-full border border-accent/40" />
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
          Loading
        </span>
      </div>
    </div>
  );
}

export function PhoneFallback({
  screenProgress,
  reducedMotion = false,
}: {
  screenProgress?: number;
  reducedMotion?: boolean;
}) {
  const phoneProgress = useScrollStore((state) => state.phoneProgress);
  const phoneMotion = getPhoneMotionTransform(phoneProgress, reducedMotion);
  const phoneState = getPhoneSequenceState(
    screenProgress ?? phoneProgress,
    LOG_ENTRIES.length,
    reducedMotion,
  );

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden px-6 md:px-8">
      <div className="relative" style={{ perspective: '1800px' }}>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,68,88,0.06)_0%,rgba(142,92,22,0.24)_34%,rgba(10,8,4,0)_72%)] blur-[90px]" />

        <div
          className="relative aspect-[9/19.2] w-[19.25rem] md:w-[22rem]"
          style={{
            transform: `translate3d(${phoneMotion.posX * 460}px, ${phoneMotion.posY * 260}px, 0) rotateY(${(phoneMotion.rotY * 180) / Math.PI}deg) rotateX(${(phoneMotion.rotX * 180) / Math.PI}deg) scale(${phoneMotion.scale / 1.12})`,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          <div className="absolute inset-x-[15%] bottom-[-3%] h-14 rounded-full bg-black/50 blur-[24px]" />

          <div className="absolute inset-0 rounded-[3.5rem] border border-white/10 bg-[#0b0c10] shadow-[0_34px_120px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="pointer-events-none absolute inset-[1px] rounded-[3.45rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_18%,rgba(0,0,0,0)_32%,rgba(0,0,0,0.22)_100%)]" />

            <div className="absolute left-[-0.18rem] top-[5.8rem] h-14 w-[0.18rem] rounded-l-full bg-white/12" />
            <div className="absolute left-[-0.14rem] top-[8.9rem] h-10 w-[0.14rem] rounded-l-full bg-white/10" />
            <div className="absolute right-[-0.14rem] top-[7.4rem] h-16 w-[0.14rem] rounded-r-full bg-white/12" />

            <div className="absolute left-1/2 top-[0.7rem] h-8 w-32 -translate-x-1/2 rounded-full border border-white/8 bg-[#111217]/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" />

            <div className="absolute inset-[0.42rem] overflow-hidden rounded-[3rem] border border-white/6 bg-[#05060a]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),rgba(255,255,255,0)_32%),linear-gradient(180deg,rgba(3,4,8,0.98),rgba(7,8,12,0.98))]" />

              <div
                className="relative z-10 flex items-center justify-between px-6 pt-8 font-mono text-[9px] uppercase tracking-[0.16em] text-white/42"
                style={{ opacity: phoneState.statusOpacity }}
              >
                <span>5:58 AM</span>
                <span>BKK &bull; GMT+7</span>
              </div>

              <div
                className="relative z-10 mt-5 px-6"
                style={{
                  opacity: phoneState.headerOpacity,
                  transform: `translateY(${phoneState.headerOffset}px)`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="relative flex size-2.5 shrink-0">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/75 opacity-70" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-accent/85">
                    Activity Log
                  </span>
                </div>
                <div className="mt-2.5 h-px w-full bg-white/7" />
                <div
                  className="mt-[-1px] h-0.5 bg-accent/80 shadow-[0_0_12px_rgba(224,68,88,0.35)]"
                  style={{ width: `${phoneState.headerRuleProgress * 100}%` }}
                />
              </div>

              <div className="absolute bottom-6 left-6 top-[9.95rem] w-px bg-white/6">
                <div
                  className="w-full bg-accent shadow-[0_0_12px_rgba(224,68,88,0.4)]"
                  style={{ height: `${phoneState.lineProgress * 100}%` }}
                />
              </div>

              <div className="relative z-10 flex flex-col px-7 pb-4 pt-6">
                {LOG_ENTRIES.map((entry, index) => {
                  const rowState = phoneState.entryStates[index];
                  const isActive = rowState === 'active';
                  const isPast = rowState === 'past';
                  const [lead, bold] = entry.bold
                    ? entry.text.split(entry.bold)
                    : [entry.text, ''];

                  return (
                    <div
                  key={`${entry.time}-${entry.text}`}
                  className={`rounded-[1.15rem] border p-3 ${
                    isActive
                      ? 'border-accent/25 bg-accent/[0.09] shadow-[0_0_24px_rgba(224,68,88,0.08)]'
                      : 'border-white/7 bg-white/[0.03]'
                  }`}
                  style={{
                    opacity: phoneState.entryOpacities[index],
                    transform: `translateX(${phoneState.entryXOffsets[index]}px) translateY(${phoneState.entryOffsets[index]}px) scale(${phoneState.rowScales[index]})`,
                    transformOrigin: 'center top',
                    boxShadow: isActive
                      ? `0 0 ${18 + phoneState.activePulse * 10}px rgba(224,68,88,${0.08 + phoneState.activePulse * 0.08})`
                      : undefined,
                  }}
                    >
                      <div className="grid grid-cols-[2.75rem_1fr] gap-2.5">
                        <div
                          className={`pt-0.5 font-mono text-[0.8rem] leading-none ${
                            isActive
                              ? 'text-accent'
                              : isPast
                                ? 'text-accent/55'
                                : 'text-accent/38'
                          }`}
                        >
                          {entry.time}
                        </div>

                        <div className="min-w-0">
                          <p
                            className={`text-[0.86rem] leading-[1.3] ${
                              isActive
                                ? 'text-white'
                                : isPast
                                  ? 'text-white/68'
                                  : 'text-white/46'
                            }`}
                          >
                            {lead}
                            {entry.bold ? (
                              <strong className={`${isActive ? 'text-white' : 'text-white/86'} font-semibold`}>
                                {entry.bold}
                              </strong>
                            ) : null}
                            {bold}
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
      </div>
    </div>
  );
}

export function ClockFallback({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  const clockProgress = useScrollStore((state) => state.clockProgress);
  const clockState = getClockSequenceState(clockProgress, reducedMotion);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stateKey = useMemo(
    () =>
      [
        clockState.displayProgress.toFixed(3),
        clockState.faceIn.toFixed(3),
        clockState.hold0659.toFixed(3),
        clockState.flipMinuteOnes.toFixed(3),
        clockState.flipMinuteTens.toFixed(3),
        clockState.flipHourOnes.toFixed(3),
        clockState.settle0700.toFixed(3),
        clockState.flashAmount.toFixed(3),
      ].join('|'),
    [clockState],
  );

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    drawClockFace(ctx, clockState);
  }, [clockState, stateKey]);

  return (
    <div className="flex h-full w-full items-center justify-center px-8">
      <div
        className="relative w-full max-w-[26rem] rounded-[2.2rem] border border-[#5e5328]/25 bg-[#181612] px-8 pb-10 pt-9 shadow-[0_34px_110px_rgba(0,0,0,0.35)]"
        style={{
          transform: reducedMotion
            ? 'none'
            : `translateY(${Math.sin(clockProgress * Math.PI * 8) * clockState.ringAmount * 4}px) rotate(${Math.sin(clockProgress * Math.PI * 10) * clockState.ringAmount * 1.8}deg)`,
        }}
      >
        <div className="absolute inset-0 rounded-[2.2rem] bg-[radial-gradient(circle_at_50%_20%,rgba(224,68,88,0.10),rgba(120,96,36,0.14)_38%,rgba(0,0,0,0)_78%)]" />
        <div className="relative rounded-[1.4rem] border border-white/6 bg-[#11100d] px-5 py-5">
          <div className="rounded-[1rem] border border-white/5 bg-black/60 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <p className="pb-3 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-accent/75">
              {CYCLE_CLOCK.lead}
            </p>
            <canvas
              ref={canvasRef}
              width={CLOCK_CANVAS.width}
              height={CLOCK_CANVAS.height}
              className="block h-auto w-full rounded-[0.9rem]"
            />
          </div>
          <p className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-white/46">
            Morning handoff
          </p>
        </div>
      </div>
    </div>
  );
}

function getLaptopSequenceProgress(cycleProgress: number) {
  return clamp(
    (cycleProgress - PHASES.laptop.in) /
      (PHASES.laptop.out - PHASES.laptop.in),
    0,
    1,
  );
}

function mixNumber(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function rgb(r: number, g: number, b: number) {
  return `rgb(${r}, ${g}, ${b})`;
}

export function LaptopFallback({
  emails,
  reducedMotion = false,
}: {
  emails: EmailEntry[];
  reducedMotion?: boolean;
}) {
  const cycleProgress = useScrollStore((state) => state.cycleProgress);
  const laptopProgress = reducedMotion ? 1 : getLaptopSequenceProgress(cycleProgress);
  const laptopState = getLaptopSequenceState(
    laptopProgress,
    emails.length,
    reducedMotion,
  );
  const lidOpen = reducedMotion
    ? 1
    : ease(clamp(laptopProgress / CYCLE_MOTION.laptop.openEnd, 0, 1));
  const screenTop = rgb(
    mixNumber(245, 224, laptopState.greenScreenAmount),
    mixNumber(241, 68, laptopState.greenScreenAmount),
    mixNumber(232, 88, laptopState.greenScreenAmount),
  );
  const screenBottom = rgb(
    mixNumber(232, 180, laptopState.greenScreenAmount),
    mixNumber(226, 60, laptopState.greenScreenAmount),
    mixNumber(216, 76, laptopState.greenScreenAmount),
  );

  return (
    <div className="flex h-full w-full items-center justify-center px-8">
      <div className="relative w-full max-w-[44rem]">
        <div
          className="pointer-events-none absolute left-1/2 top-[62%] h-12 w-[60%] -translate-x-1/2 rounded-full bg-black/30 blur-[32px]"
        />

        <div
          className="relative mx-auto h-[14rem] w-[32rem] origin-bottom"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateY(${(1 - lidOpen) * 16}px) rotateX(18deg)`,
          }}
        >
          <div className="absolute inset-x-0 bottom-0 h-[5.4rem] rounded-[1.5rem] border border-black/10 bg-[#8e8f94] shadow-[0_18px_60px_rgba(0,0,0,0.18)]" />

          <div
            className="absolute left-1/2 top-[3.7rem] h-8 w-[46%] -translate-x-1/2 rounded-full bg-[#fff0de]/65 blur-[22px]"
            style={{ opacity: laptopState.glowAmount * 0.7 + laptopState.greenScreenAmount * 0.24 }}
          />

          <div
            className="absolute bottom-[4.5rem] left-1/2 h-[9rem] w-[25.5rem] -translate-x-1/2 origin-bottom rounded-[1.25rem] border border-black/10 bg-[#0f1011]"
            style={{
              transform: `perspective(1000px) rotateX(${78 - lidOpen * 78}deg) scale(${1 + laptopState.pushIntoProgress * 0.018})`,
              boxShadow: '0 22px 50px rgba(0,0,0,0.18)',
            }}
          >
            <div
              className="absolute inset-[0.4rem] overflow-hidden rounded-[0.95rem] border border-white/6"
              style={{
                background: `linear-gradient(180deg, ${screenTop} 0%, ${screenBottom} 100%)`,
              }}
            >
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,214,220,0.18),rgba(224,68,88,0.24)_28%,rgba(0,0,0,0)_58%)]"
                style={{ opacity: Math.max(laptopState.glowAmount, laptopState.greenScreenAmount * 0.42) }}
              />

              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(255,214,220,0.14),rgba(0,0,0,0)_58%)]"
                style={{
                  opacity: 0.2 + laptopState.greenScreenAmount * 0.56,
                }}
              />

              <div
                className="absolute left-1/2 top-[14%] w-[76%] -translate-x-1/2 px-6 text-center"
                style={{
                  opacity: laptopState.campaignReadyOpacity,
                  transform: `translateX(-50%) translateY(${(1 - laptopState.campaignReadyOpacity) * 12}px)`,
                }}
              >
                <div className="mx-auto inline-flex rounded-full border border-[#5C1420]/12 bg-[#5C1420]/8 px-4 py-1.5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5C1420]/70">
                    {CYCLE_LAPTOP.popupEyebrow}
                  </p>
                </div>
                <p className="mt-4 font-heading text-[2.2rem] font-bold text-[#4A1018]">
                  {CYCLE_LAPTOP.popupTitle}
                </p>
                <p className="mt-2 text-sm text-[#5C1420]/65">
                  {CYCLE_LAPTOP.popupSubtitle}
                </p>
                <div className="mx-auto mt-4 h-px w-40 bg-[#5C1420]/18" />
              </div>

              <div
                className="absolute inset-x-[8%] top-[14%] space-y-2"
                style={{ opacity: laptopState.inboxOpacity }}
              >
                <div className="rounded-2xl border border-black/8 bg-white/65 px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/45">
                    {CYCLE_LAPTOP.inboxEyebrow}
                  </p>
                  <p className="mt-1 text-[1rem] font-semibold text-black/80">
                    {CYCLE_LAPTOP.inboxTitle}
                  </p>
                </div>

                {emails.slice(0, 3).map((email, index) => (
                  <div
                    key={`${email.subject}-${email.time}`}
                    className="rounded-2xl border border-black/8 px-4 py-3"
                    style={{
                      opacity: laptopState.emailOpacities[index] ?? 0,
                      transform: `translateY(${laptopState.emailOffsets[index] ?? 0}px) scale(${laptopState.rowScales[index] ?? 1})`,
                      background:
                        index === laptopState.activeIndex
                          ? 'rgba(252,230,234,0.94)'
                          : 'rgba(247,244,238,0.82)',
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-black/82">{email.subject}</p>
                        <p className="mt-1 text-xs text-black/56">{email.preview}</p>
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/42">
                        {email.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OvernightFallback({
  storyState,
  emails,
  reducedMotion = false,
}: {
  storyState: CycleStoryState;
  emails: EmailEntry[];
  reducedMotion?: boolean;
}) {
  const phoneScale = 0.82 + storyState.phoneFocus * 0.12;
  const clockScale = 0.84 + storyState.clockFocus * 0.14;
  const laptopScale = 0.82 + storyState.laptopFocus * 0.14;

  return (
    <div className="absolute inset-0 overflow-hidden" role="img" aria-label="Animated illustration of overnight work cycle: a phone activity log showing tasks being completed, a flip clock transitioning from 6:59 to 7:00 AM Bangkok time, and a laptop inbox with campaign deliverables ready for morning review.">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 20%, rgba(248,231,210,0.18) 0%, rgba(224,68,88,0.12) 28%, rgba(0,0,0,0) 62%)',
          opacity: 0.28 + storyState.dawnAmount * 0.4,
        }}
      />

      <div
        className="absolute left-[4%] top-[18%] h-[58%] w-[30%]"
        style={{
          opacity: 0.18 + storyState.phoneFocus * 0.82,
          transform: `translateY(${(1 - storyState.phoneFocus) * 12}px) scale(${phoneScale})`,
          transformOrigin: 'center center',
        }}
      >
        <PhoneFallback
          reducedMotion={reducedMotion}
          screenProgress={storyState.phoneScreenProgress}
        />
      </div>

      <div
        className="absolute left-1/2 top-[18%] h-[54%] w-[28%] -translate-x-1/2"
        style={{
          opacity: 0.2 + storyState.clockFocus * 0.8,
          transform: `scale(${clockScale})`,
          transformOrigin: 'center center',
        }}
      >
        <ClockFallback reducedMotion={reducedMotion} />
      </div>

      <div
        className="absolute right-[2%] top-[17%] h-[64%] w-[44%]"
        style={{
          opacity: 0.18 + storyState.laptopFocus * 0.82,
          transform: `translateY(${(1 - storyState.laptopFocus) * 10}px) scale(${laptopScale})`,
          transformOrigin: 'center center',
        }}
      >
        <LaptopFallback emails={emails} reducedMotion={reducedMotion} />
      </div>
    </div>
  );
}
