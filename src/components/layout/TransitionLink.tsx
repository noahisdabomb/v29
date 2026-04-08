'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTransitionContext } from '@/components/layout/TransitionContext';
import type { ComponentProps, MouseEvent } from 'react';

type TransitionLinkProps = ComponentProps<typeof Link>;

export default function TransitionLink(props: TransitionLinkProps) {
  const { href, onClick, children, ...rest } = props;
  const router = useRouter();
  const pathname = usePathname();
  const { triggerExit, isTransitioning } = useTransitionContext();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Let the original onClick fire if provided
    onClick?.(e as never);

    // Allow cmd/ctrl click for new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    // Resolve href string
    const hrefStr = typeof href === 'string' ? href : href.pathname ?? '/';

    // Skip if navigating to same page or already transitioning
    if (hrefStr === pathname || isTransitioning) {
      e.preventDefault();
      return;
    }

    e.preventDefault();

    triggerExit().then(() => {
      router.push(hrefStr, { scroll: false });
    });
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
