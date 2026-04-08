'use client';

import { useScrollStore } from '@/stores/scrollStore';
import { getPhoneSequenceState } from '@/lib/cycleScreenState';
import { LOG_ENTRIES } from '@/lib/content';
import { getPhoneMotionTransform } from '@/lib/phoneMotion';
import { PHONE_ROTATION } from '@/lib/constants';

function toDegrees(radians: number) {
  return (radians * 180) / Math.PI;
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getPhoneTransform(progress: number, reducedMotion: boolean) {
  const motion = getPhoneMotionTransform(progress, reducedMotion);
  const baseScale = PHONE_ROTATION.hold.scale;

  return {
    x: motion.posX * 460,
    y: motion.posY * 260,
    rotateY:
      motion.phase === 'entry'
        ? mix(-55, toDegrees(PHONE_ROTATION.hold.rotY), motion.phaseT)
        : motion.phase === 'exit'
          ? mix(toDegrees(PHONE_ROTATION.hold.rotY), 38, motion.phaseT)
          : toDegrees(motion.rotY),
    rotateX: toDegrees(motion.rotX),
    scale: motion.scale / baseScale,
  };
}

export default function PhoneStage({
  screenProgressOverride,
  reducedMotion = false,
}: {
  screenProgressOverride?: number;
  reducedMotion?: boolean;
}) {
  const phoneProgress = useScrollStore((s) => s.phoneProgress);
  const phoneState = getPhoneSequenceState(
    screenProgressOverride ?? phoneProgress,
    LOG_ENTRIES.length,
    reducedMotion,
  );
  const phoneTransform = getPhoneTransform(phoneProgress, reducedMotion);

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden px-6 md:px-8">
      <div className="relative" style={{ perspective: '1800px' }}>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,68,88,0.06)_0%,rgba(142,92,22,0.24)_34%,rgba(10,8,4,0)_72%)] blur-[90px]" />

        <div
          className="relative aspect-[9/19.2] w-[19.25rem] md:w-[22rem]"
          style={{
            transform: `translate3d(${phoneTransform.x}px, ${phoneTransform.y}px, 0) rotateY(${phoneTransform.rotateY}deg) rotateX(${phoneTransform.rotateX}deg) scale(${phoneTransform.scale})`,
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
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),rgba(255,255,255,0)_32%),radial-gradient(circle_at_50%_18%,rgba(224,68,88,0.06),rgba(224,68,88,0)_36%),linear-gradient(180deg,rgba(3,4,8,0.98),rgba(7,8,12,0.98))]" />

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

              <div className="absolute bottom-5 left-6 top-[9.15rem] w-px bg-white/6">
                <div
                  className="w-full bg-accent shadow-[0_0_12px_rgba(224,68,88,0.4)]"
                  style={{ height: `${phoneState.lineProgress * 100}%` }}
                />
              </div>

              <div className="relative z-10 grid h-[calc(100%-9rem)] grid-rows-5 gap-2 px-5 pb-5 pt-4">
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
                      className={`relative flex h-full min-h-0 items-center ${
                        isActive
                          ? 'rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(224,68,88,0.12),rgba(224,68,88,0.06))] px-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.16)]'
                          : 'rounded-[1rem] border border-white/[0.04] bg-white/[0.02] px-2'
                      }`}
                      style={{
                        opacity: phoneState.entryOpacities[index],
                        transform: `translateX(${phoneState.entryXOffsets[index]}px) translateY(${phoneState.entryOffsets[index]}px) scale(${phoneState.rowScales[index]})`,
                        transformOrigin: 'center center',
                        boxShadow: isActive
                          ? `0 14px 34px rgba(0,0,0,0.18), 0 0 ${18 + phoneState.activePulse * 12}px rgba(224,68,88,${0.08 + phoneState.activePulse * 0.08})`
                          : undefined,
                      }}
                    >
                      <div className="grid h-full w-full grid-cols-[2.35rem_1fr] gap-2.5">
                        <div
                          className={`pt-2 font-mono text-[0.72rem] leading-none ${
                            isActive
                              ? 'text-accent'
                              : isPast
                                ? 'text-accent/55'
                                : 'text-accent/38'
                          }`}
                        >
                          {entry.time}
                        </div>

                        <div className="flex min-w-0 flex-col justify-center py-2 pr-1">
                          <div className="mb-1.5 flex items-center justify-between gap-2">
                            <span
                              className={`h-[0.34rem] w-[0.34rem] rounded-full ${
                                isActive
                                  ? 'bg-accent shadow-[0_0_8px_rgba(224,68,88,0.35)]'
                                  : isPast
                                    ? 'bg-accent/55'
                                    : 'bg-white/22'
                              }`}
                            />
                            {isActive ? (
                              <span
                                className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-accent/85"
                              >
                                handoff ready
                              </span>
                            ) : null}
                          </div>
                          <p
                            className={`text-[0.79rem] leading-[1.18] ${
                              isActive
                                ? 'text-white'
                                : isPast
                                  ? 'text-white/68'
                                  : 'text-white/46'
                            }`}
                          >
                            {lead}
                            {entry.bold ? (
                              <strong className={`${isActive ? 'text-white' : 'text-white/84'} font-semibold`}>
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
