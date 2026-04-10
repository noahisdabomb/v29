import { clamp, ease } from '@/lib/easing';
import { CYCLE_MOTION } from '@/lib/constants';

export type PhoneEntryState = 'upcoming' | 'active' | 'past';

export interface PhoneSequenceState {
  standbyOpacity: number;
  standbyGlow: number;
  statusOpacity: number;
  headerOpacity: number;
  headerOffset: number;
  headerRuleProgress: number;
  headerGlow: number;
  lineGlow: number;
  entryOpacities: number[];
  entryOffsets: number[];
  entryXOffsets: number[];
  rowScales: number[];
  iconScales: number[];
  entryStates: PhoneEntryState[];
  activeIndex: number;
  activePulse: number;
  lineProgress: number;
  loadingProgress: number;
}

export interface ClockSequenceState {
  displayProgress: number;
  ringAmount: number;
  flashAmount: number;
  faceIn: number;
  hold0659: number;
  flipHourTens: number;
  flipMinuteOnes: number;
  flipMinuteTens: number;
  flipHourOnes: number;
  settle0700: number;
}

export interface LaptopSequenceState {
  screenReveal: number;
  glowAmount: number;
  greenScreenAmount: number;
  campaignReadyOpacity: number;
  pushIntoProgress: number;
  greenOverlayOpacity: number;
  inboxOpacity: number;
  emailOpacities: number[];
  emailOffsets: number[];
  rowScales: number[];
  activeIndex: number;
  redFlood: number;
  composeProgress: number;
}

function reveal(progress: number, start: number, duration: number): number {
  return ease(clamp((progress - start) / duration, 0, 1));
}

