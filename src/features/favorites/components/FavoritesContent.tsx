"use client";

import { CharacterGrid } from "@/features/characters/components/CharacterGrid";
import { filterCharactersByFavoriteIds } from "@/features/characters/lib/filterUtils";
import { useStoreHydration } from "@/features/favorites/hooks/useStoreHydration";
import { useFavoritesStore } from "@/features/favorites/store/favorites";
import { EmptyState, SkeletonCard } from "@/shared/components/ui";
import type { Character } from "@/features/characters/types";
import type { ReactElement } from "react";

export function FavoritesContent({
  allCharacters,
}: {
  allCharacters: Character[];
}): ReactElement {
  const favoriteIds = useFavoritesStore((s) => s.favoriteIds);
  const hydrated = useStoreHydration();

  const skeletonCount: number = Math.min(Math.max(allCharacters.length, 1), 6);

  if (!hydrated) {
    return (
      <ul
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        role="list"
      >
        {Array.from({ length: skeletonCount }, (_, i) => (
          <li key={i} className="list-none">
            <SkeletonCard />
          </li>
        ))}
      </ul>
    );
  }

  const favorites: Character[] = filterCharactersByFavoriteIds(
    allCharacters,
    favoriteIds,
  );

  if (favorites.length === 0) {
    return (
      <EmptyState message="No favorites yet. Browse the roster and add some!" />
    );
  }

  return <CharacterGrid characters={favorites} />;
}
