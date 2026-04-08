import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-bg-deep px-6 text-center">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        404
      </span>
      <h1 className="mt-4 font-heading text-4xl font-bold text-text-primary md:text-6xl">
        Nothing here but potential
      </h1>
      <p className="mt-4 max-w-md text-lg text-text-secondary">
        This page doesn&apos;t exist, but the work does. Head back and see what
        happens when strategy meets a deadline twelve hours ahead of yours.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-accent px-8 py-4 font-heading text-base font-semibold text-text-primary transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(224,68,88,0.25)] active:scale-[0.98] active:duration-100"
      >
        Back to the work
      </Link>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
        It&apos;s tomorrow in Bangkok. Your campaign could already be started.
      </p>
    </div>
  );
}
