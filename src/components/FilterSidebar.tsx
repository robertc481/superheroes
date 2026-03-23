"use client";

import {
  buildQueryString,
  parseFilterState,
  recordFromReadonlySearchParams,
} from "@/lib/urlState";
import type { CharacterType, FilterState, PowerType, Universe } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactElement } from "react";

function handleEnterAsClick(e: KeyboardEvent<HTMLInputElement>): void {
  if (e.key === "Enter") {
    e.currentTarget.click();
  }
}

const POWER_OPTIONS: PowerType[] = [
  "Strength",
  "Speed",
  "Intelligence",
  "Magic",
];
const UNIVERSE_OPTIONS: Universe[] = ["Marvel", "DC"];

export function FilterSidebar({
  currentFilters,
  currentSearch,
}: {
  currentFilters: FilterState;
  currentSearch: string;
}): ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  const pushFilters = useCallback(
    (next: FilterState, search: string): void => {
      const qs = buildQueryString(next, search);
      router.push(`/${qs}`, { scroll: false });
    },
    [router],
  );

  const readFiltersFromUrl = useCallback((): FilterState => {
    return parseFilterState(recordFromReadonlySearchParams(searchParams));
  }, [searchParams]);

  const readSearchFromUrl = useCallback((): string => {
    return searchParams.get("search") ?? "";
  }, [searchParams]);

  const effectiveFilters: FilterState = readFiltersFromUrl();

  const togglePower = useCallback(
    (power: PowerType): void => {
      const base = readFiltersFromUrl();
      const nextPowers = base.powers.includes(power)
        ? base.powers.filter((p) => p !== power)
        : [...base.powers, power];
      pushFilters(
        { ...base, powers: nextPowers },
        readSearchFromUrl(),
      );
    },
    [pushFilters, readFiltersFromUrl, readSearchFromUrl],
  );

  const toggleUniverse = useCallback(
    (universe: Universe): void => {
      const base = readFiltersFromUrl();
      const nextUniverses = base.universes.includes(universe)
        ? base.universes.filter((u) => u !== universe)
        : [...base.universes, universe];
      pushFilters(
        { ...base, universes: nextUniverses },
        readSearchFromUrl(),
      );
    },
    [pushFilters, readFiltersFromUrl, readSearchFromUrl],
  );

  const setType = useCallback(
    (type: CharacterType | null): void => {
      const base = readFiltersFromUrl();
      pushFilters({ ...base, type }, readSearchFromUrl());
    },
    [pushFilters, readFiltersFromUrl, readSearchFromUrl],
  );

  const clearAll = useCallback((): void => {
    router.push("/", { scroll: false });
    setMobileOpen(false);
  }, [router]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const prev = document.activeElement as HTMLElement | null;
    sheetRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      prev?.focus();
    };
  }, [mobileOpen]);

  // Suppress unused-var lint: server props serve as the SSR-rendered initial
  // state; effectiveFilters from useSearchParams takes over on the client.
  void currentFilters;
  void currentSearch;

  const sidebarInner = (
    <div className="flex h-full flex-col gap-6 p-4 lg:p-0">
      <div className="flex items-center justify-between lg:hidden">
        <h2 className="font-heading text-lg font-bold text-hero-primary dark:text-hero-light">
          Filters
        </h2>
        <button
          type="button"
          className="text-sm font-medium text-hero-secondary"
          onClick={(): void => setMobileOpen(false)}
          aria-label="Close filters"
        >
          Close
        </button>
      </div>

      <fieldset
        className="space-y-2"
        aria-label="Filter by power type"
      >
        <legend className="font-heading text-sm font-semibold text-hero-primary dark:text-hero-light">
          Power type
        </legend>
        {POWER_OPTIONS.map((power) => (
          <label
            key={power}
            className="flex cursor-pointer items-center gap-2 text-sm text-hero-primary dark:text-hero-light"
          >
            <input
              type="checkbox"
              checked={effectiveFilters.powers.includes(power)}
              onChange={(): void => {
                togglePower(power);
              }}
              onKeyDown={handleEnterAsClick}
            />
            {power}
          </label>
        ))}
      </fieldset>

      <fieldset
        className="space-y-2"
        aria-label="Filter by universe"
      >
        <legend className="font-heading text-sm font-semibold text-hero-primary dark:text-hero-light">
          Universe
        </legend>
        {UNIVERSE_OPTIONS.map((universe) => (
          <label
            key={universe}
            className="flex cursor-pointer items-center gap-2 text-sm text-hero-primary dark:text-hero-light"
          >
            <input
              type="checkbox"
              checked={effectiveFilters.universes.includes(universe)}
              onChange={(): void => {
                toggleUniverse(universe);
              }}
              onKeyDown={handleEnterAsClick}
            />
            {universe}
          </label>
        ))}
      </fieldset>

      <fieldset
        className="space-y-2"
        aria-label="Filter by character type"
      >
        <legend className="font-heading text-sm font-semibold text-hero-primary dark:text-hero-light">
          Character type
        </legend>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-hero-primary dark:text-hero-light">
          <input
            type="radio"
            name="character-type"
            checked={effectiveFilters.type === null}
            onChange={(): void => setType(null)}
            onKeyDown={handleEnterAsClick}
          />
          All
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-hero-primary dark:text-hero-light">
          <input
            type="radio"
            name="character-type"
            checked={effectiveFilters.type === "hero"}
            onChange={(): void => setType("hero")}
            onKeyDown={handleEnterAsClick}
          />
          Hero
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-hero-primary dark:text-hero-light">
          <input
            type="radio"
            name="character-type"
            checked={effectiveFilters.type === "villain"}
            onChange={(): void => setType("villain")}
            onKeyDown={handleEnterAsClick}
          />
          Villain
        </label>
      </fieldset>

      <button
        type="button"
        className="rounded-lg border border-hero-secondary px-3 py-2 text-sm font-medium text-hero-secondary hover:bg-hero-secondary/10"
        onClick={clearAll}
        aria-label="Clear all filters"
      >
        Clear all filters
      </button>
    </div>
  );

  return (
    <>
      <div className="mb-4 lg:hidden">
        <button
          type="button"
          className="w-full rounded-lg bg-hero-primary px-4 py-2 text-sm font-medium text-white dark:bg-hero-secondary"
          aria-expanded={mobileOpen}
          aria-controls="filter-sheet"
          onClick={(): void => setMobileOpen(true)}
          aria-label="Open filters"
        >
          Filters
        </button>
      </div>

      <aside
        className="hidden lg:block lg:w-[280px] lg:shrink-0"
        aria-label="Character filters"
      >
        {sidebarInner}
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close filter overlay"
            onClick={(): void => setMobileOpen(false)}
          />
          <div
            ref={sheetRef}
            id="filter-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Character filters"
            tabIndex={-1}
            className="absolute left-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-white shadow-xl outline-none dark:bg-hero-dark"
          >
            {sidebarInner}
          </div>
        </div>
      ) : null}
    </>
  );
}
