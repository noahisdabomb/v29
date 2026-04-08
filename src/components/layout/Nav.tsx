'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CAL_COM_URL, SITE_SETTINGS } from '@/lib/content';
import LogoIcon from '@/components/ui/LogoIcon';
import MagneticButton from '@/components/ui/MagneticButton';
import TransitionLink from '@/components/layout/TransitionLink';

function DotGrid({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <circle cx="4" cy="4" r="2.2" />
      <circle cx="12" cy="4" r="2.2" />
      <circle cx="20" cy="4" r="2.2" />
      <circle cx="4" cy="12" r="2.2" />
      <circle cx="12" cy="12" r="2.2" />
      <circle cx="20" cy="12" r="2.2" />
      <circle cx="4" cy="20" r="2.2" />
      <circle cx="12" cy="20" r="2.2" />
      <circle cx="20" cy="20" r="2.2" />
    </svg>
  );
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const pathname = usePathname();

  // Focus the first menu link when the menu opens
  useEffect(() => {
    if (menuOpen && menuRef.current) {
      const firstLink = menuRef.current.querySelector<HTMLElement>('a');
      firstLink?.focus();
    }
  }, [menuOpen]);

  // Return focus to trigger button when menu closes
  useEffect(() => {
    if (wasOpenRef.current && !menuOpen) {
      triggerRef.current?.focus();
    }
    wasOpenRef.current = menuOpen;
  }, [menuOpen]);

  // Close on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Handle focus trap on the last item
  function handleLastItemKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const firstLink = menuRef.current?.querySelector<HTMLElement>('a');
      firstLink?.focus();
    }
  }

  // Handle focus trap on the first item (Shift+Tab wraps to last)
  function handleFirstItemKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      const links = menuRef.current?.querySelectorAll<HTMLElement>('a');
      links?.[links.length - 1]?.focus();
    }
  }

  const navItems = SITE_SETTINGS.primaryNav;
  const resources = [
    { label: 'LinkedIn', href: SITE_SETTINGS.linkedIn },
  ];
  const allItems = [...navItems.map(n => n.label), ...resources.map(r => r.label)];
  const lastLabel = allItems[allItems.length - 1];

  return (
    <>
      {/* Top bar — logo left */}
      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5 md:px-10"
      >
        {/* Logo */}
        <TransitionLink href="/" className="no-underline" aria-label="Noah Williams, home">
          <LogoIcon size={28} />
        </TransitionLink>

      </nav>

      {/* Dot grid trigger — fixed independently so it's always clickable above the panel */}
      <MagneticButton className="fixed top-5 right-6 z-[32] md:right-10">
        <button
          ref={triggerRef}
          className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 py-2 transition-colors duration-200 hover:bg-bg-surface"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
        >
          {!menuOpen && (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary">
              MENU
            </span>
          )}
          <DotGrid className={`transition-transform duration-300 text-text-primary ${menuOpen ? 'rotate-45 scale-90' : ''}`} />
        </button>
      </MagneticButton>

      {/* Backdrop — click to close */}
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Side panel — right-aligned card */}
      <div
        ref={menuRef}
        className={`fixed top-4 right-4 z-[31] w-72 rounded-2xl bg-bg-deep border border-border-subtle shadow-lg transition-all duration-300 origin-top-right ${
          menuOpen
            ? 'scale-100 opacity-100 visible'
            : 'scale-95 opacity-0 invisible pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Top area — room for the dot grid button to overlay */}
        <div className="px-6 pt-16 pb-6">
          {/* Nav links */}
          <div className="flex flex-col gap-1">
            {navItems.map((link, i) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              const isLast = link.label === lastLabel && !resources.length;
              const isFirst = i === 0;

              const commonProps = {
                className: `block py-1 font-heading text-[1.6rem] font-bold leading-tight transition-[color,transform,opacity] duration-300 ${
                  isActive ? 'text-text-tertiary' : 'text-text-primary hover:text-text-secondary hover:translate-x-1'
                } ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`,
                style: { transitionDelay: menuOpen ? `${i * 50 + 80}ms` : '0ms' },
                onClick: () => setMenuOpen(false),
                ...(isFirst ? { onKeyDown: handleFirstItemKeyDown } : {}),
                ...(isLast ? { onKeyDown: handleLastItemKeyDown } : {}),
              };

              return link.href.startsWith('#') || link.href.startsWith('/#') ? (
                <a key={link.label} href={link.href} {...commonProps}>
                  {link.label}
                </a>
              ) : (
                <TransitionLink key={link.label} href={link.href} {...commonProps}>
                  {link.label}
                </TransitionLink>
              );
            })}
          </div>

          {/* Divider + Resources */}
          {resources.length > 0 && (
            <div className="mt-8">
              <div className="mb-4 h-px w-full bg-border-subtle" />
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.25em] text-text-tertiary">
                Resources
              </p>
              <div className="flex flex-col gap-2">
                {resources.map((link) => {
                  const isLast = link.label === lastLabel;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-primary transition-colors duration-200 hover:text-text-secondary"
                      onClick={() => setMenuOpen(false)}
                      {...(isLast ? { onKeyDown: handleLastItemKeyDown } : {})}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
