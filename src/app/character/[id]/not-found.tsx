import Link from "next/link";
import type { ReactElement } from "react";

export default function CharacterNotFound(): ReactElement {
  return (
    <div className="mx-auto max-w-lg rounded-xl border border-hero-primary/20 bg-white p-10 text-center dark:bg-hero-dark">
      <h1 className="font-heading text-2xl font-bold text-hero-primary dark:text-hero-light">
        Character not found
      </h1>
      <p className="mt-3 font-body text-hero-primary/80 dark:text-hero-light/80">
        No hero or villain exists for this ID. Pick someone from the roster.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-hero-primary px-4 py-2 text-sm font-medium text-white hover:bg-hero-secondary"
      >
        Back to roster
      </Link>
    </div>
  );
}
