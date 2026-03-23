import { CharacterCard } from "@/components/CharacterCard";
import type { Character } from "@/types";
import type { ReactElement } from "react";

export function CharacterGrid({
  characters,
}: {
  characters: Character[];
}): ReactElement {
  return (
    <div>
      <p
        className="mb-4 font-body text-sm text-hero-primary dark:text-hero-light"
        role="status"
        aria-live="polite"
      >
        {characters.length}{" "}
        {characters.length === 1 ? "character" : "characters"} found
      </p>
      <ul
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        role="list"
      >
        {characters.map((character, index) => (
          <li key={character.id} className="list-none">
            <CharacterCard
              character={character}
              imagePriority={index < 6}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
