"use client";
// CLIENT COMPONENT — reason: next-themes ThemeProvider (context) + Zustand persist.rehydrate in useEffect
import { useFavoritesStore } from "@/store/favorites";
import { ThemeProvider } from "next-themes";
import { useEffect, type ReactNode, type ReactElement } from "react";

export function Providers({ children }: { children: ReactNode }): ReactElement {
  useEffect(() => {
    const result = useFavoritesStore.persist.rehydrate();
    if (result instanceof Promise) {
      result.catch(() => {
        // TODO: wire to error reporting service in production
      });
    }
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
