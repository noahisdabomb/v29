import type { Metadata } from 'next';
import Testimonial from '@/components/sections/Testimonial';
import WorkPageContent from '@/components/sections/WorkPageContent';
import {
  CASE_STUDIES,
  toWorkPanels,
  getUniqueSectors,
  CLOSING_TESTIMONIAL,
} from '@/lib/content';

export const metadata: Metadata = {
  title: 'Work | Noah Williams | Creative Director',
  description:
    'Case studies from Coca-Cola, Toyota, Delta, Orangetheory, Visit the USA, and Gila River. Strategy to final files.',
  openGraph: {
    title: 'Work | Noah Williams',
    description:
      'Proof-first case studies for teams who need the work to sell before the meeting is over.',
  },
};

export default function WorkPage() {
  const panels = toWorkPanels(CASE_STUDIES);
  const sectors = getUniqueSectors(CASE_STUDIES);

  return (
    <div className="min-h-screen bg-bg-deep pt-32 md:pt-40">
      <section
        className="mx-auto max-w-[1200px]"
        data-concierge-section="work-hero"
        data-concierge-label="Work Overview"
      >
        <div className="px-6 md:px-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Work
          </span>
          <h1 className="mt-5 max-w-4xl font-heading text-[clamp(2.75rem,6vw,5.5rem)] font-bold leading-[0.98] text-text-primary">
            Proof-first case studies for teams who need the work to sell before the meeting is over.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary">
            Each case study is built to show the strategic turn, the execution
            discipline, and the outcome that made the work matter. Start anywhere.
            The thread is the same.
          </p>
        </div>
      </section>

      <WorkPageContent panels={panels} sectors={sectors} />

      <Testimonial testimonial={CLOSING_TESTIMONIAL} />
    </div>
  );
}
