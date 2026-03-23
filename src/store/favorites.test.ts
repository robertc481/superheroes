import { isFavoriteId, useFavoritesStore } from "@/store/favorites";

describe("useFavoritesStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useFavoritesStore.setState({ favoriteIds: [] });
  });

  it("toggleFavorite adds character id to favoriteIds", () => {
    useFavoritesStore.getState().toggleFavorite("batman");
    const { favoriteIds } = useFavoritesStore.getState();
    expect(favoriteIds).toEqual(["batman"]);
    expect(isFavoriteId(favoriteIds, "batman")).toBe(true);
  });

  it("toggleFavorite called again removes character id from favoriteIds", () => {
    useFavoritesStore.getState().toggleFavorite("batman");
    useFavoritesStore.getState().toggleFavorite("batman");
    const { favoriteIds } = useFavoritesStore.getState();
    expect(favoriteIds).toEqual([]);
    expect(isFavoriteId(favoriteIds, "batman")).toBe(false);
  });

  it("persists state to localStorage under key superhero-favorites", () => {
    useFavoritesStore.getState().toggleFavorite("thor");
    const raw = localStorage.getItem("superhero-favorites");
    expect(raw).not.toBeNull();
    if (raw === null) {
      throw new Error("expected persisted payload");
    }
    const parsed = JSON.parse(raw) as { state: { favoriteIds: string[] } };
    expect(parsed.state.favoriteIds).toEqual(["thor"]);
  });
});
