import type { Metadata } from 'next';
import HowIWorkContent from '@/components/sections/HowIWorkContent';

export const metadata: Metadata = {
  title: 'How I Work | Noah Williams | Creative Director',
  description:
    'Senior creative thinking. Fewer handoffs. A next-day head start. The overnight model explained.',
  openGraph: {
    title: 'How I Work | Noah Williams',
    description:
      'Senior creative thinking. Fewer handoffs. A next-day head start.',
  },
};

export default function HowIWorkPage() {
  return <HowIWorkContent />;
}
