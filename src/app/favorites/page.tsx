import { ALL_CHARACTERS } from "@/features/characters";
import { FavoritesContent } from "@/features/favorites";
import type { Metadata } from "next";
import type { ReactElement } from "react";

export const metadata: Metadata = {
  title: "Your favorites",
  description: "Characters you saved from the superhero roster.",
};

export default function FavoritesPage(): ReactElement {
  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-hero-primary dark:text-hero-light">
        Your favorites
      </h1>
      <FavoritesContent allCharacters={ALL_CHARACTERS} />
    </div>
  );
}
