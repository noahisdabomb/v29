'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-bg-deep px-6 text-center">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        Error
      </span>
      <h1 className="mt-4 font-heading text-4xl font-bold text-text-primary md:text-6xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-lg text-text-secondary">
        An unexpected error occurred. Try again or head back to the homepage.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <button
          onClick={reset}
          className="inline-flex rounded-full bg-accent px-8 py-4 font-heading text-base font-semibold text-text-primary transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(224,68,88,0.25)] active:scale-[0.98] active:duration-100"
        >
          Try again
        </button>
        <a
          href="/"
          className="inline-flex rounded-full border border-border-subtle px-8 py-4 font-heading text-base font-semibold text-text-primary transition-all duration-300 hover:border-accent hover:text-accent hover:scale-[1.02] active:scale-[0.98] active:duration-100"
        >
          Back to home
        </a>
      </div>
    </div>
  );
}
