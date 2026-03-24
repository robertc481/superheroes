import type { ReactElement } from "react";

export function SkeletonCard(): ReactElement {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl border border-hero-primary/10 bg-white shadow-md dark:border-hero-light/10 dark:bg-hero-dark"
      aria-hidden
    >
      <div className="aspect-[3/4] animate-pulse bg-gray-200 dark:bg-gray-700" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-2 flex gap-2">
          <div className="h-6 w-14 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-6 w-14 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="mt-2 space-y-2">
          <div className="h-2 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-2 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
