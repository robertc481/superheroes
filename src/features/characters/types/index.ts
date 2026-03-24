export const POWER_TYPES = [
  "Strength",
  "Speed",
  "Intelligence",
  "Magic",
] as const;
export type PowerType = (typeof POWER_TYPES)[number];

export const UNIVERSES = ["Marvel", "DC"] as const;
export type Universe = (typeof UNIVERSES)[number];

export const CHARACTER_TYPES = ["hero", "villain"] as const;
export type CharacterType = (typeof CHARACTER_TYPES)[number];

export interface PowerStats {
  strength: number;
  speed: number;
  intelligence: number;
  magic: number;
}

export interface Character {
  id: string;
  name: string;
  fullName: string;
  score: number;
  type: CharacterType;
  weakness?: string;
  universe: Universe;
  aliases: string[];
  powers: PowerType[];
  powerStats: PowerStats;
  description: string;
  image: string;
}

export interface FilterState {
  powers: PowerType[];
  universes: Universe[];
  type: CharacterType | null;
}

export type FilterResult =
  | { status: "results"; characters: Character[] }
  | { status: "empty" };
