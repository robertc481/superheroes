import { FavoriteButton } from "@/components/FavoriteButton";
import { PowerStatsDisplay } from "@/components/PowerStatsDisplay";
import { scoreBadgeClass, typeBadgeColorClass, universeBadgeColorClass } from "@/lib/ui";
import type { Character } from "@/types";
import Image from "next/image";
import type { ReactElement } from "react";

export function CharacterDetail({ character }: { character: Character }): ReactElement {
  const weaknessLabel: string = character.weakness ?? "Unknown";

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-body text-sm text-hero-primary/70 dark:text-hero-light/70">
            {character.fullName}
          </p>
          <h1 className="font-heading text-3xl font-bold text-hero-primary dark:text-hero-light">
            {character.name}
          </h1>
        </div>
        <FavoriteButton
          characterId={character.id}
          characterName={character.name}
        />
      </div>

      <div className="relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-xl bg-hero-light/50 dark:bg-hero-primary/20">
        <Image
          src={character.image}
          alt={`Portrait of ${character.name}`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 640px"
          priority
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <span className={`rounded-full px-3 py-1 text-sm ${universeBadgeColorClass(character.universe)}`}>
          {character.universe}
        </span>
        <span className={`rounded-full px-3 py-1 text-sm ${typeBadgeColorClass(character.type)}`}>
          {character.type}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${scoreBadgeClass(character.score)}`}
        >
          Score {character.score.toFixed(1)}
        </span>
      </div>

      <p className="font-body text-base leading-relaxed text-hero-primary dark:text-hero-light">
        {character.description}
      </p>

      <section aria-labelledby="powers-heading">
        <h2
          id="powers-heading"
          className="font-heading text-lg font-semibold text-hero-primary dark:text-hero-light"
        >
          Powers
        </h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {character.powers.map((p) => (
            <li key={p}>
              <span className="rounded-full bg-hero-light px-3 py-1 text-sm text-hero-primary dark:bg-hero-primary/40 dark:text-hero-light">
                {p}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="stats-heading">
        <h2
          id="stats-heading"
          className="font-heading text-lg font-semibold text-hero-primary dark:text-hero-light"
        >
          Power stats
        </h2>
        <div className="mt-3 max-w-md">
          <PowerStatsDisplay stats={character.powerStats} />
        </div>
      </section>

      <section aria-labelledby="weakness-heading">
        <h2
          id="weakness-heading"
          className="font-heading text-lg font-semibold text-hero-primary dark:text-hero-light"
        >
          Weakness
        </h2>
        <p className="mt-2 font-body text-hero-primary dark:text-hero-light">
          {weaknessLabel}
        </p>
      </section>

      <section aria-labelledby="aliases-heading">
        <h2
          id="aliases-heading"
          className="font-heading text-lg font-semibold text-hero-primary dark:text-hero-light"
        >
          Aliases
        </h2>
        <ul className="mt-2 list-inside list-disc font-body text-hero-primary dark:text-hero-light">
          {character.aliases.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
