'use client';

import {
  CYCLE_MOTION,
  CYCLE_TIME_MARKERS,
  OVERNIGHT_BKK_TIME_SEQUENCE,
  PHASES,
  type PhaseName,
} from '@/lib/constants';
import { clamp, ease, lerp } from '@/lib/easing';
import type { TimeSequenceEntry } from '@/types';

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface CycleStoryState {
  cameraShot:
    | 'overview'
    | 'phoneApproach'
    | 'phoneHold'
    | 'phoneToClock'
    | 'clockHold'
    | 'clockToLaptop'
    | 'laptopHold'
    | 'screenPush'
    | 'redFinish'
    | 'work';
  activePhase: PhaseName;
  bkkTimeLabel: string;
  visitorTimeLabel: string;
  timelineProgress: number;
  railProgress: number;
  cameraProgress: number;
  environmentProgress: number;
  phoneProgress: number;
  phoneApproachProgress: number;
  phoneSettleProgress: number;
  phoneHoldProgress: number;
  phoneYieldProgress: number;
  phoneToClockProgress: number;
  phoneScreenProgress: number;
  clockProgress: number;
  clockHoldProgress: number;
  clockToLaptopProgress: number;
  laptopProgress: number;
  laptopHoldProgress: number;
  laptopApproachProgress: number;
  screenPushProgress: number;
  redTakeoverProgress: number;
  workTransitionProgress: number;
  alarmPulse: number;
  deliverablePulse: number;
  clockDisplayTimeLabel: string;
  clockFlipProgress: number;
  alarmComplete: boolean;
  railOpacity: number;
  railEmphasis: number;
  dawnAmount: number;
  coffeeFocus: number;
  phoneFocus: number;
  clockFocus: number;
  laptopFocus: number;
  workFocus: number;
  sceneReveal: number;
  /** 0 = centered, 1 = anchored to bottom of frame */
  sceneVerticalShift: number;
  cameraPosition: Vec3;
  cameraTarget: Vec3;
  markers: typeof CYCLE_TIME_MARKERS;
}

// OVERNIGHT_VISITOR_END removed — visitor end time is now computed
// dynamically from the visitor's timezone in CycleSection

const CLOCK_OVERNIGHT_SEQUENCE: readonly TimeSequenceEntry[] = [
  { h: 5, m: 14, ampm: 'PM' },
  { h: 6, m: 22, ampm: 'PM' },
  { h: 7, m: 10, ampm: 'PM' },
  { h: 7, m: 43, ampm: 'PM' },
  { h: 7, m: 59, ampm: 'PM' },
] as const;

const CAMERA_POSES: Record<
  'overview' | 'handoff' | 'phoneApproach' | 'phone' | 'clock' | 'laptop' | 'laptopPush' | 'redFinish' | 'work',
  { position: Vec3; target: Vec3 }
> = {
  overview: {
    position: { x: 0, y: 1.48, z: 8.6 },
    target: { x: 0, y: 0.72, z: 0 },
  },
  handoff: {
    position: { x: 0, y: 1.32, z: 7.7 },
    target: { x: 0, y: 0.78, z: 0 },
  },
  phoneApproach: {
    position: { x: -1.08, y: 0.72, z: 1.86 },
    target: { x: -0.88, y: -0.18, z: 0.24 },
  },
  phone: {
    position: { x: -0.86, y: 0.66, z: 1.56 },
    target: { x: -0.78, y: -0.14, z: 0.20 },
  },
  clock: {
    position: { x: 0.14, y: 0.52, z: 2.16 },
    target: { x: 0.05, y: 0.16, z: -0.26 },
  },
  laptop: {
    position: { x: 1.72, y: 0.76, z: 2.72 },
    target: { x: 1.52, y: 0.48, z: -0.48 },
  },
  laptopPush: {
    position: { x: 1.34, y: 0.70, z: 0.02 },
    target: { x: 1.32, y: 0.70, z: -0.52 },
  },
  redFinish: {
    position: { x: 1.30, y: 0.70, z: -0.50 },
    target: { x: 1.28, y: 0.70, z: -0.70 },
  },
  work: {
    position: { x: 1.96, y: 0.86, z: 4.62 },
    target: { x: 1.66, y: 0.66, z: -0.38 },
  },
};

