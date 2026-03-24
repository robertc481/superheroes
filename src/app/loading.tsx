import { SkeletonCard } from "@/shared/components/ui";
import type { ReactElement } from "react";

export default function HomeLoading(): ReactElement {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
      <aside
        className="hidden lg:block lg:w-[280px]"
        aria-hidden
      >
        <div className="space-y-4 rounded-xl border border-hero-primary/10 bg-white/50 p-4 dark:bg-hero-dark/50">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </aside>
      <div>
        <div className="mb-6 h-10 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <SkeletonCard key={`sk-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
