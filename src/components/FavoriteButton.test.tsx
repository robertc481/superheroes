/**
 * @jest-environment jsdom
 */
import { FavoriteButton } from "@/components/FavoriteButton";
import { useFavoritesStore } from "@/store/favorites";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/hooks/useStoreHydration", () => ({
  useStoreHydration: (): boolean => true,
}));

describe("FavoriteButton", () => {
  beforeEach(() => {
    localStorage.clear();
    useFavoritesStore.setState({ favoriteIds: [] });
  });

  it("calls toggleFavorite with character id on click", async () => {
    const user = userEvent.setup();
    const toggle = jest.spyOn(useFavoritesStore.getState(), "toggleFavorite");

    render(<FavoriteButton characterId="batman" characterName="Batman" />);

    await user.click(
      screen.getByRole("button", { name: /Add Batman to favorites/i }),
    );

    expect(toggle).toHaveBeenCalledWith("batman");
  });
});
