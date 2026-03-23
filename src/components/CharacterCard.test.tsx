/**
 * @jest-environment jsdom
 */
import { CharacterCard } from "@/components/CharacterCard";
import type { Character } from "@/types";
import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactElement, ReactNode } from "react";

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
    ...anchorProps
  }: {
    children: ReactNode;
    href: string;
  } & AnchorHTMLAttributes<HTMLAnchorElement>): ReactElement {
    return (
      <a href={href} {...anchorProps}>
        {children}
      </a>
    );
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
  it("renders character name and image with descriptive alt text", () => {
    render(<CharacterCard character={baseCharacter} />);
    expect(screen.getByText("Batman")).toBeInTheDocument();
    const img = screen.getByRole("img", { name: "Portrait of Batman" });
    expect(img).toHaveAttribute("alt", "Portrait of Batman");
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

  it("exposes a detail link whose accessible name comes from the card title and href is correct", () => {
    render(<CharacterCard character={baseCharacter} />);
    const link = screen.getByRole("link", { name: "Batman" }) as HTMLAnchorElement;
    expect(link.getAttribute("href")).toBe("/character/batman");
  });

  it("renders power stat labels and values from PowerStatsDisplay", () => {
    render(<CharacterCard character={baseCharacter} />);
    expect(screen.getByText("Strength")).toBeInTheDocument();
    expect(screen.getByText("72")).toBeInTheDocument();
  });

  it("passes imagePriority to next/image", () => {
    render(<CharacterCard character={baseCharacter} imagePriority />);
    const img = screen.getByRole("img", { name: "Portrait of Batman" });
    expect(img).toHaveAttribute("data-priority", "true");
  });

  it("defaults imagePriority to false", () => {
    render(<CharacterCard character={baseCharacter} />);
    const img = screen.getByRole("img", { name: "Portrait of Batman" });
    expect(img).toHaveAttribute("data-priority", "false");
  });
});