function toMinutes(entry: TimeSequenceEntry): number {
  let hour = entry.h;
  if (entry.ampm === 'PM' && hour !== 12) hour += 12;
  if (entry.ampm === 'AM' && hour === 12) hour = 0;
  return hour * 60 + entry.m;
}

/** toMinutes that adds 24h to entries past midnight so overnight sequences stay monotonic */
function toOvernightMinutes(entry: TimeSequenceEntry, firstEntry: TimeSequenceEntry): number {
  const mins = toMinutes(entry);
  const firstMins = toMinutes(firstEntry);
  return mins < firstMins ? mins + 1440 : mins;
}

function interpolateTime(
  sequence: readonly TimeSequenceEntry[],
  progress: number,
): TimeSequenceEntry {
  if (sequence.length === 0) {
    return { h: 12, m: 0, ampm: 'AM' };
  }

  const t = clamp(progress, 0, 1);
  const position = t * (sequence.length - 1);
  const low = Math.floor(position);
  const high = Math.min(low + 1, sequence.length - 1);
  const fraction = position - low;
  const minsLow = toOvernightMinutes(sequence[low], sequence[0]);
  const minsHigh = toOvernightMinutes(sequence[high], sequence[0]);
  const totalMinutes = minsLow + (minsHigh - minsLow) * fraction;
  const rounded = ((Math.round(totalMinutes) % 1440) + 1440) % 1440;
  const hour24 = Math.floor(rounded / 60) % 24;
  const minute = rounded % 60;
  const ampm: 'AM' | 'PM' = hour24 >= 12 ? 'PM' : 'AM';
  let hour = hour24 % 12;
  if (hour === 0) hour = 12;

  return { h: hour, m: minute, ampm };
}

function formatTime(entry: TimeSequenceEntry) {
  return `${entry.h}:${String(entry.m).padStart(2, '0')} ${entry.ampm}`;
}

function mixVec3(a: Vec3, b: Vec3, t: number): Vec3 {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    z: lerp(a.z, b.z, t),
  };
}

function arcMixVec3(
  a: Vec3,
  b: Vec3,
  t: number,
  arc: Partial<Vec3> = {},
): Vec3 {
  const base = mixVec3(a, b, t);
  const curve = Math.sin(Math.PI * clamp(t, 0, 1));
  return {
    x: base.x + (arc.x ?? 0) * curve,
    y: base.y + (arc.y ?? 0) * curve,
    z: base.z + (arc.z ?? 0) * curve,
  };
}

function mixCameraPose(
  from: { position: Vec3; target: Vec3 },
  to: { position: Vec3; target: Vec3 },
  t: number,
  arcs?: {
    position?: Partial<Vec3>;
    target?: Partial<Vec3>;
  },
) {
  return {
    position: arcMixVec3(from.position, to.position, t, arcs?.position),
    target: arcMixVec3(from.target, to.target, t, arcs?.target),
  };
}

function focusForPhase(
  progress: number,
  rangeIn: number,
  introEnd: number,
  outroStart: number,
  rangeOut: number,
) {
  const fadeIn = ease(clamp((progress - rangeIn) / Math.max(introEnd - rangeIn, 0.001), 0, 1));
  const fadeOut = 1 - ease(clamp((progress - outroStart) / Math.max(rangeOut - outroStart, 0.001), 0, 1));
  return clamp(Math.min(fadeIn, fadeOut), 0, 1);
}

function getActivePhase(progress: number): PhaseName {
  const phases = Object.entries(PHASES) as [PhaseName, (typeof PHASES)[PhaseName]][];
  for (const [phase, range] of phases) {
    if (progress >= range.in && progress <= range.out) {
      return phase;
    }
  }
  return 'statement';
}

