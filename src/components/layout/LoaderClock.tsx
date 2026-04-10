'use client';

import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import ClockModelPolish from '@/components/three/ClockModelPolish';
import type { ClockFaceRenderState, ClockCardKey } from '@/lib/clockFaceState';
import type { ClockSequenceState } from '@/lib/cycleScreenState';
import type { FlipClockDigit } from '@/lib/flipClockGlyphs';

/* ── Helpers ── */

function digit(n: number): FlipClockDigit {
  return String(Math.max(0, Math.min(9, n))) as FlipClockDigit;
}

function settledCard(
  key: ClockCardKey,
  d: FlipClockDigit,
): ClockFaceRenderState['cards'][number] {
  return {
    key,
    fromDigit: d,
    toDigit: d,
    rawProgress: 1,
    phase: 'settled',
    phaseProgress: 1,
  };
}

function flippingCard(
  key: ClockCardKey,
  from: FlipClockDigit,
  to: FlipClockDigit,
  progress: number,
): ClockFaceRenderState['cards'][number] {
  if (progress >= 1 || from === to) return settledCard(key, to);
  const p = Math.max(0, Math.min(1, progress));

  const staticEnd = 0.08;
  const topCloseEnd = 0.46;
  const seamCrossEnd = 0.56;
  const bottomOpenEnd = 0.88;

  let phase: ClockFaceRenderState['cards'][number]['phase'];
  let phaseProgress: number;

  if (p < staticEnd) {
    phase = 'static';
    phaseProgress = p / staticEnd;
  } else if (p < topCloseEnd) {
    phase = 'topClose';
    phaseProgress = (p - staticEnd) / (topCloseEnd - staticEnd);
  } else if (p < seamCrossEnd) {
    phase = 'seamCross';
    phaseProgress = (p - topCloseEnd) / (seamCrossEnd - topCloseEnd);
  } else if (p < bottomOpenEnd) {
    phase = 'bottomOpen';
    phaseProgress = (p - seamCrossEnd) / (bottomOpenEnd - seamCrossEnd);
  } else {
    phase = 'settle';
    phaseProgress = (p - bottomOpenEnd) / (1 - bottomOpenEnd);
  }

  return { key, fromDigit: from, toDigit: to, rawProgress: p, phase, phaseProgress };
}

/* ── Percent → digit flip state ── */

interface DigitFlipState {
  from: number;
  to: number;
  progress: number;
}

const FLIP_SPEED = [6, 10, 14] as const;

function useDigitFlips(percent: number) {
  const prevRef = useRef({ h: 0, t: 0, o: 0 });
  const flipsRef = useRef<[DigitFlipState, DigitFlipState, DigitFlipState]>([
    { from: 0, to: 0, progress: 1 },
    { from: 0, to: 0, progress: 1 },
    { from: 0, to: 0, progress: 1 },
  ]);
  const lastTimeRef = useRef(performance.now());

  const p = Math.min(Math.max(Math.round(percent), 0), 100);
  const hundreds = Math.floor(p / 100);
  const tens = Math.floor((p % 100) / 10);
  const ones = p % 10;

  const now = performance.now();
  const dt = (now - lastTimeRef.current) / 1000;
  lastTimeRef.current = now;

  const prev = prevRef.current;
  const flips = flipsRef.current;
  const digits = [hundreds, tens, ones];
  const prevDigits = [prev.h, prev.t, prev.o];

  for (let i = 0; i < 3; i++) {
    if (digits[i] !== prevDigits[i]) {
      flips[i] = { from: prevDigits[i], to: digits[i], progress: 0 };
    }
    if (flips[i].progress < 1) {
      flips[i].progress = Math.min(1, flips[i].progress + dt * FLIP_SPEED[i]);
    }
  }

  prevRef.current = { h: hundreds, t: tens, o: ones };
  return flips;
}

/* ── Inner R3F scene ── */

function ClockScene({ percent, ready }: { percent: number; ready: boolean }) {
  const flips = useDigitFlips(percent);

  const renderState = useMemo<ClockFaceRenderState>(() => ({
    faceOpacity: 1,
    periodLabel: 'PM',
    cards: [
      settledCard('hourTens', '0'),
      flippingCard('hour', digit(flips[0].from), digit(flips[0].to), flips[0].progress),
      flippingCard('minuteTens', digit(flips[1].from), digit(flips[1].to), flips[1].progress),
      flippingCard('minuteOnes', digit(flips[2].from), digit(flips[2].to), flips[2].progress),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [percent, flips[0].progress, flips[1].progress, flips[2].progress]);

  const sequence = useMemo<ClockSequenceState>(() => ({
    displayProgress: 1,
    faceIn: 1,
    hold0659: 1,
    flipHourTens: 0,
    flipMinuteOnes: 0,
    flipMinuteTens: 0,
    flipHourOnes: 0,
    settle0700: 0,
    ringAmount: ready ? 0.32 : 0,
    flashAmount: ready ? 0.22 : 0,
  }), [ready]);

  return (
    <group rotation={[0, Math.PI / 12, 0]}>
      <ClockModelPolish
        sequenceOverride={sequence}
        renderStateOverride={renderState}
      />
    </group>
  );
}

/* ── Lighting (3 lights instead of 6) ── */

function LoaderLighting() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!lightRef.current) return;
    lightRef.current.intensity = 1.4 + Math.sin(clock.elapsedTime * 1.2) * 0.15;
  });

  return (
    <>
      <ambientLight intensity={0.5} color="#fff0f2" />
      <directionalLight position={[2, 3, 4]} intensity={1.0} color="#ffe0e4" />
      <pointLight
        ref={lightRef}
        position={[0, 0.2, 4.2]}
        intensity={1.4}
        color="#f0a0b0"
        distance={12}
      />
    </>
  );
}

/* ── Public component ── */

interface LoaderClockProps {
  percent: number;
  ready: boolean;
}

export default function LoaderClock({ percent, ready }: LoaderClockProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.12, 5.6], fov: 28 }}
      gl={{ antialias: true, alpha: true, stencil: true }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <LoaderLighting />
      <Suspense fallback={null}>
        <ClockScene percent={percent} ready={ready} />
      </Suspense>
    </Canvas>
  );
}
