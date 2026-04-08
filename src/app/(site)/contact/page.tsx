import type { Metadata } from 'next';
import { CONTACT_PAGE } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact | Noah Williams | Creative Director',
  description:
    "Let's talk about the brief before it gets watered down. Book a strategy call or email directly.",
  openGraph: {
    title: 'Contact | Noah Williams',
    description:
      "Let's talk about the brief before it gets watered down.",
  },
};

export default function ContactPage() {
  const contact = CONTACT_PAGE;

  return (
    <div className="min-h-screen bg-bg-deep px-6 pb-24 pt-32 md:px-12 md:pt-40">
      <div className="mx-auto max-w-[1200px]">
        <section
          data-concierge-section="contact-overview"
          data-concierge-label="Contact Overview"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {contact.sectionLabel}
          </span>
          <h1 className="mt-5 max-w-4xl font-heading text-[clamp(2.75rem,6vw,5.5rem)] font-bold leading-[0.98] text-text-primary">
            {contact.headline}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary">
            {contact.subline}
          </p>
        </section>

        <section
          className="mt-16"
          data-concierge-section="contact-details"
          data-concierge-label="Contact Details"
        >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contact.details.map((detail) => (
            <div
              key={detail.label}
              className="rounded-lg border border-border-subtle bg-bg-card p-6 transition-[transform,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-border-accent"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
                {detail.label}
              </span>
              <p className="mt-3 font-heading text-base font-semibold text-text-primary">
                {detail.value}
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                {detail.description}
              </p>
            </div>
          ))}
        </div>
        </section>

        <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={contact.primaryCta.href}
            target={contact.primaryCta.external ? '_blank' : undefined}
            rel={contact.primaryCta.external ? 'noopener noreferrer' : undefined}
            className="inline-flex rounded-full bg-accent px-8 py-4 font-heading text-base font-semibold text-text-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(224,68,88,0.25)] hover:scale-[1.02] active:scale-[0.98] active:duration-100"
          >
            {contact.primaryCta.label}
          </a>
          <a
            href={contact.secondaryCta.href}
            className="inline-flex rounded-full border border-border-subtle px-8 py-4 font-heading text-base font-semibold text-text-primary transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_30px_rgba(224,68,88,0.15)] hover:scale-[1.02] active:scale-[0.98] active:duration-100"
          >
            {contact.secondaryCta.label}
          </a>
        </div>

        <p className="mt-6 text-center text-sm text-text-tertiary">
          Or email noah@noahisdabomb.com
        </p>
      </div>
    </div>
  );
}
