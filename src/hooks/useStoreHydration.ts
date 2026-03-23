import { useFavoritesStore } from "@/store/favorites";
import { useEffect, useState } from "react";

export function useStoreHydration(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const persist = useFavoritesStore.persist;
    if (persist.hasHydrated()) {
      queueMicrotask(() => {
        setHydrated(true);
      });
      return;
    }
    return persist.onFinishHydration(() => {
      setHydrated(true);
    });
  }, []);

  return hydrated;
}
