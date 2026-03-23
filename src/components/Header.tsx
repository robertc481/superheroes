import { DarkModeToggle } from "@/components/DarkModeToggle";
import { HeaderNavLinks } from "@/components/HeaderNavLinks";
import Link from "next/link";
import type { ReactElement } from "react";

export function Header(): ReactElement {
  return (
    <header className="border-b border-hero-primary/20 bg-hero-primary text-white shadow-md dark:border-hero-light/10 dark:bg-hero-dark">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="font-heading text-xl font-bold tracking-tight text-white hover:text-hero-accent"
        >
          Superhero Roster
        </Link>
        <div className="flex items-center gap-6">
          <HeaderNavLinks />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
