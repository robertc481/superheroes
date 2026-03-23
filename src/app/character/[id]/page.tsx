import { CharacterDetail } from "@/components/CharacterDetail";
import { ALL_CHARACTERS } from "@/lib/heroes";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";

export function generateStaticParams(): { id: string }[] {
  return ALL_CHARACTERS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const character = ALL_CHARACTERS.find((c) => c.id === id);
  if (character === undefined) {
    return { title: "Character not found" };
  }
  return {
    title: character.name,
    description: character.description,
  };
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<ReactElement> {
  const { id } = await params;
  const character = ALL_CHARACTERS.find((c) => c.id === id);
  if (character === undefined) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/"
        className="mb-6 inline-block font-body text-sm font-medium text-hero-secondary hover:underline"
      >
        ← Back to roster
      </Link>
      <CharacterDetail character={character} />
    </div>
  );
}
