'use client';

import { useEffect, useRef, useState } from 'react';
import s from './Loader.module.css';

/* ── SVG path data (shared with LogoIcon) ── */
const PATH_1 =
  'M140.3,73.5c3.39,6.2,6.56,12.07,9.79,18,16.41,30.29,32.76,60.58,49.17,90.81.62,1.12,1.36,2.19,2.21,3.1,4.47,4.86,11.6,3.9,14.32-2.03.62-1.33,1.02-2.94,1.02-4.43.05-17.31.05-34.67,0-51.98,0-6.62-4.3-10.68-11.32-10.68-9.28-.05-18.61,0-27.89,0h-4.41s-6.45-11-11.49-21.26h45.49c17.31.05,30.95,11.59,32.99,27.89.11,1.12.28,2.29.28,3.42,0,17.73.17,35.42-.06,53.15-.11,9.88-4.24,18.22-12.56,24.41-13.64,10.15-34.57,7.69-44.93-5.13-.96-1.17-1.76-2.4-2.49-3.74-17.37-31.95-34.69-63.89-52.05-95.78-.91-1.6-.96-2.78,0-4.43,3.96-6.95,7.81-14,11.94-21.32';

const PATH_2 =
  'M159.7,226.5c-3.39-6.2-6.56-12.07-9.79-18-16.41-30.29-32.76-60.58-49.17-90.81-.56-1.12-1.36-2.19-2.21-3.1-4.47-4.86-11.6-3.9-14.32,2.03-.62,1.33-1.02,2.94-1.02,4.43-.05,17.31-.05,34.67,0,51.98,0,6.62,4.3,10.68,11.32,10.68,9.28.05,18.61,0,27.89,0h4.41s6.45,11,11.49,21.26h-45.49c-17.31-.05-30.95-11.59-32.99-27.89-.11-1.12-.28-2.29-.28-3.42,0-17.73-.17-35.42.06-53.15.11-9.88,4.24-18.22,12.56-24.41,13.64-10.15,34.57-7.69,44.93,5.13.96,1.17,1.76,2.4,2.49,3.74,17.37,31.95,34.69,63.89,52.05,95.78.91,1.6.96,2.78,0,4.43-3.96,6.95-7.87,13.94-11.94,21.32';

const VIEWBOX = '59.49 73.5 181.01 153';

/* ── Logo SVG (reusable inline) ── */
function LogoSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox={VIEWBOX}
      className={className}
      width={80}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={PATH_1} />
      <path d={PATH_2} />
    </svg>
  );
}

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

