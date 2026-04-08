import type { ReactNode } from 'react';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import Concierge from '@/components/layout/Concierge';
import PageTransition from '@/components/layout/PageTransition';
import { TransitionProvider } from '@/components/layout/TransitionContext';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <TransitionProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-accent focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main-content" className="flex-1">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
      <Concierge />
    </TransitionProvider>
  );
}
