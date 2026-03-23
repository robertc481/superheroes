"use client";

import { FilterSheet } from "@/components/filters/FilterSheet";
import { PowerFilter } from "@/components/filters/PowerFilter";
import { TypeFilter } from "@/components/filters/TypeFilter";
import { UniverseFilter } from "@/components/filters/UniverseFilter";
import {
  buildQueryString,
  parseFilterState,
  recordFromReadonlySearchParams,
} from "@/lib/urlState";
import type { CharacterType, FilterState, PowerType, Universe } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, type ReactElement } from "react";

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
  const [clientNavReady, setClientNavReady] = useState(false);

  useEffect(() => {
    setClientNavReady(true);
  }, []);

  const replaceFilters = useCallback(
    (next: FilterState, search: string): void => {
      const qs = buildQueryString(next, search);
      router.replace(`/${qs}`, { scroll: false });
    },
    [router],
  );

  const readFiltersFromUrl = useCallback((): FilterState => {
    return parseFilterState(recordFromReadonlySearchParams(searchParams));
  }, [searchParams]);

  const readSearchFromUrl = useCallback((): string => {
    return searchParams.get("search") ?? "";
  }, [searchParams]);

  const effectiveFilters: FilterState = useMemo(
    () => (clientNavReady ? readFiltersFromUrl() : currentFilters),
    [clientNavReady, readFiltersFromUrl, currentFilters],
  );

  const togglePower = useCallback(
    (power: PowerType): void => {
      const base = clientNavReady ? readFiltersFromUrl() : currentFilters;
      const search = clientNavReady ? readSearchFromUrl() : currentSearch;
      const nextPowers = base.powers.includes(power)
        ? base.powers.filter((p) => p !== power)
        : [...base.powers, power];
      replaceFilters({ ...base, powers: nextPowers }, search);
    },
    [
      clientNavReady,
      currentFilters,
      currentSearch,
      replaceFilters,
      readFiltersFromUrl,
      readSearchFromUrl,
    ],
  );

  const toggleUniverse = useCallback(
    (universe: Universe): void => {
      const base = clientNavReady ? readFiltersFromUrl() : currentFilters;
      const search = clientNavReady ? readSearchFromUrl() : currentSearch;
      const nextUniverses = base.universes.includes(universe)
        ? base.universes.filter((u) => u !== universe)
        : [...base.universes, universe];
      replaceFilters({ ...base, universes: nextUniverses }, search);
    },
    [
      clientNavReady,
      currentFilters,
      currentSearch,
      replaceFilters,
      readFiltersFromUrl,
      readSearchFromUrl,
    ],
  );

  const setType = useCallback(
    (type: CharacterType | null): void => {
      const base = clientNavReady ? readFiltersFromUrl() : currentFilters;
      const search = clientNavReady ? readSearchFromUrl() : currentSearch;
      replaceFilters({ ...base, type }, search);
    },
    [
      clientNavReady,
      currentFilters,
      currentSearch,
      replaceFilters,
      readFiltersFromUrl,
      readSearchFromUrl,
    ],
  );

  const clearAll = useCallback((): void => {
    const search = clientNavReady ? readSearchFromUrl() : currentSearch;
    const qs = buildQueryString(
      { powers: [], universes: [], type: null },
      search,
    );
    router.replace(`/${qs}`, { scroll: false });
    setMobileOpen(false);
  }, [router, clientNavReady, readSearchFromUrl, currentSearch]);

  const closeSheet = useCallback((): void => setMobileOpen(false), []);

  const sidebarInner = (
    <div className="flex h-full flex-col gap-6 p-4 lg:p-0">
      <div className="flex items-center justify-between lg:hidden">
        <h2 className="font-heading text-lg font-bold text-hero-primary dark:text-hero-light">
          Filters
        </h2>
        <button
          type="button"
          className="text-sm font-medium text-hero-secondary"
          onClick={closeSheet}
          aria-label="Close filters"
        >
          Close
        </button>
      </div>

      <PowerFilter filters={effectiveFilters} onTogglePower={togglePower} />
      <UniverseFilter filters={effectiveFilters} onToggleUniverse={toggleUniverse} />
      <TypeFilter filters={effectiveFilters} onSetType={setType} />

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

      <FilterSheet open={mobileOpen} onClose={closeSheet}>
        {sidebarInner}
      </FilterSheet>
    </>
  );
}
