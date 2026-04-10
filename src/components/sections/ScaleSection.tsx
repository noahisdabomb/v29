import { SCALE, SCALE_ITEMS, CAL_COM_URL } from '@/lib/content';
import { ScrollReveal, StaggerReveal } from '@/components/ui/ScrollReveal';
import ScrambleLabel from '@/components/ui/ScrambleLabel';
import Button from '@/components/ui/Button';

export default function ScaleSection() {
  return (
    <section
      className="relative bg-bg-deep py-32 md:py-48"
      id="scale"
      aria-label="Built to Scale"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column */}
          <ScrollReveal>
            <ScrambleLabel className="mb-4 block font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {SCALE.sectionLabel}
            </ScrambleLabel>
            <h2 className="font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-text-primary text-balance">
              {SCALE.headline}
            </h2>
            {SCALE.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="mt-6 text-base leading-relaxed text-text-secondary"
              >
                {paragraph}
              </p>
            ))}

          </ScrollReveal>

          {/* Right column -- scale items */}
          <StaggerReveal className="flex flex-col gap-10" stagger={0.1} start="top 80%">
            {SCALE_ITEMS.map((item) => (
              <div key={item.icon} className="flex gap-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border-subtle font-mono text-sm font-bold text-accent">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold text-text-primary">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>

        <div className="mt-12 flex justify-center md:justify-start">
          <Button as="a" href={CAL_COM_URL} target="_blank" rel="noopener noreferrer" size="lg">
            Book a Strategy Call
          </Button>
        </div>
      </div>
    </section>
  );
}
