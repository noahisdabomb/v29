import { WORK_HEADER, CASE_STUDIES, toWorkPanels } from '@/lib/content';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import ScrambleLabel from '@/components/ui/ScrambleLabel';
import TransitionLink from '@/components/layout/TransitionLink';
import WorkPanel from './WorkPanel';

interface WorkSectionProps {
  featured?: boolean;
}

export default function WorkSection({ featured }: WorkSectionProps) {
  const studies = featured
    ? CASE_STUDIES.filter((s) => s.featured)
    : CASE_STUDIES;
  const panels = toWorkPanels(studies);

  return (
    <section
      className="relative bg-bg-deep"
      id="work"
      aria-label="Selected Work"
      data-concierge-section="work"
      data-concierge-label="Selected Work"
    >
      {/* Section header */}
      <div className="mx-auto max-w-[1200px] px-6 py-32 md:px-12 md:py-48">
        <ScrollReveal>
          <ScrambleLabel className="mb-4 block font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {WORK_HEADER.sectionLabel}
          </ScrambleLabel>
          <h2 className="max-w-2xl font-heading text-[clamp(2rem,5vw,4rem)] font-bold leading-tight text-text-primary text-balance">
            {WORK_HEADER.headline.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
        </ScrollReveal>
      </div>

      {/* Full-bleed panels */}
      {panels.map((panel) => (
        <WorkPanel key={panel.id} panel={panel} />
      ))}

      {featured && (
        <div className="flex justify-center py-24">
          <TransitionLink
            href="/work"
            className="group inline-flex items-center gap-3 rounded-full border border-border-subtle px-8 py-4 font-mono text-sm uppercase tracking-[0.15em] text-text-primary transition-all hover:border-accent hover:text-accent"
          >
            See all work
            <span className="inline-block transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </TransitionLink>
        </div>
      )}
    </section>
  );
}
