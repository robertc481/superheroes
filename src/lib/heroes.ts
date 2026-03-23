import raw from "@/data/characters.json";
import { charactersFileSchema } from "@/lib/charactersSchema";
import type { Character, CharacterType, FilterState, PowerType, Universe } from "@/types";

const parsed = charactersFileSchema.safeParse(raw);
if (!parsed.success) {
  throw new Error(`Character data failed validation: ${parsed.error.message}`);
}

export const ALL_CHARACTERS: Character[] = parsed.data.items;

export const CHARACTER_BY_ID: ReadonlyMap<string, Character> = new Map(
  ALL_CHARACTERS.map((c) => [c.id, c]),
);

function characterHasAllPowers(character: Character, selected: PowerType[]): boolean {
  return selected.every((p) => character.powers.includes(p));
}

function characterMatchesUniverse(character: Character, selected: Universe[]): boolean {
  return selected.includes(character.universe);
}

function characterMatchesType(character: Character, type: CharacterType | null): boolean {
  if (type === null) {
    return true;
  }
  return character.type === type;
}

export function filterHeroes(characters: Character[], filters: FilterState): Character[] {
  return characters.filter((character) => {
    const powersActive = filters.powers.length > 0;
    const universesActive = filters.universes.length > 0;

    if (powersActive && !characterHasAllPowers(character, filters.powers)) {
      return false;
    }
    if (universesActive && !characterMatchesUniverse(character, filters.universes)) {
      return false;
    }
    if (!characterMatchesType(character, filters.type)) {
      return false;
    }
    return true;
  });
}

export function searchHeroes(characters: Character[], query: string): Character[] {
  const trimmed = query.trim();
  if (trimmed.length === 0) {
    return characters;
  }
  const lower = trimmed.toLowerCase();
  return characters.filter((character) => {
    if (character.name.toLowerCase().includes(lower)) {
      return true;
    }
    return character.aliases.some((alias) => alias.toLowerCase().includes(lower));
  });
}

export function getVisibleHeroes(
  characters: Character[],
  filters: FilterState,
  query: string,
): Character[] {
  return searchHeroes(filterHeroes(characters, filters), query);
}
