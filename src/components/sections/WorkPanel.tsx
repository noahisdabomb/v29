'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { WorkPanel as WorkPanelType } from '@/types';
import StatCounter from '@/components/ui/StatCounter';

gsap.registerPlugin(ScrollTrigger);

interface WorkPanelProps {
  panel: WorkPanelType;
}

export default function WorkPanel({ panel }: WorkPanelProps) {
  const panelRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lazy video play — only play when panel is in viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      },
      { threshold: 0.15 },
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, []);

  // GSAP scroll-driven animations
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    const video = el.querySelector('[data-work-video]');
    const wrap = el.querySelector('[data-work-wrap]');
    const tweens: gsap.core.Tween[] = [];

    // Video wrapper parallax
    if (wrap) {
      tweens.push(
        gsap.fromTo(
          wrap,
          { y: '-4%' },
          {
            y: '4%',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        ),
      );
    }

    // Video slow zoom
    if (video) {
      tweens.push(
        gsap.fromTo(
          video,
          { scale: 1.02 },
          {
            scale: 1.12,
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        ),
      );
    }

    // Content staggered reveal
    const elements = el.querySelectorAll('[data-work-reveal]');
    elements.forEach((child, i) => {
      tweens.push(
        gsap.fromTo(
          child,
          { opacity: 0, y: 30 + i * 5 },
          {
            opacity:
              child.getAttribute('data-work-reveal') === 'number' ? 0.6 : 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: 'top 55%',
              toggleActions: 'play none none reverse',
            },
          },
        ),
      );
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);


  return (
    <a
      ref={panelRef}
      href={panel.href}
      target="_blank"
      rel="noopener noreferrer"
      data-work-panel
      data-work-panel-id={panel.id}
      data-work-panel-title={panel.title.replace(/\n/g, ' ')}
      data-work-panel-sector={panel.sector}
      data-concierge-section="work-panel"
      data-concierge-label={panel.title.replace(/\n/g, ' ')}
      className="group relative flex min-h-[100svh] w-full items-end overflow-hidden supports-[min-height:100dvh]:min-h-dvh"
      aria-label={`View ${panel.title.replace('\n', ' ')} case study`}
    >
      {/* Video background */}
      {panel.videoSrc && (
        <div data-work-wrap className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            data-work-video
            src={panel.videoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            className="size-full object-cover"
          />
        </div>
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5" />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col gap-8 p-8 pb-16 md:flex-row md:items-end md:gap-16 md:p-12 lg:p-16">
        {/* Left column: number, title, tagline, description, tags */}
        <div className="min-w-0 flex-1">
          <span
            data-work-reveal="number"
            className="font-mono text-xs uppercase tracking-[0.2em] text-white/70"
          >
            {panel.number}
          </span>

          <h3
            data-work-reveal="title"
            className="mt-4 font-heading text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] text-white text-balance"
          >
            {panel.title.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h3>

          <p
            data-work-reveal="tagline"
            className="mt-4 text-lg text-white/80 md:text-xl"
          >
            {panel.tagline}
          </p>

          <p
            data-work-reveal="desc"
            className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 md:text-base"
          >
            {panel.description}
          </p>

          <div
            data-work-reveal="tags"
            className="mt-6 flex flex-wrap gap-2"
          >
            {panel.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.1em] text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right column: stats */}
        <div
          data-work-reveal="stats"
          className="flex shrink-0 flex-col gap-6 md:min-w-[160px] md:items-end"
        >
          {panel.stats.map((stat) => (
            <div key={stat.label} className="text-right">
              <StatCounter
                value={stat.value}
                className="font-heading text-3xl font-bold tabular-nums text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] md:text-4xl"
              />
              <div className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-white/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </a>
  );
}
