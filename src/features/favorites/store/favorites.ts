import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  readonly favoriteIds: readonly string[];
  toggleFavorite: (id: string) => void;
}

export function isFavoriteId(favoriteIds: readonly string[], id: string): boolean {
  return favoriteIds.includes(id);
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favoriteIds: [],
      toggleFavorite: (id: string): void => {
        set((state) => {
          const current = state.favoriteIds;
          if (current.includes(id)) {
            return { favoriteIds: current.filter((fid) => fid !== id) };
          }
          return { favoriteIds: [...current, id] };
        });
      },
    }),
    {
      name: "superhero-favorites",
      skipHydration: true,
      partialize: (s): Pick<FavoritesState, "favoriteIds"> => ({
        favoriteIds: [...s.favoriteIds],
      }),
    },
  ),
);
