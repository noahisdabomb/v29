import { create } from 'zustand';
import {
  BG_COLORS,
  PHASES,
  PHASE_ORDER,
  PHASE_CLASS_THRESHOLDS,
  type PhaseName,
} from '@/lib/constants';
import { ease, lerpColor } from '@/lib/easing';

const EPSILON = 0.001;

function nearEqual(a: number, b: number): boolean {
  return Math.abs(a - b) < EPSILON;
}

export interface PhaseTransform {
  opacity: number;
  yShift: number;
  scale: number;
  enterT: number;
  exitT: number;
}

type PhaseProgressKey = `${PhaseName}Progress`;
type PhaseOpacityKey = `${PhaseName}Opacity`;
type PhaseTransformKey = `${PhaseName}Transform`;

type PhaseNumberState = Record<PhaseProgressKey, number> &
  Record<PhaseOpacityKey, number>;
type PhaseTransformState = Record<PhaseTransformKey, PhaseTransform>;

type ScrollState = PhaseNumberState &
  PhaseTransformState & {
    cycleProgress: number;
    cycleBgColor: string;
    isDawn: boolean;
    isMorning: boolean;
    setCycleProgress: (progress: number) => void;
  };

interface ChapterRange {
  in: number;
  introEnd: number;
  holdEnd: number;
  outroStart: number;
  out: number;
}

const IDENTITY_TRANSFORM: PhaseTransform = {
  opacity: 0,
  yShift: 0,
  scale: 1,
  enterT: 0,
  exitT: 0,
};

function progressKey(phase: PhaseName): PhaseProgressKey {
  return `${phase}Progress`;
}

function opacityKey(phase: PhaseName): PhaseOpacityKey {
  return `${phase}Opacity`;
}

function transformKey(phase: PhaseName): PhaseTransformKey {
  return `${phase}Transform`;
}

function transformEqual(a: PhaseTransform, b: PhaseTransform): boolean {
  return (
    nearEqual(a.opacity, b.opacity) &&
    nearEqual(a.yShift, b.yShift) &&
    nearEqual(a.scale, b.scale) &&
    nearEqual(a.enterT, b.enterT) &&
    nearEqual(a.exitT, b.exitT)
  );
}

function phaseTransform(
  progress: number,
  range: ChapterRange,
): PhaseTransform {
  const phaseIn = range.in;
  const phaseOut = range.out;
  if (progress < phaseIn || progress > phaseOut) {
    return IDENTITY_TRANSFORM;
  }

  const introEnd = Math.max(phaseIn, Math.min(range.introEnd, phaseOut));
  const holdEnd = Math.max(introEnd, Math.min(range.holdEnd, phaseOut));
  const outroStart = Math.max(
    holdEnd,
    Math.min(range.outroStart ?? range.holdEnd, phaseOut),
  );

  let opacity = 0;
  let enterT = 0;
  let exitT = 0;

  if (phaseIn === 0 && progress <= introEnd) {
    enterT = introEnd === phaseIn ? 1 : (progress - phaseIn) / (introEnd - phaseIn);
    opacity = ease(enterT);
  } else if (progress <= introEnd) {
    enterT = introEnd === phaseIn ? 1 : (progress - phaseIn) / (introEnd - phaseIn);
    opacity = ease(enterT);
  } else if (progress < outroStart) {
    enterT = 1;
    opacity = 1;
  } else if (progress <= phaseOut) {
    enterT = 1;
    exitT =
      phaseOut === outroStart
        ? 1
        : (progress - outroStart) / (phaseOut - outroStart);
    opacity = ease(1 - exitT);
  } else {
    enterT = 1;
    opacity = 1;
  }

  opacity = Math.max(0, Math.min(1, opacity));

  let yShift = 0;
  let scale = 1;

  if (opacity > 0 && opacity < 1) {
    if (enterT < 1 && exitT === 0) {
      const inv = 1 - enterT;
      yShift = inv * 42;
      scale = 0.952 + enterT * 0.048;
    } else {
      yShift = exitT * -20;
      scale = 1 - exitT * 0.018;
    }
  }

  return { opacity, yShift, scale, enterT, exitT };
}

function phaseProgress(progress: number, phaseIn: number, phaseOut: number): number {
  if (progress < phaseIn || progress > phaseOut) return 0;
  const range = phaseOut - phaseIn;
  if (range === 0) return 0;
  return (progress - phaseIn) / range;
}

function getBgColor(progress: number): string {
  for (let index = 0; index < BG_COLORS.length - 1; index += 1) {
    const current = BG_COLORS[index];
    const next = BG_COLORS[index + 1];
    if (progress >= current.pos && progress <= next.pos) {
      const localT = (progress - current.pos) / (next.pos - current.pos);
      return lerpColor(current.color, next.color, localT);
    }
  }

  return BG_COLORS[BG_COLORS.length - 1].color;
}

function createPhaseNumberState(): PhaseNumberState {
  const state = {} as PhaseNumberState;
  for (const phase of PHASE_ORDER) {
    state[progressKey(phase)] = 0;
    state[opacityKey(phase)] = 0;
  }
  return state;
}

function createPhaseTransformState(): PhaseTransformState {
  const state = {} as PhaseTransformState;
  for (const phase of PHASE_ORDER) {
    state[transformKey(phase)] = IDENTITY_TRANSFORM;
  }
  return state;
}

export const useScrollStore = create<ScrollState>((set, get) => ({
  cycleProgress: 0,
  cycleBgColor: BG_COLORS[0].color,
  isDawn: false,
  isMorning: false,
  ...createPhaseNumberState(),
  ...createPhaseTransformState(),
  setCycleProgress: (progress: number) => {
    const cycleProgress = Math.max(0, Math.min(1, progress));
    const previous = get();
    const patch: Partial<ScrollState> = {};

    if (!nearEqual(previous.cycleProgress, cycleProgress)) {
      patch.cycleProgress = cycleProgress;
    }

    for (const phase of PHASE_ORDER) {
      const range = PHASES[phase] as ChapterRange;
      const phaseP = phaseProgress(cycleProgress, range.in, range.out);
      const phaseT = phaseTransform(cycleProgress, range);

      const phaseProgressKey = progressKey(phase);
      const phaseOpacityKey = opacityKey(phase);
      const phaseTransformStateKey = transformKey(phase);

      if (!nearEqual(previous[phaseProgressKey], phaseP)) {
        patch[phaseProgressKey] = phaseP;
      }

      if (!nearEqual(previous[phaseOpacityKey], phaseT.opacity)) {
        patch[phaseOpacityKey] = phaseT.opacity;
      }

      if (!transformEqual(previous[phaseTransformStateKey], phaseT)) {
        patch[phaseTransformStateKey] = phaseT;
      }
    }

    const bgColor = getBgColor(cycleProgress);
    if (previous.cycleBgColor !== bgColor) {
      patch.cycleBgColor = bgColor;
    }

    const dawn =
      cycleProgress > PHASE_CLASS_THRESHOLDS.dawn.start &&
      cycleProgress < PHASE_CLASS_THRESHOLDS.dawn.end;
    const morning = cycleProgress >= PHASE_CLASS_THRESHOLDS.morning.start;

    if (previous.isDawn !== dawn) {
      patch.isDawn = dawn;
    }

    if (previous.isMorning !== morning) {
      patch.isMorning = morning;
    }

    if (Object.keys(patch).length > 0) {
      set(patch);
    }
  },
}));
