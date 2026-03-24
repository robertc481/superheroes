/**
 * @jest-environment jsdom
 */
import { FavoriteButton } from "@/features/favorites/components/FavoriteButton";
import { useFavoritesStore } from "@/features/favorites/store/favorites";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/features/favorites/hooks/useStoreHydration", () => ({
  useStoreHydration: (): boolean => true,
}));

describe("FavoriteButton", () => {
  beforeEach(() => {
    localStorage.clear();
    useFavoritesStore.setState({ favoriteIds: [] });
  });

  it("adds character id to favorites on click", async () => {
    const user = userEvent.setup();

    render(<FavoriteButton characterId="batman" characterName="Batman" />);

    await user.click(
      screen.getByRole("button", { name: /Add Batman to favorites/i }),
    );

    expect(useFavoritesStore.getState().favoriteIds).toContain("batman");
  });

  it("removes character id from favorites on second click", async () => {
    const user = userEvent.setup();
    useFavoritesStore.setState({ favoriteIds: ["batman"] });

    render(<FavoriteButton characterId="batman" characterName="Batman" />);

    await user.click(
      screen.getByRole("button", { name: /Remove Batman from favorites/i }),
    );

    expect(useFavoritesStore.getState().favoriteIds).not.toContain("batman");
  });
});
