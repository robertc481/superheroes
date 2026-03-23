import { FavoriteButton } from "@/components/FavoriteButton";
import { PowerStatsDisplay } from "@/components/PowerStatsDisplay";
import { scoreBadgeClass, typeBadgeColorClass, universeBadgeColorClass } from "@/lib/ui";
import type { Character } from "@/types";
import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";

export function CharacterCard({
  character,
  imagePriority = false,
}: {
  character: Character;
  imagePriority?: boolean;
}): ReactElement {
  const weaknessLabel: string = character.weakness ?? "Unknown";
  const titleId = `card-title-${character.id}`;

  return (
    <div className="group relative h-full overflow-hidden rounded-xl border border-hero-primary/15 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg dark:border-hero-light/10 dark:bg-hero-dark">
      <Link
        href={`/character/${character.id}`}
        className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-hero-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-hero-dark"
        aria-labelledby={titleId}
      >
        <article className="flex h-full flex-col">
          <div className="relative aspect-[3/4] w-full bg-hero-light/50 dark:bg-hero-primary/20">
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={imagePriority}
            />
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2
                id={titleId}
                className="font-heading text-lg font-bold text-hero-primary dark:text-hero-light"
              >
                {character.name}
              </h2>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${scoreBadgeClass(character.score)}`}
              >
                {character.score.toFixed(1)}
              </span>
            </div>
            <p className="font-body text-xs text-hero-primary/80 dark:text-hero-light/80">
              {character.aliases.slice(0, 2).join(" · ")}
            </p>
            <p className="font-body text-xs text-hero-primary/70 dark:text-hero-light/70">
              Weakness: {weaknessLabel}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className={`rounded-full px-2 py-0.5 text-xs ${universeBadgeColorClass(character.universe)}`}>
                {character.universe}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${typeBadgeColorClass(character.type)}`}>
                {character.type}
              </span>
            </div>
            <div className="mt-3 border-t border-hero-primary/10 pt-3 dark:border-hero-light/10">
              <PowerStatsDisplay stats={character.powerStats} />
            </div>
          </div>
        </article>
      </Link>
      <div className="pointer-events-none absolute right-2 top-2 z-10">
        <div className="pointer-events-auto">
          <FavoriteButton
            characterId={character.id}
            characterName={character.name}
          />
        </div>
      </div>
    </div>
  );
}
