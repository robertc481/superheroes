export type PowerType = "Strength" | "Speed" | "Intelligence" | "Magic";
export type Universe = "Marvel" | "DC";
export type CharacterType = "hero" | "villain";

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
  | { status: "empty" }
  | { status: "error"; message: string };
