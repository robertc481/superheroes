"use client";

import { useEffect, type ReactElement } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): ReactElement {
  useEffect(() => {
    // TODO: replace with error reporting service (e.g. Sentry) in production
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg rounded-xl border border-hero-secondary/40 bg-white p-8 text-center shadow-lg dark:bg-hero-dark">
      <h1 className="font-heading text-xl font-bold text-hero-primary dark:text-hero-light">
        We couldn&apos;t load this view
      </h1>
      <p className="mt-3 font-body text-sm text-hero-primary/80 dark:text-hero-light/80">
        The roster had trouble rendering. Your filters are still in the URL; try again or
        return home from the header.
      </p>
      <button
        type="button"
        className="mt-6 rounded-lg bg-hero-secondary px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        onClick={(): void => {
          reset();
        }}
      >
        Try again
      </button>
    </div>
  );
}
