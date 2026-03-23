/**
 * @jest-environment jsdom
 */
import { CharacterCard } from "@/components/CharacterCard";
import type { Character } from "@/types";
import { render, screen } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";

const baseCharacter: Character = {
  id: "batman",
  name: "Batman",
  fullName: "Bruce Wayne",
  score: 8.3,
  type: "hero",
  weakness: "Joker",
  universe: "DC",
  aliases: ["The Dark Knight", "The Caped Crusader"],
  powers: ["Intelligence", "Strength", "Speed"],
  powerStats: {
    strength: 72,
    speed: 68,
    intelligence: 100,
    magic: 0,
  },
  description: "Test description",
  image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/full/70.jpg",
};

jest.mock("@/components/FavoriteButton", () => ({
  FavoriteButton: (): ReactElement => (
    <button type="button" aria-label="Favorite stub">
      ♡
    </button>
  ),
}));

jest.mock("@/lib/ui", () => ({
  scoreBadgeClass: (): string => "badge-score",
  universeBadgeColorClass: (): string => "badge-universe",
  typeBadgeColorClass: (): string => "badge-type",
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default({
    children,
    href,
  }: {
    children: ReactNode;
    href: string;
  }): ReactElement {
    return <a href={href}>{children}</a>;
  },
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default(props: {
    alt: string;
    src: string;
    priority?: boolean;
  }): ReactElement {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- test stub for next/image
      <img
        alt={props.alt}
        src={props.src}
        data-priority={props.priority === true ? "true" : "false"}
      />
    );
  },
}));

describe("CharacterCard", () => {
  it("renders character name and image with non-empty alt text", () => {
    render(<CharacterCard character={baseCharacter} />);
    expect(screen.getByText("Batman")).toBeInTheDocument();
    const img = screen.getByRole("img", { name: "Batman" });
    expect(img).toHaveAttribute("alt", "Batman");
    expect(img.getAttribute("alt")?.length).toBeGreaterThan(0);
  });

  it("renders weakness when present", () => {
    render(<CharacterCard character={baseCharacter} />);
    expect(screen.getByText(/Weakness:/)).toHaveTextContent("Joker");
  });

  it("does not crash when weakness is undefined", () => {
    const c: Character = { ...baseCharacter, weakness: undefined };
    render(<CharacterCard character={c} />);
    expect(screen.getByText(/Weakness:/)).toHaveTextContent("Unknown");
  });
});
