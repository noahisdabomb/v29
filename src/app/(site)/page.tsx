import type { Metadata } from 'next';
import ScrollProgress from '@/components/layout/ScrollProgress';
import Hero from '@/components/sections/Hero';
import CredibilityGrid from '@/components/sections/CredibilityGrid';
import CycleSection from '@/components/sections/CycleSection';
import WorkSection from '@/components/sections/WorkSection';
import Testimonial from '@/components/sections/Testimonial';
import AdvantageSection from '@/components/sections/AdvantageSection';
import ContactSection from '@/components/sections/ContactSection';
import { INLINE_TESTIMONIAL, CLOSING_TESTIMONIAL, CAL_COM_URL } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Noah Williams | Freelance Creative Director. Strategy to Final Files.',
  description:
    "Senior freelance creative director. 15 years directing campaigns for Coca-Cola, Toyota, Delta, and Orangetheory. Strategy through final files, held by one person, 12 hours ahead of your timezone.",
  openGraph: {
    title: 'Noah Williams | Freelance Creative Director',
    description:
      "15 years on Coca-Cola, Toyota, and Delta. One senior creative director. Strategy, vision, and final files. Working overnight from Bangkok.",
    url: 'https://noahisdabomb.com',
    siteName: 'Noah Williams',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <div>
        <Hero />
        <CredibilityGrid />
        <CycleSection />
        <div className="h-[60vh]" aria-hidden="true" />
        <div className="relative z-10" style={{ background: 'var(--bg-deep)' }}>
          <WorkSection featured />
          <div className="flex justify-center py-16">
            <a
              href={CAL_COM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-ui text-sm font-medium tracking-wide text-white transition-opacity duration-200 hover:opacity-90"
            >
              Ready to talk? Book 20 minutes
            </a>
          </div>
          <Testimonial testimonial={INLINE_TESTIMONIAL} />
          <AdvantageSection />
          <Testimonial testimonial={CLOSING_TESTIMONIAL} />
          <ContactSection />
        </div>
      </div>
    </>
  );
}
