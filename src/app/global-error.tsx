"use client";

import { useEffect, type ReactElement } from "react";

export default function GlobalError({
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
    <html lang="en">
      {/* Hardcoded colours mirror globals.css --color-hero-* tokens; this page cannot rely on Tailwind being loaded. */}
      <body className="flex min-h-screen items-center justify-center bg-[#e0e7ef] p-6 text-[#1e3a5f] antialiased dark:bg-[#0d1b2a] dark:text-[#e0e7ef]">
        <div className="mx-auto max-w-lg rounded-xl border border-[#c62828]/40 bg-white p-8 text-center shadow-lg dark:bg-[#0d1b2a]">
          <h1 className="text-xl font-bold">We couldn&apos;t load this view</h1>
          <p className="mt-3 text-sm opacity-80">
            The roster had trouble rendering. Your filters are still in the URL; try again or
            return home from the header.
          </p>
          <button
            type="button"
            className="mt-6 rounded-lg bg-[#c62828] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            onClick={(): void => {
              reset();
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
