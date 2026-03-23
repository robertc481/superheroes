import { SkeletonCard } from "@/components/SkeletonCard";
import type { ReactElement } from "react";

export default function FavoritesLoading(): ReactElement {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, i) => (
        <SkeletonCard key={`fav-sk-${i}`} />
      ))}
    </div>
  );
}
