import { handleEnterAsClick } from "@/lib/keyboard";
import { UNIVERSES, type FilterState, type Universe } from "@/types";
import type { ReactElement } from "react";

export function UniverseFilter({
  filters,
  onToggleUniverse,
}: {
  filters: FilterState;
  onToggleUniverse: (universe: Universe) => void;
}): ReactElement {
  return (
    <fieldset className="space-y-2" aria-label="Filter by universe">
      <legend className="font-heading text-sm font-semibold text-hero-primary dark:text-hero-light">
        Universe
      </legend>
      {UNIVERSES.map((universe) => (
        <label
          key={universe}
          className="flex cursor-pointer items-center gap-2 text-sm text-hero-primary dark:text-hero-light"
        >
          <input
            type="checkbox"
            checked={filters.universes.includes(universe)}
            onChange={(): void => {
              onToggleUniverse(universe);
            }}
            onKeyDown={handleEnterAsClick}
          />
          {universe}
        </label>
      ))}
    </fieldset>
  );
}
