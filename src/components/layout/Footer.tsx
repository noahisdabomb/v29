'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from '@/components/layout/TransitionLink';
import { useLiveClock } from '@/hooks/useLiveClock';
import LogoIcon from '@/components/ui/LogoIcon';
import MagneticButton from '@/components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);
import {
  CAL_COM_URL,
  FOOTER,
  SITE_SETTINGS,
} from '@/lib/content';

/* ── Status dot ──────────────────────────────────────────── */
function StatusDot({ status }: { status: 'available' | 'winding-down' | 'offline' }) {
  const color =
    status === 'available'
      ? 'bg-emerald-400'
      : status === 'winding-down'
        ? 'bg-amber-400'
        : 'bg-red-200';
  const pulse =
    status === 'available'
      ? 'animate-pulse'
      : '';
  return (
    <span className="relative inline-flex size-2">
      {status === 'available' && (
        <span className={`absolute inline-flex size-full rounded-full ${color} opacity-40 ${pulse}`} />
      )}
      <span className={`relative inline-flex size-2 rounded-full ${color}`} />
    </span>
  );
}

/* ── Arrow icon ──────────────────────────────────────────── */
function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

/* ── Main Footer ─────────────────────────────────────────── */
export default function Footer() {
  const clock = useLiveClock();
  const [copied, setCopied] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  /* ── Choreographed entrance ──────────────────────────── */
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const allTargets = '.ftr-tagline, .ftr-rule, .ftr-col, .ftr-bottom';
    if (prefersReducedMotion) {
      gsap.set(el.querySelectorAll(allTargets), { opacity: 1, y: 0, x: 0, scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });

      // Tagline fades up
      tl.fromTo(
        '.ftr-tagline',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      );

      // Rule grows from left
      tl.fromTo(
        '.ftr-rule',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3',
      );

      // Columns stagger up
      tl.fromTo(
        '.ftr-col',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', clearProps: 'transform' },
        '-=0.4',
      );

      // Bottom bar
      tl.fromTo(
        '.ftr-bottom',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.2',
      );
    }, el);

    return () => ctx.revert();
  }, []);

  async function handleCopyEmail() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(FOOTER.email);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = FOOTER.email;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <footer
      ref={footerRef}
      className="relative"
      style={{ background: 'var(--accent)' }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        {/* ── Closing tagline ───────────────────────────── */}
        <div className="pb-10 pt-14 md:pb-12 md:pt-20">
          <p className="ftr-tagline max-w-xl font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold leading-snug text-white">
            Your evening brief is my morning priority.
          </p>
        </div>

        {/* ── Divider ───────────────────────────────────── */}
        <div className="ftr-rule h-px bg-white/15" />

        {/* ── Three-column grid ─────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-2 md:grid-cols-3 md:gap-16 md:py-14">
          {/* Col 1: Brand */}
          <div className="ftr-col">
            <div className="flex items-center gap-3">
              <LogoIcon />
              <span className="font-mono text-sm font-medium text-white">
                Noah Williams
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {FOOTER.brandDescription}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${FOOTER.email}`}
                className="inline-flex items-center font-mono text-xs text-white transition-colors hover:text-white/80"
              >
                {FOOTER.email}
              </a>
              <button
                onClick={handleCopyEmail}
                aria-live="polite"
                className={`rounded border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-all duration-200 active:scale-[0.97] ${
                  copied
                    ? 'border-white text-white bg-white/10'
                    : 'border-white/30 text-white/50 hover:border-white/60 hover:text-white'
                }`}
              >
                {copied ? '\u2713 Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="ftr-col">
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
              Navigation
            </span>
            <ul className="flex flex-col gap-0.5">
              {SITE_SETTINGS.footerNav.map((link) => (
                <li key={link.label}>
                  <TransitionLink
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 py-1.5 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-50" />
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div className="ftr-col">
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
              Connect
            </span>

            {/* Book a Call CTA */}
            <a
              href={CAL_COM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-1 inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-4 py-2.5 font-mono text-xs text-white transition-all duration-200 hover:border-white/50 hover:bg-white/15"
            >
              <span className="size-1.5 rounded-full bg-white" />
              Book a Strategy Call
              <ArrowUpRight className="size-3 opacity-50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Status + timezone */}
            <div className="mt-5 flex items-center gap-2.5 rounded-md border border-white/15 bg-white/5 px-3 py-2">
              <StatusDot status={clock.status} />
              <span className="font-mono text-[11px] tabular-nums text-white/80">
                {clock.bkkTime || '--:--'}
              </span>
              <span className="font-mono text-[11px] text-white/50">
                Bangkok
              </span>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────── */}
        <div className="ftr-bottom flex flex-col gap-4 border-t border-white/15 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <LogoIcon size={16} />
            <span className="font-mono text-[11px] text-white/50">
              {FOOTER.copyright}
            </span>
          </div>
          <MagneticButton>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
              className="group flex size-9 items-center justify-center rounded border border-white/30 text-white/50 transition-all hover:border-white/60 hover:text-white active:scale-95 active:duration-100"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
                className="size-3.5 transition-transform duration-200 group-hover:animate-[arrowBounce_0.6s_ease-in-out_infinite]"
              >
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
              </svg>
            </button>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