function mixValue(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function getPhoneSequenceState(
  progress: number,
  itemCount: number,
  reducedMotion = false,
): PhoneSequenceState {
  if (reducedMotion) {
    return {
      standbyOpacity: 1,
      standbyGlow: 0.18,
      statusOpacity: 1,
      headerOpacity: 1,
      headerOffset: 0,
      headerRuleProgress: 1,
      headerGlow: 0,
      lineGlow: 0,
      entryOpacities: Array.from({ length: itemCount }, () => 1),
      entryOffsets: Array.from({ length: itemCount }, () => 0),
      entryXOffsets: Array.from({ length: itemCount }, () => 0),
      rowScales: Array.from({ length: itemCount }, () => 1),
      iconScales: Array.from({ length: itemCount }, () => 1),
      entryStates: Array.from({ length: itemCount }, (_, index) =>
        index === itemCount - 1 ? 'active' : 'past',
      ),
      activeIndex: itemCount - 1,
      activePulse: 0,
      lineProgress: 1,
      loadingProgress: 0,
    };
  }

  const standbyLift = reveal(progress, 0, 0.12);
  const standbyOpacity = 0.68 + standbyLift * 0.24;
  const standbyGlow =
    0.1 +
    reveal(progress, 0.02, 0.16) * 0.24 +
    (1 - reveal(progress, CYCLE_MOTION.phone.exitStart, 0.12)) * 0.06;
  const statusOpacity = reveal(progress, 0.02, 0.08);
  const headerOpacity = reveal(progress, 0.08, 0.12);
  const headerOffset = (1 - headerOpacity) * 22;
  const revealStart = CYCLE_MOTION.phone.contentRevealStart;
  const revealEnd = CYCLE_MOTION.phone.contentRevealEnd;
  const revealRange = revealEnd - revealStart;
  const headerRuleProgress = clamp((progress - revealStart) / revealRange, 0, 1);

  // Loading shimmer appears after header, before content entries
  const loadingProgress = reveal(progress, 0.12, 0.12) * (1 - reveal(progress, revealStart, 0.06));

  const headerGlow =
    reveal(progress, 0.1, 0.16) *
    (1 - reveal(progress, CYCLE_MOTION.phone.exitStart, 0.1));
  const lineGlow =
    reveal(progress, revealStart - 0.08, 0.16) *
    (1 - reveal(progress, CYCLE_MOTION.phone.exitStart, 0.12));
  const activePulse =
    reveal(progress, 0.28, 0.14) *
    (1 - reveal(progress, CYCLE_MOTION.phone.exitStart, 0.1));

  const entryOpacities: number[] = [];
  const entryOffsets: number[] = [];
  const entryXOffsets: number[] = [];
  const rowScales: number[] = [];
  const iconScales: number[] = [];
  let activeIndex = -1;

  for (let index = 0; index < itemCount; index += 1) {
    const rowStart = revealStart + (index / itemCount) * revealRange;
    const opacity = reveal(progress, rowStart, 0.09);
    entryOpacities.push(opacity);
    entryOffsets.push((1 - opacity) * 24);
    entryXOffsets.push((1 - opacity) * (20 + index * 2.5));
    rowScales.push(0.88 + opacity * 0.12);
    iconScales.push(0.66 + opacity * 0.34);

    if (opacity >= 0.94) {
      const nextStart = revealStart + ((index + 1) / itemCount) * revealRange;
      const nextOpacity =
        index < itemCount - 1 ? reveal(progress, nextStart, 0.08) : 0;

      if (nextOpacity < 0.42 || index === itemCount - 1) {
        activeIndex = index;
      }
    }
  }

  if (activeIndex >= 0) {
    rowScales[activeIndex] += activePulse * 0.026;
    entryOffsets[activeIndex] -= activePulse * 4.5;
  }

  const entryStates = entryOpacities.map((opacity, index) => {
    if (index === activeIndex) return 'active';
    if (activeIndex > index || opacity >= 0.92) return 'past';
    return 'upcoming';
  });

  return {
    standbyOpacity,
    standbyGlow,
    statusOpacity,
    headerOpacity,
    headerOffset,
    headerRuleProgress,
    headerGlow,
    lineGlow,
    entryOpacities,
    entryOffsets,
    entryXOffsets,
    rowScales,
    iconScales,
    entryStates,
    activeIndex,
    activePulse,
    lineProgress: clamp((progress - 0.1) / 0.44, 0, 1),
    loadingProgress,
  };
}

export function getClockSequenceState(
  progress: number,
  reducedMotion = false,
): ClockSequenceState {
  const displayProgress = reveal(progress, 0.02, reducedMotion ? 0.08 : 0.12);
  const faceIn = displayProgress;
  const hold0659 = reveal(progress, 0.14, reducedMotion ? 0.07 : 0.1);
  const flipHourTens = reveal(
    progress,
    reducedMotion ? 0.42 : 0.46,
    reducedMotion ? 0.06 : 0.08,
  );
  const flipMinuteOnes = reveal(
    progress,
    reducedMotion ? 0.5 : 0.54,
    reducedMotion ? 0.06 : 0.08,
  );
  const flipMinuteTens = reveal(
    progress,
    reducedMotion ? 0.6 : 0.63,
    reducedMotion ? 0.06 : 0.08,
  );
  const flipHourOnes = reveal(
    progress,
    reducedMotion ? 0.69 : 0.72,
    reducedMotion ? 0.07 : 0.09,
  );
  const settle0700 = reveal(
    progress,
    reducedMotion ? 0.82 : 0.84,
    reducedMotion ? 0.08 : 0.1,
  );

  const ringLift = reveal(progress, reducedMotion ? 0.46 : 0.5, reducedMotion ? 0.1 : 0.12);
  const ringTail = 1 - reveal(progress, 0.94, reducedMotion ? 0.05 : 0.07);
  const ringAmount = ringLift * ringTail * (reducedMotion ? 0.28 : 1);
  const flashAmount =
    reveal(progress, reducedMotion ? 0.54 : 0.56, reducedMotion ? 0.08 : 0.09) *
    (1 - reveal(progress, 0.94, reducedMotion ? 0.05 : 0.07)) *
    (reducedMotion ? 0.5 : 1);

  return {
    displayProgress,
    ringAmount,
    flashAmount,
    faceIn,
    hold0659,
    flipHourTens,
    flipMinuteOnes,
    flipMinuteTens,
    flipHourOnes,
    settle0700,
  };
}

export function getLaptopSequenceState(
  progress: number,
  rowCount: number,
  reducedMotion = false,
): LaptopSequenceState {
  if (reducedMotion) {
    return {
      screenReveal: 1,
      glowAmount: 0.36,
      greenScreenAmount: 0,
      campaignReadyOpacity: 0,
      pushIntoProgress: 1,
      greenOverlayOpacity: 0,
      inboxOpacity: 1,
      emailOpacities: Array.from({ length: rowCount }, () => 1),
      emailOffsets: Array.from({ length: rowCount }, () => 0),
      rowScales: Array.from({ length: rowCount }, () => 1),
      activeIndex: rowCount - 1,
      redFlood: 0,
      composeProgress: 0,
    };
  }

  const screenReveal = reveal(progress, 0.02, 0.12);
  const glowLift = reveal(progress, 0.02, 0.18);
  const glowHold = mixValue(1, 0.62, reveal(progress, 0.28, 0.2));
  const glowTail = 1 - reveal(progress, 0.7, 0.22);
  const glowAmount = glowLift * glowHold * glowTail;

  const greenScreenAmount = clamp(
    (1 - reveal(progress, 0.02, 0.26) * 0.2) * (1 - reveal(progress, 0.72, 0.20)),
    0,
    1,
  );
  const campaignReadyOpacity = 0;
  const pushIntoProgress = reveal(progress, 0.44, 0.24);

  // Compose typing animation — plays during screenPush window (0.32-0.60)
  const composeProgress = clamp((progress - 0.18) / 0.38, 0, 1);

  let greenOverlayOpacity = 0;
  if (progress >= 0.82) {
    greenOverlayOpacity = reveal(progress, 0.82, 0.12);
  }

  const inboxOpacity = reveal(progress, 0.68, 0.16);
  const emailOpacities: number[] = [];
  const emailOffsets: number[] = [];
  const rowScales: number[] = [];
  let activeIndex = -1;

  for (let index = 0; index < rowCount; index += 1) {
    const rowStart = 0.72 + index * 0.04;
    const opacity = inboxOpacity * reveal(progress, rowStart, 0.08);
    emailOpacities.push(opacity);
    emailOffsets.push((1 - opacity) * 22);
    rowScales.push(0.94 + opacity * 0.06);

    if (opacity >= 0.88) {
      activeIndex = index;
    }
  }

  const redFlood = reveal(
    progress,
    CYCLE_MOTION.laptop.redTakeoverStart,
    CYCLE_MOTION.laptop.redTakeoverEnd - CYCLE_MOTION.laptop.redTakeoverStart,
  );

  return {
    screenReveal,
    glowAmount,
    greenScreenAmount,
    campaignReadyOpacity,
    pushIntoProgress,
    greenOverlayOpacity,
    inboxOpacity,
    emailOpacities,
    emailOffsets,
    rowScales,
    activeIndex,
    redFlood,
    composeProgress,
  };
}