/* ── Loader component ── */
export default function Loader() {
  const [phase, setPhase] = useState<
    'drawing' | 'glitching' | 'settled' | 'done'
  >('drawing');
  const [percent, setPercent] = useState(0);
  const [filled, setFilled] = useState(false);

  const statusRef = useRef<HTMLSpanElement>(null);
  const animFrameRef = useRef<number>(0);

  // Skip loader on repeat visits — check after hydration
  useEffect(() => {
    if (sessionStorage.getItem('loaderSeen') === '1') {
      setPhase('done');
      document.body.style.overflow = '';
    }
  }, []);

  /* Animate percentage 0→100 over ~1400ms with cubic ease-out */
  useEffect(() => {
    let cancelled = false;
    const startTime = performance.now();
    const duration = 1400;

    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    let lastMilestone = 0;

    function tick(now: number) {
      if (cancelled) return;

      const elapsed = now - startTime;
      const raw = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(raw);
      const value = Math.round(eased * 100);

      setPercent(value);

      // Scramble text at milestones
      if (statusRef.current) {
        if (value >= 25 && lastMilestone < 25) {
          lastMilestone = 25;
          scrambleText(statusRef.current, 'LOADING', 200);
        } else if (value >= 60 && lastMilestone < 60) {
          lastMilestone = 60;
          scrambleText(statusRef.current, 'BUILDING', 200);
        } else if (value >= 85 && lastMilestone < 85) {
          lastMilestone = 85;
          scrambleText(statusRef.current, 'RENDERING', 200);
        }
      }

      if (raw < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    }

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  /* Main animation sequence */
  useEffect(() => {
    let cancelled = false;

    // Prevent scroll during loading
    document.body.style.overflow = 'hidden';

    // Wait for fonts + minimum delay
    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    function safeTimeout(fn: () => void, ms: number) {
      const id = setTimeout(() => { if (!cancelled) fn(); }, ms);
      timeouts.push(id);
      return id;
    }

    fontsReady.then(() => {
      if (cancelled) return;
      // After fonts loaded + 1500ms: fill logo, show READY
      safeTimeout(() => {
        setFilled(true);
        setPercent(100);

        if (statusRef.current) {
          scrambleText(statusRef.current, 'READY', 180);
        }

        // After 400ms: glitching state
        safeTimeout(() => {
          setPhase('glitching');

          // After 200ms: settled state
          safeTimeout(() => {
            setPhase('settled');

            // After 200ms: done — fade out
            safeTimeout(() => {
              setPhase('done');
              sessionStorage.setItem('loaderSeen', '1');

              safeTimeout(() => {
                document.body.style.overflow = '';
              }, 500);
            }, 200);
          }, 200);
        }, 400);
      }, 1500);
    });

    // Safety timeout: force done after 3s max
    safeTimeout(() => {
      setPhase('done');
      document.body.style.overflow = '';
      sessionStorage.setItem('loaderSeen', '1');
    }, 3000);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
      document.body.style.overflow = '';
    };
  }, []);

  /* Reduced motion: skip animation entirely */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setPercent(100);
      setFilled(true);
      // Brief show then dismiss
      const t = setTimeout(() => {
        setPhase('done');
        document.body.style.overflow = '';
        sessionStorage.setItem('loaderSeen', '1');
      }, 400);
      return () => clearTimeout(t);
    }
  }, []);

  /* Build class list */
  const loaderClasses = [
    s.loader,
    phase === 'drawing' ? s.drawing : '',
    phase === 'glitching' ? s.glitching : '',
    phase === 'settled' ? s.settled : '',
    phase === 'done' ? s.done : '',
  ]
    .filter(Boolean)
    .join(' ');

  const logoMainClasses = [s.logoMain, filled ? s.logoFilled : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={loaderClasses} aria-hidden="true">
      {/* Corner coordinates */}
      <div className={s.cornerTL}>
        <span className={s.blinkDot} />
        SYS.INIT // NW-2026
      </div>
      <div className={s.cornerBR}>GMT+7 // BKK</div>

      {/* Center stack */}
      <div className={s.center}>
        {/* Logo with CMYK layers */}
        <div className={s.logoWrap}>
          {/* Cyan plate */}
          <LogoSVG className={`${s.plate} ${s.plateCyan}`} />
          {/* Magenta plate */}
          <LogoSVG className={`${s.plate} ${s.plateMagenta}`} />
          {/* Yellow plate */}
          <LogoSVG className={`${s.plate} ${s.plateYellow}`} />
          {/* Main logo with stroke draw */}
          <LogoSVG className={logoMainClasses} />
        </div>

        {/* Percentage */}
        <span className={s.percent}>{String(percent).padStart(3, '0')}</span>

        {/* Progress bar */}
        <div className={s.progressWrap}>
          <div className={s.progressBar} style={{ width: `${percent}%` }} />
        </div>

        {/* Status text */}
        <span ref={statusRef} className={s.status}>
          INITIALIZING
        </span>
      </div>

      {/* Skip button — keyboard accessible, visually hidden until focused */}
      <button
        className="sr-only focus:not-sr-only focus:absolute focus:bottom-8 focus:left-1/2 focus:-translate-x-1/2 focus:bg-accent focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium focus:z-10"
        onClick={() => {
          setPhase('done');
          sessionStorage.setItem('loaderSeen', '1');
          document.body.style.overflow = '';
        }}
      >
        Skip
      </button>
    </div>
  );
}
