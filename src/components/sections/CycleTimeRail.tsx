'use client';

import type { CycleStoryState } from '@/lib/getCycleStoryState';

export default function CycleTimeRail({
  storyState,
  visitorCity,
}: {
  storyState: CycleStoryState;
  visitorCity: string;
}) {
  const opacity = storyState.railOpacity;
  const railProgress = storyState.railProgress;
  const railEmphasis = storyState.railEmphasis;
  const activeMarkerIndex = storyState.markers.reduce((bestIndex, marker, index) => {
    return railProgress >= marker.position ? index : bestIndex;
  }, 0);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[60]"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="hidden md:block">
        <div className="absolute left-6 top-1/2 grid -translate-y-1/2 grid-cols-[9rem_2rem_8rem] items-center gap-4">
          <div className="flex min-w-[9rem] flex-col gap-3">
            <div
              className="rounded-[1.35rem] border px-3 py-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
              style={{
                borderColor: `rgba(255,255,255,${0.12 + railEmphasis * 0.08})`,
                background: `rgba(14,15,19,${0.72 + railEmphasis * 0.12})`,
              }}
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: `rgba(255,255,255,${0.5 + railEmphasis * 0.18})` }}
              >
                {visitorCity}
              </p>
              <p
                className="mt-2 font-heading text-[1.4rem] font-bold leading-none"
                style={{ color: `rgba(251,243,232,${0.86 + railEmphasis * 0.12})` }}
              >
                {storyState.visitorTimeLabel}
              </p>
            </div>

            <div
              className="rounded-[1.35rem] border px-3 py-2.5 backdrop-blur-xl"
              style={{
                borderColor: `rgba(255,255,255,${0.12 + railEmphasis * 0.08})`,
                background: `rgba(24,15,13,${0.74 + railEmphasis * 0.12})`,
                boxShadow: storyState.alarmPulse > 0.8
                  ? `0 20px 60px rgba(0,0,0,0.28), 0 0 ${12 + storyState.alarmPulse * 20}px rgba(222,180,46,${(storyState.alarmPulse - 0.8) * 1.5})`
                  : '0 20px 60px rgba(0,0,0,0.28)',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: `rgba(224,68,88,${0.66 + railEmphasis * 0.18})` }}
              >
                Bangkok
              </p>
              <p
                className="mt-2 font-heading text-[1.4rem] font-bold leading-none"
                style={{ color: `rgba(255,242,230,${0.9 + railEmphasis * 0.1})` }}
              >
                {storyState.bkkTimeLabel}
              </p>
            </div>
          </div>

          <div className="relative h-[21rem] w-[2.5rem]">
            <div
              className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-white/16 via-white/20 to-white/12"
              style={{ opacity: 0.55 + railEmphasis * 0.35 }}
            />
            <div
              className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-accent/10 via-accent/70 to-[#f2d48d]/65 shadow-[0_0_24px_rgba(224,68,88,0.35)]"
              style={{
                height: `${railProgress * 100}%`,
                opacity: 0.8 + railEmphasis * 0.2,
              }}
            />

            {storyState.markers.map((marker) => (
              <div
                key={marker.id}
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: `${marker.position * 100}%` }}
              >
                <span
                  className="relative block size-3 rounded-full border border-white/12 bg-[#101115]"
                  style={{
                    boxShadow:
                      railProgress >= marker.position
                        ? `0 0 0 4px rgba(224,68,88,${0.12 + railEmphasis * 0.08}), 0 0 ${20 + railEmphasis * 8}px rgba(224,68,88,${0.26 + railEmphasis * 0.12})`
                        : 'none',
                    background:
                      railProgress >= marker.position ? '#e04458' : '#101115',
                    borderColor:
                      railProgress >= marker.position
                        ? `rgba(255,255,255,${0.18 + railEmphasis * 0.08})`
                        : `rgba(255,255,255,${0.12 + railEmphasis * 0.06})`,
                  }}
                />
              </div>
            ))}

            <div
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${railProgress * 100}%` }}
            >
              <span
                className="block size-4 rounded-full border bg-[#f4e4c6]"
                style={{
                  borderColor: `rgba(255,232,197,${0.28 + railEmphasis * 0.16})`,
                  boxShadow: `0 0 0 6px rgba(255,232,197,${0.08 + railEmphasis * 0.06}), 0 0 ${28 + railEmphasis * 12}px rgba(255,232,197,${0.18 + railEmphasis * 0.12})`,
                }}
              />
            </div>
          </div>

          <div className="flex h-[21rem] flex-col justify-between py-1">
            {storyState.markers.map((marker, index) => (
              <div
                key={marker.id}
                className="flex"
                style={{
                  opacity:
                    index === activeMarkerIndex
                      ? 1
                      : railProgress >= marker.position
                        ? 0.72
                        : 0.42,
                  transform:
                    index === activeMarkerIndex ? 'translateX(0)' : 'translateX(0)',
                }}
              >
                <div
                  className="whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] backdrop-blur-md"
                  style={{
                    borderColor:
                      index === activeMarkerIndex
                        ? `rgba(224,68,88,${0.22 + railEmphasis * 0.08})`
                        : `rgba(255,255,255,${0.1 + railEmphasis * 0.06})`,
                    background:
                      index === activeMarkerIndex
                        ? `rgba(50,16,21,${0.72 + railEmphasis * 0.12})`
                        : `rgba(11,11,13,${0.34 + railEmphasis * 0.12})`,
                    color:
                      index === activeMarkerIndex
                        ? `rgba(255,234,226,${0.92 + railEmphasis * 0.08})`
                        : `rgba(255,255,255,${0.6 + railEmphasis * 0.16})`,
                    boxShadow:
                      index === activeMarkerIndex
                        ? `0 10px 28px rgba(0,0,0,${0.18 + railEmphasis * 0.08})`
                        : 'none',
                  }}
                >
                  {marker.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div
          className="absolute inset-x-4 top-4 rounded-[1.45rem] border px-3.5 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          style={{
            borderColor: `rgba(255,255,255,${0.12 + railEmphasis * 0.08})`,
            background: `rgba(14,15,19,${0.74 + railEmphasis * 0.14})`,
          }}
        >
          <div className="flex items-end justify-between gap-3">
            <div>
              <p
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: `rgba(255,255,255,${0.46 + railEmphasis * 0.18})` }}
              >
                {visitorCity}
              </p>
              <p
                className="mt-1 font-heading text-[1.1rem] font-bold"
                style={{ color: `rgba(247,239,227,${0.88 + railEmphasis * 0.1})` }}
              >
                {storyState.visitorTimeLabel}
              </p>
            </div>
            <div className="text-right">
              <p
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: `rgba(224,68,88,${0.66 + railEmphasis * 0.18})` }}
              >
                Bangkok
              </p>
              <p
                className="mt-1 font-heading text-[1.1rem] font-bold"
                style={{ color: `rgba(255,240,223,${0.9 + railEmphasis * 0.08})` }}
              >
                {storyState.bkkTimeLabel}
              </p>
            </div>
          </div>

          <div className="relative mt-4 h-10">
            <div
              className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-white/10 via-white/12 to-white/8"
              style={{ opacity: 0.58 + railEmphasis * 0.3 }}
            />
            <div
              className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-accent/10 via-accent/70 to-[#f2d48d]/65 shadow-[0_0_24px_rgba(224,68,88,0.35)]"
              style={{
                width: `${railProgress * 100}%`,
                opacity: 0.82 + railEmphasis * 0.18,
              }}
            />
            {storyState.markers.map((marker) => (
              <div
                key={marker.id}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${marker.position * 100}%` }}
              >
                <span
                  className="block size-2.5 rounded-full border border-white/12 bg-[#101115]"
                  style={{
                    background:
                      railProgress >= marker.position ? '#e04458' : '#101115',
                    borderColor:
                      railProgress >= marker.position
                        ? `rgba(255,255,255,${0.18 + railEmphasis * 0.08})`
                        : `rgba(255,255,255,${0.12 + railEmphasis * 0.06})`,
                  }}
                />
              </div>
            ))}
            <div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${railProgress * 100}%` }}
            >
                <span
                  className="block size-4 rounded-full border bg-[#f4e4c6]"
                  style={{
                    borderColor: `rgba(255,232,197,${0.32 + railEmphasis * 0.12})`,
                    boxShadow: `0 0 0 4px rgba(255,232,197,${0.1 + railEmphasis * 0.06}), 0 0 ${18 + railEmphasis * 8}px rgba(255,232,197,${0.14 + railEmphasis * 0.12})`,
                  }}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
