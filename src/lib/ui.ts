export function scoreBadgeClass(score: number): string {
  if (score >= 8) {
    return "bg-green-600 text-white dark:bg-green-500";
  }
  if (score >= 5) {
    return "bg-amber-500 text-amber-950 dark:bg-amber-400 dark:text-amber-950";
  }
  return "bg-red-600 text-white dark:bg-red-500";
}

export function universeBadgeColorClass(universe: string): string {
  return universe === "Marvel"
    ? "bg-red-700/90 text-white"
    : "bg-blue-700/90 text-white";
}

export function typeBadgeColorClass(type: string): string {
  return type === "hero"
    ? "bg-emerald-700/90 text-white"
    : "bg-rose-700/90 text-white";
}
