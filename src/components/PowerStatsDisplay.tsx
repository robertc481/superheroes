import type { PowerStats } from "@/types";
import type { ReactElement } from "react";

const LABELS: { key: keyof PowerStats; label: string }[] = [
  { key: "strength", label: "Strength" },
  { key: "speed", label: "Speed" },
  { key: "intelligence", label: "Intelligence" },
  { key: "magic", label: "Magic" },
];

export function PowerStatsDisplay({ stats }: { stats: PowerStats }): ReactElement {
  return (
    <div className="space-y-3">
      {LABELS.map(({ key, label }) => {
        const value = stats[key];
        return (
          <div key={key} className="space-y-1">
            <div className="flex justify-between text-sm font-medium text-hero-primary dark:text-hero-light">
              <span>{label}</span>
              <span>{value}</span>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-hero-light dark:bg-hero-primary/40"
              role="meter"
              aria-label={`${label} power level`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={value}
            >
              <div
                className="h-full rounded-full bg-hero-secondary transition-all dark:bg-hero-accent"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
