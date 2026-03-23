import { SkeletonCard } from "@/components/SkeletonCard";
import type { ReactElement } from "react";

export default function FavoritesLoading(): ReactElement {
  return (
    <div>
      <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <SkeletonCard key={`fav-sk-${i}`} />
        ))}
      </div>
    </div>
  );
}
