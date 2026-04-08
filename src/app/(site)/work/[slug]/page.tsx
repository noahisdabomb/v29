import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CASE_STUDIES } from '@/lib/content';
import CaseStudyContent from '@/components/sections/CaseStudyContent';

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) return { title: 'Work | Noah Williams' };

  return {
    title: `${study.client} | Noah Williams | Creative Director`,
    description: study.tagline,
    openGraph: {
      title: `${study.client} | ${study.tagline}`,
      description: study.shortOutcome,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES.find((s) => s.slug === slug);

  if (!caseStudy) notFound();

  const currentIndex = CASE_STUDIES.findIndex((s) => s.slug === slug);
  const nextStudy = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length] || null;

  return (
    <div className="min-h-screen bg-bg-deep">
      <CaseStudyContent caseStudy={caseStudy} nextStudy={nextStudy} />
    </div>
  );
}
