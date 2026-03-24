import type { Character } from "@/features/characters/types";

export function filterCharactersByFavoriteIds(
  characters: Character[],
  favoriteIds: readonly string[],
): Character[] {
  if (favoriteIds.length === 0) {
    return [];
  }
  const idSet = new Set<string>(favoriteIds);
  return characters.filter((c) => idSet.has(c.id));
}
