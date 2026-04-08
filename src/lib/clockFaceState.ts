import type { ClockSequenceState } from '@/lib/cycleScreenState';
import type { FlipClockDigit } from '@/lib/flipClockGlyphs';

export type ClockCardKey = 'hourTens' | 'hour' | 'minuteTens' | 'minuteOnes';
export type ClockCardPhase =
  | 'static'
  | 'topClose'
  | 'seamCross'
  | 'bottomOpen'
  | 'settle'
  | 'settled';

export interface ClockFaceCardRenderState {
  key: ClockCardKey;
  fromDigit: FlipClockDigit;
  toDigit: FlipClockDigit;
  rawProgress: number;
  phase: ClockCardPhase;
  phaseProgress: number;
}

export interface ClockFaceRenderState {
  faceOpacity: number;
  periodLabel: 'AM' | 'PM';
  cards: ClockFaceCardRenderState[];
}

const CARD_DEFS: ReadonlyArray<{
  key: ClockCardKey;
  fromDigit: FlipClockDigit;
  toDigit: FlipClockDigit;
  selectProgress: (state: ClockSequenceState) => number;
}> = [
  {
    key: 'hourTens',
    fromDigit: '0',
    toDigit: '0',
    selectProgress: () => 1, // hour tens static at '0' for 6→7 transition
  },
  {
    key: 'hour',
    fromDigit: '6',
    toDigit: '7',
    selectProgress: (state) => state.flipHourOnes,
  },
  {
    key: 'minuteTens',
    fromDigit: '5',
    toDigit: '0',
    selectProgress: (state) => state.flipMinuteTens,
  },
  {
    key: 'minuteOnes',
    fromDigit: '9',
    toDigit: '0',
    selectProgress: (state) => state.flipMinuteOnes,
  },
] as const;

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smooth(value: number) {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

const FLIP_PHASE = {
  staticEnd: 0.08,
  topCloseEnd: 0.46,
  seamCrossEnd: 0.56,
  bottomOpenEnd: 0.88,
} as const;

function normalizePhase(value: number, start: number, end: number) {
  return clamp01((value - start) / Math.max(end - start, 0.0001));
}

function easeInPhase(value: number) {
  const t = clamp01(value);
  return t * t;
}

function easeOutPhase(value: number) {
  const t = clamp01(value);
  return 1 - Math.pow(1 - t, 3);
}

function easeSettlePhase(value: number) {
  const t = clamp01(value);
  return 1 - Math.pow(1 - t, 2.4);
}

export function resolveCardState(
  rawProgress: number,
  key: ClockCardKey,
  fromDigit: FlipClockDigit,
  toDigit: FlipClockDigit,
): ClockFaceCardRenderState {
  const progress = clamp01(rawProgress);

  if (progress <= 0.001) {
    return {
      key,
      fromDigit,
      toDigit,
      rawProgress: 0,
      phase: 'static',
      phaseProgress: 0,
    };
  }

  if (progress >= 0.999) {
    return {
      key,
      fromDigit,
      toDigit,
      rawProgress: 1,
      phase: 'settled',
      phaseProgress: 1,
    };
  }

  if (progress < FLIP_PHASE.staticEnd) {
    return {
      key,
      fromDigit,
      toDigit,
      rawProgress: progress,
      phase: 'static',
      phaseProgress: easeOutPhase(
        normalizePhase(progress, 0, FLIP_PHASE.staticEnd),
      ),
    };
  }

  if (progress < FLIP_PHASE.topCloseEnd) {
    return {
      key,
      fromDigit,
      toDigit,
      rawProgress: progress,
      phase: 'topClose',
      phaseProgress: easeInPhase(
        normalizePhase(progress, FLIP_PHASE.staticEnd, FLIP_PHASE.topCloseEnd),
      ),
    };
  }

  if (progress < FLIP_PHASE.seamCrossEnd) {
    return {
      key,
      fromDigit,
      toDigit,
      rawProgress: progress,
      phase: 'seamCross',
      phaseProgress: smooth(
        normalizePhase(
          progress,
          FLIP_PHASE.topCloseEnd,
          FLIP_PHASE.seamCrossEnd,
        ),
      ),
    };
  }

  if (progress < FLIP_PHASE.bottomOpenEnd) {
    return {
      key,
      fromDigit,
      toDigit,
      rawProgress: progress,
      phase: 'bottomOpen',
      phaseProgress: easeOutPhase(
        normalizePhase(
          progress,
          FLIP_PHASE.seamCrossEnd,
          FLIP_PHASE.bottomOpenEnd,
        ),
      ),
    };
  }

  return {
    key,
    fromDigit,
    toDigit,
    rawProgress: progress,
    phase: 'settle',
    phaseProgress: easeSettlePhase(
      normalizePhase(progress, FLIP_PHASE.bottomOpenEnd, 1),
    ),
  };
}

export function getClockFaceRenderState(
  state: ClockSequenceState,
): ClockFaceRenderState {
  return {
    faceOpacity: 0.55 + state.faceIn * 0.45,
    periodLabel: 'AM',
    cards: CARD_DEFS.map(({ key, fromDigit, toDigit, selectProgress }) =>
      resolveCardState(selectProgress(state), key, fromDigit, toDigit),
    ),
  };
}

export function createClockFaceRenderStateFromTime(
  timeLabel: string,
): ClockFaceRenderState {
  const [time = '12:00', period = 'AM'] = timeLabel.split(' ');
  const [rawHour = '12', rawMinute = '00'] = time.split(':');
  const hour = rawHour.padStart(2, '0').slice(-2);
  const minute = rawMinute.padStart(2, '0').slice(-2);
  const digits = [hour[0], hour[1], minute[0], minute[1]] as FlipClockDigit[];

  return {
    faceOpacity: 1,
    periodLabel: period === 'PM' ? 'PM' : 'AM',
    cards: [
      {
        key: 'hourTens',
        fromDigit: digits[0],
        toDigit: digits[0],
        rawProgress: 1,
        phase: 'settled',
        phaseProgress: 1,
      },
      {
        key: 'hour',
        fromDigit: digits[1],
        toDigit: digits[1],
        rawProgress: 1,
        phase: 'settled',
        phaseProgress: 1,
      },
      {
        key: 'minuteTens',
        fromDigit: digits[2],
        toDigit: digits[2],
        rawProgress: 1,
        phase: 'settled',
        phaseProgress: 1,
      },
      {
        key: 'minuteOnes',
        fromDigit: digits[3],
        toDigit: digits[3],
        rawProgress: 1,
        phase: 'settled',
        phaseProgress: 1,
      },
    ],
  };
}

function createDebugSequenceState(
  overrides: Partial<ClockSequenceState>,
): ClockSequenceState {
  return {
    displayProgress: 1,
    ringAmount: 0,
    flashAmount: 0,
    faceIn: 1,
    hold0659: 1,
    flipMinuteOnes: 0,
    flipMinuteTens: 0,
    flipHourOnes: 0,
    settle0700: 0,
    ...overrides,
  };
}

export function getClockFaceDebugStates() {
  return [
    {
      label: 'rest-0659',
      sequence: createDebugSequenceState({}),
    },
    {
      label: 'minute-ones-mid',
      sequence: createDebugSequenceState({ flipMinuteOnes: 0.52 }),
    },
    {
      label: 'minute-tens-mid',
      sequence: createDebugSequenceState({
        flipMinuteOnes: 1,
        flipMinuteTens: 0.52,
      }),
    },
    {
      label: 'hour-mid',
      sequence: createDebugSequenceState({
        flipMinuteOnes: 1,
        flipMinuteTens: 1,
        flipHourOnes: 0.52,
      }),
    },
    {
      label: 'rest-0700',
      sequence: createDebugSequenceState({
        flipMinuteOnes: 1,
        flipMinuteTens: 1,
        flipHourOnes: 1,
        settle0700: 1,
      }),
    },
  ].map((entry) => ({
    ...entry,
    render: getClockFaceRenderState(entry.sequence),
  }));
}
