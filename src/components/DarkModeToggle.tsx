"use client";
// CLIENT COMPONENT — reason: useTheme from next-themes + mounted guard to avoid hydration mismatch
import { useTheme } from "next-themes";
import { useEffect, useState, type ReactElement } from "react";

export function DarkModeToggle(): ReactElement {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // next-themes: defer themed control until client to avoid hydration mismatch
    queueMicrotask(() => {
      setMounted(true);
    });
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="h-9 w-9 rounded-lg border border-hero-primary/30 bg-hero-light/50 dark:bg-hero-dark/50"
        aria-hidden
        disabled
        aria-label="Toggle dark mode"
      />
    );
  }

  const isDark: boolean = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-hero-primary/40 bg-white text-hero-primary shadow-sm transition hover:bg-hero-light dark:border-hero-light/20 dark:bg-hero-dark dark:text-hero-light dark:hover:bg-hero-primary/40"
      aria-pressed={isDark}
      aria-label="Toggle dark mode"
      onClick={(): void => {
        setTheme(isDark ? "light" : "dark");
      }}
    >
      {isDark ? (
        <span className="text-lg" aria-hidden>
          ☀
        </span>
      ) : (
        <span className="text-lg" aria-hidden>
          ☾
        </span>
      )}
    </button>
  );
}
