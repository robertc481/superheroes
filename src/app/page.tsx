import { CharacterGrid } from "@/components/CharacterGrid";
import { EmptyState } from "@/components/EmptyState";
import { FilterSidebar } from "@/components/FilterSidebar";
import { SearchBar } from "@/components/SearchBar";
import { ALL_CHARACTERS, getVisibleHeroes } from "@/lib/heroes";
import {
  parseFilterState,
  parseSearchQuery,
} from "@/lib/urlState";
import type { FilterResult } from "@/types";
import { Suspense, type ReactElement } from "react";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<ReactElement> {
  const sp = await searchParams;
  const filterState = parseFilterState(sp);
  const searchQuery = parseSearchQuery(sp);
  const visible = getVisibleHeroes(ALL_CHARACTERS, filterState, searchQuery);

  const filterResult: FilterResult =
    visible.length === 0
      ? { status: "empty" }
      : { status: "results", characters: visible };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
      <Suspense
        fallback={
          <div
            className="hidden lg:block lg:w-[280px] lg:shrink-0"
            aria-hidden
          >
            <div className="h-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
        }
      >
        <FilterSidebar
          currentFilters={filterState}
          currentSearch={searchQuery}
        />
      </Suspense>
      <div>
        <Suspense
          fallback={
            <div className="mb-6 h-10 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          }
        >
          <SearchBar initialQuery={searchQuery} />
        </Suspense>
        {filterResult.status === "results" ? (
          <CharacterGrid characters={filterResult.characters} />
        ) : (
          <EmptyState message="No characters match your filters." />
        )}
      </div>
    </div>
  );
}
