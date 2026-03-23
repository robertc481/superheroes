"use client";
// CLIENT COMPONENT — reason: controlled input, useDebounce, useRouter for URL updates
import { useDebounce } from "@/hooks/useDebounce";
import {
  buildQueryString,
  parseFilterState,
  recordFromReadonlySearchParams,
} from "@/lib/urlState";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type ReactElement,
} from "react";

export function SearchBar({ initialQuery }: { initialQuery: string }): ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState<string>(initialQuery);

  useEffect(() => {
    setInputValue(initialQuery);
  }, [initialQuery]);

  const pushSearch = useCallback(
    (query: string): void => {
      const filters = parseFilterState(
        recordFromReadonlySearchParams(searchParams),
      );
      const qs = buildQueryString(filters, query);
      const path = pathname === "/" ? "/" : pathname;
      router.push(`${path}${qs}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const debouncedPush = useDebounce(pushSearch, 300);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const v = e.target.value;
      setInputValue(v);
      debouncedPush(v);
    },
    [debouncedPush],
  );

  const clear = useCallback((): void => {
    setInputValue("");
    pushSearch("");
  }, [pushSearch]);

  return (
    <div className="relative mb-6 w-full" role="search">
      <label htmlFor="character-search" className="sr-only">
        Search characters by name or alias
      </label>
      <input
        id="character-search"
        type="search"
        value={inputValue}
        onChange={onChange}
        placeholder="Search by name or alias…"
        className="w-full rounded-lg border border-hero-primary/25 bg-white px-4 py-2 pr-10 font-body text-hero-primary shadow-sm focus:border-hero-secondary focus:outline-none focus:ring-2 focus:ring-hero-accent/40 dark:border-hero-light/20 dark:bg-hero-dark dark:text-hero-light"
        autoComplete="off"
      />
      {inputValue.length > 0 ? (
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-sm text-hero-secondary hover:bg-hero-light dark:hover:bg-hero-primary/40"
          onClick={clear}
          aria-label="Clear search"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
