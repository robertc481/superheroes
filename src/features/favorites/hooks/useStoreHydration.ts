"use client";

import { useFavoritesStore } from "@/features/favorites/store/favorites";
import { useEffect, useState } from "react";

export function useStoreHydration(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const persist = useFavoritesStore.persist;
    if (persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    return persist.onFinishHydration(() => {
      setHydrated(true);
    });
  }, []);

  return hydrated;
}
