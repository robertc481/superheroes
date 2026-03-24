import { CHARACTER_TYPES, type CharacterType, type FilterState } from "@/features/characters/types";
import type { ReactElement } from "react";

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function TypeFilter({
  filters,
  onSetType,
}: {
  filters: FilterState;
  onSetType: (type: CharacterType | null) => void;
}): ReactElement {
  return (
    <fieldset className="space-y-2" aria-label="Filter by character type">
      <legend className="font-heading text-sm font-semibold text-hero-primary dark:text-hero-light">
        Character type
      </legend>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-hero-primary dark:text-hero-light">
        <input
          type="radio"
          name="character-type"
          checked={filters.type === null}
          onChange={(): void => onSetType(null)}
        />
        All
      </label>
      {CHARACTER_TYPES.map((t) => (
        <label
          key={t}
          className="flex cursor-pointer items-center gap-2 text-sm text-hero-primary dark:text-hero-light"
        >
          <input
            type="radio"
            name="character-type"
            checked={filters.type === t}
            onChange={(): void => onSetType(t)}
          />
          {capitalize(t)}
        </label>
      ))}
    </fieldset>
  );
}
