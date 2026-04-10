'use client';

import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import s from './Loader.module.css';

const LoaderClock = lazy(() => import('./LoaderClock'));

/* ── Scramble text effect ── */
function scrambleText(
  element: HTMLElement,
  finalText: string,
  duration: number,
) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
  const framesPerChar = Math.ceil(duration / 16 / finalText.length);
  let frame = 0;
  const totalFrames = framesPerChar * finalText.length;

  function tick() {
    let out = '';
    for (let i = 0; i < finalText.length; i++) {
      if (finalText[i] === ' ') {
        out += ' ';
      } else if (frame / totalFrames > i / finalText.length) {
        out += finalText[i];
      } else {
        out += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    element.textContent = out;
    frame++;
    if (frame <= totalFrames) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = finalText;
    }
  }

  tick();
}

/* ── Stepped percent values for visible digit flips ── */
const STEPS = [
  0, 3, 7, 12, 18, 24, 31, 38, 46, 54, 62, 70, 77, 83, 88, 92, 95, 98, 100,
];

/* ── Loader component ── */
export default function Loader() {
  const [phase, setPhase] = useState<'counting' | 'ready' | 'done'>('counting');
  const [percent, setPercent] = useState(0);
  const [clockMounted, setClockMounted] = useState(true);

  const statusRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Unmount Canvas after fade-out
  useEffect(() => {
    if (phase === 'done' && clockMounted) {
      const t = setTimeout(() => setClockMounted(false), 800);
      return () => clearTimeout(t);
    }
  }, [phase, clockMounted]);

  /* Lock scroll while loader is visible */
  useEffect(() => {
    if (phase !== 'done') {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [phase]);

  /*
   * Counter drives the whole sequence — no independent timers racing.
   * counting: step through 0→100
   * When counter hits 100: hold 300ms → 'ready' + scramble "READY"
   */
  useEffect(() => {
    if (phase !== 'counting') return;
    let cancelled = false;
    let stepIndex = 0;
    let lastMilestone = 0;

    function advance() {
      if (cancelled || stepIndex >= STEPS.length) return;

      const value = STEPS[stepIndex];
      setPercent(value);
      stepIndex++;

      if (statusRef.current) {
        if (value >= 20 && lastMilestone < 20) {
          lastMilestone = 20;
          scrambleText(statusRef.current, 'LOADING ASSETS', 180);
        } else if (value >= 50 && lastMilestone < 50) {
          lastMilestone = 50;
          scrambleText(statusRef.current, 'BUILDING SCENE', 180);
        } else if (value >= 80 && lastMilestone < 80) {
          lastMilestone = 80;
          scrambleText(statusRef.current, 'RENDERING', 180);
        }
      }

      if (stepIndex < STEPS.length) {
        // Next step
        timerRef.current = setTimeout(advance, 80);
      } else {
        // Counter finished at 100 — hold briefly then transition to ready
        timerRef.current = setTimeout(() => {
          if (cancelled) return;
          setPhase('ready');
          if (statusRef.current) {
            scrambleText(statusRef.current, 'READY', 150);
          }
        }, 300);
      }
    }

    advance();

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase]);

  /* Ready → done: hold "READY" for 800ms then fade out */
  useEffect(() => {
    if (phase !== 'ready') return;
    const t = setTimeout(() => {
      setPhase('done');
    }, 800);
    return () => clearTimeout(t);
  }, [phase]);

  /* Safety timeout — dismiss if anything stalls */
  useEffect(() => {
    const t = setTimeout(() => setPhase('done'), 6000);
    return () => clearTimeout(t);
  }, []);

  /* Reduced motion: skip animation */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setPercent(100);
      const t = setTimeout(() => {
        setPhase('done');
      }, 400);
      return () => clearTimeout(t);
    }
  }, []);

  const isDone = phase === 'done';

  return (
    <div
      className={`${s.loader} ${isDone ? s.done : ''} ${phase === 'ready' ? s.ready : ''}`}
      aria-hidden="true"
    >
      {/* CRT scanlines */}
      <div className={s.scanlines} />

      {/* Corner decorations */}
      <div className={s.cornerTL}>
        <span className={s.blinkDot} />
        SYS.INIT // NW-2026
      </div>
      <div className={s.cornerBR}>GMT+7 // BKK</div>

      {/* Center stack */}
      <div className={s.center}>
        {/* 3D Clock — contained */}
        <div className={s.clockWrap}>
          {clockMounted && (
            <Suspense fallback={null}>
              <LoaderClock percent={percent} ready={phase === 'ready'} />
            </Suspense>
          )}
        </div>

        {/* Progress bar */}
        <div className={s.progressWrap}>
          <div
            className={s.progressBar}
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Status text */}
        <span ref={statusRef} className={s.status}>
          INITIALIZING
        </span>
      </div>

      {/* Skip button — keyboard accessible */}
      <button
        className="sr-only focus:not-sr-only focus:absolute focus:bottom-8 focus:left-1/2 focus:-translate-x-1/2 focus:bg-accent focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium focus:z-10"
        onClick={() => {
          setPhase('done');
          document.body.style.overflow = '';
        }}
      >
        Skip
      </button>
    </div>
  );
}
