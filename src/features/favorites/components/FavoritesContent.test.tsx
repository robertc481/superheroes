/**
 * @jest-environment jsdom
 */
import { FavoritesContent } from "@/features/favorites/components/FavoritesContent";
import { useStoreHydration } from "@/features/favorites/hooks/useStoreHydration";
import type { Character } from "@/features/characters/types";
import { useFavoritesStore } from "@/features/favorites/store/favorites";
import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";

jest.mock("@/features/favorites/hooks/useStoreHydration");

jest.mock("@/features/characters/components/CharacterGrid", () => ({
  CharacterGrid: ({ characters }: { characters: Character[] }): ReactElement => (
    <div data-testid="grid">{characters.map((c) => c.name).join(",")}</div>
  ),
}));

jest.mock("@/shared/components/ui", () => ({
  EmptyState: ({ message }: { message: string }): ReactElement => (
    <div data-testid="empty">{message}</div>
  ),
  SkeletonCard: (): ReactElement => <div data-testid="skeleton" />,
  DarkModeToggle: (): ReactElement => <div />,
  Header: (): ReactElement => <div />,
  HeaderNavLinks: (): ReactElement => <div />,
}));

const mockHydration = useStoreHydration as jest.MockedFunction<typeof useStoreHydration>;

const sample: Character[] = [
  {
    id: "a",
    name: "Alpha",
    fullName: "A",
    score: 1,
    type: "hero",
    universe: "Marvel",
    aliases: [],
    powers: ["Strength"],
    powerStats: { strength: 1, speed: 1, intelligence: 1, magic: 1 },
    description: "",
    image: "",
  },
  {
    id: "b",
    name: "Beta",
    fullName: "B",
    score: 1,
    type: "hero",
    universe: "DC",
    aliases: [],
    powers: ["Speed"],
    powerStats: { strength: 1, speed: 1, intelligence: 1, magic: 1 },
    description: "",
    image: "",
  },
];

describe("FavoritesContent", () => {
  beforeEach(() => {
    localStorage.clear();
    useFavoritesStore.setState({ favoriteIds: [] });
    mockHydration.mockReset();
  });

  it("shows a dynamic skeleton list before hydration", () => {
    mockHydration.mockReturnValue(false);
    render(<FavoritesContent allCharacters={sample} />);
    expect(screen.getAllByTestId("skeleton")).toHaveLength(2);
  });

  it("shows empty state after hydration with no favorites", () => {
    mockHydration.mockReturnValue(true);
    render(<FavoritesContent allCharacters={sample} />);
    expect(screen.getByTestId("empty")).toHaveTextContent("No favorites yet");
  });

  it("shows CharacterGrid after hydration when favorites exist", () => {
    mockHydration.mockReturnValue(true);
    useFavoritesStore.setState({ favoriteIds: ["a"] });
    render(<FavoritesContent allCharacters={sample} />);
    expect(screen.getByTestId("grid")).toHaveTextContent("Alpha");
  });
});
