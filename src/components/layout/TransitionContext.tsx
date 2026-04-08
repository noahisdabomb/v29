'use client';

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';

interface TransitionContextValue {
  /** Whether a page transition is currently playing */
  isTransitioning: boolean;
  /** Ref to the page content wrapper — exit animation targets this */
  contentRef: React.RefObject<HTMLDivElement | null>;
  /** Trigger the exit animation, returns a promise that resolves when exit is done */
  triggerExit: () => Promise<void>;
  /** Mark the transition as complete (called by PageTransition after enter) */
  markComplete: () => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useTransitionContext() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('useTransitionContext must be used within TransitionProvider');
  return ctx;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const resolveRef = useRef<(() => void) | null>(null);

  function triggerExit(): Promise<void> {
    setIsTransitioning(true);
    return new Promise<void>((resolve) => {
      resolveRef.current = resolve;

      // Import GSAP dynamically to keep this module light
      import('gsap').then(({ default: gsap }) => {
        import('@/lib/constants').then(({ PAGE_TRANSITION }) => {
          const el = contentRef.current;
          if (!el) {
            resolve();
            return;
          }

          const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
          ).matches;

          if (prefersReducedMotion) {
            resolve();
            return;
          }

          gsap.to(el, {
            opacity: 0,
            y: -30,
            duration: PAGE_TRANSITION.exitDuration,
            ease: PAGE_TRANSITION.exitEase,
            onComplete: () => {
              resolve();
            },
          });
        });
      });
    });
  }

  function markComplete() {
    setIsTransitioning(false);
    resolveRef.current = null;
  }

  return (
    <TransitionContext value={{ isTransitioning, contentRef, triggerExit, markComplete }}>
      {children}
    </TransitionContext>
  );
}
