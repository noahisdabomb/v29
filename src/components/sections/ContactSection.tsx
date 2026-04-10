'use client';

import { CONTACT, CAL_COM_URL } from '@/lib/content';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import ScrambleLabel from '@/components/ui/ScrambleLabel';
import Button from '@/components/ui/Button';
import TransitionLink from '@/components/layout/TransitionLink';

export default function ContactSection() {
  return (
    <section
      className="relative bg-bg-deep py-32 md:py-48"
      id="contact"
      aria-label="Contact"
      data-concierge-section="contact"
      data-concierge-label="Contact"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        {/* Section header */}
        <ScrollReveal>
          <ScrambleLabel className="mb-4 block font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {CONTACT.sectionLabel}
          </ScrambleLabel>

          <h2 className="max-w-3xl font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-text-primary text-balance">
            {CONTACT.headline}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary">
            {CONTACT.subline}
          </p>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal className="mt-12">
          <div className="text-center">
            <Button as="a" href={CAL_COM_URL} target="_blank" rel="noopener noreferrer" size="lg">
              Schedule a Conversation
            </Button>

            <div className="mt-6">
              <TransitionLink
                href="/contact"
                className="text-sm text-text-secondary transition-colors duration-200 hover:text-accent"
              >
                See full details &rarr;
              </TransitionLink>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
