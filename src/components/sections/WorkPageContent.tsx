'use client';

import { useState, useTransition } from 'react';
import WorkPanel from '@/components/sections/WorkPanel';
import type { WorkPanel as WorkPanelType } from '@/types';

interface WorkPageContentProps {
  panels: WorkPanelType[];
  sectors: string[];
}

const ALL = 'All';

export default function WorkPageContent({
  panels,
  sectors,
}: WorkPageContentProps) {
  const [activeSector, setActiveSector] = useState(ALL);
  const [, startTransition] = useTransition();

  const filters = [ALL, ...sectors];

  const filteredPanels =
    activeSector === ALL
      ? panels
      : panels.filter((p) => p.sector === activeSector);

  function handleFilter(sector: string) {
    startTransition(() => {
      setActiveSector(sector);
    });
  }

  return (
    <>
      {/* Filter bar */}
      <div
        className="mx-auto max-w-[1200px] px-6 pt-10 md:px-12"
        data-concierge-section="work-filter"
        data-concierge-label="Work Filter"
      >
        <nav
          aria-label="Filter work by sector"
          className="flex flex-wrap gap-2"
        >
          {filters.map((sector) => {
            const isActive = activeSector === sector;
            return (
              <button
                key={sector}
                type="button"
                onClick={() => handleFilter(sector)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-200 ${
                  isActive
                    ? 'border-accent bg-accent text-text-primary scale-[1.05] shadow-[0_0_16px_rgba(224,68,88,0.2)]'
                    : 'border-border-subtle text-text-secondary hover:border-text-tertiary hover:text-text-primary active:scale-95'
                }`}
              >
                {sector}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Panels */}
      <section
        className="mt-16 flex flex-col"
        data-concierge-section="work-grid"
        data-concierge-label="Work Panels"
      >
        {filteredPanels.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <p className="text-lg text-text-secondary">
              No case studies match that filter.
            </p>
            <button
              type="button"
              onClick={() => setActiveSector(ALL)}
              className="font-mono text-sm text-accent transition-colors hover:text-accent/80"
            >
              Show all work
            </button>
          </div>
        )}
        {filteredPanels.map((panel, i) => (
          <div
            key={panel.id}
            className="animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <WorkPanel panel={panel} />
          </div>
        ))}
      </section>
    </>
  );
}
