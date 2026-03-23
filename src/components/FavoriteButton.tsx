"use client";

import { useStoreHydration } from "@/hooks/useStoreHydration";
import { useFavoritesStore } from "@/store/favorites";
import type { ReactElement } from "react";

export function FavoriteButton({
  characterId,
  characterName,
}: {
  characterId: string;
  characterName: string;
}): ReactElement {
  const isFavorite: boolean = useFavoritesStore((s) => s.isFavorite(characterId));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const hydrated = useStoreHydration();

  const pressed: boolean = hydrated && isFavorite;

  return (
    <button
      type="button"
      className="cursor-pointer rounded-full border border-hero-primary/30 bg-white/90 p-2 text-hero-secondary shadow-sm backdrop-blur hover:bg-white dark:border-hero-light/20 dark:bg-hero-dark/90 dark:text-hero-accent"
      aria-label={
        pressed
          ? `Remove ${characterName} from favorites`
          : `Add ${characterName} to favorites`
      }
      aria-pressed={pressed}
      onClick={(): void => {
        toggleFavorite(characterId);
      }}
    >
      <span className="sr-only">Favorite</span>
      <span aria-hidden className="text-lg leading-none">
        {pressed ? "♥" : "♡"}
      </span>
    </button>
  );
}
