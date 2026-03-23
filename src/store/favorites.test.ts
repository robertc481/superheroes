import { useFavoritesStore } from "@/store/favorites";

describe("useFavoritesStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useFavoritesStore.setState({ favoriteIds: [] });
  });

  it("toggleFavorite adds character id to favoriteIds", () => {
    useFavoritesStore.getState().toggleFavorite("batman");
    expect(useFavoritesStore.getState().favoriteIds).toEqual(["batman"]);
    expect(useFavoritesStore.getState().isFavorite("batman")).toBe(true);
  });

  it("toggleFavorite called again removes character id from favoriteIds", () => {
    useFavoritesStore.getState().toggleFavorite("batman");
    useFavoritesStore.getState().toggleFavorite("batman");
    expect(useFavoritesStore.getState().favoriteIds).toEqual([]);
    expect(useFavoritesStore.getState().isFavorite("batman")).toBe(false);
  });

  it("persists state to localStorage under key superhero-favorites", () => {
    useFavoritesStore.getState().toggleFavorite("thor");
    const raw = localStorage.getItem("superhero-favorites");
    expect(raw).not.toBeNull();
    if (raw === null) {
      throw new Error("expected persisted payload");
    }
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("state" in parsed) ||
      typeof (parsed as { state: unknown }).state !== "object" ||
      (parsed as { state: unknown }).state === null
    ) {
      throw new Error("unexpected persist shape");
    }
    const state = (parsed as { state: { favoriteIds?: string[] } }).state;
    expect(state.favoriteIds).toEqual(["thor"]);
  });
});
