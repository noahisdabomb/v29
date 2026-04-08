'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal, StaggerReveal } from '@/components/ui/ScrollReveal';
import ScrambleLabel from '@/components/ui/ScrambleLabel';
import Testimonial from '@/components/sections/Testimonial';
import TransitionLink from '@/components/layout/TransitionLink';
import {
  HOW_I_WORK,
  SCALE,
  SCALE_ITEMS,
  OVERNIGHT_TESTIMONIAL,
  PRICING_TIERS,
  CAL_COM_URL,
} from '@/lib/content';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* FAQ Accordion Item                                                  */
/* ------------------------------------------------------------------ */
function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (isOpen) {
      const height = innerRef.current?.scrollHeight ?? 0;
      gsap.to(el, {
        height,
        opacity: 1,
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: prefersReducedMotion ? 0 : 0.25,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-white/[0.06]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-accent"
        aria-expanded={isOpen}
      >
        <h3 className="font-heading text-lg font-semibold text-text-primary md:text-xl">
          {question}
        </h3>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`size-5 shrink-0 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div ref={innerRef} className="pb-6">
          <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Page Content                                                   */
/* ------------------------------------------------------------------ */
export default function HowIWorkContent() {
  const heroRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState(0);

  const page = HOW_I_WORK;

  // Hero word-by-word reveal
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const words = el.querySelectorAll('.hiw-word');
    const summary = el.querySelector('[data-hiw-summary]');
    const targets = [...Array.from(words), summary].filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({ delay: 0.15 });

    tl.from(words, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power4.out',
      immediateRender: false,
    }).from(
      summary,
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        immediateRender: false,
      },
      '-=0.3',
    );

    return () => {
      tl.kill();
      gsap.set(targets, { opacity: 1, y: 0 });
    };
  }, []);

  // Open first FAQ on mount
  useEffect(() => {
    setOpenFaq(0);
  }, []);

  return (
    <div className="min-h-screen bg-bg-deep">
      {/* ============================================================ */}
      {/* Hero                                                         */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="px-6 pb-16 pt-32 md:px-12 md:pb-20 md:pt-40"
        data-concierge-section="how-i-work-hero"
        data-concierge-label="How I Work Overview"
      >
        <div className="mx-auto max-w-[1200px]">
          <ScrambleLabel className="mb-6 block font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {page.sectionLabel}
          </ScrambleLabel>

          {/* Accent rule below label */}
          <div className="mb-8 h-px w-16 bg-accent/40" aria-hidden="true" />

          <h1 className="max-w-4xl font-heading text-[clamp(2.75rem,6vw,5.5rem)] font-bold leading-[0.98] text-text-primary">
            {page.headline.split(/\s+/).map((word, i) => (
              <span key={i}>
                <span className="inline-block align-top">
                  <span className="hiw-word inline-block">{word}</span>
                </span>{' '}
              </span>
            ))}
          </h1>

          <p
            data-hiw-summary
            className="mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary"
          >
            {page.summary}
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Principles — editorial numbered list (elevated bg)           */}
      {/* ============================================================ */}
      <section
        className="bg-bg-card px-6 py-20 md:px-12 md:py-28"
        data-concierge-section="principles"
        data-concierge-label="Working Principles"
      >
        <div className="mx-auto max-w-[1200px]">
          <ScrollReveal>
            <ScrambleLabel className="mb-10 block font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              Principles
            </ScrambleLabel>
          </ScrollReveal>

          <div className="grid gap-0">
            {page.principles.map((principle, i) => (
              <ScrollReveal
                key={principle.title}
                delay={i * 0.08}
              >
                <div className="relative grid gap-6 border-b border-white/[0.06] py-10 first:pt-0 last:border-b-0 md:grid-cols-[100px_1fr] md:gap-10">
                  {/* Large decorative number */}
                  <span
                    className="font-heading text-[4rem] font-bold leading-none text-accent/[0.07] md:text-[5rem]"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Content */}
                  <div className="md:-mt-3">
                    {/* Small inline number for readability */}
                    <h2 className="font-heading text-xl font-semibold text-text-primary md:text-2xl">
                      {principle.title}
                    </h2>
                    <div className="mt-4 space-y-3">
                      {principle.body.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="max-w-2xl text-base leading-relaxed text-text-secondary"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Testimonial (reusing site-wide component)                    */}
      {/* ============================================================ */}
      <Testimonial testimonial={OVERNIGHT_TESTIMONIAL} />

      {/* ============================================================ */}
      {/* Built to Scale (with radial glow behind cards)               */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden px-6 py-20 md:px-12 md:py-28"
        data-concierge-section="scale"
        data-concierge-label="Built to Scale"
      >
        {/* Subtle radial glow behind cards */}
        <div
          className="pointer-events-none absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
          style={{
            width: '800px',
            height: '600px',
            background: 'radial-gradient(ellipse at center, rgba(224,68,88,0.04) 0%, transparent 70%)',
          }}
        />

        <div className="relative mx-auto max-w-[1200px]">
          <ScrollReveal>
            <ScrambleLabel className="mb-4 block font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              {SCALE.sectionLabel}
            </ScrambleLabel>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="mt-5 max-w-3xl font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-text-primary text-balance">
              {SCALE.headline}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-6 max-w-3xl space-y-4">
              {SCALE.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>

          <StaggerReveal
            className="mt-14 grid gap-8 md:grid-cols-3"
            stagger={0.12}
          >
            {SCALE_ITEMS.map((item) => (
              <article
                key={item.icon}
                className="rounded-2xl border border-border-subtle bg-bg-card p-6 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-border-accent hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
              >
                {/* Larger accent-glow badge */}
                <div className="flex size-14 items-center justify-center rounded-xl bg-accent/[0.08] font-mono text-base font-bold text-accent">
                  {item.icon}
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </article>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FAQ Accordion (elevated bg)                                  */}
      {/* ============================================================ */}
      <section
        className="bg-bg-card px-6 py-20 md:px-12 md:py-28"
        data-concierge-section="faq"
        data-concierge-label="FAQ"
      >
        <div className="mx-auto max-w-[1200px]">
          <ScrollReveal>
            <ScrambleLabel className="mb-10 block font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              FAQ
            </ScrambleLabel>
          </ScrollReveal>

          <StaggerReveal className="max-w-3xl" stagger={0.1}>
            {page.faqs.map((faq, i) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Investment / Pricing                                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden px-6 py-20 md:px-12 md:py-28">
        {/* Radial glow behind featured tier */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3"
          aria-hidden="true"
          style={{
            width: '600px',
            height: '500px',
            background: 'radial-gradient(ellipse at center, rgba(224,68,88,0.035) 0%, transparent 70%)',
          }}
        />

        <div className="relative mx-auto max-w-[1200px]">
          <ScrollReveal>
            <ScrambleLabel className="mb-4 block font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Investment
            </ScrambleLabel>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="mt-4 font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-text-primary text-balance">
              The math works in your favor.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              Every engagement is scoped to your brief. Here&apos;s what the
              typical range looks like.
            </p>
          </ScrollReveal>

          <StaggerReveal
            className="mt-14 grid gap-8 md:grid-cols-3"
            stagger={0.12}
          >
            {PRICING_TIERS.map((tier, i) => {
              const isFeatured = i === 1;
              return (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl border p-8 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 ${
                    isFeatured
                      ? 'border-accent/40 bg-accent/[0.03] shadow-[0_0_40px_rgba(224,68,88,0.06)] hover:border-accent hover:shadow-[0_0_50px_rgba(224,68,88,0.1)]'
                      : 'border-border-subtle bg-bg-card hover:border-border-accent hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
                  }`}
                >
                  {isFeatured && (
                    <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-text-primary">
                      Most common
                    </span>
                  )}
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {tier.timeline}
                  </p>
                  <h3 className="mt-3 font-heading text-xl font-bold text-text-primary">
                    {tier.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                    {tier.description}
                  </p>
                </div>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Closing CTA (elevated bg)                                    */}
      {/* ============================================================ */}
      <section className="bg-bg-card px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1200px] text-center">
          <ScrollReveal>
            <h2 className="mx-auto max-w-2xl font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-text-primary text-balance">
              Ready to move?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
              Book a short strategy call. No pitch deck, no discovery phase. Just a
              straight conversation about fit, scope, and timing.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={CAL_COM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-accent px-8 py-4 font-heading text-base font-semibold text-text-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(224,68,88,0.25)] hover:scale-[1.02] active:scale-[0.98] active:duration-100"
              >
                Book a Strategy Call
              </a>
              <TransitionLink
                href="/work"
                className="inline-flex rounded-full border border-border-subtle px-8 py-4 font-heading text-base font-semibold text-text-primary transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_30px_rgba(224,68,88,0.15)] hover:scale-[1.02] active:scale-[0.98] active:duration-100"
              >
                See the Work
              </TransitionLink>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
