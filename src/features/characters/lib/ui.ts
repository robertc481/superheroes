import type { CharacterType, Universe } from "@/features/characters/types";

export function scoreBadgeClass(score: number): string {
  if (score >= 8) {
    return "bg-green-600 text-white dark:bg-green-500";
  }
  if (score >= 5) {
    return "bg-amber-500 text-amber-950 dark:bg-amber-400 dark:text-amber-950";
  }
  return "bg-red-600 text-white dark:bg-red-500";
}

export function universeBadgeColorClass(universe: Universe): string {
  switch (universe) {
    case "Marvel":
      return "bg-red-700/90 text-white";
    case "DC":
      return "bg-blue-700/90 text-white";
  }
}

export function typeBadgeColorClass(type: CharacterType): string {
  switch (type) {
    case "hero":
      return "bg-emerald-700/90 text-white";
    case "villain":
      return "bg-rose-700/90 text-white";
  }
}
