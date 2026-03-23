import { handleEnterAsClick } from "@/lib/keyboard";
import type { CharacterType, FilterState } from "@/types";
import type { ReactElement } from "react";

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
          onKeyDown={handleEnterAsClick}
        />
        All
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-hero-primary dark:text-hero-light">
        <input
          type="radio"
          name="character-type"
          checked={filters.type === "hero"}
          onChange={(): void => onSetType("hero")}
          onKeyDown={handleEnterAsClick}
        />
        Hero
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-hero-primary dark:text-hero-light">
        <input
          type="radio"
          name="character-type"
          checked={filters.type === "villain"}
          onChange={(): void => onSetType("villain")}
          onKeyDown={handleEnterAsClick}
        />
        Villain
      </label>
    </fieldset>
  );
}