/**
 * Overrides linear timelineProgress to sync with phone log entries,
 * accelerate through the clock phase, and pin at 7:00 AM for laptop/work.
 *
 * Phone entries map to OVERNIGHT_BKK_TIME_SEQUENCE indices 1-5 (of 7 total).
 * Clock accelerates from 5/6 → 1.0 (5:58 AM → 7:00 AM).
 * Laptop and work phases hold at 1.0 (7:00 AM).
 */
function syncTimeline(
  baseTimeline: number,
  storyProgress: number,
): number {
  const SEQ_LEN = OVERNIGHT_BKK_TIME_SEQUENCE.length; // 7

  // --- Laptop & work phases: pin at 7:00 AM ---
  if (storyProgress >= PHASES.laptop.in) {
    return 1.0;
  }

  // --- Clock phase: accelerate 5:58 AM → 7:00 AM ---
  if (storyProgress >= PHASES.clock.in) {
    const clockLocal = clamp(
      (storyProgress - PHASES.clock.in) / Math.max(PHASES.clock.out - PHASES.clock.in, 0.001),
      0, 1,
    );
    // Start from where phone ended (5/6 ≈ 5:58 AM) and ramp to 1.0 (7:00 AM)
    const from = 5 / (SEQ_LEN - 1);
    return lerp(from, 1.0, ease(clockLocal));
  }

  // --- Phone phase: snap to active log entry timestamps ---
  if (storyProgress >= PHASES.phone.in && storyProgress <= PHASES.phone.out) {
    const phoneLocal = clamp(
      (storyProgress - PHASES.phone.in) / Math.max(PHASES.phone.out - PHASES.phone.in, 0.001),
      0, 1,
    );
    const revealStart = CYCLE_MOTION.phone.contentRevealStart;
    const revealEnd = CYCLE_MOTION.phone.contentRevealEnd;
    const entryCount = 5;

    // Determine which entry is active
    let activeIndex = -1;
    for (let i = 0; i < entryCount; i++) {
      const rowStart = revealStart + (i / entryCount) * (revealEnd - revealStart);
      const rowProgress = clamp((phoneLocal - rowStart) / 0.065, 0, 1);
      if (rowProgress >= 0.9) activeIndex = i;
    }

    if (activeIndex >= 0) {
      // LOG_ENTRIES[i] maps to OVERNIGHT_BKK_TIME_SEQUENCE index (i + 1)
      const target = (activeIndex + 1) / (SEQ_LEN - 1);
      const blend = ease(clamp((phoneLocal - revealStart) / (revealEnd - revealStart), 0, 1));
      return lerp(baseTimeline, target, blend * 0.88);
    }
  }

  return baseTimeline;
}

function syncRailProgress(storyProgress: number): number {
  const [work, alarm, delivered] = CYCLE_TIME_MARKERS;

  // Before logIntro ends: rail at 0
  if (storyProgress <= PHASES.logIntro.out) {
    return 0;
  }

  // LogIntro.out -> phone.out: 0 to work marker (phone activity = overnight work)
  if (storyProgress < PHASES.phone.out) {
    return lerp(
      0,
      work.position,
      ease(
        clamp(
          (storyProgress - PHASES.logIntro.out) /
            Math.max(PHASES.phone.out - PHASES.logIntro.out, 0.001),
          0,
          1,
        ),
      ),
    );
  }

  // Phone.out -> clock.holdEnd: work to alarm marker (clock scene = alarm)
  if (storyProgress < PHASES.clock.holdEnd) {
    return lerp(
      work.position,
      alarm.position,
      ease(
        clamp(
          (storyProgress - PHASES.phone.out) /
            Math.max(PHASES.clock.holdEnd - PHASES.phone.out, 0.001),
          0,
          1,
        ),
      ),
    );
  }

  // Clock.holdEnd -> laptop.holdEnd: alarm to delivered marker (laptop emails)
  if (storyProgress < PHASES.laptop.holdEnd) {
    return lerp(
      alarm.position,
      delivered.position,
      ease(
        clamp(
          (storyProgress - PHASES.clock.holdEnd) /
            Math.max(PHASES.laptop.holdEnd - PHASES.clock.holdEnd, 0.001),
          0,
          1,
        ),
      ),
    );
  }

  // Laptop.holdEnd -> workTransition.in: delivered to 1.0
  if (storyProgress < PHASES.workTransition.in) {
    return lerp(
      delivered.position,
      1.0,
      ease(
        clamp(
          (storyProgress - PHASES.laptop.holdEnd) /
            Math.max(PHASES.workTransition.in - PHASES.laptop.holdEnd, 0.001),
          0,
          1,
        ),
      ),
    );
  }

  return 1.0;
}

