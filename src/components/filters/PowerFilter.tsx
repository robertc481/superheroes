import { handleEnterAsClick } from "@/lib/keyboard";
import { POWER_TYPES, type FilterState, type PowerType } from "@/types";
import type { ReactElement } from "react";

export function PowerFilter({
  filters,
  onTogglePower,
}: {
  filters: FilterState;
  onTogglePower: (power: PowerType) => void;
}): ReactElement {
  return (
    <fieldset className="space-y-2" aria-label="Filter by power type">
      <legend className="font-heading text-sm font-semibold text-hero-primary dark:text-hero-light">
        Power type
      </legend>
      {POWER_TYPES.map((power) => (
        <label
          key={power}
          className="flex cursor-pointer items-center gap-2 text-sm text-hero-primary dark:text-hero-light"
        >
          <input
            type="checkbox"
            checked={filters.powers.includes(power)}
            onChange={(): void => {
              onTogglePower(power);
            }}
            onKeyDown={handleEnterAsClick}
          />
          {power}
        </label>
      ))}
    </fieldset>
  );
}