function getRailPresence(storyProgress: number): number {
  // Rail invisible until logIntro finishes (after all headline copy)
  if (storyProgress < PHASES.logIntro.out) {
    return 0;
  }

  // Ramp from 0 to 0.94 during phone intro
  if (storyProgress < PHASES.phone.introEnd) {
    return lerp(
      0,
      0.94,
      ease(
        clamp(
          (storyProgress - PHASES.logIntro.out) /
            Math.max(PHASES.phone.introEnd - PHASES.logIntro.out, 0.001),
          0,
          1,
        ),
      ),
    );
  }

  // Hold at 0.94 through laptop (including full-screen inbox push)
  if (storyProgress < PHASES.workTransition.in) {
    return 0.94;
  }

  // Fade to 0 during workTransition
  return lerp(
    0.94,
    0,
    ease(
      clamp(
        (storyProgress - PHASES.workTransition.in) /
          Math.max(PHASES.workTransition.out - PHASES.workTransition.in, 0.001),
        0,
        1,
      ),
    ),
  );
}

export function getCycleStoryState(
  cycleProgress: number,
  visitorTimeSequence: readonly TimeSequenceEntry[],
  reducedMotion = false,
): CycleStoryState {
  const storyProgress = clamp(cycleProgress, 0, 1);
  const activePhase = getActivePhase(storyProgress);
  const timelineProgress = clamp(
    (storyProgress - PHASES.handoff.in) /
      Math.max(PHASES.workTransition.out - PHASES.handoff.in, 0.001),
    0,
    1,
  );
  const syncedTimeline = syncTimeline(timelineProgress, storyProgress);
  const railProgress = syncRailProgress(storyProgress);
  const bkkTimeLabel = formatTime(interpolateTime(OVERNIGHT_BKK_TIME_SEQUENCE, syncedTimeline));
  const visitorTimeLabel = formatTime(
    interpolateTime(visitorTimeSequence, syncedTimeline),
  );

  const coffeeFocus = focusForPhase(
    storyProgress,
    PHASES.coffee.in,
    PHASES.coffee.introEnd,
    PHASES.coffee.outroStart,
    PHASES.coffee.out,
  );
  const phoneFocus = focusForPhase(
    storyProgress,
    PHASES.phone.in,
    PHASES.phone.introEnd,
    PHASES.phone.outroStart,
    PHASES.phone.out,
  );
  const clockFocus = focusForPhase(
    storyProgress,
    PHASES.clock.in,
    PHASES.clock.introEnd,
    PHASES.clock.outroStart,
    PHASES.clock.out,
  );
  const laptopFocus = focusForPhase(
    storyProgress,
    PHASES.laptop.in,
    PHASES.laptop.introEnd,
    PHASES.laptop.outroStart,
    PHASES.laptop.out,
  );
  const workFocus = focusForPhase(
    storyProgress,
    PHASES.workTransition.in,
    PHASES.workTransition.introEnd,
    PHASES.workTransition.outroStart,
    PHASES.workTransition.out,
  );
  const phoneProgress = clamp(
    (storyProgress - PHASES.phone.in) / Math.max(PHASES.phone.out - PHASES.phone.in, 0.001),
    0,
    1,
  );
  const phoneApproachProgress = ease(clamp(phoneProgress / 0.4, 0, 1));
  const phoneSettleProgress = ease(clamp((phoneProgress - 0.1) / 0.38, 0, 1));
  const phoneHoldProgress =
    ease(clamp((phoneProgress - 0.24) / 0.34, 0, 1)) *
    (1 - ease(clamp((phoneProgress - 0.78) / 0.16, 0, 1)));
  const phoneYieldProgress = ease(clamp((phoneProgress - 0.78) / 0.22, 0, 1));
  const phoneScreenProgress = reducedMotion
    ? 1
    : clamp((phoneProgress - 0.05) / 0.72, 0, 1);
  const phoneToClockProgress = ease(
    clamp(
      (storyProgress - PHASES.phone.outroStart) /
        Math.max(PHASES.clock.introEnd - PHASES.phone.outroStart, 0.001),
      0,
      1,
    ),
  );
  const clockProgress = clamp(
    (storyProgress - PHASES.clock.in) / Math.max(PHASES.clock.out - PHASES.clock.in, 0.001),
    0,
    1,
  );
  const clockHoldProgress =
    ease(
      clamp(
        (storyProgress - PHASES.clock.introEnd) /
          Math.max(PHASES.clock.outroStart - PHASES.clock.introEnd, 0.001),
        0,
        1,
      ),
    ) *
    (1 -
      ease(
        clamp(
          (storyProgress - PHASES.clock.outroStart) /
            Math.max(PHASES.clock.out - PHASES.clock.outroStart, 0.001),
          0,
          1,
        ),
      ));
  const clockToLaptopProgress = ease(
    clamp(
      (storyProgress - PHASES.clock.outroStart) /
        Math.max(PHASES.laptop.introEnd - PHASES.clock.outroStart, 0.001),
      0,
      1,
    ),
  );
  const laptopProgress = clamp(
    (storyProgress - PHASES.laptop.in) / Math.max(PHASES.laptop.out - PHASES.laptop.in, 0.001),
    0,
    1,
  );
  const laptopApproachProgress = ease(
    clamp(
      laptopProgress / Math.max(CYCLE_MOTION.laptop.openEnd, 0.001),
      0,
      1,
    ),
  );
  const laptopHoldProgress =
    ease(
      clamp(
        (storyProgress - PHASES.laptop.introEnd) /
          Math.max(PHASES.laptop.outroStart - PHASES.laptop.introEnd, 0.001),
        0,
        1,
      ),
    ) *
    (1 -
      ease(
        clamp(
          (storyProgress - PHASES.laptop.outroStart) /
            Math.max(PHASES.laptop.out - PHASES.laptop.outroStart, 0.001),
          0,
          1,
        ),
      ));
  const screenPushProgress = ease(
    clamp(
      (laptopProgress - CYCLE_MOTION.laptop.screenPushStart) /
        Math.max(
          CYCLE_MOTION.laptop.screenPushEnd - CYCLE_MOTION.laptop.screenPushStart,
          0.001,
        ),
      0,
      1,
    ),
  );
  const laptopRevealStart = Math.max(
    CYCLE_MOTION.laptop.redTakeoverStart,
    CYCLE_MOTION.laptop.screenPushEnd,
  );
  const redTakeoverProgress = ease(
    clamp(
      (laptopProgress - laptopRevealStart) /
        Math.max(
          CYCLE_MOTION.laptop.redTakeoverEnd - laptopRevealStart,
          0.001,
        ),
      0,
      1,
    ),
  );

  let cameraPose = CAMERA_POSES.overview;
  let cameraShot: CycleStoryState['cameraShot'] = 'overview';
  if (storyProgress < PHASES.handoff.out) {
    const t = ease(
      clamp(
        (storyProgress - PHASES.statement.in) /
          Math.max(PHASES.handoff.out - PHASES.statement.in, 0.001),
        0,
        1,
      ),
    );
    cameraPose = {
      position: mixVec3(CAMERA_POSES.overview.position, CAMERA_POSES.handoff.position, t),
      target: mixVec3(CAMERA_POSES.overview.target, CAMERA_POSES.handoff.target, t),
    };
    cameraShot = 'overview';
  } else if (storyProgress < PHASES.phone.introEnd) {
    const t = ease(
      clamp(
        (storyProgress - PHASES.logIntro.outroStart) /
          Math.max(PHASES.phone.introEnd - PHASES.logIntro.outroStart, 0.001),
        0,
        1,
      ),
    );
    cameraPose = mixCameraPose(CAMERA_POSES.handoff, CAMERA_POSES.phoneApproach, t, {
      position: { x: -0.42, y: 0.24, z: 0.76 },
      target: { x: -0.14, y: 0.06, z: 0.14 },
    });
    cameraShot = 'phoneApproach';
  } else if (storyProgress < PHASES.phone.outroStart) {
    const t = ease(
      clamp(
        (storyProgress - PHASES.phone.introEnd) /
          Math.max(PHASES.phone.outroStart - PHASES.phone.introEnd, 0.001),
        0,
        1,
      ),
    );
    cameraPose = mixCameraPose(CAMERA_POSES.phoneApproach, CAMERA_POSES.phone, t, {
      position: { x: -0.14, y: 0.10, z: 0.24 },
      target: { x: -0.06, y: 0.05, z: 0.02 },
    });
    cameraShot = 'phoneHold';
  } else if (storyProgress < PHASES.clock.introEnd) {
    cameraPose = mixCameraPose(CAMERA_POSES.phone, CAMERA_POSES.clock, phoneToClockProgress, {
      position: { x: 0.22, y: 0.08, z: 0.9 },
      target: { x: -0.02, y: 0.03, z: 0.1 },
    });
    cameraShot = 'phoneToClock';
  } else if (storyProgress < PHASES.clock.out) {
    cameraPose = CAMERA_POSES.clock;
    cameraShot = 'clockHold';
  } else if (storyProgress < PHASES.laptop.introEnd) {
    cameraPose = mixCameraPose(CAMERA_POSES.clock, CAMERA_POSES.laptop, clockToLaptopProgress, {
      position: { x: 0.4, y: 0.12, z: 0.6 },
      target: { x: 0.16, y: 0.05, z: 0.08 },
    });
    cameraShot = 'clockToLaptop';
  } else if (storyProgress < PHASES.laptop.out) {
    const pushStart = CYCLE_MOTION.laptop.screenPushStart;
    if (laptopProgress < pushStart) {
      cameraPose = CAMERA_POSES.laptop;
      cameraShot = 'laptopHold';
    } else {
      const unifiedT = ease(clamp(
        (laptopProgress - pushStart) / (1.0 - pushStart),
        0, 1,
      ));
      if (unifiedT <= 0.5) {
        const segT = unifiedT * 2;
        cameraPose = {
          position: mixVec3(CAMERA_POSES.laptop.position, CAMERA_POSES.laptopPush.position, segT),
          target: mixVec3(CAMERA_POSES.laptop.target, CAMERA_POSES.laptopPush.target, segT),
        };
      } else {
        const segT = (unifiedT - 0.5) * 2;
        cameraPose = {
          position: mixVec3(CAMERA_POSES.laptopPush.position, CAMERA_POSES.redFinish.position, segT),
          target: mixVec3(CAMERA_POSES.laptopPush.target, CAMERA_POSES.redFinish.target, segT),
        };
      }
      cameraShot = unifiedT < 0.45 ? 'screenPush' : 'redFinish';
    }
  } else {
    cameraPose = CAMERA_POSES.redFinish;
    cameraShot = 'work';
  }

  const dawnAmount = ease(
    clamp(
      (storyProgress - PHASES.clock.in) /
        Math.max(PHASES.laptop.in - PHASES.clock.in, 0.001),
      0,
      1,
    ),
  );
  const worldBrightness = clamp(dawnAmount * 0.62 + workFocus * 0.12, 0, 0.74);
  const alarmPulse =
    ease(
      clamp(
        (storyProgress - (PHASES.clock.in + 0.08)) /
          Math.max(PHASES.clock.out - (PHASES.clock.in + 0.08), 0.001),
        0,
        1,
      ),
    ) *
    (1 -
      ease(
        clamp(
          (storyProgress - (PHASES.clock.out - 0.03)) / 0.05,
          0,
          1,
        ),
      ));
  const deliverablePulse =
    ease(
      clamp(
        (storyProgress - (PHASES.laptop.in + 0.06)) /
          Math.max(PHASES.workTransition.in - (PHASES.laptop.in + 0.06), 0.001),
        0,
        1,
      ),
    ) *
      (1 - workFocus * 0.35);
  const clockDisplayProgress = clamp(storyProgress < PHASES.clock.in ? 0 : storyProgress < PHASES.clock.out ? storyProgress : PHASES.clock.out, PHASES.clock.in, PHASES.clock.out);
  const clockLocalProgress = clamp(
    (clockDisplayProgress - PHASES.clock.in) / Math.max(PHASES.clock.out - PHASES.clock.in, 0.001),
    0,
    1,
  );
  const clockFlipProgress = clamp((clockLocalProgress - 0.60) / 0.40, 0, 1);
  const clockDisplayTimeLabel =
    clockFlipProgress > 0
      ? '8:00 PM'
      : formatTime(
          interpolateTime(
            CLOCK_OVERNIGHT_SEQUENCE,
            clamp(clockLocalProgress / 0.60, 0, 1),
          ),
        );
  const railPresence = getRailPresence(storyProgress);

  return {
    cameraShot,
    activePhase,
    bkkTimeLabel,
    visitorTimeLabel,
    timelineProgress: syncedTimeline,
    railProgress,
    cameraProgress: timelineProgress,
    environmentProgress: timelineProgress,
    phoneProgress,
    phoneApproachProgress,
    phoneSettleProgress,
    phoneHoldProgress,
    phoneYieldProgress,
    phoneToClockProgress,
    phoneScreenProgress,
    clockProgress,
    clockHoldProgress,
    clockToLaptopProgress,
    laptopProgress,
    laptopHoldProgress,
    laptopApproachProgress,
    screenPushProgress,
    redTakeoverProgress,
    workTransitionProgress: clamp(
      (storyProgress - PHASES.workTransition.in) /
        Math.max(PHASES.workTransition.out - PHASES.workTransition.in, 0.001),
      0,
      1,
    ),
    alarmPulse: reducedMotion ? 0.36 : alarmPulse,
    deliverablePulse: reducedMotion ? 0.42 : deliverablePulse,
    clockDisplayTimeLabel,
    clockFlipProgress,
    alarmComplete: clockFlipProgress >= 0.95,
    railOpacity: railPresence,
    railEmphasis: lerp(0.72, 1, railPresence),
    dawnAmount: worldBrightness,
    coffeeFocus,
    phoneFocus,
    clockFocus,
    laptopFocus,
    workFocus,
    sceneReveal: ease(clamp((storyProgress - PHASES.logIntro.in) / Math.max(PHASES.phone.in - PHASES.logIntro.in, 0.001), 0, 1)),
    sceneVerticalShift: 1 - ease(clamp(
      (storyProgress - PHASES.logIntro.in) /
        Math.max(PHASES.phone.in - PHASES.logIntro.in, 0.001),
      0, 1,
    )),
    cameraPosition: cameraPose.position,
    cameraTarget: cameraPose.target,
    markers: CYCLE_TIME_MARKERS,
  };
}
